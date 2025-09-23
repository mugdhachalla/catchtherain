import { Navbar } from "../components/Navbar";
import KPI from "../components/KPI";
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
              RWH Dashboard
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl">
              Overview of rainwater harvesting potential and implementation across
              India. Track progress and identify opportunities for water conservation.
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
