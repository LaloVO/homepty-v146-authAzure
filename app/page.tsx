import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FilteredProperties } from "./components/filtered-properties"
import { PropertyCard } from "./components/property-card"

const mainProperties = [
  {
    id: "1",
    name: "Nuovo departamentos",
    location: "Monterrey, Mitras",
    price: "$2.4 millones",
    beds: 3,
    baths: 2,
    area: 280,
    image: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Huluu",
    location: "Monterrey, Country",
    price: "$5.6 millones",
    beds: 2,
    baths: 1,
    area: 167,
    image: "/placeholder.svg",
  },
  {
    id: "3",
    name: "Antara Live",
    location: "Monterrey, zona centro",
    price: "$4.5 millones",
    beds: 1,
    baths: 1,
    area: 112,
    image: "/placeholder.svg",
  },
  {
    id: "4",
    name: "Torre Estrella y Sol",
    location: "San Pedro Garza Garcia, N.L.",
    price: "$8.0 millones",
    beds: 2,
    baths: 3,
    area: 240,
    image: "/placeholder.svg",
  },
  {
    id: "5",
    name: "Residencial Los Pinos",
    location: "Guadalupe, N.L.",
    price: "$3.2 millones",
    beds: 3,
    baths: 2,
    area: 180,
    image: "/placeholder.svg",
  },
  {
    id: "6",
    name: "Loft Moderno",
    location: "Monterrey, Centro",
    price: "$1.8 millones",
    beds: 1,
    baths: 1,
    area: 90,
    image: "/placeholder.svg",
  },
]

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold mb-6">Encuentra las mejores propiedades</h1>
        <div className="flex flex-wrap gap-4">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Renta" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rent">Renta</SelectItem>
              <SelectItem value="buy">Compra</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Fecha" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Cualquier fecha</SelectItem>
              <SelectItem value="this-week">Esta semana</SelectItem>
              <SelectItem value="this-month">Este mes</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Por zona" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Cualquier zona</SelectItem>
              <SelectItem value="north">Norte</SelectItem>
              <SelectItem value="south">Sur</SelectItem>
              <SelectItem value="east">Este</SelectItem>
              <SelectItem value="west">Oeste</SelectItem>
            </SelectContent>
          </Select>
          <Button>Buscar</Button>
        </div>
      </div>

      <FilteredProperties />

      <div className="bg-white rounded-lg shadow-sm py-8">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-6">Todas las propiedades</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mainProperties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

