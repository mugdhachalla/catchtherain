import React, { useMemo, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import {Navbar} from "../components/Navbar";
import { useAssessment } from "../store/useAssessment";
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

  // 2) export the whole report (now containing the PNG, not the live SVG)
  const opt = {
    margin: [12, 12, 20, 12],
    filename: `RTRWH_${inputs.city || "report"}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      windowWidth: 800,
      windowHeight: root.scrollHeight || document.documentElement.scrollHeight,
      scrollY: -window.scrollY,
      ignoreElements: (el) => el.classList?.contains("no-print"),

      // 👇 strip unsupported color functions in the *cloned* DOM
      onclone: (clonedDoc) => {
        const safeDeleteOklchRules = (sheet) => {
          try {
            const rules = sheet?.cssRules;
            if (!rules) return;
            for (let i = rules.length - 1; i >= 0; i--) {
              const t = rules[i].cssText || "";
              if (t.includes("oklch(") || t.includes("oklab(")) {
                sheet.deleteRule(i);
              }
            }
          } catch {
            // cross-origin / readonly stylesheet – ignore
          }
        };
        Array.from(clonedDoc.styleSheets || []).forEach(safeDeleteOklchRules);
      },
    },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    pagebreak: { mode: ["css", "legacy"] },
  };

  const worker = html2pdf().set(opt).from(root);

  if (outputType === "dataurlnewwindow") {
    // open in a new tab/window
    worker.outputPdf("dataurlnewwindow");
    setTimeout(() => setChartPng(null), 1000); // restore live chart
  } else {
    await worker.save();
    setChartPng(null); // restore live chart
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
      <div className="py-12 bg-slate-100 min-h-screen">
        <Navbar />
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Assessment Summary</h1>
              <p className="text-sm text-gray-500 mt-2">
                Location: <span className="font-medium text-gray-800">{inputs.city ?? "-"}</span> · Roof:{" "}
                <span className="font-medium text-gray-800">{fmtInt(inputs.roofAreaM2)} m²</span>
              </p>
            </div>
            
            <Link
              to="/assess"
              className="inline-flex items-center justify-center h-10 px-5 rounded-lg bg-white text-slate-700 text-sm font-medium border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm"
            >
              Re-assess
            </Link>
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
        {/* PDF-only styles (scoped) */}
       <style>
      {`
      /* make Tailwind colors render in canvas */
      *{-webkit-print-color-adjust:exact; print-color-adjust:exact}
      .pdf-h1{font-size:22px;font-weight:700;margin:0 0 8px}
      .pdf-muted{color:#6b7280}
      .pdf-section{border:1px solid #e5e7eb;border-radius:12px;padding:16px;margin:16px 0;page-break-inside:avoid}
      .pdf-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
      .pdf-grid-2{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
      .pdf-card{border:1px solid #e5e7eb;border-radius:10px;padding:12px;text-align:center}
      .pdf-label{font-size:12px;color:#64748b;margin-bottom:4px}
      .pdf-value{font-size:18px;font-weight:700;color:#111827}
      .pdf-note{font-size:10px;color:#94a3b8;margin-top:2px}
      .avoid-break{page-break-inside:avoid}
      .pagebreak{page-break-before:always}
      ul.pdf-list{margin:8px 0 0 18px;font-size:12px;color:#374151}
      ul.pdf-list li{margin:4px 0}
      .pdf-row{display:flex;gap:12px}
      .pdf-col{flex:1}
      `}
     </style>
        <div className="py-6 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold">Your Rainwater Assessment</h1>
          <p className="pdf-muted" style={{ fontSize: 12, margin: 0 }}>
             Location: <strong>{inputs.city ?? "-"}</strong> · Roof:{" "}
             <strong>{fmtInt(inputs.roofAreaM2)} m²</strong> · Roof type:{" "}
             <strong>{(inputs.roofType ?? "-").toUpperCase()}</strong> · Rainfall:{" "}
             <strong>{fmtInt(inputs.rainfallMm)} mm/yr</strong> · Dwellers:{" "}
             <strong>{fmtInt(inputs.dwellers)}</strong>
          </p>
        </div>
        <a
          href="/assess"
          className="no-print inline-flex items-center justify-center h-10 px-4 rounded-lg bg-indigo-600 text-white text-sm font-medium"
        >
          Re-assess
        </a>
      </div>
      <section className="pdf-section avoid-break">
      <h2 className="pdf-h1" style={{ fontSize: 16 }}>At a glance</h2>
      <div className="pdf-grid">
        <div className="pdf-card">
          <div className="pdf-label">Annual Harvest</div>
          <div className="pdf-value">{fmtInt(results.annual)} L</div>
          <div className="pdf-note">Rainfall × Roof × Coefficient</div>
        </div>
        <div className="pdf-card">
          <div className="pdf-label">Annual Demand</div>
          <div className="pdf-value">{fmtInt(results.demand)} L</div>
          <div className="pdf-note">135 L/day × dwellers × 365</div>
        </div>
        <div className="pdf-card">
          <div className="pdf-label">Self-Sufficiency</div>
          <div className="pdf-value">{results.selfSuff ?? "-"} %</div>
        </div>
        <div className="pdf-card">
          <div className="pdf-label">Tank Size (Ripple)</div>
          <div className="pdf-value">{fmtInt(results.tankSize)} L</div>
          <div className="pdf-note">Sequent-peak monthly balance</div>
        </div>
      </div>
     </section>
    
      
      {/* Recharge & Cost */}
     <section className="pdf-section avoid-break">
      <h2 className="pdf-h1" style={{ fontSize: 16 }}>Recharge & Costs</h2>
      <div className="pdf-grid">
        <div className="pdf-card">
          <div className="pdf-label">Recharge Potential</div>
          <div className="pdf-value">{fmtInt(results.surplusRecharge)} L</div>
          <div className="pdf-note">Harvest − Stored</div>
        </div>
        <div className="pdf-card">
          <div className="pdf-label">Recharge Pit Volume</div>
          <div className="pdf-value">{results.pitVol ?? "-"} m³</div>
          <div className="pdf-note">Annual ÷ 1000 (info only)</div>
        </div>
        <div className="pdf-card">
          <div className="pdf-label">Estimated Saving</div>
          <div className="pdf-value">{fmtInr(results.saving)}</div>
        </div>
        <div className="pdf-card">
          <div className="pdf-label">Payback (Years)</div>
          <div className="pdf-value">{results.payback ?? "-"}</div>
        </div>
      </div>

      <div className="pdf-grid" style={{ marginTop: 12 }}>
        <div className="pdf-card">
          <div className="pdf-label">Recommended Structure</div>
          <div className="pdf-value">{results.structure ?? "-"}</div>
        </div>
        <div className="pdf-card">
          <div className="pdf-label">Structure Size</div>
          <div className="pdf-value">{results.sizeText ?? "-"}</div>
        </div>
        <div className="pdf-card">
          <div className="pdf-label">Estimated Cost</div>
          <div className="pdf-value">{fmtInr(results.cost)}</div>
        </div>
        <div className="pdf-card">
          <div className="pdf-label">Recommended Recharge</div>
          <div className="pdf-value">{fmtInt(results?.recommendedRecharge)} L</div>
          <div className="pdf-note">Min(Surplus, Site capacity)</div>
        </div>
      </div>

      {/* Optional site capacity rows (only if you compute them) recommended and surplus recharge have the same formula, currently using same formula*/}
      <div className="pdf-grid-2" style={{ marginTop: 12 }}>
        <div className="pdf-card">
          <div className="pdf-label">Surplus Recharge (min(Harvest − Stored,Site Capacity))</div>
          <div className="pdf-value">{fmtInt(results?.recommendedRecharge)} L</div>
        </div>
        <div className="pdf-card">
          <div className="pdf-label">Site Recharge Capacity</div>
          <div className="pdf-value">{fmtInt(results?.siteCapacity)} L</div>
          <div className="pdf-note">Unpaved area × infiltration × days</div>
        </div>
      </div>
     </section>

     {/* Page break BEFORE chart to keep it whole */}
     <div className="pagebreak" />

     {/* Chart */}
     <section className="pdf-section avoid-break">
      <h2 className="pdf-h1" style={{ fontSize: 16, marginBottom: 8 }}>
        Monthly Harvest (Liters)
      </h2>
      <p className="pdf-muted" style={{ fontSize: 11, marginTop: 0 }}>
        Based on monthly rainfall normals for <strong>{inputs.city ?? "-"}</strong>.
      </p>
      <div
        ref={chartRef}
        style={{ width: "640px", height: "320px", margin: "8px auto 0" }}
      >
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
        )}
      </div>
     </section>

     {/* Assumptions (kept together) */}
     <section className="pdf-section avoid-break">
      <h2 className="pdf-h1" style={{ fontSize: 16 }}>Assumptions & Notes</h2>
      <ul className="pdf-list">
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