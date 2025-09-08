"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Lock, CheckCircle, AlertCircle } from "lucide-react"

interface PaymentProcessingProps {
  bookingDetails: {
    room: {
      name: string
      price: number
      image?: string
    }
    checkIn: string
    checkOut: string
    guests: number
    totalAmount: number
    bookingId: string
  }
  onPaymentComplete: () => void
}

export function PaymentProcessing({ bookingDetails, onPaymentComplete }: PaymentProcessingProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("pm_1")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle")

  const paymentMethods = [
    {
      id: "pm_1",
      type: "visa",
      last4: "4242",
      isDefault: true,
    },
    {
      id: "pm_2",
      type: "mastercard",
      last4: "5555",
      isDefault: false,
    },
  ]

  const handlePayment = async () => {
    setIsProcessing(true)
    setPaymentStatus("processing")

    // Simulate payment processing
    setTimeout(() => {
      setPaymentStatus("success")
      setIsProcessing(false)
      setTimeout(() => {
        onPaymentComplete()
      }, 2000)
    }, 3000)
  }

  const getCardIcon = (type: string) => {
    switch (type) {
      case "visa":
        return (
          <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
            VISA
          </div>
        )
      case "mastercard":
        return (
          <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">
            MC
          </div>
        )
      default:
        return <CreditCard className="h-5 w-5" />
    }
  }

  if (paymentStatus === "success") {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-6 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-800 mb-2">Payment Successful!</h2>
          <p className="text-green-700">Your booking has been confirmed. Redirecting to confirmation page...</p>
        </CardContent>
      </Card>
    )
  }

  if (paymentStatus === "error") {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-6 text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-800 mb-2">Payment Failed</h2>
          <p className="text-red-700 mb-4">There was an issue processing your payment. Please try again.</p>
          <Button onClick={() => setPaymentStatus("idle")} variant="outline">
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedPaymentMethod === method.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
              }`}
              onClick={() => setSelectedPaymentMethod(method.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getCardIcon(method.type)}
                  <div>
                    <span className="font-medium">•••• •••• •••• {method.last4}</span>
                    {method.isDefault && (
                      <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary">
                        Default
                      </Badge>
                    )}
                  </div>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    selectedPaymentMethod === method.id ? "border-primary bg-primary" : "border-gray-300"
                  }`}
                >
                  {selectedPaymentMethod === method.id && <div className="w-2 h-2 bg-white rounded-full m-0.5" />}
                </div>
              </div>
            </div>
          ))}

          <Button variant="outline" className="w-full bg-transparent">
            <CreditCard className="h-4 w-4 mr-2" />
            Add New Payment Method
          </Button>
        </CardContent>
      </Card>

      {/* Booking Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Booking Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <img
              src={bookingDetails.room.image || "/placeholder.svg"}
              alt={bookingDetails.room.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{bookingDetails.room.name}</h3>
              <p className="text-sm text-muted-foreground">
                {new Date(bookingDetails.checkIn).toLocaleDateString()} -{" "}
                {new Date(bookingDetails.checkOut).toLocaleDateString()}
              </p>
              <p className="text-sm text-muted-foreground">{bookingDetails.guests} guests</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Room rate</span>
              <span>${(bookingDetails.totalAmount / 1.12).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes & fees</span>
              <span>${(bookingDetails.totalAmount * 0.12).toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${bookingDetails.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-primary" />
            <p className="text-sm">
              Your payment is secured with 256-bit SSL encryption. We never store your payment information.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Payment Button */}
      <Button
        onClick={handlePayment}
        disabled={isProcessing || paymentStatus === "processing"}
        size="lg"
        className="w-full"
      >
        {paymentStatus === "processing" ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
            Processing Payment...
          </>
        ) : (
          `Pay $${bookingDetails.totalAmount.toFixed(2)}`
        )}
      </Button>

      {/* Terms */}
      <p className="text-xs text-muted-foreground text-center">
        By completing this booking, you agree to our Terms of Service and Privacy Policy. Cancellation policy applies.
      </p>
    </div>
  )
}
