import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import Link from "next/link"
import { formatINR } from "@/lib/utils"

const similarRooms = [
  {
    id: 2,
    name: "Executive Suite",
    type: "Suite",
    price: 459,
    rating: 4.9,
    image: "/executive-hotel-suite-with-living-area-and-city-vi.jpg",
    description: "Elegant suite perfect for business travelers.",
  },
  {
    id: 3,
    name: "Garden Villa",
    type: "Villa",
    price: 389,
    rating: 4.7,
    image: "/private-villa-with-garden-view-and-outdoor-terrace.jpg",
    description: "Private villa with beautiful garden views.",
  },
  {
    id: 4,
    name: "Standard City Room",
    type: "Standard Room",
    price: 189,
    rating: 4.5,
    image: "/modern-hotel-room-city-view.jpg",
    description: "Comfortable room with city views.",
  },
]

interface SimilarRoomsProps {
  currentRoomId: number
}

export function SimilarRooms({ currentRoomId }: SimilarRoomsProps) {
  const filteredRooms = similarRooms.filter((room) => room.id !== currentRoomId)

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Similar Rooms</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
          <Card key={room.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img src={room.image || "/placeholder.svg"} alt={room.name} className="w-full h-48 object-cover" />
              <Badge className="absolute top-3 left-3 bg-primary">{room.type}</Badge>
              <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                {room.rating}
              </div>
            </div>

            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-2">{room.name}</h3>
              <p className="text-muted-foreground mb-4 text-pretty">{room.description}</p>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xl font-bold text-primary">{formatINR(room.price)}</span>
                  <span className="text-muted-foreground">/night</span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
              <Button className="w-full bg-transparent" variant="outline" asChild>
                <Link href={`/rooms/${room.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
