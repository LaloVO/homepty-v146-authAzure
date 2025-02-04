"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { MapPin, Phone, Mail, Camera, Bed, Bath, Square, Share2, ChevronDown } from "lucide-react"
import Image from "next/image"
import { AddPropertyDialog } from "../components/add-property-dialog"
import { shareViaWhatsApp, type Property } from "../services/shareService"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const properties: Property[] = [
  {
    id: 1,
    name: "Desarrollo 1",
    location: "Saltillo, COAH",
    price: "$5.3M",
    beds: 3,
    baths: 2,
    area: "280M",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Desarrollo 2",
    location: "Monterrey, N.L.",
    price: "$5.6M",
    beds: 2,
    baths: 1,
    area: "167M",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Casa 1",
    location: "CDMX",
    price: "$4.5M",
    beds: 1,
    baths: 1,
    area: "112M",
    image: "/placeholder.svg",
  },
]

export default function Profile() {
  const handleShareCatalog = () => {
    shareViaWhatsApp(properties)
  }

  const handleShareProperty = (property: Property) => {
    shareViaWhatsApp(property)
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">Mis propiedades</h2>
          <Select defaultValue="all">
            <SelectTrigger className="w-[130px] h-9">
              <SelectValue placeholder="Filtrar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="house">Casas</SelectItem>
              <SelectItem value="apartment">Departamentos</SelectItem>
              <SelectItem value="land">Terrenos</SelectItem>
              <SelectItem value="commercial">Comercial</SelectItem>
            </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                Mis actividades
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Ver actividades</DropdownMenuItem>
              <DropdownMenuItem>Gestionar actividades</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                Mis estadísticas
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Ver estadísticas</DropdownMenuItem>
              <DropdownMenuItem>Generar reportes</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Share2 className="h-4 w-4" />
                Compartir
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleShareCatalog}>Compartir catálogo completo</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AddPropertyDialog />
        </div>
      </div>

      <Card className="relative overflow-hidden border-0">
        <div className="relative h-32 bg-gray-100">
          <Image src="/placeholder.svg" alt="Cover photo" fill className="object-cover" />
          <Button variant="secondary" size="sm" className="absolute left-4 top-4 gap-2 bg-white/80 hover:bg-white">
            <Camera className="h-4 w-4" />
            Cambiar
          </Button>
          <div className="absolute -bottom-12 left-6">
            <div className="relative">
              <div className="h-24 w-24 rounded-full border-4 border-white overflow-hidden">
                <Image src="/placeholder.svg" alt="Profile photo" width={96} height={96} className="object-cover" />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-16 px-6 pb-6">
          <h2 className="text-2xl font-semibold mb-1">Eduardo Villalobos</h2>
          <div className="space-y-2 text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="text-sm">CDMX</span>
              <span className="text-xs text-gray-400">Ubicación</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-400" />
              <span className="text-sm">52 55 7700 5432</span>
              <span className="text-xs text-gray-400">Teléfono</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-400" />
              <span className="text-sm">villalobos@homepty.info</span>
              <span className="text-xs text-gray-400">Email</span>
            </div>
          </div>
        </div>
      </Card>

      <div>
        <ScrollArea className="w-full whitespace-nowrap rounded-lg">
          <div className="flex w-max space-x-4 p-1">
            {properties.map((property) => (
              <Card key={property.id} className="w-[300px] shrink-0 border-0 overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <Image src={property.image || "/placeholder.svg"} alt={property.name} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{property.name}</h3>
                  <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>{property.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Bed className="h-4 w-4" />
                        <span>{property.beds}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="h-4 w-4" />
                        <span>{property.baths}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Square className="h-4 w-4" />
                        <span>{property.area}</span>
                      </div>
                    </div>
                    <span className="text-blue-600 font-semibold">{property.price}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 w-full"
                    onClick={() => handleShareProperty(property)}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Compartir
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  )
}

