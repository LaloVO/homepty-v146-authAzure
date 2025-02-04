"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { signUp } from "@/lib/auth"

export default function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    city: "",
    email: "",
    password: "",
    agreeTerms: false,
  })
  const [error, setError] = useState("")
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

    if (!formData.agreeTerms) {
      setError("Debes aceptar los términos y condiciones")
      return
    }

    try {
      await signUp(formData.email, formData.password, formData.fullName, formData.city)
      router.push("/dashboard") // Redirect to dashboard after successful signup
    } catch (err) {
      setError("Error al crear la cuenta. Por favor, inténtalo de nuevo.")
      console.error(err)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Crea tu cuenta Gratis</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                name="fullName"
                placeholder="Nombre completo"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Input name="city" placeholder="Ciudad" value={formData.city} onChange={handleChange} required />
            </div>
            <div>
              <Input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Input
                name="password"
                type="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, agreeTerms: checked as boolean }))}
              />
              <label htmlFor="terms" className="text-sm text-gray-500">
                Acepto los términos y condiciones
              </label>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full">
              Registrarse
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-500">
            ¿Ya tienes una cuenta?{" "}
            <a href="/signin" className="text-blue-500">
              Inicia sesión
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

