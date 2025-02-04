"use client"

import { useState, useCallback } from "react"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { AlertCircle, ArrowLeft, Loader2, SendHorizontal } from "lucide-react"
import { ChatMessage } from "./chat-message"
import { WelcomeScreen } from "./welcome-screen"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AIAssistant() {
  const [started, setStarted] = useState<{ status: boolean; assistantId: string | null }>({
    status: false,
    assistantId: null,
  })

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: "/api/chat",
    body: { assistantId: started.assistantId },
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content: `¡Hola! Soy tu asistente inmobiliario ${started.assistantId === "general" ? "general" : "especializado"}. ¿En qué puedo ayudarte hoy?`,
      },
    ],
  })

  const resetChat = useCallback(() => {
    // setMessages([])  This line is not needed because useChat handles this internally.
  }, [])

  const handleReturnToSelection = () => {
    setStarted({ status: false, assistantId: null })
    resetChat()
  }

  if (!started.status) {
    return <WelcomeScreen onStart={(assistantId) => setStarted({ status: true, assistantId })} onReset={resetChat} />
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>AI Asistente Inmobiliario</CardTitle>
            <Button variant="ghost" size="sm" onClick={handleReturnToSelection}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Cambiar Asistente
            </Button>
          </div>
          <CardDescription>
            Pregúntame sobre propiedades, mercado inmobiliario, consejos para comprar o vender, y más.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isLoading && (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              )}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    Lo siento, ha ocurrido un error al procesar tu mensaje. Por favor, intenta de nuevo.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Escribe tu mensaje aquí..."
              className="flex-grow"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              <SendHorizontal className="h-5 w-5" />
              <span className="sr-only">Enviar mensaje</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}

