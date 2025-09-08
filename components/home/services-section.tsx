import { Card, CardContent } from "@/components/ui/card"
import { Wifi, Car, Coffee, Waves, Utensils, Dumbbell } from "lucide-react"

const services = [
  {
    icon: Wifi,
    title: "Free WiFi",
    description: "High-speed internet throughout the property",
  },
  {
    icon: Car,
    title: "Valet Parking",
    description: "Complimentary parking with valet service",
  },
  {
    icon: Utensils,
    title: "Fine Dining",
    description: "Award-winning restaurants and room service",
  },
  {
    icon: Waves,
    title: "Spa & Wellness",
    description: "Full-service spa and wellness center",
  },
  {
    icon: Dumbbell,
    title: "Fitness Center",
    description: "24/7 state-of-the-art fitness facilities",
  },
  {
    icon: Coffee,
    title: "Concierge",
    description: "24/7 concierge service for all your needs",
  },
]

export function ServicesSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-balance">Premium Services</h2>
          <p className="text-xl text-muted-foreground text-pretty">Everything you need for a perfect stay</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="text-center hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <service.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-pretty">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
