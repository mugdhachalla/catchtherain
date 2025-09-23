import {Navbar }from '../components/Navbar';
import Features from '../components/Features';
import Hero from '../components/Hero';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { ArrowRight, Droplets, Users, Award } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      
      {/* Impact Section */}
      <section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">
      Join the Water Conservation Movement
    </h2>
    <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-3xl mx-auto">
      Every drop of rainwater harvested contributes to groundwater recharge and reduces
      dependency on external water sources.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <div className="text-center">
        <div className="inline-flex p-4 bg-sky-100 rounded-2xl mb-4">
          <Droplets className="h-12 w-12 text-cyan-950" />
        </div>
        <h3 className="text-2xl font-semibold text-slate-900 mb-2">50 Billion Litres</h3>
        <p className="text-slate-600">Water harvested annually across India</p>
      </div>

      <div className="text-center">
        <div className="inline-flex p-4 bg-sky-100 rounded-2xl mb-4">
          <Users className="h-12 w-12 text-cyan-950" />
        </div>
        <h3 className="text-2xl font-semibold text-slate-900 mb-2">10,000+ Families</h3>
        <p className="text-slate-600">Benefiting from rainwater harvesting</p>
      </div>

      <div className="text-center">
        <div className="inline-flex p-4 bg-sky-100 rounded-2xl mb-4">
          <Award className="h-12 w-12 text-cyan-950" />
        </div>
        <h3 className="text-2xl font-semibold text-slate-900 mb-2">Award Winning</h3>
        <p className="text-slate-600">Recognized by environmental agencies</p>
      </div>
    </div>

    <Link to="/assess">
      <Button className="bg-blue-600 hover:bg-sky-500 text-white px-6 py-3 rounded-lg shadow">
        Start Your Assessment
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </Link>
  </div>
</section>

{/* Footer */}
<footer className="bg-slate-950 text-slate-300 border-t border-slate-800 py-12">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="p-2 bg-blue-600 rounded-xl">
          <Droplets className="h-6 w-6 text-white" />
        </div>
        <span className="text-2xl font-bold text-white">Catch the Rain</span>
      </div>

      <p className="text-slate-400 mb-6">
        Contributing to India&apos;s water security through rainwater harvesting
      </p>
      <div className="text-sm text-slate-500">
        © {new Date().getFullYear()} Catch the Rain. Supporting sustainable water management across India.
      </div>
    </div>
  </div>
</footer>
    </div>
  );
};

export default Home;