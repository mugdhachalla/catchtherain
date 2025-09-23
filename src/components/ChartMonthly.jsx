// ChartMonthly.jsx old 
//import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

//export default function ChartMonthly({ data }) {
  //const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  //const rows = months.map((m,i)=>({month:m, litres:data[i] || 0}));
  //return (
    //<div className="h-64">
    // <ResponsiveContainer width="100%" height="100%">
        //<BarChart data={rows}>
          //<XAxis dataKey="month" /><YAxis />
          //<Tooltip />
          //<Bar dataKey="litres" />
        //</BarChart>
      //</ResponsiveContainer>
    //</div>
// // );
//}

// src/components/ChartMonthly.jsx
import React, { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

// Fixed size avoids html2canvas clipping AND eliminates width=0 errors
const W = 640;
const H = 320;

export default function ChartMonthly({ months }) {
  // Normalize to an array of 12 finite numbers
  const safe = useMemo(() => {
    const src = Array.isArray(months) ? months : [];
    const arr = new Array(12).fill(0).map((_, i) => {
      const v = Number(src[i]);
      return Number.isFinite(v) ? v : 0;
    });
    return arr;
  }, [months]);

  // If everything is zero, show a friendly placeholder instead of crashing
  const allZero = safe.every(v => v === 0);

  const data = useMemo(
    () => MONTHS.map((m, i) => ({ name: m, litres: safe[i] })),
    [safe]
  );

  if (allZero) {
    return (
      <div style={{ width: W, height: H }} className="grid place-items-center text-sm text-gray-500">
        No monthly data available.
      </div>
    );
  }

  return (
    <div
      style={{
        width: W,
        height: H,
        overflow: "visible",
        background: "#fff",
        paddingBottom: 16,
      }}
    >
      <BarChart width={W} height={H} data={data} margin={{ top: 8, right: 20, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis
          width={40}
          tickFormatter={(v) => (v >= 1000 ? `${Math.round(v / 1000)}k` : `${v}`)}
        />
        <Tooltip formatter={(v) => [`${Number(v).toLocaleString()} L`, "Harvest"]} />
        <Bar dataKey="litres" />
      </BarChart>
    </div>
  );
}
