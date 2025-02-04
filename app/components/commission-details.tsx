"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Ticket, FileText, Trash2, MapPin, Bed, Bath, Square } from "lucide-react"
import Image from "next/image"
import { formatCurrency } from "@/lib/utils"

interface CommissionDetailsProps {
  commission?: {
    id: string
    orderId: string
    propertyName: string
    dates: {
      visit: string
      closure: string
    }
    client: string
    property: {
      name: string
      location: string
      specs: {
        beds: number
        baths: number
        area: string
      }
      image: string
    }
    amounts: {
      commission: number
      taxes: number
      total: number
    }
  }
}

export function CommissionDetails({ commission }: CommissionDetailsProps) {
  if (!commission) return null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xl">Metro Jayakarta</CardTitle>
            <div className="text-sm text-muted-foreground">Order ID: {commission.orderId}</div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="flex items-center justify-between gap-4">
                <Button variant="outline" className="flex-1 gap-2">
                  <Ticket className="h-4 w-4" />
                  Revisar pago
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <FileText className="h-4 w-4" />
                  Comprobante de pago
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <Trash2 className="h-4 w-4" />
                  Borrar
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Detalles de la Operación</h3>
              <div className="grid gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Visita</span>
                  <span>{commission.dates.visit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cierre</span>
                  <span>{commission.dates.closure}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cliente</span>
                  <span>{commission.client}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Propiedad</span>
                  <span>{commission.property.name}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Total comisionado</h3>
              <div className="grid gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Comisión</span>
                  <span>{formatCurrency(commission.amounts.commission)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Impuestos</span>
                  <span>{formatCurrency(commission.amounts.taxes)}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>TOTAL PAYMENT</span>
                  <span className="text-primary">{formatCurrency(commission.amounts.total)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardContent className="p-0">
            <div className="relative aspect-video">
              <Image
                src={commission.property.image || "/placeholder.svg"}
                alt={commission.property.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-md mb-4">
                DEPARTAMENTO
              </div>
              <h3 className="font-semibold text-lg mb-2">{commission.property.name}</h3>
              <div className="flex items-center gap-1 text-muted-foreground text-sm mb-4">
                <MapPin className="h-4 w-4" />
                <span>{commission.property.location}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Bed className="h-4 w-4" />
                  <span>{commission.property.specs.beds}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bath className="h-4 w-4" />
                  <span>{commission.property.specs.baths}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Square className="h-4 w-4" />
                  <span>{commission.property.specs.area}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Ubicación</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="aspect-[4/3] relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3600.2300974257577!2d-100.9583!3d25.4234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDI1JzI0LjIiTiAxMDDCsDU3JzI5LjkiVw!5e0!3m2!1sen!2s!4v1635787245123!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="absolute inset-0"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

