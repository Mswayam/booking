import { RoomFilters } from "@/components/rooms/room-filters"
import { RoomGrid } from "@/components/rooms/room-grid"
import { Suspense } from "react"

export default function RoomsPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-balance">Available Rooms</h1>
          <p className="text-xl text-muted-foreground text-pretty">
            Find your perfect accommodation from our selection of premium rooms and suites
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <Suspense fallback={<div>Loading filters...</div>}>
              <RoomFilters />
            </Suspense>
          </aside>

          <main className="lg:col-span-3">
            <Suspense fallback={<div>Loading rooms...</div>}>
              <RoomGrid />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  )
}
