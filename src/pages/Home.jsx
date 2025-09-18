import { Link } from "react-router-dom";
export default function Home(){
  return (
    <div className="py-10">
      <h1 className="text-2xl font-bold mb-2">Rooftop Rainwater Harvesting</h1>
      <p className="text-gray-600">Estimate feasibility, structure type, size, cost & payback in minutes.</p>
      <Link
        to="/assess"
        className="inline-block mt-6 bg-indigo-600 text-white px-4 py-2 rounded"
      >Start assessment</Link>
    </div>
  );
}
