import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { AssistantSelector } from "./assistant-selector"

interface WelcomeScreenProps {
  onStart: (assistantId: string) => void
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold">Bienvenido a tu Asistente Inmobiliario</CardTitle>
          <CardDescription className="text-base">Tu experto inmobiliario disponible 24/7</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <AssistantSelector onSelect={(assistant) => onStart(assistant.id)} />
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button size="lg" className="px-8 py-6 text-base" onClick={() => onStart("general")}>
            Comenzar Chat
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

