import "./globals.css"
import { Inter } from "next/font/google"
import Sidebar from "./components/Sidebar"
import type React from "react"
import { usePathname } from "next/navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Homepty",
  description: "Real estate platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAuthPage = pathname === "/signin" || pathname === "/signup"

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-100">
          {!isAuthPage && <Sidebar />}
          <main className={`flex-1 overflow-y-auto p-4 ${isAuthPage ? "w-full" : ""}`}>{children}</main>
        </div>
      </body>
    </html>
  )
}

