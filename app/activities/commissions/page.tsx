"use client"

import { useState } from "react"
import { CommissionFilters, type CommissionFilters as CommissionFiltersType } from "../../components/commission-filters"
import { CommissionDetails } from "../../components/commission-details"
import { RentalPaymentDashboard } from "../../components/rental-payment-dashboard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Sample commission data
const sampleCommission = {
  id: "1",
  orderId: "10023423",
  propertyName: "Metro Jayakarta",
  dates: {
    visit: "21 Dec 2021",
    closure: "24 Dec 2021",
  },
  client: "Mr. Alverto Flore",
  property: {
    name: "Metro Jayakarta",
    location: "Saltillo, COAH",
    specs: {
      beds: 2,
      baths: 3,
      area: "24M",
    },
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GNlKqIHckpbpXFj9tMRlgVMvM2LSHn.png",
  },
  amounts: {
    commission: 40000,
    taxes: 6400,
    total: 33600,
  },
}

export default function CommissionsPage() {
  const [activeFilters, setActiveFilters] = useState<CommissionFiltersType>({
    type: "all",
    category: "all",
    dateRange: {
      from: undefined,
      to: undefined,
    },
    status: "all",
  })

  return (
    <div className="container mx-auto py-6">
      <Tabs defaultValue="commissions" className="space-y-6">
        <TabsList>
          <TabsTrigger value="commissions">Comisiones</TabsTrigger>
          <TabsTrigger value="rental-payments">Pagos de Alquiler</TabsTrigger>
        </TabsList>

        <TabsContent value="commissions">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mis Comisiones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <CommissionFilters onFilterChange={setActiveFilters} />
              </CardContent>
            </Card>

            <CommissionDetails commission={sampleCommission} />
          </div>
        </TabsContent>

        <TabsContent value="rental-payments">
          <RentalPaymentDashboard />
        </TabsContent>
      </Tabs>
    </div>
  )
}

