"use client"

import { ChevronRight, Calendar, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PropertyDetailsModal } from "../../components/property-details-modal"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Property {
  id: string
  orderId: string
  name: string
  room: string
  dates: string
  image: string
  status: "administrado" | "cancelado" | "pendiente"
  type: "unidad_departamento" | "casa_habitacion" | "proyecto_desarrollo" | "proyecto_preventa" | "proyecto_terminado"
}

const managedProperties: Property[] = [
  {
    id: "1",
    orderId: "10043432",
    name: "Estrella y Sol Departamento",
    room: "1005",
    dates: "Jan 30, 2025 - Jan 30, 2025",
    image: "/placeholder.svg",
    status: "administrado",
    type: "unidad_departamento",
  },
  {
    id: "4",
    orderId: "32112333",
    name: "Torre Moderna",
    room: "N/A",
    dates: "Feb 15, 2025 - Feb 15, 2026",
    image: "/placeholder.svg",
    status: "administrado",
    type: "proyecto_preventa",
  },
  {
    id: "5",
    orderId: "32112334",
    name: "Plaza Comercial Centro",
    room: "N/A",
    dates: "Mar 1, 2025 - Mar 1, 2026",
    image: "/placeholder.svg",
    status: "administrado",
    type: "proyecto_terminado",
  },
]

const historyProperties: Property[] = [
  {
    id: "2",
    orderId: "10043132",
    name: "Metro Jayakarta",
    room: "3",
    dates: "Jan 30, 2025 - Jan 30, 2025",
    image: "/placeholder.svg",
    status: "cancelado",
    type: "unidad_departamento",
  },
  {
    id: "3",
    orderId: "32112332",
    name: "Green living",
    room: "3",
    dates: "Jan 30, 2025 - Jan 30, 2025",
    image: "/placeholder.svg",
    status: "pendiente",
    type: "unidad_departamento",
  },
]

export default function ManagementPage() {
  const [adminFilter, setAdminFilter] = useState<"all" | "individual" | "multiple">("all")
  const [adminTypeFilter, setAdminTypeFilter] = useState<
    | "all"
    | "unidad_departamento"
    | "casa_habitacion"
    | "proyecto_desarrollo"
    | "proyecto_preventa"
    | "proyecto_terminado"
  >("all")
  const [historyFilter, setHistoryFilter] = useState<"all" | "cancelado" | "pendiente">("all")
  const [selectedPropertyForModal, setSelectedPropertyForModal] = useState<Property | null>(null)

  const filteredManagedProperties = managedProperties
    .filter((p) => {
      if (adminFilter === "all") return true
      if (adminFilter === "individual") return p.type === "unidad_departamento" || p.type === "casa_habitacion"
      if (adminFilter === "multiple") return p.type.startsWith("proyecto_")
      return true
    })
    .filter((p) => adminTypeFilter === "all" || p.type === adminTypeFilter)

  const filteredHistoryProperties = historyProperties.filter(
    (p) => historyFilter === "all" || p.status === historyFilter,
  )

  const PropertyCard = ({ property, showFavorite = false }: { property: Property; showFavorite?: boolean }) => {
    return (
      <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
        <div className="relative w-48 h-32 rounded-lg overflow-hidden">
          <Image src={property.image || "/placeholder.svg"} alt={property.name} fill className="object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Order ID: {property.orderId}</p>
              <h3 className="text-lg font-semibold mt-1">{property.name}</h3>
              <p className="text-sm text-gray-600">{property.room} Room</p>
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                <Calendar className="h-4 w-4" />
                <span>{property.dates}</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setSelectedPropertyForModal(property)}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <Button variant="secondary" size="sm">
              Volver a publicar
            </Button>
            <Badge variant={property.status === "administrado" ? "default" : "destructive"} className="uppercase">
              {property.status}
            </Badge>
          </div>
        </div>
        {showFavorite && property.name === "Green living" && (
          <Button variant="ghost" size="icon" className="absolute top-4 right-14 text-red-500 hover:text-red-600">
            <Heart className="h-5 w-5" />
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      {/* Managed Properties Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Mis Administraciones</h2>
          <div className="flex gap-4">
            <Select onValueChange={(value) => setAdminFilter(value as typeof adminFilter)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tipo de administración" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="individual">Administración individual</SelectItem>
                <SelectItem value="multiple">Administración múltiple</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => setAdminTypeFilter(value as typeof adminTypeFilter)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tipo de propiedad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="unidad_departamento">Unidades departamento</SelectItem>
                <SelectItem value="casa_habitacion">Casa habitación</SelectItem>
                <SelectItem value="proyecto_desarrollo">Proyectos en desarrollo</SelectItem>
                <SelectItem value="proyecto_preventa">Proyectos en pre-venta</SelectItem>
                <SelectItem value="proyecto_terminado">Proyectos terminados</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-4">
          {filteredManagedProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>

      {/* History Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Mi Historial</h2>
          <Tabs defaultValue="all" onValueChange={(value) => setHistoryFilter(value as typeof historyFilter)}>
            <TabsList>
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="cancelado">Cancelados</TabsTrigger>
              <TabsTrigger value="pendiente">Pendientes</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="space-y-4">
          {filteredHistoryProperties.map((property) => (
            <div key={property.id} className="relative">
              <PropertyCard property={property} showFavorite />
            </div>
          ))}
        </div>
      </div>

      <PropertyDetailsModal
        isOpen={!!selectedPropertyForModal}
        onClose={() => setSelectedPropertyForModal(null)}
        property={selectedPropertyForModal || { name: "", orderId: "" }}
      />
    </div>
  )
}

