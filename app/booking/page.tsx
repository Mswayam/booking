import { BookingForm } from "@/components/booking/booking-form"
import { BookingSummary } from "@/components/booking/booking-summary"

export default function BookingPage() {
  return (
    <div className="min-h-screen pt-20 bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Complete Your Booking</h1>
          <p className="text-xl text-muted-foreground">Just a few more details and you're all set!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <BookingForm />
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BookingSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
