"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Settings2, Bed, Bath, Square } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function SchedulePage() {
  const [date, setDate] = useState<Date>(new Date(2025, 0, 30))

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link href="/activities" className="text-gray-500 hover:text-gray-700">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-semibold">Agendas</h1>
        </div>
        <Button variant="ghost" size="icon">
          <Settings2 className="h-5 w-5" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revisar Calendario</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Solicitud</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Please Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Opción 1</SelectItem>
                    <SelectItem value="option2">Opción 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" placeholder="Nombre Completo" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="areaCode">Codigo de area</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Please Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="52">+52</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Numero de telefono</Label>
                  <Input id="phone" placeholder="985-1289" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo</Label>
                <Input id="email" type="email" placeholder="Email" />
              </div>

              <div className="space-y-2">
                <Label>Metodo de pago</Label>
                <div className="grid grid-cols-4 gap-2">
                  <Button variant="outline" className="w-full">
                    Contado
                  </Button>
                  <Button variant="outline" className="w-full">
                    Credito
                  </Button>
                  <Button variant="outline" className="w-full">
                    Leasing
                  </Button>
                  <Button variant="outline" className="w-full">
                    Otro
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detalles de la solicitud</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="aspect-video relative rounded-lg overflow-hidden">
              <Image src="/placeholder.svg" alt="Property" fill className="object-cover" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg">Star Sun desarrollo</h3>
                <span className="text-blue-600 font-medium">$80</span>
              </div>

              <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
                <span>Saltillo, COAH</span>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-1">
                  <Bed className="h-4 w-4" />
                  <span>2</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bath className="h-4 w-4" />
                  <span>3</span>
                </div>
                <div className="flex items-center gap-1">
                  <Square className="h-4 w-4" />
                  <span>24M</span>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Visita</span>
                  <span>15 Jan 2022</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cierre</span>
                  <span>15 Jan 2022</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-lg font-semibold mb-6">
                <span>Total</span>
                <span className="text-blue-600">$4,000,000</span>
              </div>

              <Button className="w-full">Agendar</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

