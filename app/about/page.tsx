export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 text-balance">About StayBook</h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Your trusted partner for exceptional accommodations and seamless booking experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Founded with a vision to revolutionize the hospitality industry, StayBook connects travelers with
                premium accommodations worldwide. We believe that every journey deserves exceptional comfort and
                service.
              </p>
              <p className="text-muted-foreground">
                From boutique hotels to luxury resorts, we curate only the finest properties to ensure your stay exceeds
                expectations. Our commitment to quality and customer satisfaction has made us a trusted name in travel.
              </p>
            </div>
            <div className="relative">
              <img
                src="/luxury-hotel-lobby-with-modern-design-and-warm-lig.jpg"
                alt="Luxury hotel lobby"
                className="rounded-lg shadow-lg w-full h-80 object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Premium Properties</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground">Happy Guests</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">4.9</div>
              <div className="text-muted-foreground">Average Rating</div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Why Choose StayBook?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-muted/30 rounded-lg">
                <h3 className="font-semibold mb-2">Best Price Guarantee</h3>
                <p className="text-sm text-muted-foreground">We match any lower price you find elsewhere</p>
              </div>
              <div className="p-6 bg-muted/30 rounded-lg">
                <h3 className="font-semibold mb-2">24/7 Support</h3>
                <p className="text-sm text-muted-foreground">Round-the-clock assistance for all your needs</p>
              </div>
              <div className="p-6 bg-muted/30 rounded-lg">
                <h3 className="font-semibold mb-2">Instant Confirmation</h3>
                <p className="text-sm text-muted-foreground">Immediate booking confirmation and peace of mind</p>
              </div>
              <div className="p-6 bg-muted/30 rounded-lg">
                <h3 className="font-semibold mb-2">Flexible Cancellation</h3>
                <p className="text-sm text-muted-foreground">Free cancellation on most bookings</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
