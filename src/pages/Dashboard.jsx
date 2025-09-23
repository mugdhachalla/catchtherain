import {Navbar} from "../components/Navbar"
import KPI from "../components/KPI"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card"
import {
  Droplets,
  TrendingUp,
  Users,
  Building,
  MapPin,
  Award,
  Leaf,
  BarChart3
} from "lucide-react"
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
} from "recharts"

const Dashboard = () => {
  // Sample data for demonstration
  const cityData = [
    { city: "Mumbai", potential: 2200000, implemented: 45 },
    { city: "Chennai", potential: 1276000, implemented: 38 },
    { city: "Bengaluru", potential: 924000, implemented: 42 },
    { city: "Kolkata", potential: 1582000, implemented: 35 },
    { city: "Hyderabad", potential: 800000, implemented: 40 }
  ]

  const roofTypeData = [
    { name: "RCC", value: 65, color: "hsl(var(--primary))" },
    { name: "Metal", value: 25, color: "hsl(var(--secondary))" },
    { name: "Other", value: 10, color: "hsl(var(--accent))" }
  ]

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-card-border rounded-lg p-3 shadow-medium">
          <p className="text-card-foreground font-medium">{`${label}`}</p>
          <p className="text-primary">
            {`Potential: ${(payload[0].value / 1000000).toFixed(1)}M L`}
          </p>
          <p className="text-secondary">
            {`Implemented: ${payload[1].value}%`}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              RWH Dashboard
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Overview of rainwater harvesting potential and implementation
              across India. Track progress and identify opportunities for water
              conservation.
            </p>
          </div>

          {/* Overview KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <KPI
              label="Total Cities Covered"
              value={25}
              unit="Cities"
              icon={MapPin}
              color="primary"
            />

            <KPI
              label="Assessments Completed"
              value={12500}
              unit="Reports"
              icon={BarChart3}
              color="secondary"
            />

            <KPI
              label="Implementation Rate"
              value={38}
              unit="%"
              icon={TrendingUp}
              color="accent"
            />

            <KPI
              label="Environmental Impact"
              value={4.5}
              unit="★ Rating"
              icon={Award}
              color="success"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* City Potential Chart */}
            <Card className="bg-gradient-card border-card-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-card-foreground">
                  <Building className="h-6 w-6 text-primary" />
                  <span>City-wise RWH Potential</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={cityData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="hsl(var(--border))"
                      />
                      <XAxis
                        dataKey="city"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <YAxis
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickFormatter={value =>
                          `${(value / 1000000).toFixed(1)}M`
                        }
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar
                        dataKey="potential"
                        fill="hsl(var(--primary))"
                        radius={[4, 4, 0, 0]}
                        name="Potential (L)"
                      />
                      <Bar
                        dataKey="implemented"
                        fill="hsl(var(--secondary))"
                        radius={[4, 4, 0, 0]}
                        name="Implemented (%)"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Roof Type Distribution */}
            <Card className="bg-gradient-card border-card-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-card-foreground">
                  <Droplets className="h-6 w-6 text-secondary" />
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
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {roofTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  {roofTypeData.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span>{item.name}</span>
                      </div>
                      <span className="font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Impact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gradient-primary text-primary-foreground">
              <CardContent className="p-6 text-center">
                <Droplets className="h-12 w-12 mx-auto mb-4 opacity-90" />
                <h3 className="text-2xl font-bold mb-2">2.5 Billion L</h3>
                <p className="opacity-90">Total Water Harvested</p>
                <p className="text-sm opacity-75 mt-2">
                  Across all implemented projects
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-secondary text-secondary-foreground">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-90" />
                <h3 className="text-2xl font-bold mb-2">50,000+</h3>
                <p className="opacity-90">Families Benefited</p>
                <p className="text-sm opacity-75 mt-2">
                  Direct impact on households
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-success/20 text-card-foreground">
              <CardContent className="p-6 text-center">
                <Leaf className="h-12 w-12 mx-auto mb-4 text-success" />
                <h3 className="text-2xl font-bold mb-2 text-success">
                  ₹125 Crore
                </h3>
                <p className="text-success">Cost Savings</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Annual water bill reductions
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Footer Note */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              Data updated as of {new Date().toLocaleDateString("en-IN")} •
              Supporting India's water security mission
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
