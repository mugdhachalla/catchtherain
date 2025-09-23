/*import { useAssessment } from "../store/useAssessment";
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
*/
import { useAssessment } from "../store/useAssessment";
import KPI from "../components/KPI";
import ChartMonthly from "../components/ChartMonthly";
import html2pdf from "html2pdf.js";
import { Link } from "react-router-dom";

export default function Results() {
  const { inputs, results } = useAssessment();
  if (!results)
    return (
      <div className="py-10 text-center">
        <p className="text-gray-600 mb-4">No results yet.</p>
        <Link
          to="/assess"
          className="inline-block bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700"
        >
          Run an Assessment
        </Link>
      </div>
    );

  const download = () => {
    const el = document.getElementById("report");
    html2pdf().from(el).save("Rainwater_Report.pdf");
  };

  return (
    <div className="py-6">
      <div
        id="report"
        className="bg-white p-6 rounded-xl shadow-md max-w-4xl mx-auto"
      >
        {/* Header */}
        <h2 className="text-2xl font-bold mb-2 text-indigo-700">
          🌧️ Rainwater Harvesting Report
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          City: <span className="font-medium">{inputs.city}</span> • Rainfall:{" "}
          <span className="font-medium">{inputs.rainfallMm} mm</span> • Roof:{" "}
          <span className="font-medium">{inputs.roofAreaM2} m²</span>
        </p>

        {/* KPI grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <KPI label="Annual Harvest" value={`${results.annual.toLocaleString()} L`} sub="Litres per year" />
          <KPI label="Structure" value={results.structure} />
          <KPI label="Structure Size" value={results.sizeText} />
          <KPI label="Estimated Cost" value={`₹${results.cost.toLocaleString()}`} />
          <KPI label="Payback" value={`${results.payback} years`} sub="Until breakeven" />
          <KPI label="Dwellers" value={inputs.dwellers} sub="Household members" />
        </div>

        {/* Chart */}
        <h3 className="mt-4 mb-2 font-semibold text-lg text-gray-700">
          📊 Monthly Harvest Distribution
        </h3>
        <div className="bg-gray-50 border rounded-lg p-4">
          <ChartMonthly data={results.months} />
        </div>

        {/* Notes */}
        <div className="mt-6 text-xs text-gray-500 border-t pt-4 leading-relaxed">
          <p>
            ⚠️ Estimates are indicative only. Consult local regulations and a certified engineer
            before implementation.
          </p>
          <p className="mt-1">
            🌱 Consider combining rooftop harvesting with groundwater recharge for
            maximum sustainability.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={download}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:bg-indigo-700"
        >
          📄 Download PDF
        </button>
        <Link
          to="/assess"
          className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg shadow hover:bg-gray-200"
        >
          🔄 Run Again
        </Link>
      </div>
    </div>
  );
}
