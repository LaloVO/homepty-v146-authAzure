import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Bot, Building, Calculator, Search } from "lucide-react"
import type React from "react"

type Assistant = {
  id: string
  name: string
  icon: React.ElementType
  description: string
}

const assistants: Assistant[] = [
  {
    id: "property",
    name: "Información de Propiedades",
    icon: Building,
    description: "Obtén detalles sobre cualquier propiedad en nuestra plataforma",
  },
  {
    id: "market",
    name: "Análisis de Mercado",
    icon: Calculator,
    description: "Consulta precios, tendencias y valoraciones del mercado",
  },
  {
    id: "search",
    name: "Búsqueda Personalizada",
    icon: Search,
    description: "Encuentra la propiedad perfecta según tus criterios",
  },
  {
    id: "general",
    name: "Asistencia 24/7",
    icon: Bot,
    description: "Respuestas instantáneas a todas tus preguntas",
  },
]

interface AssistantSelectorProps {
  onSelect: (assistant: Assistant) => void
}

export function AssistantSelector({ onSelect }: AssistantSelectorProps) {
  const [selectedAssistant, setSelectedAssistant] = useState<string | null>(null)

  const handleSelect = (assistant: Assistant) => {
    setSelectedAssistant(assistant.id)
    onSelect(assistant)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {assistants.map((assistant) => (
        <TooltipProvider key={assistant.id}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Card
                className={cn(
                  "cursor-pointer transition-all hover:shadow-md border border-gray-100",
                  selectedAssistant === assistant.id && "ring-2 ring-primary",
                )}
                onClick={() => handleSelect(assistant)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-gray-100 p-3">
                      <assistant.icon className="h-6 w-6 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-base mb-1">{assistant.name}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{assistant.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <p>{assistant.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  )
}

