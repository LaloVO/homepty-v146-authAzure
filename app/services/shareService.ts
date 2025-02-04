export interface Property {
  id: number
  name: string
  location: string
  price: string
  beds: number
  baths: number
  area: string
  image: string
}

export function generateWhatsAppMessage(properties: Property | Property[]): string {
  const baseUrl = "https://homepty.com" // Replace with your actual base URL
  let message = "¡Echa un vistazo a estas propiedades increíbles!\n\n"

  if (Array.isArray(properties)) {
    properties.forEach((property) => {
      message += `${property.name} en ${property.location}\n`
      message += `${property.beds} habitaciones, ${property.baths} baños, ${property.area}\n`
      message += `Precio: ${property.price}\n`
      message += `${baseUrl}/property/${property.id}\n\n`
    })
  } else {
    message += `${properties.name} en ${properties.location}\n`
    message += `${properties.beds} habitaciones, ${properties.baths} baños, ${properties.area}\n`
    message += `Precio: ${properties.price}\n`
    message += `${baseUrl}/property/${properties.id}\n`
  }

  message += "\nContacta con nosotros para más información."

  return encodeURIComponent(message)
}

export function shareViaWhatsApp(properties: Property | Property[]) {
  const message = generateWhatsAppMessage(properties)
  const whatsappUrl = `https://wa.me/?text=${message}`
  window.open(whatsappUrl, "_blank")
}

