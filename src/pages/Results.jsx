

import React, { useMemo, useRef, useState, useEffect } from "react";
import { useAssessment } from "../store/useAssessment";

/*import { useAssessment } from "../store/useAssessment";
import KPI from "../components/KPI";

import ChartMonthly from "../components/ChartMonthly";
import ErrorBoundary from "../components/ErrorBoundary";




const fmtInt = (n) =>
  typeof n === "number" && !isNaN(n) ? n.toLocaleString() : "-";
const fmtInr = (n) =>
  typeof n === "number" && !isNaN(n) ? `₹${n.toLocaleString()}` : "-";

function KPI({ label, value, hint }) {
  return (
    <div className="bg-slate-50 p-4 rounded-xl text-center transition-transform transform hover:scale-105">
      <p className="text-sm font-medium text-slate-600">{label}</p>
      <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
      {hint ? (
        <p className="text-xs text-slate-400 mt-1">{hint}</p>
      ) : null}
    </div>
  );
}

export default function Results() {
  const pdfRef   = useRef(null);
  const chartRef = useRef(null);
  const [chartPng, setChartPng] = useState(null);
  const { inputs = {}, results = {} } = useAssessment();
    
  const generatePdf = async (outputType = 'save') => {
  // 2) export the whole report (now containing the PNG, not the live SVG)
  const opt = {
    margin: [12, 12, 20, 12],
    filename: `RTRWH_${inputs.city || "report"}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      // By setting a fixed window-width, we ensure the PDF output is consistent
      // and not dependent on the user's screen size. This prevents the chart
      // from appearing too small when exported on a wide screen.
      windowWidth: 800,
      scrollY: -window.scrollY,
      // html2canvas does not inherit print styles, so we need to tell it
      // explicitly to ignore elements with the `no-print` class.
      ignoreElements: (element) =>
        element.classList.contains("no-print"),
    },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    pagebreak: { mode: ["css", "avoid-all"] },
  };
    const html2pdf = (await import("html2pdf.js")).default;
    const html2canvas = (await import("html2canvas")).default;

    const root = pdfRef.current;
    if (!root) return;

    // let layout settle + nudge resize so chart has final size
    await new Promise((r) => setTimeout(r, 250));
    window.dispatchEvent(new Event("resize"));
    await new Promise((r) => setTimeout(r, 120));

    // 1) rasterize the chart to PNG and swap it in
    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true,
        scrollY: -window.scrollY,
      });
      setChartPng(canvas.toDataURL("image/png"));
      await new Promise((r) => setTimeout(r, 50)); // let React render the <img>
    }

    const worker = html2pdf().set(opt).from(root);

    if (outputType === 'dataurlnewwindow') {
      worker.outputPdf('dataurlnewwindow');
      // 3) restore live chart after a delay
      setTimeout(() => setChartPng(null), 1000);
    } else {
      await worker.save();
      // 3) restore live chart after saving
      setChartPng(null);
    }
  };

  const months = results.months ?? [];
  const maxMonth = useMemo(
    () => (months.length ? Math.max(...months) : 0),
    [months]
  );
  const monthLabels = [
    "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"
  ];
  
  
  return (
    <>
      <div className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-100 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Assessment Summary</h1>
              <p className="text-sm text-gray-500 mt-2">
                Location: <span className="font-medium text-gray-800">{inputs.city ?? "-"}</span> · Roof:{" "}
                <span className="font-medium text-gray-800">{fmtInt(inputs.roofAreaM2)} m²</span>
              </p>
            </div>
            <a
              href="/assess"
              className="inline-flex items-center justify-center h-10 px-5 rounded-lg bg-white text-slate-700 text-sm font-medium border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm"
            >
              Re-assess
            </a>
          </div>

          <div className="bg-white shadow-xl rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Your Potential</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPI label="Annual Harvest" value={`${fmtInt(results.annual)} L`} />
              <KPI label="Total Cost" value={fmtInr(results.cost)} />
              <KPI label="Total Savings" value={fmtInr(results.saving)} />
              <KPI label="Recommended Structure" value={results.structure ?? "-"} />
            </div>
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => generatePdf('dataurlnewwindow')}
                className="inline-flex items-center justify-center h-11 px-8 rounded-lg bg-cyan-600 text-white text-base font-semibold hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 shadow-lg"
              >
                View Report as PDF
              </button>
            </div>
          </div>

          <section className="mt-8 bg-white shadow-xl rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Assumptions & Notes</h3>
            <ul className="mt-3 text-sm text-gray-600 list-disc pl-5 space-y-2">
              <li>135 L/day per person (CPHEEO norm).</li>
              <li>First-flush = 3 mm; conveyance loss = 5%.</li>
              <li>Tank sizing via Ripple (sequent-peak) using monthly rainfall normals.</li>
              <li>Recharge sized for a design event with void ratio 0.35.</li>
            </ul>
          </section>
        </div>
      </div>

      {/* Hidden Full Report for PDF Generation */}
      <div
        style={{ position: 'absolute', left: '-9999px', top: 0, width: '800px' }}
        aria-hidden="true"
      >
        <div ref={pdfRef} id="rtrwh-report" className="space-y-8 p-6 bg-white">
        <div className="py-6 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold">Your Rainwater Assessment</h1>
          <p className="text-sm text-gray-500">
            Location: <span className="font-medium">{inputs.city ?? "-"}</span> · Roof:{" "}
            <span className="font-medium">{fmtInt(inputs.roofAreaM2)} m²</span> · Roof type:{" "}
            <span className="font-medium uppercase">{inputs.roofType ?? "-"}</span> · Rainfall:{" "}
            <span className="font-medium">{fmtInt(inputs.rainfallMm)} mm/yr</span> · Dwellers:{" "}
            <span className="font-medium">{fmtInt(inputs.dwellers)}</span>
          </p>
        </div>
        <a
          href="/assess"
          className="no-print inline-flex items-center justify-center h-10 px-4 rounded-lg bg-indigo-600 text-white text-sm font-medium"
        >
          Re-assess
        </a>
      </div>
      <section className="card p-6 avoid-break">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        <KPI label="Annual Harvest" value={`${fmtInt(results.annual)} L`} hint="Rainfall × Roof × Coefficient" />
        <KPI label="Annual Demand" value={`${fmtInt(results.demand)} L`} hint="135 L/day × dwellers × 365" />
        <KPI label="Self-Sufficiency" value={`${results.selfSuff ?? "-"} %`} />
        <KPI label="Tank Size (Ripple)" value={`${fmtInt(results.tankSize)} L`} hint="Sequent-peak monthly balance" />
        <KPI label="Recharge Potential" value={`${fmtInt(results.recharge)} L`} hint="Harvest − Stored" />
        <KPI label="Recharge Pit Volume" value={`${results.pitVol ?? "-"} m³`} hint="Annual ÷ 1000 (info only)" />
        <KPI label="Estimated Saving" value={fmtInr(results.saving)} />
        <KPI label="Payback (Years)" value={results.payback ?? "-"} />
        <KPI label="Recommended Structure" value={results.structure ?? "-"} />
        <KPI label="Structure Size" value={results.sizeText ?? "-"} />
        <KPI label="Estimated Cost" value={fmtInr(results.cost)} />
      </div>
    {/* KPIs you already render */}
    </section>
    
      
      <section className="p-4 rounded-2xl border border-gray-200 bg-white shadow-sm card p-6 avoid-break, overflow-visible">
       <h2 className="text-lg font-semibold">Monthly Harvest (Liters)</h2>
        <p className="text-xs text-gray-500 mb-4">
          Based on monthly rainfall normals for <span className="font-medium">{inputs.city ?? "-"}</span>.
        </p>

        <div
          ref={chartRef}
          // By giving the container a fixed size, we ensure html2canvas
          // captures only the chart, not the full width of the page. This
          // prevents the chart from being scaled down when the resulting
          // PNG is displayed in a fixed-size <img> tag.
          style={{ width: '640px', height: '320px', margin: '0 auto' }}>
          {chartPng ? (
            <img
              src={chartPng}
              alt="Monthly harvest chart"
              style={{ width: "640px", height: "320px" }}
            />
          ) : (
            <ErrorBoundary>
              <ChartMonthly months={months} />
            </ErrorBoundary>
         ) }
        </div>
      </section>


      <section className="p-4 rounded-2xl border border-gray-200 bg-white shadow-sm card p-6 avoid-break">
        <h3 className="text-base font-semibold">Assumptions & Notes</h3>
        <ul className="mt-2 text-sm text-gray-600 list-disc pl-5 space-y-1">
          <li>135 L/day per person (CPHEEO norm).</li>
          <li>First-flush = 3 mm; conveyance loss = 5%.</li>
          <li>Tank sizing via Ripple (sequent-peak) using monthly rainfall normals.</li>
          <li>Recharge sized for a design event with void ratio 0.35.</li>
        </ul>
      </section>
    </div>
        </div>
      </div>

    </>
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
