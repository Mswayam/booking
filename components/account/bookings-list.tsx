"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Users, Download, MessageCircle } from "lucide-react"
import { formatINR } from "@/lib/utils"

const bookings = [
  {
    id: "BK1234567890",
    roomName: "Deluxe Ocean View",
    hotelName: "StayBook Resort",
    checkIn: "2024-02-15",
    checkOut: "2024-02-18",
    guests: 2,
    status: "confirmed",
    totalAmount: 897.0,
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
    totalAmount: 1377.0,
    image: "/executive-hotel-suite-with-living-area-and-city-vi.jpg",
  },
  {
    id: "BK1234567892",
    roomName: "Garden Villa",
    hotelName: "StayBook Resort",
    checkIn: "2024-03-10",
    checkOut: "2024-03-14",
    guests: 4,
    status: "upcoming",
    totalAmount: 1556.0,
    image: "/private-villa-with-garden-view-and-outdoor-terrace.jpg",
  },
]

export function BookingsList() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === "all") return true
    if (activeTab === "upcoming") return booking.status === "upcoming" || booking.status === "confirmed"
    if (activeTab === "completed") return booking.status === "completed"
    return true
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Bookings</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredBookings.map((booking) => (
              <Card key={booking.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <img
                      src={booking.image || "/placeholder.svg"}
                      alt={booking.roomName}
                      className="w-full md:w-48 h-48 md:h-auto object-cover"
                    />
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{booking.roomName}</h3>
                          <p className="text-muted-foreground">{booking.hotelName}</p>
                        </div>
                        <Badge
                          variant={
                            booking.status === "confirmed" || booking.status === "upcoming" ? "default" : "secondary"
                          }
                          className={
                            booking.status === "confirmed" || booking.status === "upcoming"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }
                        >
                          {booking.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-primary" />
                          <div>
                            <p className="font-medium">Check-in</p>
                            <p className="text-muted-foreground">{new Date(booking.checkIn).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-primary" />
                          <div>
                            <p className="font-medium">Check-out</p>
                            <p className="text-muted-foreground">{new Date(booking.checkOut).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="h-4 w-4 text-primary" />
                          <div>
                            <p className="font-medium">Guests</p>
                            <p className="text-muted-foreground">{booking.guests}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Amount</p>
                          <p className="text-2xl font-bold text-primary">{formatINR(booking.totalAmount)}</p>
                          <p className="text-xs text-muted-foreground">Booking ID: {booking.id}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Receipt
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Support
                          </Button>
                          {booking.status === "upcoming" && <Button size="sm">Modify Booking</Button>}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No bookings found for this category.</p>
            <Button asChild>
              <a href="/rooms">Book Your First Stay</a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
