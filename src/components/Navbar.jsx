// src/components/Navbar.jsx
import { Link, useLocation } from "react-router-dom";
import { Droplets, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/Button"; // or adjust path

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/assess", label: "RWH Calculator" },
    { path: "/dashboard", label: "Dashboard" },   
    { path: "/guidelines", label: "Guidelines" },
  ];

  const linkClass = (path) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition
     ${pathname === path ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"}`;

  return (
    <nav className="fixed top-0 w-full z-50 bg-sky-50 backdrop-blur border-sky-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* bar */}
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-blue-600 text-white shadow">
              <Droplets className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <span className="block text-base font-bold text-gray-900">
                Catch the Rain
              </span>
              <span className="block text-xs text-gray-500 -mt-0.5">
                Water Harvesting
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map(({ path, label }) => (
              <Link key={path} to={path} className={linkClass(path)}>
                {label}
              </Link>
            ))}
            <Link to="/assess">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden">
            <button
              aria-label="Toggle menu"
              onClick={() => setIsOpen((v) => !v)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-2 pt-2 pb-3">
              {navItems.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-base font-medium ${pathname === path ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:bg-gray-100"}`}
                >
                  {label}
                </Link>
              ))}
              <div className="pt-2">
                <Link to="/assess" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
export default Navbar;
