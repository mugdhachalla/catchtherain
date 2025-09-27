import { Navbar } from "../components/Navbar";
import KPI from "../components/KPI";
import ImpactMap from "../components/ImpactMap";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import {
  Droplets,
  TrendingUp,
  Users,
  Building,
  MapPin,
  Award,
  Leaf,
  BarChart3
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

const Dashboard = () => {
  // --- Colors (hex) for charts ---
  const PRIMARY = "#2563eb";   // blue-600
  const SECONDARY = "#10b981"; // emerald-500
  const BORDER = "#e5e7eb";    // slate-200
  const AXIS = "#94a3b8";      // slate-400

  const PIE_COLORS = ["#3b82f6", "#10b981", "#f59e0b"]; // blue-500, emerald-500, amber-500

  // Sample data for demonstration
  const cityData = [
    { city: "Mumbai", potential: 2200000, implemented: 45 },
    { city: "Chennai", potential: 1276000, implemented: 38 },
    { city: "Bengaluru", potential: 924000, implemented: 42 },
    { city: "Kolkata", potential: 1582000, implemented: 35 },
    { city: "Hyderabad", potential: 800000, implemented: 40 }
  ];
  const points = [
  { city: "Delhi", lat: 28.7041, lon: 77.1025, annualLiters: 3500000, implementedPct: 42 },
  { city: "Mumbai", lat: 19.0760, lon: 72.8777, annualLiters: 2200000, implementedPct: 45 },
  { city: "Kolkata", lat: 22.5726, lon: 88.3639, annualLiters: 1800000, implementedPct: 36 },
  { city: "Chennai", lat: 13.0827, lon: 80.2707, annualLiters: 1276000, implementedPct: 38 },
  { city: "Bengaluru", lat: 12.9716, lon: 77.5946, annualLiters: 950000, implementedPct: 40 },
  { city: "Hyderabad", lat: 17.3850, lon: 78.4867, annualLiters: 800000, implementedPct: 39 },
  { city: "Ahmedabad", lat: 23.0225, lon: 72.5714, annualLiters: 600000, implementedPct: 34 },
  { city: "Pune", lat: 18.5204, lon: 73.8567, annualLiters: 720000, implementedPct: 37 },
  { city: "Jaipur", lat: 26.9124, lon: 75.7873, annualLiters: 540000, implementedPct: 31 },
  { city: "Lucknow", lat: 26.8467, lon: 80.9462, annualLiters: 480000, implementedPct: 28 },
  { city: "Kanpur", lat: 26.4499, lon: 80.3319, annualLiters: 460000, implementedPct: 29 },
  { city: "Nagpur", lat: 21.1458, lon: 79.0882, annualLiters: 500000, implementedPct: 30 },
  { city: "Indore", lat: 22.7196, lon: 75.8577, annualLiters: 420000, implementedPct: 27 },
  { city: "Bhopal", lat: 23.2599, lon: 77.4126, annualLiters: 400000, implementedPct: 26 },
  { city: "Visakhapatnam", lat: 17.6868, lon: 83.2185, annualLiters: 620000, implementedPct: 35 },
  { city: "Surat", lat: 21.1702, lon: 72.8311, annualLiters: 700000, implementedPct: 33 },
  { city: "Vadodara", lat: 22.3072, lon: 73.1812, annualLiters: 360000, implementedPct: 24 },
  { city: "Rajkot", lat: 22.3039, lon: 70.8022, annualLiters: 340000, implementedPct: 23 },
  { city: "Patna", lat: 25.5941, lon: 85.1376, annualLiters: 380000, implementedPct: 25 },
  { city: "Ranchi", lat: 23.3441, lon: 85.3096, annualLiters: 330000, implementedPct: 22 },
  { city: "Guwahati", lat: 26.1445, lon: 91.7362, annualLiters: 410000, implementedPct: 27 },
  { city: "Agra", lat: 27.1767, lon: 78.0081, annualLiters: 350000, implementedPct: 24 },
  { city: "Varanasi", lat: 25.3176, lon: 82.9739, annualLiters: 370000, implementedPct: 26 },
  { city: "Amritsar", lat: 31.6340, lon: 74.8723, annualLiters: 300000, implementedPct: 21 },
  { city: "Chandigarh", lat: 30.7333, lon: 76.7794, annualLiters: 280000, implementedPct: 23 },
  { city: "Ludhiana", lat: 30.9000, lon: 75.8573, annualLiters: 290000, implementedPct: 22 },
  { city: "Jalandhar", lat: 31.3260, lon: 75.5762, annualLiters: 260000, implementedPct: 20 },
  { city: "Dehradun", lat: 30.3165, lon: 78.0322, annualLiters: 310000, implementedPct: 25 },
  { city: "Shimla", lat: 31.1048, lon: 77.1734, annualLiters: 200000, implementedPct: 19 },
  { city: "Srinagar", lat: 34.0837, lon: 74.7973, annualLiters: 220000, implementedPct: 18 },
  { city: "Leh", lat: 34.1526, lon: 77.5770, annualLiters: 150000, implementedPct: 15 },
  { city: "Gangtok", lat: 27.3389, lon: 88.6065, annualLiters: 180000, implementedPct: 16 },
  { city: "Shillong", lat: 25.5788, lon: 91.8933, annualLiters: 240000, implementedPct: 20 },
  { city: "Imphal", lat: 24.8170, lon: 93.9368, annualLiters: 230000, implementedPct: 19 },
  { city: "Kohima", lat: 25.6751, lon: 94.1086, annualLiters: 210000, implementedPct: 17 },
  { city: "Aizawl", lat: 23.7271, lon: 92.7176, annualLiters: 200000, implementedPct: 18 },
  { city: "Itanagar", lat: 27.0844, lon: 93.6053, annualLiters: 190000, implementedPct: 16 },
  { city: "Port Blair", lat: 11.6234, lon: 92.7265, annualLiters: 250000, implementedPct: 20 },
  { city: "Thiruvananthapuram", lat: 8.5241, lon: 76.9366, annualLiters: 400000, implementedPct: 28 },
  { city: "Kochi", lat: 9.9312, lon: 76.2673, annualLiters: 380000, implementedPct: 27 },
  { city: "Kozhikode", lat: 11.2588, lon: 75.7804, annualLiters: 360000, implementedPct: 26 },
  { city: "Madurai", lat: 9.9252, lon: 78.1198, annualLiters: 340000, implementedPct: 25 },
  { city: "Tiruchirappalli", lat: 10.7905, lon: 78.7047, annualLiters: 330000, implementedPct: 24 },
  { city: "Coimbatore", lat: 11.0168, lon: 76.9558, annualLiters: 370000, implementedPct: 27 },
  { city: "Mysuru", lat: 12.2958, lon: 76.6394, annualLiters: 310000, implementedPct: 23 },
  { city: "Mangaluru", lat: 12.9141, lon: 74.8560, annualLiters: 320000, implementedPct: 24 },
  { city: "Aurangabad", lat: 19.8762, lon: 75.3433, annualLiters: 300000, implementedPct: 22 },
  { city: "Nashik", lat: 19.9975, lon: 73.7898, annualLiters: 310000, implementedPct: 23 },
  { city: "Gwalior", lat: 26.2183, lon: 78.1828, annualLiters: 280000, implementedPct: 21 }
];

  const roofTypeData = [
    { name: "RCC", value: 65, color: PIE_COLORS[0] },
    { name: "Metal", value: 25, color: PIE_COLORS[1] },
    { name: "Other", value: 10, color: PIE_COLORS[2] }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
          <p className="text-slate-900 font-medium">{label}</p>
          <p className="text-blue-600">
            Potential: {(payload[0].value / 1_000_000).toFixed(1)}M L
          </p>
          <p className="text-emerald-600">Implemented: {payload[1].value}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Rainwater Harvesting Potential Dashboard
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl">
              Overview of rainwater harvesting potential and implementation across
              India. Track progress and identify opportunities for water conservation.
            </p>
            <br/>
            <p className="text-sm text-slate-600 max-w-3xl">
              *All values shown are placeholders and not reflective of live information.
            </p>
          </div>

          {/* Overview KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <KPI
              label="Total Cities Covered"
              value={25}
              unit="Cities"
              icon={MapPin}
              color="blue"
            />

            <KPI
              label="Assessments Completed"
              value={12500}
              unit="Reports"
              icon={BarChart3}
              color="emerald"
            />

            <KPI
              label="Implementation Rate"
              value={38}
              unit="%"
              icon={TrendingUp}
              color="amber"
            />

            <KPI
              label="Environmental Impact"
              value={4.5}
              unit="★ Rating"
              icon={Award}
              color="violet"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* City Potential Chart */}
            <Card className="bg-white border border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-900">
                  <Building className="h-6 w-6 text-blue-600" />
                  <span>City-wise RWH Potential</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={cityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={BORDER} />
                      <XAxis dataKey="city" stroke={AXIS} fontSize={12} />
                      <YAxis
                        stroke={AXIS}
                        fontSize={12}
                        tickFormatter={(v) => `${(v / 1_000_000).toFixed(1)}M`}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar
                        dataKey="potential"
                        fill={PRIMARY}
                        radius={[4, 4, 0, 0]}
                        name="Potential (L)"
                      />
                      <Bar
                        dataKey="implemented"
                        fill={SECONDARY}
                        radius={[4, 4, 0, 0]}
                        name="Implemented (%)"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Roof Type Distribution */}
            <Card className="bg-white border border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-900">
                  <Droplets className="h-6 w-6 text-emerald-600" />
                  <span>Roof Type Distribution</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={roofTypeData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {roofTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          background: "#ffffff",
                          border: `1px solid ${BORDER}`,
                          borderRadius: "0.5rem"
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  {roofTypeData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-slate-700">{item.name}</span>
                      </div>
                      <span className="font-medium text-slate-900">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <h2 className="text-2xl font-bold mt-2 mb-4">City-Wise Impact Map</h2>
          <ImpactMap points={points}  height="28rem" />
          <br/>

          {/* Impact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="pt-4 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
              <CardContent className="p-6 text-center">
                <Droplets className="h-12 w-12 mx-auto mb-4 opacity-90" />
                <h3 className="text-2xl font-bold mb-2">2.5 Billion L</h3>
                <p className="opacity-90">Total Water Harvested</p>
                <p className="text-sm opacity-75 mt-2">
                  Across all implemented projects
                </p>
              </CardContent>
            </Card>

            <Card className="pt-4 bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-90" />
                <h3 className="text-2xl font-bold mb-2">50,000+</h3>
                <p className="opacity-90">Families Benefited</p>
                <p className="text-sm opacity-75 mt-2">
                  Direct impact on households
                </p>
              </CardContent>
            </Card>

            <Card className="pt-4 bg-white border border-slate-200 text-slate-900">
              <CardContent className="p-6 text-center">
                <Leaf className="h-12 w-12 mx-auto mb-4 text-emerald-600" />
                <h3 className="text-2xl font-bold mb-2 text-emerald-700">
                  ₹125 Crore
                </h3>
                <p className="text-emerald-700">Cost Savings</p>
                <p className="text-sm text-slate-600 mt-2">
                  Annual water bill reductions
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Footer Note */}
          <div className="mt-12 text-center">
            <p className="text-slate-500">
              Data updated as of {new Date().toLocaleDateString("en-IN")} • Supporting India&apos;s water security mission
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
