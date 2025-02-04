"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, Upload, GripHorizontal, X, ArrowLeft } from "lucide-react"
import Image from "next/image"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PropertyImage {
  id: string
  url: string
}

interface PropertyCharacteristics {
  action: string
  use: string
  propertyType: string
  price: string
  city: string
  state: string
  postalCode: string
  zone: string
  area: string
  bedrooms: string
  bathrooms: string
  parking: string
  builtArea: string
  floors: string
  address: string
  neighborhood: string
  references: string
}

interface PropertyDocument {
  name: string
  file: File | null
}

export function AddPropertyDialog() {
  const [step, setStep] = useState(1)
  const [images, setImages] = useState<PropertyImage[]>([])
  const [descriptions, setDescriptions] = useState({
    property: "",
    condition: "",
    investment: "",
  })
  const [characteristics, setCharacteristics] = useState<PropertyCharacteristics>({
    action: "",
    use: "",
    propertyType: "",
    price: "",
    city: "",
    state: "",
    postalCode: "",
    zone: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    parking: "",
    builtArea: "",
    floors: "",
    address: "",
    neighborhood: "",
    references: "",
  })
  const [documents, setDocuments] = useState<PropertyDocument[]>([
    { name: "Título de propiedad", file: null },
    { name: "Identificación oficial", file: null },
    { name: "Comprobante de domicilio", file: null },
    { name: "No Gravamen", file: null },
    { name: "Liberación de crédito", file: null },
    { name: "Constancia predial", file: null },
  ])
  const [open, setOpen] = useState(false)
  const [propertyStatus, setPropertyStatus] = useState<"Holding" | "Pending" | "Published">("Holding")
  const onClose = () => setOpen(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        url: URL.createObjectURL(file),
      }))
      setImages((prev) => [...prev, ...newImages])
    }
  }

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id))
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(images)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setImages(items)
  }

  const handleNext = () => {
    if (descriptions.property && descriptions.condition && descriptions.investment) {
      setStep(2)
    }
  }

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1)
  }

  const handleCharacteristicChange = (name: string, value: string) => {
    setCharacteristics((prev) => ({ ...prev, [name]: value }))
  }

  const handleDocumentUpload = (documentName: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setDocuments((prevDocs) => prevDocs.map((doc) => (doc.name === documentName ? { ...doc, file } : doc)))
    }
  }

  const handleSaveProperty = () => {
    // Here you would typically save the property data to your backend
    console.log("Saving property...")

    // Check if all documents are uploaded
    const allDocumentsUploaded = documents.every((doc) => doc.file !== null)

    if (allDocumentsUploaded) {
      setPropertyStatus("Published")
    } else {
      setPropertyStatus("Pending")
    }

    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2" onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4" />
          Agregar Propiedad
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="text-2xl">
            {step === 1 ? "Sube tu propiedad" : step === 2 ? "Características de la propiedad" : "Detalles ocultos"}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <div className="px-6 py-4 space-y-6">
            {step === 1 && (
              <>
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">
                      {images.length > 0
                        ? `${images.length} ${images.length === 1 ? "imagen subida" : "imágenes subidas"}`
                        : "No hay imágenes"}
                    </span>
                    <label htmlFor="image-upload">
                      <Button variant="outline" className="gap-2" asChild>
                        <span>
                          <Upload className="h-4 w-4" />
                          Agregar fotos
                        </span>
                      </Button>
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </div>

                  <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="images" direction="horizontal">
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="grid grid-cols-2 md:grid-cols-4 gap-4"
                        >
                          {images.map((image, index) => (
                            <Draggable key={image.id} draggableId={image.id} index={index}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  className="relative aspect-square group"
                                >
                                  <div className="absolute inset-0 rounded-lg overflow-hidden">
                                    <Image
                                      src={image.url || "/placeholder.svg"}
                                      alt="Property"
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <button
                                    onClick={() => removeImage(image.id)}
                                    className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                  <div
                                    {...provided.dragHandleProps}
                                    className="absolute top-2 left-2 p-1 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-move"
                                  >
                                    <GripHorizontal className="h-4 w-4" />
                                  </div>
                                  {index === 0 && (
                                    <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 rounded-md text-white text-xs">
                                      Foto principal
                                    </div>
                                  )}
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                          {Array.from({ length: Math.max(0, 8 - images.length) }).map((_, i) => (
                            <div
                              key={`empty-${i}`}
                              className="aspect-square rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center"
                            >
                              <Upload className="h-8 w-8 text-gray-400" />
                            </div>
                          ))}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">
                      Describe la propiedad
                    </label>
                    <Textarea
                      id="description"
                      placeholder="Hermosa casa de 3 recámaras en venta ubicada en zona residencial

Esta elegante propiedad cuenta con acabados de primera calidad y amplios espacios. La casa tiene 250m2 de construcción en un terreno de 400m2. Cuenta con sala, comedor, cocina integral equipada, 3 recámaras (la principal con baño y vestidor), 2.5 baños, área de lavado, jardín, terraza y cochera techada para 2 autos.

La casa está ubicada en una tranquila zona residencial con vigilancia 24/7, cerca de escuelas, supermercados, hospitales y vías rápidas de acceso. Ideal para familias que buscan comodidad y seguridad."
                      value={descriptions.property}
                      onChange={(e) => setDescriptions((prev) => ({ ...prev, property: e.target.value }))}
                      className="h-32 resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="condition" className="text-sm font-medium">
                      Describe el estado de la propiedad
                    </label>
                    <Textarea
                      id="condition"
                      placeholder="La propiedad se encuentra en excelente estado de conservación

Casa con 5 años de antigüedad, mantenimiento regular, pintura reciente, instalaciones en perfecto funcionamiento. Sin necesidad de reparaciones o remodelaciones mayores."
                      value={descriptions.condition}
                      onChange={(e) => setDescriptions((prev) => ({ ...prev, condition: e.target.value }))}
                      className="h-24 resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="investment" className="text-sm font-medium">
                      Describe la inversión
                    </label>
                    <Textarea
                      id="investment"
                      placeholder="Excelente oportunidad de inversión

Precio de venta: $4,500,000 MXN. La propiedad tiene alto potencial de plusvalía por desarrollo de la zona. Ideal tanto para vivir como para rentar, con retorno estimado de inversión del 6% anual por renta."
                      value={descriptions.investment}
                      onChange={(e) => setDescriptions((prev) => ({ ...prev, investment: e.target.value }))}
                      className="h-24 resize-none"
                    />
                  </div>

                  <div className="flex justify-between items-center mt-6">
                    <Button variant="outline" onClick={onClose}>
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={!descriptions.property || !descriptions.condition || !descriptions.investment}
                    >
                      Siguiente
                    </Button>
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Clasificación de la propiedad</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="action">Acción</Label>
                      <Select onValueChange={(value) => handleCharacteristicChange("action", value)}>
                        <SelectTrigger id="action">
                          <SelectValue placeholder="Seleccionar acción" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="venta">Venta</SelectItem>
                          <SelectItem value="renta">Renta</SelectItem>
                          <SelectItem value="traspaso">Traspaso</SelectItem>
                          <SelectItem value="pre-venta">Pre-venta</SelectItem>
                          <SelectItem value="aportacion">Aportación</SelectItem>
                          <SelectItem value="remate">Remate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="use">Uso</Label>
                      <Select onValueChange={(value) => handleCharacteristicChange("use", value)}>
                        <SelectTrigger id="use">
                          <SelectValue placeholder="Seleccionar uso" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="residencial">Residencial</SelectItem>
                          <SelectItem value="comercial">Comercial</SelectItem>
                          <SelectItem value="industrial">Industrial</SelectItem>
                          <SelectItem value="mixto">Mixto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="propertyType">Tipo de propiedad</Label>
                      <Select onValueChange={(value) => handleCharacteristicChange("propertyType", value)}>
                        <SelectTrigger id="propertyType">
                          <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="casa">Casa</SelectItem>
                          <SelectItem value="departamento">Departamento</SelectItem>
                          <SelectItem value="terreno">Terreno</SelectItem>
                          <SelectItem value="oficina">Oficina</SelectItem>
                          <SelectItem value="local">Local comercial</SelectItem>
                          <SelectItem value="bodega">Bodega</SelectItem>
                          <SelectItem value="loft">Loft</SelectItem>
                          <SelectItem value="lote">Lote</SelectItem>
                          <SelectItem value="nave-industrial">Nave industrial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Ubicación y precio</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Precio</Label>
                      <Input
                        id="price"
                        placeholder="Ej: 1500000"
                        value={characteristics.price}
                        onChange={(e) => handleCharacteristicChange("price", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Ciudad</Label>
                      <Input
                        id="city"
                        placeholder="Ej: Monterrey"
                        value={characteristics.city}
                        onChange={(e) => handleCharacteristicChange("city", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">Estado</Label>
                      <Select onValueChange={(value) => handleCharacteristicChange("state", value)}>
                        <SelectTrigger id="state">
                          <SelectValue placeholder="Seleccionar estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="aguascalientes">Aguascalientes</SelectItem>
                          <SelectItem value="baja-california">Baja California</SelectItem>
                          <SelectItem value="baja-california-sur">Baja California Sur</SelectItem>
                          <SelectItem value="campeche">Campeche</SelectItem>
                          <SelectItem value="chiapas">Chiapas</SelectItem>
                          <SelectItem value="chihuahua">Chihuahua</SelectItem>
                          <SelectItem value="coahuila">Coahuila</SelectItem>
                          <SelectItem value="colima">Colima</SelectItem>
                          <SelectItem value="durango">Durango</SelectItem>
                          <SelectItem value="guanajuato">Guanajuato</SelectItem>
                          <SelectItem value="guerrero">Guerrero</SelectItem>
                          <SelectItem value="hidalgo">Hidalgo</SelectItem>
                          <SelectItem value="jalisco">Jalisco</SelectItem>
                          <SelectItem value="mexico">México</SelectItem>
                          <SelectItem value="michoacan">Michoacán</SelectItem>
                          <SelectItem value="morelos">Morelos</SelectItem>
                          <SelectItem value="nayarit">Nayarit</SelectItem>
                          <SelectItem value="nuevo-leon">Nuevo León</SelectItem>
                          <SelectItem value="oaxaca">Oaxaca</SelectItem>
                          <SelectItem value="puebla">Puebla</SelectItem>
                          <SelectItem value="queretaro">Querétaro</SelectItem>
                          <SelectItem value="quintana-roo">Quintana Roo</SelectItem>
                          <SelectItem value="san-luis-potosi">San Luis Potosí</SelectItem>
                          <SelectItem value="sinaloa">Sinaloa</SelectItem>
                          <SelectItem value="sonora">Sonora</SelectItem>
                          <SelectItem value="tabasco">Tabasco</SelectItem>
                          <SelectItem value="tamaulipas">Tamaulipas</SelectItem>
                          <SelectItem value="tlaxcala">Tlaxcala</SelectItem>
                          <SelectItem value="veracruz">Veracruz</SelectItem>
                          <SelectItem value="yucatan">Yucatán</SelectItem>
                          <SelectItem value="zacatecas">Zacatecas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Código Postal</Label>
                      <Input
                        id="postalCode"
                        placeholder="Ej: 64000"
                        value={characteristics.postalCode}
                        onChange={(e) => handleCharacteristicChange("postalCode", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zone">Zona</Label>
                      <Input
                        id="zone"
                        placeholder="Ej: Centro"
                        value={characteristics.zone}
                        onChange={(e) => handleCharacteristicChange("zone", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Detalles de la propiedad</h3>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="area">Área total (m²)</Label>
                      <Input
                        id="area"
                        name="area"
                        type="number"
                        placeholder="250"
                        value={characteristics.area}
                        onChange={(e) => handleCharacteristicChange("area", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="builtArea">Área construida (m²)</Label>
                      <Input
                        id="builtArea"
                        name="builtArea"
                        type="number"
                        placeholder="200"
                        value={characteristics.builtArea}
                        onChange={(e) => handleCharacteristicChange("builtArea", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="floors">Número de plantas</Label>
                      <Input
                        id="floors"
                        name="floors"
                        type="number"
                        placeholder="2"
                        value={characteristics.floors}
                        onChange={(e) => handleCharacteristicChange("floors", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bedrooms">Habitaciones</Label>
                      <Input
                        id="bedrooms"
                        name="bedrooms"
                        type="number"
                        placeholder="3"
                        value={characteristics.bedrooms}
                        onChange={(e) => handleCharacteristicChange("bedrooms", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bathrooms">Baños</Label>
                      <Input
                        id="bathrooms"
                        name="bathrooms"
                        type="number"
                        placeholder="2.5"
                        value={characteristics.bathrooms}
                        onChange={(e) => handleCharacteristicChange("bathrooms", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="parking">Estacionamientos</Label>
                      <Input
                        id="parking"
                        name="parking"
                        type="number"
                        placeholder="2"
                        value={characteristics.parking}
                        onChange={(e) => handleCharacteristicChange("parking", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-6 border-t">
                  <div className="space-x-2">
                    <Button variant="outline" onClick={onClose}>
                      Cancelar
                    </Button>
                    <Button variant="outline" onClick={handleBack}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Atrás
                    </Button>
                  </div>
                  <Button onClick={() => setStep(3)}>Siguiente</Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Detalles ocultos</h3>
                  <p className="text-sm text-gray-500">
                    La información proporcionada en esta sección estará oculta y protegida. No se mostrará públicamente.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Dirección</Label>
                      <Input
                        id="address"
                        placeholder="Ej: Av. Constitución 123"
                        value={characteristics.address}
                        onChange={(e) => handleCharacteristicChange("address", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="neighborhood">Colonia</Label>
                      <Input
                        id="neighborhood"
                        placeholder="Ej: Centro"
                        value={characteristics.neighborhood}
                        onChange={(e) => handleCharacteristicChange("neighborhood", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="references">Referencias</Label>
                      <Textarea
                        id="references"
                        placeholder="Ej: Frente al parque municipal, a dos cuadras de la escuela primaria"
                        value={characteristics.references}
                        onChange={(e) => handleCharacteristicChange("references", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Verificación de documentos</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Documento</th>
                          <th className="text-right py-2">Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        {documents.map((doc) => (
                          <tr key={doc.name} className="border-b">
                            <td className="py-2">{doc.name}</td>
                            <td className="text-right py-2">
                              <label htmlFor={`upload-${doc.name}`} className="cursor-pointer">
                                <Button variant="outline" size="sm" className="gap-2">
                                  <Upload className="h-4 w-4" />
                                  {doc.file ? "Cambiar archivo" : "Subir archivo"}
                                </Button>
                              </label>
                              <input
                                type="file"
                                id={`upload-${doc.name}`}
                                className="hidden"
                                accept=".png,.jpg,.pdf"
                                onChange={(e) => handleDocumentUpload(doc.name, e)}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-6 border-t">
                  <div className="space-x-2">
                    <Button variant="outline" onClick={onClose}>
                      Cancelar
                    </Button>
                    <Button variant="outline" onClick={() => setStep(2)}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Atrás
                    </Button>
                  </div>
                  <Button onClick={handleSaveProperty}>Guardar propiedad</Button>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

