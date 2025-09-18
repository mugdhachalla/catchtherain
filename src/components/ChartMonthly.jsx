import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function ChartMonthly({ data }) {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const rows = months.map((m,i)=>({month:m, litres:data[i] || 0}));
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={rows}>
          <XAxis dataKey="month" /><YAxis />
          <Tooltip />
          <Bar dataKey="litres" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
