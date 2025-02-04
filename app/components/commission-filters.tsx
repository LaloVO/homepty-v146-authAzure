"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { useState } from "react"

interface CommissionFiltersProps {
  onFilterChange: (filters: CommissionFilters) => void
}

export interface CommissionFilters {
  type: "one-time" | "recurring" | "all"
  category: string
  dateRange: {
    from: Date | undefined
    to: Date | undefined
  }
  status: "pending" | "paid" | "all"
}

export function CommissionFilters({ onFilterChange }: CommissionFiltersProps) {
  const [filters, setFilters] = useState<CommissionFilters>({
    type: "all",
    category: "all",
    dateRange: {
      from: undefined,
      to: undefined,
    },
    status: "all",
  })

  const handleFilterChange = (newFilters: Partial<CommissionFilters>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <Tabs
          defaultValue="all"
          className="w-full"
          onValueChange={(value) => handleFilterChange({ type: value as CommissionFilters["type"] })}
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="one-time">One-Time</TabsTrigger>
            <TabsTrigger value="recurring">Recurrentes</TabsTrigger>
          </TabsList>
        </Tabs>

        <Select onValueChange={(value) => handleFilterChange({ category: value })}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorías</SelectItem>
            <SelectItem value="sale">Compra-venta</SelectItem>
            <SelectItem value="rental">Renta</SelectItem>
            <SelectItem value="sale-project">Proyecto de compra-venta</SelectItem>
            <SelectItem value="rental-project">Proyecto de alquiler</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => handleFilterChange({ status: value as CommissionFilters["status"] })}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="pending">Pendiente</SelectItem>
            <SelectItem value="paid">Pagado</SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[200px] justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filters.dateRange.from ? (
                filters.dateRange.to ? (
                  <>
                    {format(filters.dateRange.from, "P", { locale: es })} -{" "}
                    {format(filters.dateRange.to, "P", { locale: es })}
                  </>
                ) : (
                  format(filters.dateRange.from, "P", { locale: es })
                )
              ) : (
                <span>Seleccionar fecha</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={filters.dateRange.from}
              selected={{
                from: filters.dateRange.from,
                to: filters.dateRange.to,
              }}
              onSelect={(range) =>
                handleFilterChange({
                  dateRange: {
                    from: range?.from,
                    to: range?.to,
                  },
                })
              }
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

