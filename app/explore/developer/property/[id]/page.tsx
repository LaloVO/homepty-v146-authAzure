"use client"

import { useState } from "react"
import { MapView } from "@/app/components/map-view"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface PropertyDetails {
  apn: string
  address: string
  coordinates: {
    lat: number
    long: number
  }
  land: {
    sqft: number
    acres: number
  }
  ownership: string
}

export default function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const [viewType, setViewType] = useState<"structure" | "parcel" | "block">("structure")
  const [isCardExpanded, setIsCardExpanded] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data - en una aplicación real, esto vendría de una API
  const propertyDetails: PropertyDetails = {
    apn: "0773250743",
    address: "Av. Lázaro Cárdenas 2400, Del Valle, San Pedro Garza García, N.L.",
    coordinates: {
      lat: 25.6514,
      long: -100.3342,
    },
    land: {
      sqft: 42195.8,
      acres: 0.97,
    },
    ownership: "Grupo Inmobiliario Valle Oriente S.A. de C.V.",
  }

  return (
    <div className="h-screen">
      {/* Removed "Volver" button */}

      <div className="w-full h-full relative">
        <MapView
          properties={[
            {
              id: params.id,
              position: {
                lat: propertyDetails.coordinates.lat,
                lng: propertyDetails.coordinates.long,
              },
            },
          ]}
          center={{
            lat: propertyDetails.coordinates.lat,
            lng: propertyDetails.coordinates.long,
          }}
          zoom={18}
          className="w-full h-full"
        />

        <Card
          className={`absolute top-4 left-4 w-80 transition-all duration-300 ${isCardExpanded ? "h-auto" : "h-12 overflow-hidden"}`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Detalles de la Propiedad</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setIsCardExpanded(!isCardExpanded)}>
              {isCardExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CardHeader>
          {isCardExpanded && (
            <CardContent className="space-y-6">
              <div>
                <Label className="text-sm text-gray-500">APN</Label>
                <p className="text-lg font-medium">{propertyDetails.apn}</p>
              </div>

              <div>
                <Label className="text-sm text-gray-500">Dirección</Label>
                <p className="text-sm">{propertyDetails.address}</p>
              </div>

              <div className="space-y-4">
                <Label className="text-sm text-gray-500">Vista del Mapa</Label>
                <RadioGroup
                  defaultValue="structure"
                  onValueChange={(value) => setViewType(value as "structure" | "parcel" | "block")}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="structure" id="structure" />
                    <Label htmlFor="structure">Estructura</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="parcel" id="parcel" />
                    <Label htmlFor="parcel">Parcela</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="block" id="block" />
                    <Label htmlFor="block">Bloque</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm text-gray-500">Coordenadas</Label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <div>
                      <Label className="text-xs text-gray-500">Lat</Label>
                      <p className="text-sm font-medium">{propertyDetails.coordinates.lat}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Long</Label>
                      <p className="text-sm font-medium">{propertyDetails.coordinates.long}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm text-gray-500">Terreno</Label>
                <div className="mt-1">
                  <p className="text-sm">
                    {propertyDetails.land.sqft.toLocaleString()} m² · {propertyDetails.land.acres.toLocaleString()}{" "}
                    hectáreas
                  </p>
                </div>
              </div>

              <div>
                <Label className="text-sm text-gray-500">Propietario</Label>
                <p className="text-sm font-medium mt-1">{propertyDetails.ownership}</p>
              </div>

              <div className="pt-4">
                <Button className="w-full">Solicitar más información</Button>
              </div>
            </CardContent>
          )}
        </Card>
        <Card className="absolute top-4 right-4 w-96">
          <CardContent className="p-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Buscar dirección..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-10 w-full bg-white"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

