import Navbar from "../components/Navbar"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card"
import {
  CheckCircle,
  AlertTriangle,
  Info,
  Wrench,
  Building,
  Droplets,
  FileText,
  Shield
} from "lucide-react"

const Guidelines = () => {
  const guidelines = [
    {
      title: "Site Assessment",
      icon: Building,
      color: "text-primary",
      items: [
        "Measure roof area accurately including all catchment surfaces",
        "Check roof condition and material (RCC provides best efficiency)",
        "Assess soil percolation rate through simple pit tests",
        "Identify space availability for different structure types",
        "Consider groundwater level and local geology"
      ]
    },
    {
      title: "System Design",
      icon: Wrench,
      color: "text-secondary",
      items: [
        "Install first flush diverters to improve water quality",
        "Use appropriate filters for different end uses",
        "Ensure proper slope for water flow (minimum 1:100)",
        "Size storage/recharge structures based on roof area",
        "Plan overflow provisions for excess water"
      ]
    },
    {
      title: "Legal & Permits",
      icon: FileText,
      color: "text-accent",
      items: [
        "Check local building codes and RWH mandates",
        "Obtain necessary permits from municipal authorities",
        "Comply with state-specific RWH regulations",
        "Consider groundwater board clearances if needed",
        "Maintain documentation for statutory compliance"
      ]
    },
    {
      title: "Safety & Quality",
      icon: Shield,
      color: "text-success",
      items: [
        "Test water quality before consumption use",
        "Ensure proper ventilation in closed systems",
        "Use food-grade materials for potable water",
        "Install mosquito-proof covers on all openings",
        "Maintain adequate structural safety margins"
      ]
    }
  ]

  const structures = [
    {
      name: "Recharge Pit",
      suitability: "Open space available, normal soil",
      size: "2m x 2m x 3m (typical)",
      cost: "₹15,000 - ₹25,000",
      maintenance: "Clean quarterly, check clogging"
    },
    {
      name: "Recharge Trench",
      suitability: "Linear space >5m, moderate percolation",
      size: "Length varies x 0.5m x 1m",
      cost: "₹200 - ₹300 per meter",
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
      cost: "₹100 - ₹150 per 1000L",
      maintenance: "Monthly cleaning, pump servicing"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              RWH Implementation Guidelines
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive guidelines for planning, implementing, and
              maintaining rainwater harvesting systems in Indian conditions.
            </p>
          </div>

          {/* Key Guidelines */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {guidelines.map((guideline, index) => {
              const Icon = guideline.icon
              return (
                <Card
                  key={index}
                  className="bg-gradient-card border-card-border hover:shadow-medium transition-smooth"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className={`p-2 bg-gradient-primary rounded-xl`}>
                        <Icon className={`h-6 w-6 text-primary-foreground`} />
                      </div>
                      <span className="text-card-foreground">
                        {guideline.title}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {guideline.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex items-start space-x-3"
                        >
                          <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Structure Types */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              RWH Structure Types & Specifications
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {structures.map((structure, index) => (
                <Card
                  key={index}
                  className="bg-gradient-card border-card-border"
                >
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-card-foreground mb-4 flex items-center space-x-2">
                      <Droplets className="h-5 w-5 text-primary" />
                      <span>{structure.name}</span>
                    </h3>

                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">
                          Suitability:
                        </span>
                        <p className="text-card-foreground">
                          {structure.suitability}
                        </p>
                      </div>

                      <div>
                        <span className="text-sm font-medium text-muted-foreground">
                          Typical Size:
                        </span>
                        <p className="text-card-foreground">{structure.size}</p>
                      </div>

                      <div>
                        <span className="text-sm font-medium text-muted-foreground">
                          Cost Range:
                        </span>
                        <p className="text-card-foreground font-semibold text-success">
                          {structure.cost}
                        </p>
                      </div>

                      <div>
                        <span className="text-sm font-medium text-muted-foreground">
                          Maintenance:
                        </span>
                        <p className="text-card-foreground">
                          {structure.maintenance}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Best Practices */}
          <Card className="bg-gradient-secondary text-secondary-foreground mb-16">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-2xl">
                <Info className="h-6 w-6" />
                <span>Best Practices for Success</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Design Phase</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Consider local rainfall patterns and intensity</li>
                    <li>• Plan for maintenance access in all structures</li>
                    <li>• Use locally available materials where possible</li>
                    <li>• Design for 20-year lifecycle minimum</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Implementation</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Hire certified contractors with RWH experience</li>
                    <li>• Supervise excavation and structural work closely</li>
                    <li>• Test all components before system commissioning</li>
                    <li>• Document the system for future reference</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Operation</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Clean roof and gutters before monsoon</li>
                    <li>• Monitor water quality periodically</li>
                    <li>• Keep maintenance logs and schedules</li>
                    <li>• Train users on system operation</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Maintenance</h4>
                  <ul className="space-y-2 text-sm">
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
          <Card className="bg-warning/10 border-warning/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-warning">
                <AlertTriangle className="h-6 w-6" />
                <span>Common Issues & Solutions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold text-card-foreground mb-2">
                    Clogging Issues
                  </h4>
                  <p className="text-muted-foreground mb-2">
                    Prevention: Install proper filtration systems and maintain
                    them regularly.
                  </p>
                  <p className="text-muted-foreground">
                    Solution: Use high-pressure water jets or manual cleaning.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-card-foreground mb-2">
                    Poor Water Quality
                  </h4>
                  <p className="text-muted-foreground mb-2">
                    Prevention: First flush diverters and multi-stage
                    filtration.
                  </p>
                  <p className="text-muted-foreground">
                    Solution: Install UV purification or chlorination systems.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-card-foreground mb-2">
                    Structural Damage
                  </h4>
                  <p className="text-muted-foreground mb-2">
                    Prevention: Proper foundation design and quality materials.
                  </p>
                  <p className="text-muted-foreground">
                    Solution: Immediate repair by qualified professionals.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-card-foreground mb-2">
                    Mosquito Breeding
                  </h4>
                  <p className="text-muted-foreground mb-2">
                    Prevention: Ensure all openings have fine mesh covers.
                  </p>
                  <p className="text-muted-foreground">
                    Solution: Regular cleaning and biological mosquito control.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground text-sm">
              For technical support and detailed engineering design, consult
              certified water management professionals. These guidelines are for
              general reference and may need adaptation for specific site
              conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Guidelines
