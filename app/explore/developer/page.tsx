"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Filter, Search, X } from "lucide-react"
import { useRouter } from "next/navigation"

// Lista de estados mexicanos principales
const estados = [
  "Nuevo León",
  "Ciudad de México",
  "Jalisco",
  "Estado de México",
  "Querétaro",
  "Guanajuato",
  "Coahuila",
  "Tamaulipas",
]

// Ejemplos de colonias por ciudad (mock data)
const colonias = {
  Monterrey: ["Del Valle", "San Pedro Garza García", "Cumbres", "San Jerónimo", "Contry"],
  "Ciudad de México": ["Polanco", "Condesa", "Roma Norte", "Santa Fe", "Del Valle"],
  Guadalajara: ["Providencia", "Chapalita", "Zapopan", "Lafayette", "Americana"],
}

interface SearchFilters {
  estado: string
  ciudad: string
  tipoPropiedad: string
}

const DeveloperSearch = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [filters, setFilters] = useState<SearchFilters>({
    estado: "",
    ciudad: "",
    tipoPropiedad: "",
  })
  const [showFilters, setShowFilters] = useState(false)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery) {
      // En una aplicación real, aquí enviarías los filtros junto con la búsqueda
      router.push(`/explore/developer/property/mock-id`)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)

    // Generar sugerencias basadas en el input
    if (value) {
      // Mock de sugerencias con formato mexicano
      setSuggestions([
        `Av. Lázaro Cárdenas ${value}, Del Valle, San Pedro Garza García, 66220`,
        `Calzada San Pedro ${value}, Del Valle Oriente, Monterrey, 66220`,
        `Av. Vasconcelos ${value}, Residencial San Agustín, San Pedro Garza García, 66260`,
        `Av. Gómez Morín ${value}, Carrizalejo, San Pedro Garza García, 66254`,
      ])
    } else {
      setSuggestions([])
    }
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
          Encuentra. Idea. Desarrolla.
        </h1>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Buscar por dirección, colonia o código postal..."
                value={searchQuery}
                onChange={handleInputChange}
                className="pl-10 h-12"
              />
              {suggestions.length > 0 && (
                <div className="absolute w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
                      onClick={() => {
                        setSearchQuery(suggestion)
                        router.push(`/explore/developer/property/mock-id`)
                      }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Button variant="outline" size="icon" className="h-12 w-12" onClick={() => setShowFilters(!showFilters)}>
              {showFilters ? <X className="h-5 w-5" /> : <Filter className="h-5 w-5" />}
            </Button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
              <Select value={filters.estado} onValueChange={(value) => setFilters({ ...filters, estado: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  {estados.map((estado) => (
                    <SelectItem key={estado} value={estado}>
                      {estado}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.ciudad} onValueChange={(value) => setFilters({ ...filters, ciudad: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Ciudad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monterrey">Monterrey</SelectItem>
                  <SelectItem value="san-pedro">San Pedro Garza García</SelectItem>
                  <SelectItem value="guadalupe">Guadalupe</SelectItem>
                  <SelectItem value="escobedo">General Escobedo</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.tipoPropiedad}
                onValueChange={(value) => setFilters({ ...filters, tipoPropiedad: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de Propiedad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="terreno">Terreno</SelectItem>
                  <SelectItem value="casa">Casa</SelectItem>
                  <SelectItem value="departamento">Departamento</SelectItem>
                  <SelectItem value="comercial">Local Comercial</SelectItem>
                  <SelectItem value="industrial">Nave Industrial</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </form>

        {/* Sugerencias de búsquedas populares */}
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-500">Búsquedas populares:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["San Pedro", "Valle Oriente", "Cumbres", "Carretera Nacional", "Santa Catarina"].map((term) => (
              <Button
                key={term}
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery(term)
                  router.push(`/explore/developer/property/mock-id`)
                }}
              >
                {term}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DeveloperPage() {
  return (
    <Tabs defaultValue="developer" className="w-full h-screen flex flex-col">
      <div className="container mx-auto py-4">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-4">
          <TabsTrigger value="map" asChild>
            <Link href="/explore">Mapa</Link>
          </TabsTrigger>
          <TabsTrigger value="developer">Desarrollador</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="developer" className="flex-grow m-0 relative">
        <DeveloperSearch />
      </TabsContent>
    </Tabs>
  )
}

