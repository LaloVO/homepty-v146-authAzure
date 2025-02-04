"use client"

import { Card } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Bed, Bath, Square, MapPin, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"

interface SimilarProperty {
  id: string
  name: string
  location: string
  price: string
  beds: number
  baths: number
  area: number
  image: string
}

const categories = ["Más visitadas", "Recomendadas", "Mismo precio", "Misma zona", "Recién agregadas"]

const similarProperties: SimilarProperty[] = [
  {
    id: "1",
    name: "Nuovo departamentos",
    location: "Monterrey, Mitras",
    price: "$2.4 millones",
    beds: 3,
    baths: 2,
    area: 280,
    image: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Residencia Exclusiva",
    location: "San Pedro, Valle",
    price: "$5.6 millones",
    beds: 4,
    baths: 3,
    area: 320,
    image: "/placeholder.svg",
  },
  {
    id: "3",
    name: "Villa Contemporánea",
    location: "Monterrey, Del Valle",
    price: "$3.8 millones",
    beds: 3,
    baths: 2,
    area: 240,
    image: "/placeholder.svg",
  },
  {
    id: "4",
    name: "Casa de Lujo",
    location: "San Pedro, Carretera Nacional",
    price: "$7.2 millones",
    beds: 5,
    baths: 4,
    area: 450,
    image: "/placeholder.svg",
  },
  {
    id: "5",
    name: "Residencial Elite",
    location: "Monterrey, Cumbres",
    price: "$4.5 millones",
    beds: 4,
    baths: 3,
    area: 300,
    image: "/placeholder.svg",
  },
]

function PropertyCard({ property }: { property: SimilarProperty }) {
  return (
    <Card className="w-[300px] overflow-hidden">
      <div className="relative">
        <div className="aspect-[4/3] relative">
          <Image src={property.image || "/placeholder.svg"} alt={property.name} fill className="object-cover" />
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{property.name}</h3>
        <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
          <MapPin className="w-4 h-4" />
          <span>{property.location}</span>
        </div>
        <p className="font-bold text-lg mb-3">{property.price}</p>
        <div className="flex justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span>{property.beds}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span>{property.baths}</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="w-4 h-4" />
            <span>{property.area} m²</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

export function SimilarProperties() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const categoriesRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right", ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const scrollAmount = 300
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Las casas más vistas similares a esta propiedad</h2>
      </div>

      {/* Categories Scroll Section */}
      <ScrollArea className="w-full">
        <div ref={categoriesRef} className="flex space-x-2 p-1">
          {categories.map((category) => (
            <Button key={category} variant="outline" className="whitespace-nowrap rounded-full">
              {category}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* Properties Scroll Section */}
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white/90 shadow-md rounded-full"
          onClick={() => scroll("left", scrollRef)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <ScrollArea className="w-full">
          <div ref={scrollRef} className="flex space-x-4 p-1">
            {similarProperties.map((property) => (
              <Link key={property.id} href={`/property/${property.id}`}>
                <PropertyCard property={property} />
              </Link>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white/90 shadow-md rounded-full"
          onClick={() => scroll("right", scrollRef)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

