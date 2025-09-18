
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import rainfall from "../data/rainfall.json";
import { useAssessment } from "../store/useAssessment";

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

  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      city: "Bengaluru",
      rainfallMm: rainfall["Bengaluru"]?.rainfall_mm ?? 970,
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-4 py-6">
      <div>
        <label className="block text-sm">City</label>
        <select {...register("city")} className="input">
          {Object.keys(rainfall).map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">
          Default rainfall: {rainfall[city]?.rainfall_mm ?? "-"} mm (editable)
        </p>
      </div>

      <div>
        <label className="block text-sm">Annual rainfall (mm)</label>
        <input type="number" {...register("rainfallMm")} className="input" />
      </div>

      <div>
        <label className="block text-sm">Roof area (m²)</label>
        <input type="number" {...register("roofAreaM2", { min: 10 })} className="input" />
      </div>

      <div>
        <label className="block text-sm">Roof type</label>
        <select {...register("roofType")} className="input">
          <option value="rcc">RCC (coef 0.8)</option>
          <option value="tile">Tile (0.75)</option>
          <option value="metal">Metal (0.9)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm">Open unpaved space?</label>
        <select {...register("openSpace")} className="input">
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>

      <div>
        <label className="block text-sm">Rocky soil?</label>
        <select {...register("rockySoil")} className="input">
          <option value={false}>No</option>
          <option value={true}>Yes</option>
        </select>
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm">Linear space available (m)</label>
        <input type="number" {...register("linearSpaceM")} className="input" />
      </div>

      <button className="md:col-span-2 bg-indigo-600 text-white px-4 py-2 rounded">Compute</button>
    </form>
  );
}
