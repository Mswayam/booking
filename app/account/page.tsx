import { AccountSidebar } from "@/components/account/account-sidebar"
import { ProfileOverview } from "@/components/account/profile-overview"
import { RecentBookings } from "@/components/account/recent-bookings"
import { QuickActions } from "@/components/account/quick-actions"

export default function AccountPage() {
  return (
    <div className="min-h-screen pt-20 bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Account</h1>
          <p className="text-xl text-muted-foreground">Manage your profile and bookings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <AccountSidebar />
          </aside>

          <main className="lg:col-span-3 space-y-8">
            <ProfileOverview />
            <QuickActions />
            <RecentBookings />
          </main>
        </div>
      </div>
    </div>
  )
}
