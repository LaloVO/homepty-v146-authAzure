"use client"

import { useState } from "react"
import { ChevronLeft, Share2, Heart, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SavedProperty {
  id: string
  name: string
  location: string
  price: number
  priceChange: number
  specs: {
    area: string
    beds: number
    baths: number
    estac?: number
  }
  image: string
  type: "venta" | "renta" | "preventa"
  status: "Disponible" | "Separado"
}

const savedProperties: SavedProperty[] = [
  {
    id: "1",
    name: "Coyoacan, Cdmx",
    location: "Pedregal de Carrasco",
    price: 1865000,
    priceChange: -12,
    specs: {
      area: "45m²",
      beds: 2,
      baths: 1,
    },
    image: "/placeholder.svg",
    type: "venta",
    status: "Disponible",
  },
  {
    id: "2",
    name: "Pachuca De Soto",
    location: "Simón Bolivar 101, Hidalgo",
    price: 995000,
    priceChange: -15,
    specs: {
      area: "217m²",
      beds: 3,
      baths: 2,
    },
    image: "/placeholder.svg",
    type: "venta",
    status: "Disponible",
  },
  {
    id: "3",
    name: "Pachuca De Soto",
    location: "FRACC REAL MADERA PORTO SANTO",
    price: 3264000,
    priceChange: -17,
    specs: {
      area: "179m²",
      beds: 3,
      baths: 3,
      estac: 2,
    },
    image: "/placeholder.svg",
    type: "venta",
    status: "Disponible",
  },
  {
    id: "4",
    name: "Huehuetoca",
    location: "El Dorado",
    price: 474000,
    priceChange: -6,
    specs: {
      area: "39m²",
      beds: 2,
      baths: 1,
      estac: 1,
    },
    image: "/placeholder.svg",
    type: "venta",
    status: "Separado",
  },
  {
    id: "5",
    name: "Cuernavaca",
    location: "Jardines de Reforma",
    price: 2500000,
    priceChange: -8,
    specs: {
      area: "150m²",
      beds: 3,
      baths: 2,
      estac: 2,
    },
    image: "/placeholder.svg",
    type: "venta",
    status: "Disponible",
  },
  {
    id: "6",
    name: "Toluca",
    location: "Metepec",
    price: 1750000,
    priceChange: -10,
    specs: {
      area: "120m²",
      beds: 3,
      baths: 2,
      estac: 1,
    },
    image: "/placeholder.svg",
    type: "venta",
    status: "Disponible",
  },
]

function PropertyCard({ property }: { property: SavedProperty }) {
  return (
    <Link href={`/property/${property.id}`} className="block">
      <div className="bg-white rounded-md overflow-hidden border border-gray-200 text-xs hover:shadow-md transition-shadow duration-200">
        <div className="flex h-28">
          {/* Image Section */}
          <div className="relative w-2/5">
            <Image src={property.image || "/placeholder.svg"} alt={property.name} fill className="object-cover" />
          </div>

          {/* Info Section */}
          <div className="flex-1 p-1.5 flex flex-col justify-between overflow-hidden">
            <div>
              <h3 className="font-medium text-xs leading-tight">{property.name}</h3>
              <p className="text-[10px] text-gray-600 line-clamp-1">{property.location}</p>
              <div className="flex items-center gap-1 text-[8px] text-gray-500 mt-0.5">
                <span>{property.specs.area}</span>
                <span>•</span>
                <span>{property.specs.beds} Rec.</span>
                <span>•</span>
                <span>{property.specs.baths} Baños</span>
                {property.specs.estac && (
                  <>
                    <span>•</span>
                    <span>{property.specs.estac} Estac.</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-medium">${property.price.toLocaleString()}</span>
                <Badge variant="destructive" className="text-[8px] px-1 py-0 font-normal">
                  {property.priceChange}%
                </Badge>
              </div>
              <Badge
                variant={property.status === "Disponible" ? "default" : "secondary"}
                className={`text-[8px] px-1 py-0 font-normal ${
                  property.status === "Disponible" ? "bg-green-500" : "bg-blue-500"
                } text-white border-0`}
              >
                {property.status}
              </Badge>
            </div>
            <div className="flex items-center gap-0.5 mt-0.5">
              <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
                <Share2 className="h-2.5 w-2.5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
                <Heart className="h-2.5 w-2.5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
                <Download className="h-2.5 w-2.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function HistoryPage() {
  const [typeFilter, setTypeFilter] = useState<"all" | "venta" | "renta" | "preventa">("all")
  const [sortBy, setSortBy] = useState<"date" | "price" | "area">("date")

  const filteredProperties = savedProperties.filter((property) => typeFilter === "all" || property.type === typeFilter)

  return (
    <div className="container mx-auto py-4 px-2 sm:px-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <div className="flex items-center gap-2">
          <Link href="/activities" className="text-gray-500 hover:text-gray-700">
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-lg font-semibold">Propiedades Guardadas</h1>
        </div>
        <div className="flex gap-2">
          <Select value={typeFilter} onValueChange={(value: typeof typeFilter) => setTypeFilter(value)}>
            <SelectTrigger className="w-[120px] text-xs h-8">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="venta">Venta</SelectItem>
              <SelectItem value="renta">Renta</SelectItem>
              <SelectItem value="preventa">Pre-venta</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={(value: typeof sortBy) => setSortBy(value)}>
            <SelectTrigger className="w-[120px] text-xs h-8">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Fecha</SelectItem>
              <SelectItem value="price">Precio</SelectItem>
              <SelectItem value="area">Área</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {filteredProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  )
}

