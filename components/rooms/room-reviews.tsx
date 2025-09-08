import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

const mockReviews = [
  {
    id: 1,
    author: "Sarah Johnson",
    avatar: "/placeholder.svg?key=avatar1",
    rating: 5,
    date: "2024-01-15",
    comment:
      "Absolutely stunning room with incredible ocean views! The service was exceptional and the amenities were top-notch. Would definitely stay here again.",
  },
  {
    id: 2,
    author: "Michael Chen",
    avatar: "/placeholder.svg?key=avatar2",
    rating: 4,
    date: "2024-01-10",
    comment:
      "Great location and beautiful room. The balcony was perfect for morning coffee. Only minor issue was the WiFi speed, but overall excellent experience.",
  },
  {
    id: 3,
    author: "Emma Davis",
    avatar: "/placeholder.svg?key=avatar3",
    rating: 5,
    date: "2024-01-05",
    comment:
      "Perfect for our anniversary getaway. The room was spacious, clean, and the ocean view was breathtaking. Staff went above and beyond to make our stay special.",
  },
]

interface RoomReviewsProps {
  roomId: number
  rating: number
  reviewCount: number
}

export function RoomReviews({ roomId, rating, reviewCount }: RoomReviewsProps) {
  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            {rating} · {reviewCount} reviews
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {mockReviews.map((review) => (
            <div key={review.id} className="space-y-3">
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.author} />
                  <AvatarFallback>
                    {review.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{review.author}</h4>
                    <Badge variant="outline" className="text-xs">
                      {new Date(review.date).toLocaleDateString()}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-pretty">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
