import Navbar from "../components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import {
  CheckCircle,
  AlertTriangle,
  Info,
  Wrench,
  Building,
  Droplets,
  FileText,
  Shield
} from "lucide-react";

const Guidelines = () => {
  const guidelines = [
    {
      title: "Site Assessment",
      icon: Building,
      items: [
        "Measure roof area accurately including all catchment surfaces",
        "Check roof condition and material (RCC provides best efficiency)",
        "Assess soil percolation rate through simple pit tests",
        "Identify space availability for different structure types",
        "Consider groundwater level and local geology"
      ],
      // icon color
      colorClass: "text-blue-600",
      badgeBgClass: "bg-blue-100"
    },
    {
      title: "System Design",
      icon: Wrench,
      items: [
        "Install first flush diverters to improve water quality",
        "Use appropriate filters for different end uses",
        "Ensure proper slope for water flow (minimum 1:100)",
        "Size storage/recharge structures based on roof area",
        "Plan overflow provisions for excess water"
      ],
      colorClass: "text-emerald-600",
      badgeBgClass: "bg-emerald-100"
    },
    {
      title: "Legal & Permits",
      icon: FileText,
      items: [
        "Check local building codes and RWH mandates",
        "Obtain necessary permits from municipal authorities",
        "Comply with state-specific RWH regulations",
        "Consider groundwater board clearances if needed",
        "Maintain documentation for statutory compliance"
      ],
      colorClass: "text-amber-600",
      badgeBgClass: "bg-amber-100"
    },
    {
      title: "Safety & Quality",
      icon: Shield,
      items: [
        "Test water quality before consumption use",
        "Ensure proper ventilation in closed systems",
        "Use food-grade materials for potable water",
        "Install mosquito-proof covers on all openings",
        "Maintain adequate structural safety margins"
      ],
      colorClass: "text-violet-600",
      badgeBgClass: "bg-violet-100"
    }
  ];

  const structures = [
    {
      name: "Recharge Pit",
      suitability: "Open space available, normal soil",
      size: "2m x 2m x 3m (typical)",
      cost: "₹2500-₹5000",
      maintenance: "Clean quarterly, check clogging"
    },
    {
      name: "Recharge Trench",
      suitability: "Linear space >5m, moderate percolation",
      size: "Length varies x 0.5m x 1m",
      cost: "₹5000 - ₹10000",
      maintenance: "Annual cleaning, filter replacement"
    },
    {
      name: "Recharge Shaft",
      suitability: "Limited space, good soil percolation",
      size: "1m diameter x 3m depth",
      cost: "₹8,000 - ₹15,000",
      maintenance: "Bi-annual inspection"
    },
    {
      name: "Storage Tank",
      suitability: "Direct use, space constrained",
      size: "Based on daily consumption",
      cost: "Expensive (Material: Plastic)",
      maintenance: "Monthly cleaning, pump servicing"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              RWH Implementation Guidelines
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive guidelines for planning, implementing, and
              maintaining rainwater harvesting systems in Indian conditions.
            </p>
          </div>

          {/* Key Guidelines */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {guidelines.map((g, i) => {
              const Icon = g.icon;
              return (
                <Card
                  key={i}
                  className="bg-white border border-slate-200 hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${g.badgeBgClass}`}>
                        <Icon className={`h-6 w-6 ${g.colorClass}`} />
                      </div>
                      <span className="text-slate-900">{g.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {g.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Structure Types */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              RWH Structure Types & Specifications
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {structures.map((structure, index) => (
                <Card key={index} className="pt-6 bg-white border border-slate-200">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <Droplets className="h-5 w-5 text-blue-600" />
                      <span>{structure.name}</span>
                    </h3>

                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-slate-500">
                          Suitability:
                        </span>
                        <p className="text-slate-800">{structure.suitability}</p>
                      </div>

                      <div>
                        <span className="text-sm font-medium text-slate-500">
                          Typical Size:
                        </span>
                        <p className="text-slate-800">{structure.size}</p>
                      </div>

                      <div>
                        <span className="text-sm font-medium text-slate-500">
                          Cost Range:
                        </span>
                        <p className="text-emerald-700 font-semibold">
                          {structure.cost}
                        </p>
                      </div>

                      <div>
                        <span className="text-sm font-medium text-slate-500">
                          Maintenance:
                        </span>
                        <p className="text-slate-800">
                          {structure.maintenance}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          {/*Information */}
          
          <div className=" py-10 px-6">
            <h1 className="text-3xl font-bold mb-6 text-slate-900">Glossary</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="pt-4 bg-white border border-slate-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <span>Artificial Recharge</span>
                  </h3>
                  <p className="text-slate-800">
                    Human-made methods of increasing the amount of water that enters underground aquifers (e.g., through recharge pits, trenches, or shafts).
                  </p>
                </CardContent>
              </Card>

              <Card className="pt-4 bg-white border border-slate-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <span>Central Ground Water Board (CGWB)</span>
                  </h3>
                  <p className="text-slate-800">
                    A Government of India organization under the Ministry of Jal Shakti responsible for the management, assessment, and regulation of groundwater resources.
                  </p>
                </CardContent>
              </Card>

              <Card className="pt-4 bg-white border border-slate-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <span>Recharge Pit</span>
                  </h3>
                  <p className="text-slate-800">
                    A small dug-out pit filled with stones/gravel that allows rainwater to percolate into the ground.
                  </p>
                </CardContent>
              </Card>

              <Card className="pt-4 bg-white border border-slate-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <span>Recharge Trench</span>
                  </h3>
                  <p className="text-slate-800">
                    A shallow, linear excavation (like a channel) used to collect and infiltrate rainwater into the soil.
                  </p>
                </CardContent>
              </Card>
              <Card className="pt-4 bg-white border border-slate-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <span>Roof Type</span>
                  </h3>
                  <p className="text-slate-800">
                    The material and slope of a roof affect how much rainwater can be collected. 
                    RCC (concrete) and metal roofs have higher efficiency (80–90%), while tile or 
                    thatched roofs may lose more water due to absorption and evaporation.
                  </p>
                </CardContent>
              </Card>
              <Card className="pt-6 pb-4 bg-white border border-slate-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <span>Aquifer</span>
                  </h3>

                  <div className="space-y-3">
                    <p className="text-slate-800 text-wrap">
                      An underground layer of rock, sand, or gravel that stores and transmits
                      water. Aquifers act like natural reservoirs, supplying groundwater for
                      wells, borewells, irrigation, and drinking water.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>



          {/* Best Practices */}
          <Card className="bg-gradient-to-br from-sky-500 to-blue-600 text-white mb-16">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Info className="h-6 w-6" />
                <span>Best Practices for Success</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Design Phase</h4>
                  <ul className="space-y-2 text-sm text-white/90">
                    <li>• Consider local rainfall patterns and intensity</li>
                    <li>• Plan for maintenance access in all structures</li>
                    <li>• Use locally available materials where possible</li>
                    <li>• Design for 20-year lifecycle minimum</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Implementation</h4>
                  <ul className="space-y-2 text-sm text-white/90">
                    <li>• Hire certified contractors with RWH experience</li>
                    <li>• Supervise excavation and structural work closely</li>
                    <li>• Test all components before system commissioning</li>
                    <li>• Document the system for future reference</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Operation</h4>
                  <ul className="space-y-2 text-sm text-white/90">
                    <li>• Clean roof and gutters before monsoon</li>
                    <li>• Monitor water quality periodically</li>
                    <li>• Keep maintenance logs and schedules</li>
                    <li>• Train users on system operation</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Maintenance</h4>
                  <ul className="space-y-2 text-sm text-white/90">
                    <li>• Schedule regular professional inspections</li>
                    <li>• Replace filters as per manufacturer guidelines</li>
                    <li>• Clear blockages immediately after detection</li>
                    <li>• Maintain spare parts inventory</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Common Issues */}
          <Card className="bg-amber-50 border border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-700">
                <AlertTriangle className="h-6 w-6" />
                <span>Common Issues & Solutions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">
                    Clogging Issues
                  </h4>
                  <p className="text-slate-600 mb-2">
                    Prevention: Install proper filtration systems and maintain
                    them regularly.
                  </p>
                  <p className="text-slate-600">
                    Solution: Use high-pressure water jets or manual cleaning.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">
                    Poor Water Quality
                  </h4>
                  <p className="text-slate-600 mb-2">
                    Prevention: First flush diverters and multi-stage filtration.
                  </p>
                  <p className="text-slate-600">
                    Solution: Install UV purification or chlorination systems.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">
                    Structural Damage
                  </h4>
                  <p className="text-slate-600 mb-2">
                    Prevention: Proper foundation design and quality materials.
                  </p>
                  <p className="text-slate-600">
                    Solution: Immediate repair by qualified professionals.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">
                    Mosquito Breeding
                  </h4>
                  <p className="text-slate-600 mb-2">
                    Prevention: Ensure all openings have fine mesh covers.
                  </p>
                  <p className="text-slate-600">
                    Solution: Regular cleaning and biological mosquito control.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-12">
            <p className="text-slate-500 text-sm">
              For technical support and detailed engineering design, consult
              certified water management professionals. These guidelines are for
              general reference and may need adaptation for specific site
              conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guidelines;
