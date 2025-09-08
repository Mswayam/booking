"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Calendar, Users, MapPin, Star } from "lucide-react"
import { useBooking } from "@/components/booking/booking-context"

export function BookingSummary() {
  const { state } = useBooking()

  if (!state.selectedRoom) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">No room selected</p>
        </CardContent>
      </Card>
    )
  }

  const calculateNights = () => {
    if (!state.checkIn || !state.checkOut) return 0
    const checkIn = new Date(state.checkIn)
    const checkOut = new Date(state.checkOut)
    return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
  }

  const nights = calculateNights()
  const subtotal = nights * state.selectedRoom.price
  const taxes = subtotal * 0.12
  const total = subtotal + taxes

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Room Details */}
        <div className="space-y-3">
          <div className="flex gap-3">
            <img
              src={state.selectedRoom.image || "/placeholder.svg"}
              alt={state.selectedRoom.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{state.selectedRoom.name}</h3>
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>{state.selectedRoom.rating}</span>
                <span className="text-muted-foreground">({state.selectedRoom.reviews} reviews)</span>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Booking Details */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-primary" />
            <span>
              {state.checkIn && new Date(state.checkIn).toLocaleDateString()} -{" "}
              {state.checkOut && new Date(state.checkOut).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-primary" />
            <span>
              {state.guests} guest{state.guests > 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-primary" />
            <span>
              {nights} night{nights > 1 ? "s" : ""}
            </span>
          </div>
        </div>

        <Separator />

        {/* Price Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>
              ${state.selectedRoom.price} × {nights} nights
            </span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Taxes & fees</span>
            <span>${taxes.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Note */}
        <div className="bg-muted/50 p-3 rounded-lg">
          <p className="text-sm text-muted-foreground">
            Payment will be processed after booking confirmation. You can cancel free of charge within 24 hours.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
