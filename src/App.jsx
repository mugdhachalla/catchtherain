import { Routes, Route, Navigate, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Results from "./pages/Results.jsx";
import AssessForm from "./pages/AssessForm.jsx"; 
import Dashboard from "./pages/Dashboard.jsx";
import Guidelines from "./pages/Guidelines.jsx";


export default function App() {
  return (
    <div className="min-h-screen w-full">
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
