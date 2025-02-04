"use client"

import { useState } from "react"
import { Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { MapView } from "./map-view"

interface ExpandableMapProps {
  properties: Array<{ id: string; position: { lat: number; lng: number } }>
  center: { lat: number; lng: number }
  zoom: number
}

export function ExpandableMap({ properties, center, zoom }: ExpandableMapProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="relative h-full">
      <MapView properties={properties} center={center} zoom={zoom} />
      <Button
        variant="secondary"
        size="sm"
        className="absolute bottom-4 right-4 z-10"
        onClick={() => setIsExpanded(true)}
      >
        <Maximize2 className="mr-2 h-4 w-4" />
        Expandir mapa
      </Button>
      <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
        <DialogContent className="max-w-full max-h-full w-[90vw] h-[90vh] p-6">
          <div className="h-[calc(90vh-3rem)]">
            <MapView properties={properties} center={center} zoom={zoom} className="w-full h-full" />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

