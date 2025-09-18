import { useForm } from "react-hook-form";
import rainfall from "../data/rainfall.json";
import { useAssessment } from "../store/useAssessment";
import { useNavigate } from "react-router-dom";


export default function AssessForm(){
  const { inputs, setInput, compute } = useAssessment();
  const { register, handleSubmit, watch } = useForm({ defaultValues: inputs });
  const navigate = useNavigate();


  const onSubmit = (data) => {
    // city autofill rainfall
    const city = data.city;
    if (rainfall[city]) data.rainfallMm = rainfall[city].rainfall_mm;
    Object.entries(data).forEach(([k,v]) => setInput(k, (k==="roofAreaM2"||k==="rainfallMm"||k==="linearSpaceM")? Number(v): v));
    compute();
    navigate("/results");  

  };

  const city = watch("city");
  const cityRain = rainfall[city]?.rainfall_mm ?? inputs.rainfallMm;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-4 py-6">
      <div>
        <label className="block text-sm">City</label>
        <select {...register("city")} className="input">
          {Object.keys(rainfall).map(c => <option key={c}>{c}</option>)}
        </select>
        <p className="text-xs text-gray-500 mt-1">Default rainfall: {cityRain} mm (editable)</p>
      </div>

      <div>
        <label className="block text-sm">Annual rainfall (mm)</label>
        <input type="number" {...register("rainfallMm")} className="input" defaultValue={cityRain}/>
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
