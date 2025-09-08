"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { MapPin, Calendar, Users, Search } from "lucide-react"
import { useBooking } from "@/components/booking/booking-context"
import { useRouter } from "next/navigation"

export function SearchBar() {
  const { dispatch } = useBooking()
  const router = useRouter()
  const [searchData, setSearchData] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  })

  const handleSearch = () => {
    dispatch({ type: "SET_SEARCH", payload: searchData })
    router.push("/rooms")
  }

  return (
    <Card className="p-6 shadow-xl bg-white/95 backdrop-blur-sm">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            Destination
          </label>
          <Input
            placeholder="Where are you going?"
            value={searchData.destination}
            onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            Check-in
          </label>
          <Input
            type="date"
            value={searchData.checkIn}
            onChange={(e) => setSearchData({ ...searchData, checkIn: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            Check-out
          </label>
          <Input
            type="date"
            value={searchData.checkOut}
            onChange={(e) => setSearchData({ ...searchData, checkOut: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            Guests
          </label>
          <div className="flex">
            <Input
              type="number"
              min="1"
              max="10"
              value={searchData.guests}
              onChange={(e) => setSearchData({ ...searchData, guests: Number.parseInt(e.target.value) || 1 })}
              className="rounded-r-none"
            />
            <Button onClick={handleSearch} className="rounded-l-none">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
