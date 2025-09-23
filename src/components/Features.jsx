import { Calculator, MapPin, IndianRupee, BookOpen } from "lucide-react"
import { Card, CardContent } from "../components/ui/Card"
import { Link } from "react-router-dom"

const Features = () => {
  const features = [
    {
      icon: Calculator,
      title: "Accurate Calculations",
      description:
        "Get precise rainwater harvesting potential based on your location, roof area, and local rainfall data for over 25 major Indian cities.",
      color: "text-primary"
    },
    {
      icon: MapPin,
      title: "Location-Based Data",
      description:
        "Automatic city detection using geolocation with comprehensive rainfall data covering different climatic zones across India.",
      color: "text-secondary"
    },
    {
      icon: IndianRupee,
      title: "Cost Analysis",
      description:
        "Detailed cost estimates and payback calculations to help you make informed decisions about your rainwater harvesting investment.",
      color: "text-accent"
    },
    {
      icon: BookOpen,
      title: "Expert Guidelines",
      description:
        "Access comprehensive guidelines and best practices for implementing rainwater harvesting systems in different soil and space conditions.",
      color: "text-primary"
    }
  ]

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to get Started?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Make informed decisions about rainwater harvesting with our
            comprehensive analysis tool designed specifically for Indian
            conditions.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="group hover:shadow-medium transition-smooth bg-gradient-card border-card-border hover:border-primary/20"
              >
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <div
                      className={`inline-flex p-4 rounded-2xl bg-gradient-primary shadow-soft group-hover:shadow-glow transition-smooth`}
                    >
                      <Icon className={`h-8 w-8 text-primary-foreground`} />
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-card-foreground mb-4 group-hover:text-primary transition-smooth">
                    {feature.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center text-white mt-16">
          <div>
            <Link
              to="/assess"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md inline-flex items-center space-x-2 text-white font-medium transition-colors"
            >
              <span>Ready to start conserving water?</span>
              <Calculator className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
