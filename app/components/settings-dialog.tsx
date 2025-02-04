"use client"

import {
  Bell,
  Navigation,
  Home,
  Paintbrush,
  MessageSquare,
  Globe,
  Accessibility,
  Check,
  Video,
  Link2,
  Lock,
  SettingsIcon,
  X,
  ChevronUp,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import type React from "react" // Added import for React
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface SettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type SettingsCategory = {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const categories: SettingsCategory[] = [
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "navigation", label: "Navigation", icon: Navigation },
  { id: "home", label: "Home", icon: Home },
  { id: "appearance", label: "Appearance", icon: Paintbrush },
  { id: "messages", label: "Messages & media", icon: MessageSquare },
  { id: "language", label: "Language & region", icon: Globe },
  { id: "accessibility", label: "Accessibility", icon: Accessibility },
  { id: "mark-read", label: "Mark as read", icon: Check },
  { id: "audio-video", label: "Audio & video", icon: Video },
  { id: "connected-accounts", label: "Connected accounts", icon: Link2 },
  { id: "privacy", label: "Privacy & visibility", icon: Lock },
  { id: "advanced", label: "Advanced", icon: SettingsIcon },
]

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const [selectedCategory, setSelectedCategory] = useState("messages")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 gap-0">
        <DialogHeader className="p-4 border-b">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Settings</span>
            <span>/</span>
            <span>{categories.find((c) => c.id === selectedCategory)?.label}</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full p-4 h-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>EV</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">Eduardo Villalobos</span>
                    <span className="text-xs text-gray-500">Mi cuenta</span>
                  </div>
                </div>
                <ChevronUp className="h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <a href="#">Profile</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="#">Settings</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="#">Logout</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="flex h-[600px]">
          <div className="w-[240px] border-r p-2">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm font-medium transition-colors",
                    selectedCategory === category.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {category.label}
                </button>
              )
            })}
          </div>
          <div className="flex-1 p-6">
            <h2 className="text-lg font-medium mb-4">
              Content for {categories.find((c) => c.id === selectedCategory)?.label}
            </h2>
            <p className="text-muted-foreground">
              Configure your {categories.find((c) => c.id === selectedCategory)?.label.toLowerCase()} settings here.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

