import { Routes, Route, Navigate, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Results from "./pages/Results.jsx";
import AssessForm from "./pages/AssessForm.jsx"; 

export default function App() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <nav className="flex gap-4 mb-6">
        <Link to="/" className="text-indigo-600">Home</Link>
        <Link to="/assess" className="text-indigo-600">Assessment</Link>
        <Link to="/results" className="text-indigo-600">Results</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assess" element={<AssessForm />} />
        <Route path="/results" element={<Results />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
