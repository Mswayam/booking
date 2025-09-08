import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Bed, MapPin, Clock, Wifi, Car, Coffee, Waves, Tv, Wind, Shield, Utensils } from "lucide-react"

const amenityIcons: Record<string, any> = {
  "Free WiFi": Wifi,
  "Room Service": Utensils,
  "Mini Bar": Coffee,
  "Air Conditioning": Wind,
  "Flat Screen TV": Tv,
  Safe: Shield,
  Parking: Car,
  "Spa Access": Waves,
}

interface RoomInfoProps {
  room: {
    name: string
    type: string
    description: string
    maxGuests: number
    beds: string
    size: string
    checkIn: string
    checkOut: string
    amenities: string[]
    policies: string[]
  }
}

export function RoomInfo({ room }: RoomInfoProps) {
  return (
    <div className="space-y-6">
      {/* Room Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">{room.name}</h1>
          <Badge variant="secondary">{room.type}</Badge>
        </div>
        <p className="text-lg text-muted-foreground text-pretty">{room.description}</p>
      </div>

      {/* Room Details */}
      <Card>
        <CardHeader>
          <CardTitle>Room Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">{room.maxGuests} Guests</p>
                <p className="text-sm text-muted-foreground">Maximum</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Bed className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">{room.beds}</p>
                <p className="text-sm text-muted-foreground">Bedding</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">{room.size}</p>
                <p className="text-sm text-muted-foreground">Room Size</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Check-in/out</p>
                <p className="text-sm text-muted-foreground">
                  {room.checkIn} / {room.checkOut}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Amenities */}
      <Card>
        <CardHeader>
          <CardTitle>Amenities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {room.amenities.map((amenity) => {
              const IconComponent = amenityIcons[amenity] || Coffee
              return (
                <div key={amenity} className="flex items-center gap-3">
                  <IconComponent className="h-5 w-5 text-primary" />
                  <span>{amenity}</span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Policies */}
      <Card>
        <CardHeader>
          <CardTitle>House Rules & Policies</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {room.policies.map((policy, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>{policy}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
