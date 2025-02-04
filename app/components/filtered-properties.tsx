"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { PropertyCard } from "./property-card"

const popularProperties = [
  {
    id: "1",
    name: "Metro Jayakarta",
    location: "Av. principal Mazatlan, Sin",
    price: 65.55,
    beds: 2,
    baths: 3,
    area: "24M",
    image: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Grand O, oficinas Ejecutivas",
    location: "Polanco 202, CDMX",
    price: 236.99,
    beds: 1,
    baths: 2,
    area: "188M",
    image: "/placeholder.svg",
  },
  {
    id: "3",
    name: "Milan desarrollos",
    location: "Merida, zona centro",
    price: 125.99,
    beds: 3,
    baths: 2,
    area: "77M",
    image: "/placeholder.svg",
  },
]

export function FilteredProperties() {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <Tabs defaultValue="popular" className="w-full">
        <div className="border-b">
          <TabsList className="w-full h-auto p-0 bg-transparent">
            <div className="container mx-auto px-6">
              <div className="flex gap-4">
                <TabsTrigger
                  value="popular"
                  className="data-[state=active]:bg-primary/5 rounded-none border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none px-4 py-3"
                >
                  Popular
                </TabsTrigger>
                <TabsTrigger
                  value="recommended"
                  className="data-[state=active]:bg-primary/5 rounded-none border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none px-4 py-3"
                >
                  Recomendados
                </TabsTrigger>
                <TabsTrigger
                  value="nearby"
                  className="data-[state=active]:bg-primary/5 rounded-none border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none px-4 py-3"
                >
                  Cercanos
                </TabsTrigger>
              </div>
            </div>
          </TabsList>
        </div>
        <div className="py-6">
          <TabsContent value="popular" className="m-0">
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="container mx-auto px-6">
                <div className="flex w-max space-x-4">
                  {popularProperties.map((property) => (
                    <div key={property.id} className="w-[300px] shrink-0">
                      <PropertyCard {...property} />
                    </div>
                  ))}
                </div>
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="recommended" className="m-0">
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="container mx-auto px-6">
                <div className="flex w-max space-x-4">
                  {popularProperties.map((property) => (
                    <div key={property.id} className="w-[300px] shrink-0">
                      <PropertyCard {...property} name={`Recomendado ${property.id}`} />
                    </div>
                  ))}
                </div>
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="nearby" className="m-0">
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="container mx-auto px-6">
                <div className="flex w-max space-x-4">
                  {popularProperties.map((property) => (
                    <div key={property.id} className="w-[300px] shrink-0">
                      <PropertyCard {...property} name={`Cercano ${property.id}`} />
                    </div>
                  ))}
                </div>
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

