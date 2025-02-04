"use client"

import { useState } from "react"
import { Video, Phone, MoreHorizontal, Smile, Paperclip, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  sender: "user" | "other"
  timestamp: string
  image?: string
  status: "sent" | "delivered" | "read"
}

const messages: Message[] = [
  {
    id: "1",
    content: "hi i am sender. sendar checked hi i am sender. sender checked",
    sender: "user",
    timestamp: "TODAY",
    status: "read",
  },
  {
    id: "2",
    content: "",
    sender: "user",
    timestamp: "Jan 30, 2025",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9oO1PAPXE5qDU8gNf5dYLZSPMR8sda.png",
    status: "read",
  },
  {
    id: "3",
    content: "hi i am reciver. sender is not checked hi i am sender. sender checked hi i am sender. sender checked",
    sender: "other",
    timestamp: "11:15AM",
    status: "delivered",
  },
  {
    id: "4",
    content: "hi i am reciver. sender is not checked",
    sender: "other",
    timestamp: "11:15AM",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9oO1PAPXE5qDU8gNf5dYLZSPMR8sda.png",
    status: "delivered",
  },
  {
    id: "5",
    content: "hi i am sender. sender checked hi i am sender. sender checked",
    sender: "user",
    timestamp: "",
    status: "sent",
  },
]

interface ChatMainProps {
  selectedChat: string | null
}

export function ChatMain({ selectedChat }: ChatMainProps) {
  const [newMessage, setNewMessage] = useState("")

  if (!selectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Selecciona una conversación para comenzar
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/placeholder.svg" alt="Raul Orozco" />
            <AvatarFallback>RO</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">Raul Orozco</h2>
            <p className="text-sm text-gray-500">En línea</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => {
          const showTimestamp = index === 0 || messages[index - 1].timestamp !== message.timestamp
          return (
            <div key={message.id}>
              {showTimestamp && <div className="text-center text-xs text-gray-500 my-2">{message.timestamp}</div>}
              <div
                className={cn("flex", {
                  "justify-end": message.sender === "user",
                })}
              >
                <div
                  className={cn("max-w-[70%] rounded-lg p-3", {
                    "bg-primary text-primary-foreground": message.sender === "user",
                    "bg-gray-100": message.sender === "other",
                  })}
                >
                  {message.image && (
                    <img
                      src={message.image || "/placeholder.svg"}
                      alt="Chat attachment"
                      className="rounded-lg mb-2 max-w-full"
                    />
                  )}
                  {message.content && <p className="text-sm">{message.content}</p>}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Smile className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            placeholder="Write message down here..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
          />
          <Button size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

