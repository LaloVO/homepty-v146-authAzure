import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ValueMosaic() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-normal text-gray-600">
          Mosaico de valores calculado para la zona de San Pedro
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-1">
          <span className="text-sm">m2:</span>
          <span className="text-lg font-semibold">$54,477</span>
          <span className="text-sm text-gray-500">a</span>
          <span className="text-lg font-semibold">$67,609</span>
        </div>
      </CardContent>
    </Card>
  )
}

