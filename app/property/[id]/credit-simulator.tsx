"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronRight, Minus, Plus } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

export function CreditSimulator() {
  const propertyValue = 26800000
  const [creditAmount, setCreditAmount] = useState(22780000)
  const [downPayment, setDownPayment] = useState(4556000)
  const [selectedTerm, setSelectedTerm] = useState(15)

  const handlePercentageChange = (type: "credit" | "down", increment: boolean) => {
    const step = increment ? 5 : -5
    if (type === "credit") {
      const newPercentage = Math.min(
        Math.max(((creditAmount + (propertyValue * step) / 100) / propertyValue) * 100, 0),
        100,
      )
      setCreditAmount(Math.round((propertyValue * newPercentage) / 100))
      setDownPayment(propertyValue - Math.round((propertyValue * newPercentage) / 100))
    } else {
      const newPercentage = Math.min(
        Math.max(((downPayment + (propertyValue * step) / 100) / propertyValue) * 100, 0),
        100,
      )
      setDownPayment(Math.round((propertyValue * newPercentage) / 100))
      setCreditAmount(propertyValue - Math.round((propertyValue * newPercentage) / 100))
    }
  }

  const calculateMonthlyPayment = () => {
    const annualRate = 0.106 // 10.60%
    const monthlyRate = annualRate / 12
    const numberOfPayments = selectedTerm * 12
    const monthlyPayment =
      (creditAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    return Math.round(monthlyPayment)
  }

  const monthlyPayment = calculateMonthlyPayment()
  const requiredIncome = monthlyPayment * 3

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-normal">Simulador de crédito</CardTitle>
        <p className="text-sm text-gray-500">Valor: {formatCurrency(propertyValue)}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Monto del crédito</label>
            <div className="flex gap-2">
              <Input value={formatCurrency(creditAmount)} readOnly className="text-right" />
              <div className="flex flex-col gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-6 px-2"
                  onClick={() => handlePercentageChange("credit", true)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-6 px-2"
                  onClick={() => handlePercentageChange("credit", false)}
                >
                  <Minus className="h-3 w-3" />
                </Button>
              </div>
              <div className="w-16 text-center bg-gray-50 rounded flex items-center justify-center text-sm">
                {Math.round((creditAmount / propertyValue) * 100)}%
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Enganche</label>
            <div className="flex gap-2">
              <Input value={formatCurrency(downPayment)} readOnly className="text-right" />
              <div className="flex flex-col gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-6 px-2"
                  onClick={() => handlePercentageChange("down", true)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-6 px-2"
                  onClick={() => handlePercentageChange("down", false)}
                >
                  <Minus className="h-3 w-3" />
                </Button>
              </div>
              <div className="w-16 text-center bg-gray-50 rounded flex items-center justify-center text-sm">
                {Math.round((downPayment / propertyValue) * 100)}%
              </div>
            </div>
          </div>
        </div>

        <div>
          <Button variant="outline" className="w-full">
            Combina tu crédito cofinanciado
          </Button>
          <p className="text-xs text-gray-500 mt-1">
            Utiliza tus puntos, subvenciones o crédito en INFONAVIT o FOVISSSTE
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Plazo</label>
          <div className="grid grid-cols-2 gap-2">
            {[5, 10, 15, 24].map((years) => (
              <Button
                key={years}
                variant={selectedTerm === years ? "default" : "outline"}
                onClick={() => setSelectedTerm(years)}
              >
                {years} años
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-1">Tu crédito</h3>
            <p className="text-sm">
              Mensualidades de: <span className="font-semibold">{formatCurrency(monthlyPayment)}</span>
            </p>
            <p className="text-sm">
              Comprobando ingresos de: <span className="font-semibold">{formatCurrency(requiredIncome)}</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">Tasa calculada al 10.60% de interés anual</p>
          </div>

          <Button variant="link" className="w-full text-blue-600 hover:text-blue-800">
            Accede a más opciones de crédito
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        <p className="text-xs text-blue-600">
          Entérate de todo lo que necesitas para obtener tu crédito hipotecario aquí
        </p>
      </CardContent>
    </Card>
  )
}

