import { AccountSidebar } from "@/components/account/account-sidebar"
import { BookingsList } from "@/components/account/bookings-list"

export default function BookingsPage() {
  return (
    <div className="min-h-screen pt-20 bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Bookings</h1>
          <p className="text-xl text-muted-foreground">View and manage your reservations</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <AccountSidebar />
          </aside>

          <main className="lg:col-span-3">
            <BookingsList />
          </main>
        </div>
      </div>
    </div>
  )
}
