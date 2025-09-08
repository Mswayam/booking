"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

const roomTypes = ["Standard Room", "Deluxe Room", "Suite", "Villa", "Penthouse"]

const amenities = [
  "Ocean View",
  "City View",
  "Balcony",
  "Kitchenette",
  "Jacuzzi",
  "Private Garden",
  "Work Desk",
  "Living Area",
]

export function RoomFilters() {
  const [priceRange, setPriceRange] = useState([100, 800])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [minRating, setMinRating] = useState(0)

  const handleTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setSelectedTypes([...selectedTypes, type])
    } else {
      setSelectedTypes(selectedTypes.filter((t) => t !== type))
    }
  }

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setSelectedAmenities([...selectedAmenities, amenity])
    } else {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity))
    }
  }

  const clearFilters = () => {
    setPriceRange([100, 800])
    setSelectedTypes([])
    setSelectedAmenities([])
    setMinRating(0)
  }

  const hasActiveFilters =
    selectedTypes.length > 0 ||
    selectedAmenities.length > 0 ||
    minRating > 0 ||
    priceRange[0] > 100 ||
    priceRange[1] < 800

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Filters</CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Price Range */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Price Range (per night)</Label>
          <Slider value={priceRange} onValueChange={setPriceRange} max={1000} min={50} step={25} className="w-full" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>

        {/* Room Types */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Room Type</Label>
          <div className="space-y-2">
            {roomTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={type}
                  checked={selectedTypes.includes(type)}
                  onCheckedChange={(checked) => handleTypeChange(type, checked as boolean)}
                />
                <Label htmlFor={type} className="text-sm font-normal">
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Amenities</Label>
          <div className="space-y-2">
            {amenities.map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity}
                  checked={selectedAmenities.includes(amenity)}
                  onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                />
                <Label htmlFor={amenity} className="text-sm font-normal">
                  {amenity}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Minimum Rating</Label>
          <div className="space-y-2">
            {[4.5, 4.0, 3.5, 3.0].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox
                  id={`rating-${rating}`}
                  checked={minRating === rating}
                  onCheckedChange={(checked) => setMinRating(checked ? rating : 0)}
                />
                <Label htmlFor={`rating-${rating}`} className="text-sm font-normal">
                  {rating}+ stars
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="space-y-3">
            <Label className="text-sm font-medium">Active Filters</Label>
            <div className="flex flex-wrap gap-2">
              {selectedTypes.map((type) => (
                <Badge key={type} variant="secondary" className="text-xs">
                  {type}
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => handleTypeChange(type, false)} />
                </Badge>
              ))}
              {selectedAmenities.map((amenity) => (
                <Badge key={amenity} variant="secondary" className="text-xs">
                  {amenity}
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => handleAmenityChange(amenity, false)} />
                </Badge>
              ))}
              {minRating > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {minRating}+ stars
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setMinRating(0)} />
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
