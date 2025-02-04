"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Eye } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface RentalPayment {
  id: string
  propertyName: string
  tenant: string
  amount: number
  dueDate: string
  status: "paid" | "pending" | "late"
  paymentDate?: string
}

interface RentalProperty {
  id: string
  name: string
  address: string
  monthlyRent: number
  tenant: string
  leaseStart: string
  leaseEnd: string
}

export function RentalPaymentDashboard() {
  const properties: RentalProperty[] = [
    {
      id: "1",
      name: "Apartamento 301 - Torre Norte",
      address: "Av. Principal #123",
      monthlyRent: 15000,
      tenant: "Juan Pérez",
      leaseStart: "2024-01-01",
      leaseEnd: "2024-12-31",
    },
    // Add more properties as needed
  ]

  const payments: RentalPayment[] = [
    {
      id: "1",
      propertyName: "Apartamento 301 - Torre Norte",
      tenant: "Juan Pérez",
      amount: 15000,
      dueDate: "2024-02-01",
      status: "paid",
      paymentDate: "2024-02-01",
    },
    // Add more payments as needed
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Propiedades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{properties.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Mensuales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(properties.reduce((acc, prop) => acc + prop.monthlyRent, 0))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pagos Pendientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {payments.filter((payment) => payment.status === "pending").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historial de Pagos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Propiedad</TableHead>
                <TableHead>Inquilino</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Fecha de Pago</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.propertyName}</TableCell>
                  <TableCell>{payment.tenant}</TableCell>
                  <TableCell>{formatCurrency(payment.amount)}</TableCell>
                  <TableCell>{payment.dueDate}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        payment.status === "paid"
                          ? "default"
                          : payment.status === "pending"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {payment.status === "paid" ? "Pagado" : payment.status === "pending" ? "Pendiente" : "Atrasado"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="icon" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

