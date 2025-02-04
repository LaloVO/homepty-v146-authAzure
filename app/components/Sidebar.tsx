"use client"

import Link from "next/link"
import {
  Home,
  Map,
  User,
  MessageSquare,
  Bot,
  Settings,
  ChevronUp,
  PanelLeftClose,
  PanelLeft,
  GraduationCap,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { SettingsDialog } from "./settings-dialog"
import { useState } from "react"
import { ActivitiesMenu } from "./activities-menu"
import { cn } from "@/lib/utils"

const professionals = [
  {
    name: "Juan Rodriguez",
    email: "john@email.com",
    avatar: "/placeholder.svg",
    initials: "JR",
    chatId: "juan-rodriguez",
  },
  {
    name: "Ana Morales",
    email: "anne@email.com",
    avatar: "/placeholder.svg",
    initials: "AM",
    chatId: "ana-morales",
  },
  {
    name: "Susana resendiz",
    email: "sozie@email.com",
    avatar: "/placeholder.svg",
    initials: "SR",
    chatId: "susana-resendiz",
  },
]

const Sidebar = () => {
  const [showSettings, setShowSettings] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div
      className={cn(
        "bg-white h-full flex flex-col shadow-lg transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex items-center justify-between p-4">
        <h1 className={cn("text-2xl font-bold transition-opacity duration-300", isCollapsed && "opacity-0")}>
          Homepty
        </h1>
        <Button variant="ghost" size="sm" className="h-8 w-8" onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </Button>
      </div>

      <nav className="flex-1">
        <div className="space-y-1 px-2">
          {/* Botón de expandir antes del Home */}
          {isCollapsed && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full flex justify-center py-2 px-3 text-gray-700 rounded-md hover:bg-gray-100"
              onClick={() => setIsCollapsed(false)}
            >
              <PanelLeft className="h-4 w-4" />
            </Button>
          )}

          <Link
            href="/"
            className={cn(
              "flex items-center py-2 px-3 text-gray-700 rounded-md hover:bg-gray-100",
              isCollapsed && "justify-center",
            )}
          >
            <Home className="w-4 h-4 min-w-4" />
            {!isCollapsed && <span className="ml-3">Home</span>}
          </Link>
          <Link
            href="/explore"
            className={cn(
              "flex items-center py-2 px-3 text-gray-700 rounded-md hover:bg-gray-100",
              isCollapsed && "justify-center",
            )}
          >
            <Map className="w-4 h-4 min-w-4" />
            {!isCollapsed && <span className="ml-3">Explore</span>}
          </Link>
          <Link
            href="/profile"
            className={cn(
              "flex items-center py-2 px-3 text-gray-700 rounded-md hover:bg-gray-100",
              isCollapsed && "justify-center",
            )}
          >
            <User className="w-4 h-4 min-w-4" />
            {!isCollapsed && <span className="ml-3">Profile</span>}
          </Link>
          <Link
            href="/chat"
            className={cn(
              "flex items-center py-2 px-3 text-gray-700 rounded-md hover:bg-gray-100",
              isCollapsed && "justify-center",
            )}
          >
            <MessageSquare className="w-4 h-4 min-w-4" />
            {!isCollapsed && <span className="ml-3">Chat</span>}
          </Link>
          <Link
            href="/ai-assistant"
            className={cn(
              "flex items-center py-2 px-3 text-gray-700 rounded-md hover:bg-gray-100",
              isCollapsed && "justify-center",
            )}
          >
            <Bot className="w-4 h-4 min-w-4" />
            {!isCollapsed && <span className="ml-3">AI Assistant</span>}
          </Link>
          <ActivitiesMenu />
          <Link
            href="/education"
            className={cn(
              "flex items-center py-2 px-3 text-gray-700 rounded-md hover:bg-gray-100",
              isCollapsed && "justify-center",
            )}
          >
            <GraduationCap className="w-4 h-4 min-w-4" />
            {!isCollapsed && <span className="ml-3">Educación</span>}
          </Link>
        </div>

        <Separator className="my-4" />

        {!isCollapsed && (
          <div className="px-4">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Profesionales Activos</h2>
            <div className="space-y-3">
              {professionals.map((professional) => (
                <Link
                  key={professional.email}
                  href={`/chat?id=${professional.chatId}`}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={professional.avatar} alt={professional.name} />
                    <AvatarFallback>{professional.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium leading-none">{professional.name}</span>
                    <span className="text-xs text-gray-500 leading-none">{professional.email}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      <div className="mt-auto border-t">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn("w-full h-auto flex items-center justify-between p-4", isCollapsed && "px-2")}
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>EV</AvatarFallback>
                </Avatar>
                {!isCollapsed && (
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">Eduardo Villalobos</span>
                    <span className="text-xs text-gray-500">Mi cuenta</span>
                  </div>
                )}
              </div>
              {!isCollapsed && <ChevronUp className="h-4 w-4 text-gray-500" />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[240px]">
            <Dialog>
              <DialogTrigger asChild>
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault()
                    setShowSettings(true)
                  }}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configuración</span>
                </DropdownMenuItem>
              </DialogTrigger>
            </Dialog>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Cerrar sesión</DropdownMenuItem>
          </DropdownMenuContent>
          <SettingsDialog open={showSettings} onOpenChange={setShowSettings} />
        </DropdownMenu>
      </div>
    </div>
  )
}

export default Sidebar

