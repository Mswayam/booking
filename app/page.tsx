import { HeroSection } from "@/components/home/hero-section"
import { SearchBar } from "@/components/search/search-bar"
import { FeaturedRooms } from "@/components/rooms/featured-rooms"
import { ServicesSection } from "@/components/home/services-section"

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <SearchBar />
      </div>
      <FeaturedRooms />
      <ServicesSection />
    </div>
  )
}
