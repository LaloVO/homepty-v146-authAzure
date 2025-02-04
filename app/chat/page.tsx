"use client"

import { useState } from "react"
import { ChatSidebar } from "./components/chat-sidebar"
import { ChatMain } from "./components/chat-main"

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>("raul-orozco")

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-white">
      <ChatSidebar selectedChat={selectedChat} onSelectChat={setSelectedChat} />
      <ChatMain selectedChat={selectedChat} />
    </div>
  )
}

