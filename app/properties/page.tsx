"use client"

import { useState } from "react"
import { AddPropertyDialog } from "../components/add-property-dialog"
import { PropertyStatusManager } from "../components/property-status-manager"
import { Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { shareViaWhatsApp, type Property } from "../services/shareService"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])

  const handleAddProperty = (newProperty: Property) => {
    setProperties([...properties, newProperty])
  }

  const handleStatusChange = (propertyId: number, newStatus: "Holding" | "Pending" | "Published") => {
    setProperties(properties.map((prop) => (prop.id === propertyId ? { ...prop, status: newStatus } : prop)))
  }

  const handleShareCatalog = () => {
    shareViaWhatsApp(properties)
  }

  const handleShareProperty = (property: Property) => {
    shareViaWhatsApp(property)
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Mis Propiedades</h1>
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
          <AddPropertyDialog onAddProperty={handleAddProperty} />
        </div>
      </div>
      <div className="mt-8 space-y-6">
        {properties.map((property) => (
          <div key={property.id} className="border rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{property.name}</h2>
              <Button variant="outline" size="sm" onClick={() => handleShareProperty(property)}>
                <Share2 className="h-4 w-4 mr-2" />
                Compartir
              </Button>
            </div>
            <PropertyStatusManager
              documents={property.documents}
              status={property.status as "Holding" | "Pending" | "Published"}
              onStatusChange={(newStatus) => handleStatusChange(property.id, newStatus)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

