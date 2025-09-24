
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import rainfall from "../data/rainfall.json";
import { useAssessment } from "../store/useAssessment";
import {Navbar} from "../components/Navbar";
import rulesData from "../data/rules.json";
import {Info} from "lucide-react";


// Haversine (better than simple sqrt for distance)
function haversine(lat1, lon1, lat2, lon2) {
  const toRad = d => (d * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

export default function AssessForm() {
  const navigate = useNavigate();
  const { inputs, setInput, compute } = useAssessment();
  const [currcity, setCity]=useState(null);
  const [rules, setRule]=useState(null);

  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      city: "Guwahati",
      rainfallMm: rainfall["Guwahati"]?.rainfall_mm ?? 1600,
      roofAreaM2: inputs.roofAreaM2 ?? 100,
      roofType: inputs.roofType ?? "rcc",
      openSpace: inputs.openSpace ?? true,
      rockySoil: inputs.rockySoil ?? false,
      linearSpaceM: inputs.linearSpaceM ?? 0,
      dwellers: inputs.dwellers ?? 4
    }
  });

  // 🔹 Autofill city/rainfall from geolocation
  useEffect(() => {
    if (!("geolocation" in navigator)) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        // find nearest city with lat/lon
        let nearest = null;
        let best = Infinity;
        for (const [city, data] of Object.entries(rainfall)) {
          if (typeof data.lat !== "number" || typeof data.lon !== "number") continue;
          const d = haversine(latitude, longitude, data.lat, data.lon);
          if (d < best) { best = d; nearest = city; }
        }

        if (nearest) {
          setCity(nearest);
          const found = rulesData.rules.find(r =>
            r["City"]?.toLowerCase().includes(nearest.toLowerCase())
          );
          setRule(found ? found.Rule : "");
          
          const mm = rainfall[nearest].rainfall_mm;
          // Update BOTH: form field + zustand store
          setValue("city", nearest, { shouldDirty: true, shouldValidate: true });
          setValue("rainfallMm", mm, { shouldDirty: true, shouldValidate: true });
          setInput("city", nearest);
          setInput("rainfallMm", mm);
        }
      },
      (err) => {
        console.warn("Geolocation error:", err);
        // optional: leave defaults (Bengaluru)
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
    );
  }, [setInput, setValue]);

  // 🔹 Keep rainfall synced when user changes city manually
  const city = watch("city");
  useEffect(() => {
    const mm = rainfall[city]?.rainfall_mm;
    if (typeof mm === "number") {
      setValue("rainfallMm", mm, { shouldDirty: true });
    }
  }, [city, setValue]);

  //city mandate uncase curr location permission is denied
  useEffect(() => {
    if (city) {
      const found = rulesData.rules.find(r =>
        r["City"]?.toLowerCase().includes(city.toLowerCase())
      );
      setRule(found ? found.Rule : "");
    }
  }, [city]);

  const onSubmit = (data) => {
    const num = (v) => Number(v ?? 0);
    const bool = (v) => v === true || v === "true";

    const patch = {
      city: data.city,
      rainfallMm: num(data.rainfallMm),
      roofAreaM2: num(data.roofAreaM2),
      roofType: data.roofType,
      openSpace: bool(data.openSpace),
      rockySoil: bool(data.rockySoil),
      linearSpaceM: num(data.linearSpaceM),
      dwellers: num(data.dwellers),
    };
    Object.entries(patch).forEach(([k, v]) => setInput(k, v));
    compute();
    navigate("/results"); // no reload, preserves store
  };

  const Benefit = ({ icon, title, children }) => (
    <div className="bg-white p-5 rounded-xl shadow-lg">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="bg-indigo-100 text-indigo-600 p-3 rounded-lg">
            {icon}
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
          <p className="mt-1 text-gray-600 text-sm">{children}</p>
        </div>
      </div>
    </div>
  );

  const iconProps = {
    className: "h-6 w-6",
    strokeWidth: "1.5",
  };

  const icons = {
    dollar: <svg {...iconProps} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.826-1.106-2.236 0-3.062a2.333 2.333 0 0 1 3.464 0l.879.659" />
    </svg>,
    leaf: <svg {...iconProps} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 0 1 6.343 7.343S7 9 9 10c0-2 .5-5 2.986-7.014A8.003 8.003 0 0 1 17.657 18.657Z" />
    </svg>,
    layers: <svg {...iconProps} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125v-1.5c0-.621.504-1.125 1.125-1.125h17.25c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h17.25" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m3.375 14.25 8.625-8.625 8.625 8.625m-17.25 0v-2.625c0-.621.504-1.125 1.125-1.125h15c.621 0 1.125.504 1.125 1.125v2.625" />
    </svg>,
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Navbar />
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Rainwater Harvesting Calculator
            </h2>
            <p className="text-gray-600 mb-8">
              Fill in the details below to estimate your potential savings.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Location Section */}
              <section>
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
                  Location
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                    <select id="city" {...register("city")} className="input mt-1">
                      {Object.keys(rainfall).map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="rainfallMm" className="block text-sm font-medium text-gray-700">Annual Rainfall (mm)</label>
                    <input id="rainfallMm" type="number" {...register("rainfallMm")} className="input mt-1" />
                    <p className="text-xs text-gray-500 mt-1">
                      Auto-filled from city: {rainfall[city]?.rainfall_mm ?? "-"} mm
                    </p>
                  </div>
                </div>
              </section>

              {/* Roof Details Section */}
              <section>
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
                  Roof Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="roofAreaM2" className="block text-sm font-medium text-gray-700">Roof Area (m²)</label>
                    <input id="roofAreaM2" type="number" {...register("roofAreaM2", { min: 10 })} className="input mt-1" />
                  </div>
                  <div>
                    <label htmlFor="roofType" className="block text-sm font-medium text-gray-700">Roof Type</label>
                    <select id="roofType" {...register("roofType")} className="input mt-1">
                      <option value="rcc">RCC (coef 0.8)</option>
                      <option value="tile">Tile (0.75)</option>
                      <option value="metal">Metal (0.9)</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Household & Site Section */}
              <section>
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
                  Household & Site
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="dwellers" className="block text-sm font-medium text-gray-700">No. of Dwellers</label>
                    <input id="dwellers" type="number" {...register("dwellers")} className="input mt-1" />
                  </div>
                  <div>
                    <label htmlFor="openSpace" className="block text-sm font-medium text-gray-700">Open Unpaved Space?</label>
                    <select id="openSpace" {...register("openSpace")} className="input mt-1">
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="rockySoil" className="block text-sm font-medium text-gray-700">Rocky Soil?</label>
                    <select id="rockySoil" {...register("rockySoil")} className="input mt-1">
                      <option value={false}>No</option>
                      <option value={true}>Yes</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="linearSpaceM" className="block text-sm font-medium text-gray-700">Linear Space (m)</label>
                    <input id="linearSpaceM" type="number" {...register("linearSpaceM")} className="input mt-1" />
                  </div>
                </div>
              </section>

              <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                Calculate
              </button>
            </form>
            {rules && rules.trim() !== "" && (
            <div className="pt-6">
              <p className="py-4 px-4 flex items-center gap-3 bg-sky-100 rounded-md">
                <Info className="h-6 w-6 text-sky-600 flex-shrink-0" />
                <span className="text-sky-900">{rules}</span>
              </p>
            </div>
            )}
          </div>
          <div className="hidden md:block bg-indigo-600 p-8">
            <div className="flex flex-col justify-center h-full text-white">
              <h3 className="text-2xl font-bold">Why Harvest Rainwater?</h3>
              <p className="mt-3 text-indigo-200">
                Turn your rooftop into a sustainable water source. Our calculator helps you understand the potential benefits.
              </p>
              <div className="mt-8 space-y-6">
                <Benefit icon={icons.dollar} title="Reduce Water Bills">
                  Lower your dependence on municipal water and see a significant drop in your monthly expenses.
                </Benefit>
                <Benefit icon={icons.leaf} title="Conserve Resources">
                  Play a part in preserving a vital natural resource and promoting environmental sustainability.
                </Benefit>
                <Benefit icon={icons.layers} title="Support Groundwater">
                  Help recharge local aquifers, improving the water table and ensuring water security for the community.
                </Benefit>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
