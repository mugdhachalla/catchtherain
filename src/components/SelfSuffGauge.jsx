import { ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
export default function SelfSuffGauge({ percent = 0 }) {
  const p = Math.max(0, Math.min(100, Number(percent) || 0));
  const data = [{ name: "SelfSuff", value: p }];
  return (
    <div style={{ width: "100%", height: 220 }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart data={data} innerRadius="70%" outerRadius="100%" startAngle={180} endAngle={0}>
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar dataKey="value" angleAxisId={0} cornerRadius={8} clockWise />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="text-center -mt-10">
        <div className="text-2xl font-semibold">{p}%</div>
        <div className="text-xs text-gray-500">Self-sufficiency</div>
      </div>
    </div>
  );
}
