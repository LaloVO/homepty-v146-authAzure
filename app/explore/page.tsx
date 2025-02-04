"use client"

import { useState } from "react"
import { MapView } from "../components/map-view"
import { SearchBar } from "../components/search-bar"
import { SearchResults } from "../components/search-results"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import Link from "next/link"
import { Input } from "@/components/ui/input"

const properties = [
  {
    id: "1",
    name: "Nuovo departamentos",
    location: "Monterrey, Mitras",
    price: "$2.4 millones",
    beds: 3,
    baths: 2,
    area: "280M2",
    image: "/placeholder.svg",
    position: { lat: 25.6866, lng: -100.3161 },
    type: "all",
  },
  {
    id: "2",
    name: "Huluu",
    location: "Monterrey, Country",
    price: "$5.6 millones",
    beds: 2,
    baths: 1,
    area: "167M2",
    image: "/placeholder.svg",
    position: { lat: 25.6682, lng: -100.3371 },
    type: "all",
  },
  {
    id: "3",
    name: "Antara Live",
    location: "Monterrey, zona centro",
    price: "$4.5 millones",
    beds: 3,
    baths: 15,
    area: "112M2",
    image: "/placeholder.svg",
    position: { lat: 25.6715, lng: -100.3089 },
    type: "all",
  },
]

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("Monterrey")
  const [priceRange, setPriceRange] = useState({ min: "", max: "" })
  const [sortBy, setSortBy] = useState("date")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredProperties = properties.filter((property) => {
    const matchesType = typeFilter === "all" || property.type === typeFilter
    const price = Number.parseFloat(property.price.replace(/[^0-9.-]+/g, ""))
    const matchesPrice =
      (priceRange.min === "" || price >= Number.parseFloat(priceRange.min)) &&
      (priceRange.max === "" || price <= Number.parseFloat(priceRange.max))
    return matchesType && matchesPrice
  })

  return (
    <Tabs defaultValue="map" className="w-full">
      <div className="container mx-auto py-2">
        <TabsList className="grid w-full grid-cols-2 mb-2">
          <TabsTrigger value="map">Mapa</TabsTrigger>
          <TabsTrigger value="developer" asChild>
            <Link href="/explore/developer">Desarrollador</Link>
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="map" className="m-0">
        <div className="relative h-screen">
          <div className="absolute top-0 left-0 right-0 z-10 bg-white px-4 py-2 shadow-sm">
            <div className="flex items-center gap-2">
              <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
              <Input
                type="number"
                placeholder="Precio mínimo"
                className="w-32 h-9 text-sm"
                value={priceRange.min}
                onChange={(e) => setPriceRange((prev) => ({ ...prev, min: e.target.value }))}
              />
              <Input
                type="number"
                placeholder="Precio máximo"
                className="w-32 h-9 text-sm"
                value={priceRange.max}
                onChange={(e) => setPriceRange((prev) => ({ ...prev, max: e.target.value }))}
              />
            </div>
          </div>

          <div className="h-full pt-14">
            <MapView properties={filteredProperties} />
          </div>

          <div className="absolute top-14 right-4 bottom-4 w-[300px] bg-white rounded-lg shadow-lg overflow-hidden">
            <SearchResults searchQuery={searchQuery} properties={filteredProperties} />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}

