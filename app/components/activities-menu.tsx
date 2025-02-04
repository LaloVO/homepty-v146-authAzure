"use client"

import { Calendar, DollarSign, ChevronDown, Building, History } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface ActivitiesMenuProps {
  className?: string
}

const activities = [
  {
    label: "Administraciones",
    icon: Building,
    href: "/activities/management",
  },
  {
    label: "Comisiones",
    icon: DollarSign,
    href: "/activities/commissions",
  },
  {
    label: "Agenda",
    icon: Calendar,
    href: "/activities/schedule",
  },
  {
    label: "Historial",
    icon: History,
    href: "/activities/history",
  },
]

export function ActivitiesMenu({ className }: ActivitiesMenuProps) {
  const pathname = usePathname()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "flex w-full items-center justify-between py-2 px-3 text-gray-700 rounded-md hover:bg-gray-100",
          pathname.startsWith("/activities") && "bg-gray-100",
          className,
        )}
      >
        <div className="flex items-center gap-3">
          <Building className="w-4 h-4" />
          <span>Actividades</span>
        </div>
        <ChevronDown className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]" align="start" sideOffset={0}>
        {activities.map((activity) => {
          const Icon = activity.icon
          return (
            <DropdownMenuItem key={activity.href} asChild>
              <Link
                href={activity.href}
                className={cn("flex items-center gap-2", pathname === activity.href && "bg-accent")}
              >
                <Icon className="w-4 h-4" />
                {activity.label}
              </Link>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

