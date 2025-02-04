import { Check } from "lucide-react"

interface Amenity {
  name: string
  available: boolean
}

const amenities: Amenity[] = [
  { name: "Gimnasio", available: true },
  { name: "Business Center", available: true },
  { name: "Elevador", available: true },
  { name: "Asoleadero", available: true },
  { name: "Alberca", available: true },
  { name: "CoWorking", available: true },
  { name: "Terraza", available: true },
  { name: "Salón de eventos", available: true },
  { name: "Estacionamiento de Visitantes", available: true },
  { name: "Vigilancia 24 Hrs", available: true },
  { name: "Asador", available: true },
  { name: "Zona de Mascotas", available: true },
  { name: "Zonas Verdes", available: true },
]

export function AmenitiesSection() {
  const midPoint = Math.ceil(amenities.length / 2)
  const leftColumn = amenities.slice(0, midPoint)
  const rightColumn = amenities.slice(midPoint)

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Amenidades</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
        <div className="space-y-2">
          {leftColumn.map((amenity) => (
            <div key={amenity.name} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-gray-600 text-sm">{amenity.name}</span>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {rightColumn.map((amenity) => (
            <div key={amenity.name} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-gray-600 text-sm">{amenity.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

