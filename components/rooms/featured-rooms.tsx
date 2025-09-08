import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import Link from "next/link"
import { formatINR } from "@/lib/utils"

const featuredRooms = [
  {
    id: 1,
    name: "Deluxe Ocean View",
    price: 299,
    rating: 4.8,
    image: "/luxury-hotel-room-with-ocean-view-and-modern-decor.jpg",
    amenities: ["Ocean View", "Free WiFi", "Room Service", "Balcony"],
    description: "Spacious room with stunning ocean views and premium amenities.",
  },
  {
    id: 2,
    name: "Executive Suite",
    price: 459,
    rating: 4.9,
    image: "/executive-hotel-suite-with-living-area-and-city-vi.jpg",
    amenities: ["City View", "Living Area", "Kitchenette", "Work Desk"],
    description: "Elegant suite perfect for business travelers and extended stays.",
  },
  {
    id: 3,
    name: "Garden Villa",
    price: 389,
    rating: 4.7,
    image: "/private-villa-with-garden-view-and-outdoor-terrace.jpg",
    amenities: ["Private Garden", "Terrace", "Jacuzzi", "BBQ Area"],
    description: "Private villa with beautiful garden views and outdoor amenities.",
  },
]

export function FeaturedRooms() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-balance">Featured Accommodations</h2>
          <p className="text-xl text-muted-foreground text-pretty">Discover our most popular rooms and suites</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRooms.map((room) => (
            <Card key={room.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img src={room.image || "/placeholder.svg"} alt={room.name} className="w-full h-64 object-cover" />
                <Badge className="absolute top-4 left-4 bg-primary">Featured</Badge>
              </div>

              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{room.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{room.rating}</span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 text-pretty">{room.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {room.amenities.slice(0, 3).map((amenity) => (
                    <Badge key={amenity} variant="secondary" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                  {room.amenities.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{room.amenities.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-primary">{formatINR(room.price)}</span>
                    <span className="text-muted-foreground">/night</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <Button className="w-full" asChild>
                  <Link href={`/rooms/${room.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link href="/rooms">View All Rooms</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
