import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface PropertyDocument {
  name: string
  file: File | null
}

interface PropertyStatusManagerProps {
  documents: PropertyDocument[]
  status: "Holding" | "Pending" | "Published"
  onStatusChange: (newStatus: "Holding" | "Pending" | "Published") => void
}

export function PropertyStatusManager({ documents, status, onStatusChange }: PropertyStatusManagerProps) {
  const [missingDocuments, setMissingDocuments] = useState<string[]>([])

  useEffect(() => {
    const missing = documents.filter((doc) => !doc.file).map((doc) => doc.name)
    setMissingDocuments(missing)
  }, [documents])

  const handlePublish = () => {
    if (missingDocuments.length === 0) {
      onStatusChange("Published")
    }
  }

  return (
    <div className="space-y-4">
      <Alert variant={status === "Published" ? "default" : "destructive"}>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Estado de la propiedad: {status}</AlertTitle>
        <AlertDescription>
          {status === "Published"
            ? "La propiedad está publicada y visible para los usuarios."
            : "La propiedad no está publicada. Complete todos los documentos requeridos para publicar."}
        </AlertDescription>
      </Alert>

      {missingDocuments.length > 0 && (
        <Alert variant="warning">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Documentos faltantes</AlertTitle>
          <AlertDescription>
            <ul className="list-disc list-inside">
              {missingDocuments.map((doc) => (
                <li key={doc}>{doc}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <Button onClick={handlePublish} disabled={missingDocuments.length > 0 || status === "Published"}>
        {status === "Published" ? "Publicado" : "Publicar"}
      </Button>
    </div>
  )
}

