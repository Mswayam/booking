import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Calendar, CreditCard, Settings } from "lucide-react"
import Link from "next/link"

const quickActions = [
  {
    title: "Book a Room",
    description: "Find and book your next stay",
    icon: Search,
    href: "/rooms",
    color: "bg-primary/10 text-primary",
  },
  {
    title: "View Bookings",
    description: "Manage your reservations",
    icon: Calendar,
    href: "/account/bookings",
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Payment Methods",
    description: "Update your payment info",
    icon: CreditCard,
    href: "/account/payments",
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Account Settings",
    description: "Manage your preferences",
    icon: Settings,
    href: "/account/settings",
    color: "bg-orange-100 text-orange-600",
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Button
              key={action.href}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-3 bg-transparent hover:bg-muted/50"
              asChild
            >
              <Link href={action.href}>
                <div className={`p-3 rounded-full ${action.color}`}>
                  <action.icon className="h-6 w-6" />
                </div>
                <div className="text-center">
                  <div className="font-semibold">{action.title}</div>
                  <div className="text-xs text-muted-foreground">{action.description}</div>
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
