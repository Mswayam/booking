"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, Users, Bed } from "lucide-react"
import Link from "next/link"
import { formatINR } from "@/lib/utils"

const rooms = [
  {
    id: 1,
    name: "Deluxe Ocean View",
    type: "Deluxe Room",
    price: 299,
    rating: 4.8,
    reviews: 124,
    image: "/luxury-hotel-room-with-ocean-view-and-modern-decor.jpg",
    amenities: ["Ocean View", "Free WiFi", "Room Service", "Balcony"],
    description: "Spacious room with stunning ocean views and premium amenities.",
    maxGuests: 2,
    beds: "1 King Bed",
    size: "45 sqm",
  },
  {
    id: 2,
    name: "Executive Suite",
    type: "Suite",
    price: 459,
    rating: 4.9,
    reviews: 89,
    image: "/executive-hotel-suite-with-living-area-and-city-vi.jpg",
    amenities: ["City View", "Living Area", "Kitchenette", "Work Desk"],
    description: "Elegant suite perfect for business travelers and extended stays.",
    maxGuests: 4,
    beds: "1 King Bed + Sofa Bed",
    size: "75 sqm",
  },
  {
    id: 3,
    name: "Garden Villa",
    type: "Villa",
    price: 389,
    rating: 4.7,
    reviews: 156,
    image: "/private-villa-with-garden-view-and-outdoor-terrace.jpg",
    amenities: ["Private Garden", "Terrace", "Jacuzzi", "BBQ Area"],
    description: "Private villa with beautiful garden views and outdoor amenities.",
    maxGuests: 6,
    beds: "2 Queen Beds",
    size: "120 sqm",
  },
  {
    id: 4,
    name: "Standard City Room",
    type: "Standard Room",
    price: 189,
    rating: 4.5,
    reviews: 203,
    image: "/modern-hotel-room-city-view.jpg",
    amenities: ["City View", "Free WiFi", "Work Desk", "Mini Bar"],
    description: "Comfortable room with city views and essential amenities.",
    maxGuests: 2,
    beds: "1 Queen Bed",
    size: "32 sqm",
  },
  {
    id: 5,
    name: "Luxury Penthouse",
    type: "Penthouse",
    price: 799,
    rating: 5.0,
    reviews: 45,
    image: "/luxury-penthouse-suite-panoramic-view.jpg",
    amenities: ["Panoramic View", "Private Terrace", "Butler Service", "Jacuzzi"],
    description: "Ultimate luxury with panoramic views and exclusive services.",
    maxGuests: 8,
    beds: "3 King Beds",
    size: "200 sqm",
  },
  {
    id: 6,
    name: "Cozy Standard Room",
    type: "Standard Room",
    price: 159,
    rating: 4.3,
    reviews: 178,
    image: "/cozy-hotel-room-warm-lighting.jpg",
    amenities: ["Garden View", "Free WiFi", "Coffee Maker", "Safe"],
    description: "Comfortable and affordable room with garden views.",
    maxGuests: 2,
    beds: "2 Twin Beds",
    size: "28 sqm",
  },
]

export function RoomGrid() {
  const [sortBy, setSortBy] = useState("price-low")
  const [displayedRooms, setDisplayedRooms] = useState(rooms)

  const handleSort = (value: string) => {
    setSortBy(value)
    const sorted = [...rooms]

    switch (value) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        sorted.sort((a, b) => b.price - a.price)
        break
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating)
        break
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    setDisplayedRooms(sorted)
  }

  return (
    <div className="space-y-6">
      {/* Sort Controls */}
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">Showing {displayedRooms.length} rooms</p>
        <div className="flex items-center gap-2">
          <span className="text-sm">Sort by:</span>
          <Select value={sortBy} onValueChange={handleSort}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Room Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {displayedRooms.map((room) => (
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
              <div className="mb-2">
                <h3 className="text-lg font-semibold mb-1">{room.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{room.description}</p>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {room.maxGuests} guests
                </div>
                <div className="flex items-center gap-1">
                  <Bed className="h-4 w-4" />
                  {room.beds}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {room.size}
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
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
                <div className="text-sm text-muted-foreground">({room.reviews} reviews)</div>
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
              <Button className="w-full" asChild>
                <Link href={`/rooms/${room.id}`}>View Details & Book</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {displayedRooms.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No rooms match your current filters.</p>
          <Button variant="outline" className="mt-4 bg-transparent">
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
