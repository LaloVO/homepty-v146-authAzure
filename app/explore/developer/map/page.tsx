"use client"

import { useState } from "react"
import { MapView } from "@/app/components/map-view"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { ChevronDown, ChevronUp } from "lucide-react"

const DeveloperTools = () => {
  const [landArea, setLandArea] = useState("")
  const [floorAreaRatio, setFloorAreaRatio] = useState("")
  const [maxBuildableArea, setMaxBuildableArea] = useState("")
  const [isExpanded, setIsExpanded] = useState(true)

  const calculateBuildableArea = () => {
    const area = Number.parseFloat(landArea)
    const ratio = Number.parseFloat(floorAreaRatio)
    if (!isNaN(area) && !isNaN(ratio)) {
      setMaxBuildableArea((area * ratio).toFixed(2))
    }
  }

  return (
    <Card className="w-80 absolute top-4 left-4 z-10 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Calculadora de Área Construible</CardTitle>
        <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </CardHeader>
      {isExpanded && (
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="landArea" className="text-xs">
              Área del Terreno (m²)
            </Label>
            <Input
              id="landArea"
              value={landArea}
              onChange={(e) => setLandArea(e.target.value)}
              placeholder="Ej: 1000"
              className="h-8 text-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="floorAreaRatio" className="text-xs">
              Coeficiente de Ocupación del Suelo (COS)
            </Label>
            <Input
              id="floorAreaRatio"
              value={floorAreaRatio}
              onChange={(e) => setFloorAreaRatio(e.target.value)}
              placeholder="Ej: 1.5"
              className="h-8 text-sm"
            />
          </div>
          <Button onClick={calculateBuildableArea} className="w-full text-sm">
            Calcular
          </Button>
          {maxBuildableArea && (
            <div className="pt-2">
              <p className="text-sm font-semibold">Área Máxima Construible: {maxBuildableArea} m²</p>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}

export default function DeveloperMapPage() {
  const [mapCenter, setMapCenter] = useState({ lat: 25.6866, lng: -100.3161 }) // Monterrey coordinates

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="container mx-auto py-4">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-4">
          <TabsTrigger value="map" asChild>
            <Link href="/explore">Mapa</Link>
          </TabsTrigger>
          <TabsTrigger value="developer" asChild>
            <Link href="/explore/developer">Desarrollador</Link>
          </TabsTrigger>
        </TabsList>
      </div>

      <div className="flex-grow relative">
        <MapView properties={[]} center={mapCenter} zoom={12} className="w-full h-full" />
        <DeveloperTools />
      </div>
    </div>
  )
}

