"use client"

import { useEffect, useState } from "react"
import { useLoadScript, GoogleMap } from "@react-google-maps/api"
import { Loader2 } from "lucide-react"

interface Property {
  id: string
  position: {
    lat: number
    lng: number
  }
}

interface MapViewProps {
  properties: Property[]
  center?: { lat: number; lng: number }
  zoom?: number
  className?: string
}

const mapContainerStyle = {
  width: "100%",
  height: "100vh",
}

const defaultCenter = {
  lat: 25.6866,
  lng: -100.3161,
}

const libraries: ("places" | "drawing" | "geometry" | "localContext" | "visualization")[] = ["places"]

export function MapView({ properties, center = defaultCenter, zoom = 13, className }: MapViewProps) {
  const [isClient, setIsClient] = useState(false)
  const [map, setMap] = useState<google.maps.Map | null>(null)

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: libraries,
  })

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isLoaded && map) {
      properties.forEach((property) => {
        // Check if AdvancedMarkerElement is available
        if (google.maps.marker && google.maps.marker.AdvancedMarkerElement) {
          const AdvancedMarkerElement = google.maps.marker.AdvancedMarkerElement

          const marker = new AdvancedMarkerElement({
            map,
            position: property.position,
            title: property.id,
          })

          // Create a custom icon element
          const icon = document.createElement("img")
          icon.src = "/map-marker.svg"
          icon.style.width = "30px"
          icon.style.height = "30px"

          // Set the icon as the content of the marker
          marker.content = icon
        } else {
          // Fallback to regular Marker if AdvancedMarkerElement is not available
          new google.maps.Marker({
            map,
            position: property.position,
            title: property.id,
            icon: {
              url: "/map-marker.svg",
              scaledSize: new google.maps.Size(30, 30),
            },
          })
        }
      })
    }
  }, [isLoaded, map, properties])

  if (loadError) {
    return (
      <div className="w-full h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">Error loading maps</p>
          <p className="text-sm text-gray-500">Please check your API key configuration</p>
        </div>
      </div>
    )
  }

  if (!isLoaded || !isClient) {
    return (
      <div className="w-full h-screen bg-gray-100 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <GoogleMap
      mapContainerStyle={{ ...mapContainerStyle, ...(className && { height: "100%", width: "100%" }) }}
      center={center}
      zoom={zoom}
      options={{
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
      className={className}
      onLoad={(map) => setMap(map)}
    >
      {/* Markers are now added programmatically in the useEffect hook */}
    </GoogleMap>
  )
}

