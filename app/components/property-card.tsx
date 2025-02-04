"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, BookmarkPlus, Video, Bed, Bath, Square, MapPin } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface PropertyCardProps {
  id: string
  name: string
  location: string
  price: string | number
  beds: number
  baths: number
  area: number | string
  image?: string
  compact?: boolean
}

export function PropertyCard({
  id,
  name,
  location,
  price,
  beds,
  baths,
  area,
  image = "/placeholder.svg",
  compact = false,
}: PropertyCardProps) {
  const [isSaved, setIsSaved] = useState(false)

  const handleSave = () => {
    setIsSaved(!isSaved)
    // Here you would typically also save to backend/localStorage
  }

  return (
    <Card className="overflow-hidden group">
      <div className="relative">
        <img src={image || "/placeholder.svg"} alt={name} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute top-2 right-2 flex gap-2">
            <Link href={`/property/${id}`}>
              <Button size="icon" variant="secondary" className="w-8 h-8 rounded-full bg-white/80 hover:bg-white">
                <Eye className="w-4 h-4" />
                <span className="sr-only">Ver detalles</span>
              </Button>
            </Link>
            <Button
              size="icon"
              variant="secondary"
              className={`w-8 h-8 rounded-full ${
                isSaved ? "bg-primary text-white hover:bg-primary/90" : "bg-white/80 hover:bg-white"
              }`}
              onClick={handleSave}
            >
              <BookmarkPlus className="w-4 h-4" />
              <span className="sr-only">Guardar en mi historial</span>
            </Button>
            <Link href={`/property/${id}/tour`}>
              <Button size="icon" variant="secondary" className="w-8 h-8 rounded-full bg-white/80 hover:bg-white">
                <Video className="w-4 h-4" />
                <span className="sr-only">Ver tour virtual</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-1">{name}</h3>
        <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
        <p className="font-bold text-lg mb-3">{typeof price === "number" ? `$${price}` : price}</p>
        <div className="flex justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span>{beds}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span>{baths}</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="w-4 h-4" />
            <span>{typeof area === "number" ? `${area} m²` : area}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

