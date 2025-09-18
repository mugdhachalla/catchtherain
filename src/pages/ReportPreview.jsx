import { useAssessment } from "../store/useAssessment";
import KPI from "../components/KPI";
import ChartMonthly from "../components/ChartMonthly";

export default function ReportPreview() {
  const { inputs, results } = useAssessment();

  if (!results) {
    return (
      <div className="p-6">
        <h2 className="text-lg font-bold">No results yet</h2>
        <p className="text-gray-600">
          Please run an assessment first from the{" "}
          <a href="/assess" className="text-indigo-600 underline">Assessment page</a>.
        </p>
      </div>
    );
  }

  return (
    <div id="report" className="bg-white p-6 rounded-lg shadow max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Rainwater Harvesting Report</h1>
      <p className="text-sm text-gray-600 mb-4">
        Location: {inputs.city} • Roof Area: {inputs.roofAreaM2} m² • Rainfall: {inputs.rainfallMm} mm
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <KPI label="Annual Harvest" value={`${results.annual.toLocaleString()} L`} />
        <KPI label="Structure" value={results.structure} />
        <KPI label="Structure Size" value={results.sizeText} />
        <KPI label="Estimated Cost" value={`₹${results.cost.toLocaleString()}`} />
        <KPI label="Payback" value={`${results.payback} yrs`} />
      </div>

      <h3 className="text-lg font-semibold mb-2">Monthly Harvest</h3>
      <ChartMonthly data={results.months} />

      <div className="mt-6 text-xs text-gray-500">
        <p>
          These estimates are indicative only. Please consult a certified engineer and
          local regulations before implementation.
        </p>
      </div>
    </div>
  );
}
