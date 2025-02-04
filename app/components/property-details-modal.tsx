import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface PropertyDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  property: {
    name: string
    orderId: string
  }
}

export function PropertyDetailsModal({ isOpen, onClose, property }: PropertyDetailsModalProps) {
  // Mock data for leasing information and payment history
  const leasingInfo = {
    startDate: "2023-01-01",
    endDate: "2024-01-01",
    monthlyRent: "$1,500",
    securityDeposit: "$2,000",
  }

  const paymentHistory = [
    { date: "2023-12-01", amount: "$1,500", status: "Paid" },
    { date: "2023-11-01", amount: "$1,500", status: "Paid" },
    { date: "2023-10-01", amount: "$1,500", status: "Paid" },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{property.name} - Detalles de Arrendamiento</DialogTitle>
          <DialogDescription>Order ID: {property.orderId}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] overflow-auto">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Información de Arrendamiento</h3>
              <div className="grid grid-cols-2 gap-2">
                <p>Fecha de inicio: {leasingInfo.startDate}</p>
                <p>Fecha de finalización: {leasingInfo.endDate}</p>
                <p>Renta mensual: {leasingInfo.monthlyRent}</p>
                <p>Depósito de seguridad: {leasingInfo.securityDeposit}</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Historial de Pagos</h3>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left">Fecha</th>
                    <th className="text-left">Monto</th>
                    <th className="text-left">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((payment, index) => (
                    <tr key={index}>
                      <td>{payment.date}</td>
                      <td>{payment.amount}</td>
                      <td>{payment.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScrollArea>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogContent>
    </Dialog>
  )
}

