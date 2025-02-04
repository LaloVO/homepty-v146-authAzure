import { OpenAIStream, StreamingTextResponse } from "ai"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

function getSystemMessage(assistantId: string): string {
  switch (assistantId) {
    case "property":
      return `Eres un asistente experto en propiedades inmobiliarias. Proporciona información detallada sobre características, amenidades y aspectos técnicos de las propiedades.`
    case "market":
      return `Eres un analista de mercado inmobiliario. Proporciona información sobre tendencias, precios y análisis del mercado de bienes raíces.`
    case "search":
      return `Eres un asistente especializado en búsqueda de propiedades. Ayuda a los usuarios a encontrar propiedades que se ajusten a sus criterios específicos.`
    case "general":
    default:
      return `Eres un asistente general experto en bienes raíces, especializado en el mercado inmobiliario mexicano. Proporciona información precisa y útil sobre propiedades, tendencias del mercado, consejos para compradores y vendedores, procesos de compra, venta y arrendamiento, financiamiento y aspectos legales básicos de bienes raíces.`
  }
}

export async function POST(req: Request) {
  try {
    const { messages, assistantId } = await req.json()

    const systemMessage = getSystemMessage(assistantId)

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [
        {
          role: "system",
          content: systemMessage,
        },
        ...messages,
      ],
    })

    const stream = OpenAIStream(response)

    return new StreamingTextResponse(stream)
  } catch (error) {
    console.error("Error en la API de chat:", error)
    return new Response(JSON.stringify({ error: "Aun estamos trabajando, ESPERALO!" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

