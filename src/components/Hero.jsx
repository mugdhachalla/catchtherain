import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { ArrowRight, Droplets, Leaf, Calculator } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen px-6 py-16 flex flex-wrap items-center justify-center bg-gradient-to-r from-sky-200 to-sky-600 overflow-hidden">
      {/* Overlay with real colors + transparency */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/90" />
      <div className="absolute top-20 left-10 opacity-20">
        <Droplets className="h-32 w-32 text-blue-700" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-20">
        <Leaf className="h-24 w-24 text-green-600" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-cyan-950 mb-6 leading-tight drop-shadow">
          Catch the Rain
          <br />
          <span className="text-4xl md:text-5xl font-medium text-cyan-950">
            Where it falls, When it falls
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-black/90 mb-8 max-w-3xl mx-auto leading-relaxed">
          Calculate your rainwater harvesting potential and contribute to water conservation.
          Every drop counts towards a sustainable future.
        </p>

        <div className="flex flex-wrap justify-center gap-8 mb-12 text-white">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold">45%</div>
            <div className="text-cyan-950">Water Bill Savings</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold">4000 BCM</div>
            <div className="text-cyan-950">Annual Rainfall</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold">50K Litres</div>
            <div className="text-cyan-950 text-wrap">RWH potential</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/assess">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow">
              <Calculator className="mr-2 h-5 w-5" />
              Calculate Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>

          <Link to="/guidelines">
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow"
          >
            <Droplets className="mr-2 h-5 w-5" />
            Learn More
          </Button>
          </Link>
        </div>

        <div className="mt-16 pt-8 border-t border-white/20 text-white/80">
          <p className="text-sm mb-4 text-wrap">The figures for rainfall, rooftop rainwater harvesting, and water bill savings are approximate. A 100 sq. meter roof can harvest about 45,000–55,000 liters annually, meeting 40–60% of a family of four’s water needs, with reported bill reductions of 30–60%. Actual results may vary depending on local conditions and system design.</p>
          {/*<div className="flex justify-center items-center gap-8">
            <span className="font-semibold">Ministry of Water Resources</span>
            <span className="w-px h-4 bg-white/30" />
            <span className="font-semibold">CGWB</span>
            <span className="w-px h-4 bg-white/30" />
            <span className="font-semibold">State Water Boards</span>
          </div>*/}
        </div>
      </div>
    </section>
  );
}
