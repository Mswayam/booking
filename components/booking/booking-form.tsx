"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Phone, MessageSquare } from "lucide-react"
import { useBooking } from "@/components/booking/booking-context"
import { useRouter } from "next/navigation"

export function BookingForm() {
  const { state, dispatch } = useBooking()
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const bookingDetails = {
      ...formData,
      room: state.selectedRoom,
      checkIn: state.checkIn,
      checkOut: state.checkOut,
      guests: state.guests,
      bookingId: `BK${Date.now()}`,
      totalAmount: calculateTotal(),
    }

    dispatch({ type: "SET_BOOKING", payload: bookingDetails })
    router.push("/payment")
  }

  const calculateTotal = () => {
    if (!state.selectedRoom || !state.checkIn || !state.checkOut) return 0
    const checkIn = new Date(state.checkIn)
    const checkOut = new Date(state.checkOut)
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    const subtotal = nights * state.selectedRoom.price
    const taxes = subtotal * 0.12
    return subtotal + taxes
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Guest Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Guest Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder="Enter your first name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="Enter your last name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your email address"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone Number *
            </Label>
            <Input
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Enter your phone number"
            />
          </div>
        </CardContent>
      </Card>

      {/* Special Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Special Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="specialRequests">Any special requests or preferences? (Optional)</Label>
            <Textarea
              id="specialRequests"
              value={formData.specialRequests}
              onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
              placeholder="e.g., High floor, quiet room, early check-in..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Terms and Conditions */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground space-y-2">
              <p>By proceeding with this booking, you agree to our:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Terms and Conditions</li>
                <li>Privacy Policy</li>
                <li>Cancellation Policy</li>
              </ul>
            </div>

            <Separator />

            <Button type="submit" size="lg" className="w-full">
              Continue to Payment
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
