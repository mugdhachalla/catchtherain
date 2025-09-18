export default function KPI({ label, value, sub }) {
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm text-center">
      <div className="text-gray-500 text-xs uppercase">{label}</div>
      <div className="text-xl font-semibold mt-1">{value}</div>
      {sub && <div className="text-gray-500 text-xs mt-1">{sub}</div>}
    </div>
  );
}
