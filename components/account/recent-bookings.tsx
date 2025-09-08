import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users } from "lucide-react"
import Link from "next/link"

const recentBookings = [
  {
    id: "BK1234567890",
    roomName: "Deluxe Ocean View",
    hotelName: "StayBook Resort",
    checkIn: "2024-02-15",
    checkOut: "2024-02-18",
    guests: 2,
    status: "confirmed",
    image: "/luxury-hotel-room-with-ocean-view-and-modern-decor.jpg",
  },
  {
    id: "BK1234567891",
    roomName: "Executive Suite",
    hotelName: "StayBook Downtown",
    checkIn: "2024-01-20",
    checkOut: "2024-01-23",
    guests: 1,
    status: "completed",
    image: "/executive-hotel-suite-with-living-area-and-city-vi.jpg",
  },
]

export function RecentBookings() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Bookings</CardTitle>
          <Button variant="outline" size="sm" asChild>
            <Link href="/account/bookings">View All</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentBookings.map((booking) => (
            <div key={booking.id} className="flex gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <img
                src={booking.image || "/placeholder.svg"}
                alt={booking.roomName}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold">{booking.roomName}</h3>
                    <p className="text-sm text-muted-foreground">{booking.hotelName}</p>
                  </div>
                  <Badge
                    variant={booking.status === "confirmed" ? "default" : "secondary"}
                    className={
                      booking.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }
                  >
                    {booking.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {booking.guests} guest{booking.guests > 1 ? "s" : ""}
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground">Booking ID: {booking.id}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
