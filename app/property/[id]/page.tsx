"use client"

import { useState } from "react"
import { ChevronLeft, Star, MessageSquare, Phone, Wifi, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { PropertyFeature } from "./property-feature"
import { PropertyImageGallery } from "./property-image-gallery"
import { AmenitiesSection } from "./amenities-section"
import { ExpandableMap } from "../../components/expandable-map"
import { ValueMosaic } from "./value-mosaic"
import { CreditSimulator } from "./credit-simulator"
import { formatCurrency } from "@/lib/utils"
import { ReviewsSection } from "./reviews-section"
import { SimilarProperties } from "./similar-properties"

const propertyImages = [
  "/placeholder.svg?height=600&width=800",
  "/placeholder.svg?height=300&width=400",
  "/placeholder.svg?height=300&width=400",
  "/placeholder.svg?height=300&width=400",
]

export default function PropertyPage() {
  const [showFullDescription, setShowFullDescription] = useState(false)
  const router = useRouter()

  const description = `Este apartamento está ubicado en una zona estratégica de la ciudad de Semanario, lo que proporciona fácil acceso a varios lugares famosos de la ciudad. Con las instalaciones y servicios de este apartamento, puedes convertirlo en tu alojamiento de vacaciones con tu familia o pareja.`

  const mapProperties = [
    {
      id: "torre-estrella",
      position: {
        lat: 25.6506, // San Pedro Garza Garcia coordinates
        lng: -100.4024,
      },
    },
  ]

  const mapCenter = {
    lat: 25.6506,
    lng: -100.4024,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-50 bg-white border-b">
        <div className="container mx-auto px-4 h-14 flex items-center">
          <Link href="/explore" className="flex items-center text-lg font-medium">
            <ChevronLeft className="h-5 w-5 mr-1" />
            Detalles
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <PropertyImageGallery images={propertyImages} />

            <div>
              <div className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-md mb-4">
                DEPARTAMENTOS
              </div>
              <div className="flex justify-between items-start mb-2">
                <h1 className="text-3xl font-bold">Torre estrella y Sol</h1>
                <div className="text-right">
                  <p className="text-3xl font-bold text-blue-600">{formatCurrency(8000000)}</p>
                  <p className="text-sm text-gray-500">mxn</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-gray-600 mb-4">
                <span className="text-sm">Avenida C, San Pedro Garza Garcia, N.L.</span>
              </div>

              <div className="flex items-center gap-1 mb-6">
                {[1, 2, 3, 4].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
                <Star key={5} className="w-5 h-5 text-gray-300" />
              </div>

              <div className="flex flex-wrap gap-6 mb-8">
                <PropertyFeature icon="bed" label="2 Beds" />
                <PropertyFeature icon="bath" label="3 Baths" />
                <PropertyFeature icon="area" label="24 M area" />
                <PropertyFeature icon="smoking" label="Smoking Area" />
                <PropertyFeature icon="kitchen" label="Kitchen" />
                <PropertyFeature icon="balcony" label="Balcony" />
                <PropertyFeature icon={Wifi} label="Wifi" />
                <PropertyFeature icon={Car} label="Parking Area" />
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Descripción</h2>
                <p className="text-gray-600">{showFullDescription ? description : `${description.slice(0, 150)}...`}</p>
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  {showFullDescription ? "Leer menos" : "Leer más"}
                </button>
              </div>

              <AmenitiesSection />

              <div className="mt-8">
                <ReviewsSection />
              </div>

              <div className="mt-8">
                <SimilarProperties />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>RO</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">Raúl Orozco</h3>
                    <p className="text-sm text-gray-500">ASESOR HOMEPTY</p>
                    <p className="text-sm text-gray-500">SAN PEDRO GARZA GARCIA</p>
                    <p className="text-sm text-gray-500">12 PROPIEDADES</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full gap-2" variant="outline">
                  <MessageSquare className="h-4 w-4" />
                  Mensaje
                </Button>
                <Button className="w-full gap-2">
                  <Phone className="h-4 w-4" />
                  Llamar
                </Button>
              </div>
            </Card>

            <Button className="w-full" size="lg" onClick={() => router.push("/activities/schedule")}>
              Agendar
            </Button>

            <Card className="overflow-hidden">
              <div className="h-[300px] relative">
                <ExpandableMap properties={mapProperties} center={mapCenter} zoom={15} />
              </div>
            </Card>

            <div className="space-y-6">
              <ValueMosaic />
              <CreditSimulator />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

