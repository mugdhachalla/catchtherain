import { Routes, Route, Navigate, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Results from "./pages/Results.jsx";
import AssessForm from "./pages/AssessForm.jsx"; 
import Dashboard from "./pages/Dashboard.jsx";
import Guidelines from "./pages/Guidelines.jsx";


export default function App() {
  return (
    <div className="min-h-screen w-full">
      <nav className="flex gap-4 mb-6">
        <Link to="/" className="text-indigo-600">Home</Link>
        <Link to="/assess" className="text-indigo-600">RWH Calculator</Link>
        <Link to="/dashboard" className="text-indigo-600">Dashboard</Link>
        <Link to="/guidelines" className="text-indigo-600">Guidelines</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assess" element={<AssessForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/guidelines" element={<Guidelines />} />
        <Route path="/results" element={<Results />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
