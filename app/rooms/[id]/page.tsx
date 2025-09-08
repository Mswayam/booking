import { RoomImageCarousel } from "@/components/rooms/room-image-carousel"
import { RoomInfo } from "@/components/rooms/room-info"
import { BookingCard } from "@/components/booking/booking-card"
import { RoomReviews } from "@/components/rooms/room-reviews"
import { SimilarRooms } from "@/components/rooms/similar-rooms"
import { notFound } from "next/navigation"

// Mock room data - in a real app, this would come from a database
const rooms = [
  {
    id: 1,
    name: "Deluxe Ocean View",
    type: "Deluxe Room",
    price: 299,
    rating: 4.8,
    reviews: 124,
    images: [
      "/luxury-hotel-room-with-ocean-view-and-modern-decor.jpg",
      "/placeholder.svg?key=img1",
      "/placeholder.svg?key=img2",
      "/placeholder.svg?key=img3",
    ],
    amenities: [
      "Ocean View",
      "Free WiFi",
      "Room Service",
      "Balcony",
      "Mini Bar",
      "Safe",
      "Air Conditioning",
      "Flat Screen TV",
    ],
    description:
      "Experience luxury at its finest in our Deluxe Ocean View room. Wake up to breathtaking ocean vistas from your private balcony, and enjoy premium amenities designed for your comfort. This spacious room features elegant furnishings, a comfortable king-size bed, and a marble bathroom with premium toiletries.",
    maxGuests: 2,
    beds: "1 King Bed",
    size: "45 sqm",
    checkIn: "3:00 PM",
    checkOut: "11:00 AM",
    policies: ["No smoking", "Pets not allowed", "Parties/events not allowed", "Check-in age requirement: 18+"],
  },
  // Add more rooms as needed
]

interface RoomDetailsPageProps {
  params: {
    id: string
  }
}

export default function RoomDetailsPage({ params }: RoomDetailsPageProps) {
  const roomId = Number.parseInt(params.id)
  const room = rooms.find((r) => r.id === roomId)

  if (!room) {
    notFound()
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Room Images */}
        <div className="mb-8">
          <RoomImageCarousel images={room.images} roomName={room.name} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Room Information */}
          <div className="lg:col-span-2">
            <RoomInfo room={room} />
            <RoomReviews roomId={room.id} rating={room.rating} reviewCount={room.reviews} />
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BookingCard room={room} />
            </div>
          </div>
        </div>

        {/* Similar Rooms */}
        <div className="mt-16">
          <SimilarRooms currentRoomId={room.id} />
        </div>
      </div>
    </div>
  )
}
