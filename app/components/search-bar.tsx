"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SearchBarProps {
  searchQuery: string
  onSearchChange: (value: string) => void
}

export function SearchBar({ searchQuery, onSearchChange }: SearchBarProps) {
  return (
    <div className="flex items-center gap-2 flex-1">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
        <Input
          type="text"
          placeholder="Buscar aquí..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8 h-9"
        />
      </div>
      <Select defaultValue="all">
        <SelectTrigger className="w-[120px] h-9">
          <SelectValue placeholder="Zona" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas las zonas</SelectItem>
          <SelectItem value="north">Zona Norte</SelectItem>
          <SelectItem value="south">Zona Sur</SelectItem>
          <SelectItem value="east">Zona Este</SelectItem>
          <SelectItem value="west">Zona Oeste</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

