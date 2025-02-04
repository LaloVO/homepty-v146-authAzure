"use client"

import { PropertyCard } from "./property-card"

interface Property {
  id: string
  name: string
  location: string
  price: string
  beds: number
  baths: number
  area: string
  image?: string
  position: {
    lat: number
    lng: number
  }
}

interface SearchResultsProps {
  searchQuery: string
  properties: Property[]
}

export function SearchResults({ searchQuery, properties }: SearchResultsProps) {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-2">Resultados de busqueda "{searchQuery}"</h2>
      <div className="space-y-4 max-h-[calc(100vh-12rem)] overflow-y-auto">
        {properties.map((property) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>
    </div>
  )
}

