"use client"

import { useEffect, useState } from "react"
import { PaymentProcessing } from "@/components/payments/payment-processing"
import { useBooking } from "@/components/booking/booking-context"
import { useRouter } from "next/navigation"

export default function PaymentPage() {
  const { state } = useBooking()
  const router = useRouter()
  const [bookingDetails, setBookingDetails] = useState<any>(null)

  useEffect(() => {
    if (!state.selectedRoom || !state.checkIn || !state.checkOut) {
      router.push("/")
      return
    }

    // Calculate booking details
    const checkIn = new Date(state.checkIn)
    const checkOut = new Date(state.checkOut)
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    const subtotal = nights * state.selectedRoom.price
    const taxes = subtotal * 0.12
    const total = subtotal + taxes

    setBookingDetails({
      room: state.selectedRoom,
      checkIn: state.checkIn,
      checkOut: state.checkOut,
      guests: state.guests,
      totalAmount: total,
      bookingId: `BK${Date.now()}`,
    })
  }, [state, router])

  const handlePaymentComplete = () => {
    router.push("/booking/confirmation")
  }

  if (!bookingDetails) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
          <p>Loading payment details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 bg-muted/30">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Secure Payment</h1>
          <p className="text-xl text-muted-foreground">Complete your booking with secure payment processing</p>
        </div>

        <PaymentProcessing bookingDetails={bookingDetails} onPaymentComplete={handlePaymentComplete} />
      </div>
    </div>
  )
}
