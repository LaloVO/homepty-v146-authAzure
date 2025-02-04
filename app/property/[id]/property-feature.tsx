import { Bed, Bath, Maximize, CigaretteIcon, UtensilsCrossed, Building, type LucideIcon } from "lucide-react"

const iconMap = {
  bed: Bed,
  bath: Bath,
  area: Maximize,
  smoking: CigaretteIcon,
  kitchen: UtensilsCrossed,
  balcony: Building,
}

interface PropertyFeatureProps {
  icon: keyof typeof iconMap | LucideIcon
  label: string
}

export function PropertyFeature({ icon, label }: PropertyFeatureProps) {
  const Icon = typeof icon === "string" ? iconMap[icon] : icon

  return (
    <div className="flex items-center gap-2 text-gray-600">
      <Icon className="w-4 h-4" />
      <span className="text-sm">{label}</span>
    </div>
  )
}

