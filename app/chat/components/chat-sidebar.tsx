"use client"

import { useState } from "react"
import { ChevronLeft, Plus, Search, Inbox, Users } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface ChatSidebarProps {
  selectedChat: string | null
  onSelectChat: (chatId: string) => void
}

const chats = [
  {
    id: "raul-orozco",
    name: "Raul Orozco",
    avatar: "/placeholder.svg",
    lastMessage: "Me avisas que te dijo tu cliente",
    timestamp: "7:30 AM",
    unread: true,
  },
  {
    id: "luis-villalobos",
    name: "Luis Villalobos",
    avatar: "/placeholder.svg",
    lastMessage: "Perfecto, te veo ahí",
    timestamp: "7:30 AM",
    unread: true,
  },
  {
    id: "karina-lopez",
    name: "Karina Lopez",
    avatar: "/placeholder.svg",
    lastMessage: "El anteproyecto está listo",
    timestamp: "7:30 AM",
    unread: true,
  },
]

export function ChatSidebar({ selectedChat, onSelectChat }: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="w-96 border-r flex flex-col bg-white">
      <div className="p-3 border-b">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="-ml-2">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">Mensajes</h1>
          </div>
          <Button size="sm" className="rounded-full bg-gray-900 text-white hover:bg-gray-800">
            <Plus className="h-4 w-4 mr-1" />
            Nuevo
          </Button>
        </div>
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="Search Message"
            className="pl-9 h-10 bg-gray-100/80 border-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-row gap-2 pb-2">
          <Button variant="outline" className="h-9 bg-gray-100/80 border-0 hover:bg-gray-200 flex-1 justify-start px-3">
            <Inbox className="h-4 w-4 mr-2 shrink-0" />
            <span className="text-sm">Bandeja de entrada</span>
          </Button>
          <Button variant="outline" className="h-9 bg-gray-100/80 border-0 hover:bg-gray-200 flex-1 justify-start px-3">
            <Users className="h-4 w-4 mr-2 shrink-0" />
            <span className="text-sm">Comunidades</span>
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <button
            key={chat.id}
            className={cn(
              "w-full flex items-start gap-3 p-4 hover:bg-gray-100 transition-colors text-left",
              selectedChat === chat.id && "bg-gray-100",
            )}
            onClick={() => onSelectChat(chat.id)}
          >
            <div className="relative">
              <Avatar>
                <AvatarImage src={chat.avatar} alt={chat.name} />
                <AvatarFallback>{chat.name[0]}</AvatarFallback>
              </Avatar>
              {chat.unread && (
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-medium">{chat.name}</span>
                <span className="text-xs text-gray-500">{chat.timestamp}</span>
              </div>
              <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

