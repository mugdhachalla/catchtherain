import { useAssessment } from "../store/useAssessment";
import KPI from "../components/KPI";
import ChartMonthly from "../components/ChartMonthly";
import html2pdf from "html2pdf.js";

export default function Results(){
  const { inputs, results } = useAssessment();
  if (!results) return <div className="py-10">No results yet. <a href="/assess" className="text-indigo-600 underline">Run an assessment</a>.</div>;

  const download = () => {
    const el = document.getElementById("report");
    html2pdf().from(el).save("Rainwater_Report.pdf");
  };

  return (
    <div className="py-6">
      <div id="report" className="bg-white p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Assessment Result</h2>
        <p className="text-gray-600 text-sm mb-4">
          City: {inputs.city} • Rainfall: {inputs.rainfallMm} mm • Roof: {inputs.roofAreaM2} m²
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <KPI label="Annual Harvest" value={`${results.annual.toLocaleString()} L`} />
          <KPI label="Structure" value={results.structure} />
          <KPI label="Structure Size" value={results.sizeText} />
          <KPI label="Estimated Cost" value={`₹${results.cost.toLocaleString()}`} />
          <KPI label="Payback" value={`${results.payback} years`} />
        </div>

        <h3 className="mt-6 font-semibold">Monthly Harvest</h3>
        <ChartMonthly data={results.months} />

        <div className="text-xs text-gray-500 mt-4">
          <p>Estimates are indicative. Consult local regulations and a qualified engineer.</p>
        </div>
      </div>

      <button onClick={download} className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded">Download PDF</button>
    </div>
  );
}
