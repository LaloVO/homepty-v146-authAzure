import { NextResponse } from "next/server"
import { createUser } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { email, password, fullName, city } = await request.json()

    if (!email || !password || !fullName || !city) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
    }

    const user = await createUser(email, password, fullName, city)

    return NextResponse.json({ user }, { status: 201 })
  } catch (error) {
    console.error("Error en el registro:", error)
    return NextResponse.json({ error: "Error en el registro" }, { status: 500 })
  }
}

