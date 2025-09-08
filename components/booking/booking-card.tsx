"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Calendar, Users, Star } from "lucide-react"
import { useBooking } from "@/components/booking/booking-context"
import { useRouter } from "next/navigation"
import { formatINR } from "@/lib/utils"

interface BookingCardProps {
  room: {
    id: number
    name: string
    price: number
    rating: number
    reviews: number
  }
}

export function BookingCard({ room }: BookingCardProps) {
  const { state, dispatch } = useBooking()
  const router = useRouter()
  const [bookingData, setBookingData] = useState({
    checkIn: state.checkIn || "",
    checkOut: state.checkOut || "",
    guests: state.guests || 1,
  })

  const calculateNights = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0
    const checkIn = new Date(bookingData.checkIn)
    const checkOut = new Date(bookingData.checkOut)
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const nights = calculateNights()
  const subtotal = nights * room.price
  const taxes = subtotal * 0.12 // 12% tax
  const total = subtotal + taxes

  const handleBookNow = () => {
    dispatch({
      type: "SET_ROOM",
      payload: room,
    })
    dispatch({
      type: "SET_SEARCH",
      payload: bookingData,
    })
    router.push("/booking")
  }

  const isValidBooking = bookingData.checkIn && bookingData.checkOut && nights > 0

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">
              {formatINR(room.price)}
              <span className="text-base font-normal text-muted-foreground">/night</span>
            </CardTitle>
            <div className="flex items-center gap-1 mt-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{room.rating}</span>
              <span className="text-muted-foreground">({room.reviews} reviews)</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Date Selection */}
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-2">
            <Label htmlFor="checkin" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Check-in
            </Label>
            <Input
              id="checkin"
              type="date"
              value={bookingData.checkIn}
              onChange={(e) => setBookingData({ ...bookingData, checkIn: e.target.value })}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="checkout" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Check-out
            </Label>
            <Input
              id="checkout"
              type="date"
              value={bookingData.checkOut}
              onChange={(e) => setBookingData({ ...bookingData, checkOut: e.target.value })}
              min={bookingData.checkIn || new Date().toISOString().split("T")[0]}
            />
          </div>
        </div>

        {/* Guests Selection */}
        <div className="space-y-2">
          <Label htmlFor="guests" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Guests
          </Label>
          <Input
            id="guests"
            type="number"
            min="1"
            max="10"
            value={bookingData.guests}
            onChange={(e) => setBookingData({ ...bookingData, guests: Number.parseInt(e.target.value) || 1 })}
          />
        </div>

        {/* Price Breakdown */}
        {isValidBooking && (
          <>
            <Separator />
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>
                  {formatINR(room.price)} × {nights} nights
                </span>
                <span>{formatINR(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & fees</span>
                <span>{formatINR(taxes)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{formatINR(total)}</span>
              </div>
            </div>
          </>
        )}

        {/* Book Button */}
        <Button className="w-full" size="lg" onClick={handleBookNow} disabled={!isValidBooking}>
          {isValidBooking ? "Book Now" : "Select Dates"}
        </Button>

        <p className="text-sm text-muted-foreground text-center">You won't be charged yet</p>
      </CardContent>
    </Card>
  )
}
