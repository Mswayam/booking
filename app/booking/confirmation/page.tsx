"use client"

import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Calendar, Users, Mail, Phone, Download, Share } from "lucide-react"
import { useBooking } from "@/components/booking/booking-context"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function BookingConfirmationPage() {
  const { state } = useBooking()
  const router = useRouter()

  useEffect(() => {
    if (!state.bookingDetails) {
      router.push("/")
    }
  }, [state.bookingDetails, router])

  if (!state.bookingDetails) {
    return null
  }

  const { bookingDetails } = state

  return (
    <div className="min-h-screen pt-20 bg-muted/30">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-xl text-muted-foreground">Your reservation has been successfully created</p>
        </div>

        {/* Booking Details Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Booking Details</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Confirmed
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Booking ID */}
            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="text-sm text-muted-foreground">Booking ID</p>
              <p className="font-mono font-semibold text-lg">{bookingDetails.bookingId}</p>
            </div>

            <Separator />

            {/* Room Information */}
            <div>
              <h3 className="font-semibold mb-2">Room Information</h3>
              <div className="flex gap-3">
                <img
                  src={bookingDetails.room?.image || "/placeholder.svg"}
                  alt={bookingDetails.room?.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{bookingDetails.room?.name}</h4>
                  <p className="text-sm text-muted-foreground">{bookingDetails.room?.type}</p>
                  <p className="text-lg font-semibold text-primary">${bookingDetails.room?.price}/night</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Stay Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Check-in</p>
                  <p className="font-medium">{new Date(bookingDetails.checkIn).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Check-out</p>
                  <p className="font-medium">{new Date(bookingDetails.checkOut).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Guests</p>
                  <p className="font-medium">{bookingDetails.guests}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Guest Information */}
            <div>
              <h3 className="font-semibold mb-2">Guest Information</h3>
              <div className="space-y-2">
                <p className="font-medium">
                  {bookingDetails.firstName} {bookingDetails.lastName}
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4" />
                  {bookingDetails.email}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4" />
                  {bookingDetails.phone}
                </div>
              </div>
            </div>

            {bookingDetails.specialRequests && (
              <>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2">Special Requests</h3>
                  <p className="text-sm text-muted-foreground">{bookingDetails.specialRequests}</p>
                </div>
              </>
            )}

            <Separator />

            {/* Total Amount */}
            <div className="bg-primary/5 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total Amount</span>
                <span className="text-2xl font-bold text-primary">${bookingDetails.totalAmount.toFixed(2)}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Payment will be collected at the property</p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Download Confirmation
          </Button>
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <Share className="h-4 w-4" />
            Share Booking
          </Button>
        </div>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>You'll receive a confirmation email shortly with all the details</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Check-in is available from 3:00 PM on your arrival date</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>You can manage your booking in your account dashboard</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Free cancellation available up to 24 hours before check-in</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-8">
          <Button asChild className="flex-1">
            <Link href="/account/bookings">View My Bookings</Link>
          </Button>
          <Button variant="outline" asChild className="flex-1 bg-transparent">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
