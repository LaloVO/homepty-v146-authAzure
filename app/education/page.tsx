"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Video, FileText, Users, Calendar, ChevronRight, MoreVertical } from "lucide-react"

const courses = [
  {
    id: 1,
    title: "Fundamentos del Mercado Inmobiliario",
    description: "Aprende los conceptos básicos y las tendencias actuales del sector inmobiliario.",
    duration: "4 semanas",
    level: "Principiante",
    instructor: "María Rodríguez",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Estrategias de Marketing Digital para Bienes Raíces",
    description: "Domina las técnicas de marketing online para promocionar propiedades y atraer clientes.",
    duration: "6 semanas",
    level: "Intermedio",
    instructor: "Carlos Gómez",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    title: "Aspectos Legales en Transacciones Inmobiliarias",
    description: "Conoce el marco legal y los procedimientos jurídicos en operaciones de bienes raíces.",
    duration: "5 semanas",
    level: "Avanzado",
    instructor: "Laura Sánchez",
    image: "/placeholder.svg",
  },
]

const webinars = [
  {
    id: 1,
    title: "Tendencias del Mercado Inmobiliario Post-Pandemia",
    date: "15 de Julio, 2023",
    time: "18:00 - 19:30",
    speaker: "Dr. Javier Martínez",
  },
  {
    id: 2,
    title: "Estrategias de Negociación en Ventas de Alto Valor",
    date: "22 de Julio, 2023",
    time: "17:00 - 18:30",
    speaker: "Lic. Ana Torres",
  },
  {
    id: 3,
    title: "Tecnología Blockchain en el Sector Inmobiliario",
    date: "29 de Julio, 2023",
    time: "19:00 - 20:30",
    speaker: "Ing. Roberto Vega",
  },
]

const videoLessons = [
  {
    id: 1,
    title: "Cómo hacer una valuación profesional de propiedades",
    thumbnail: "/placeholder.svg",
    duration: "14:19",
    views: "30k vistas",
    uploadedAt: "hace 3 días",
    instructor: {
      name: "Roberto Mtz",
      avatar: "/placeholder.svg",
      verified: true,
    },
  },
  {
    id: 2,
    title: "Estrategias avanzadas de negociación inmobiliaria",
    thumbnail: "/placeholder.svg",
    duration: "42:48",
    views: "15k vistas",
    uploadedAt: "hace 1 semana",
    instructor: {
      name: "Ana Torres",
      avatar: "/placeholder.svg",
      verified: true,
    },
  },
  {
    id: 3,
    title: "Marketing digital para agentes inmobiliarios",
    thumbnail: "/placeholder.svg",
    duration: "28:55",
    views: "25k vistas",
    uploadedAt: "hace 2 días",
    instructor: {
      name: "Carlos López",
      avatar: "/placeholder.svg",
      verified: true,
    },
  },
  {
    id: 4,
    title: "Aspectos legales en la compraventa de inmuebles",
    thumbnail: "/placeholder.svg",
    duration: "35:22",
    views: "18k vistas",
    uploadedAt: "hace 5 días",
    instructor: {
      name: "María Rodríguez",
      avatar: "/placeholder.svg",
      verified: true,
    },
  },
]

export default function EducationPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCourses = courses.filter((course) => course.title.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Centro de Educación Inmobiliaria</h1>
      <Tabs defaultValue="courses" className="space-y-6">
        <TabsList>
          <TabsTrigger value="courses">Cursos</TabsTrigger>
          <TabsTrigger value="webinars">Webinars</TabsTrigger>
          <TabsTrigger value="resources">Recursos</TabsTrigger>
        </TabsList>

        <TabsContent value="courses">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <Input
                type="search"
                placeholder="Buscar cursos..."
                className="max-w-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button>Todos los cursos</Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id}>
                  <CardHeader className="p-0">
                    <div className="aspect-video relative">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="object-cover w-full h-full rounded-t-lg"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg mb-2">{course.title}</CardTitle>
                    <CardDescription className="mb-4">{course.description}</CardDescription>
                    <div className="flex justify-between items-center mb-4">
                      <Badge variant="secondary">{course.level}</Badge>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {course.duration}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>{course.instructor[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{course.instructor}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Ver curso
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8">
              <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex space-x-2 pb-4">
                  <Button variant="secondary" className="rounded-full px-4 py-2 h-auto text-sm font-normal">
                    Todos
                  </Button>
                  <Button variant="outline" className="rounded-full px-4 py-2 h-auto text-sm font-normal">
                    Marketing Digital
                  </Button>
                  <Button variant="outline" className="rounded-full px-4 py-2 h-auto text-sm font-normal">
                    Ventas
                  </Button>
                  <Button variant="outline" className="rounded-full px-4 py-2 h-auto text-sm font-normal">
                    Finanzas Inmobiliarias
                  </Button>
                  <Button variant="outline" className="rounded-full px-4 py-2 h-auto text-sm font-normal">
                    Derecho Inmobiliario
                  </Button>
                  <Button variant="outline" className="rounded-full px-4 py-2 h-auto text-sm font-normal">
                    Valuación
                  </Button>
                  <Button variant="outline" className="rounded-full px-4 py-2 h-auto text-sm font-normal">
                    Arquitectura
                  </Button>
                  <Button variant="outline" className="rounded-full px-4 py-2 h-auto text-sm font-normal">
                    Desarrollo Inmobiliario
                  </Button>
                  <Button variant="outline" className="rounded-full px-4 py-2 h-auto text-sm font-normal">
                    Inversiones
                  </Button>
                  <Button variant="outline" className="rounded-full px-4 py-2 h-auto text-sm font-normal">
                    Administración de Propiedades
                  </Button>
                  <Button variant="outline" className="rounded-full px-4 py-2 h-auto text-sm font-normal">
                    Tecnología Inmobiliaria
                  </Button>
                  <Button variant="outline" className="rounded-full px-4 py-2 h-auto text-sm font-normal">
                    Sostenibilidad
                  </Button>
                </div>
              </ScrollArea>

              {/* Video Lessons Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
                {videoLessons.map((video) => (
                  <div key={video.id} className="group">
                    <div className="relative">
                      <div className="aspect-video relative rounded-xl overflow-hidden">
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black text-white text-xs px-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="mt-3 flex gap-3">
                      <Avatar className="h-9 w-9 rounded-full">
                        <AvatarImage src={video.instructor.avatar} />
                        <AvatarFallback>{video.instructor.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm line-clamp-2 leading-tight mb-1">{video.title}</h3>
                        <div className="flex flex-col text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            {video.instructor.name}
                            {video.instructor.verified && (
                              <Badge variant="secondary" className="h-4 w-4 rounded-full p-0.5">
                                ✓
                              </Badge>
                            )}
                          </span>
                          <span>
                            {video.views} • {video.uploadedAt}
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="webinars">
          <Card>
            <CardHeader>
              <CardTitle>Próximos Webinars</CardTitle>
              <CardDescription>Mantente actualizado con nuestros expertos del sector inmobiliario</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                {webinars.map((webinar) => (
                  <div key={webinar.id} className="mb-6 last:mb-0">
                    <h3 className="text-lg font-semibold mb-2">{webinar.title}</h3>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500">{webinar.date}</span>
                      <span className="text-sm text-gray-500">{webinar.time}</span>
                    </div>
                    <p className="text-sm mb-3">Ponente: {webinar.speaker}</p>
                    <Button variant="outline" size="sm">
                      Registrarse
                    </Button>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Biblioteca Digital
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Accede a nuestra colección de libros electrónicos, artículos y publicaciones del sector inmobiliario.
                </p>
                <Button variant="outline">Explorar biblioteca</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Video className="w-5 h-5 mr-2" />
                  Videoteca
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Visualiza grabaciones de conferencias, tutoriales y entrevistas con expertos del sector.
                </p>
                <Button variant="outline">Ver videos</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Plantillas y Documentos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Descarga plantillas, contratos modelo y otros documentos útiles para tu práctica profesional.
                </p>
                <Button variant="outline">Descargar recursos</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Foro de Profesionales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Conecta con otros profesionales, comparte experiencias y resuelve dudas en nuestro foro especializado.
                </p>
                <Button variant="outline">Unirse al foro</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Certificaciones Profesionales</CardTitle>
          <CardDescription>Mejora tus credenciales con nuestros programas de certificación</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Certificado en Valuación Inmobiliaria</h3>
                <p className="text-sm text-gray-500">Duración: 3 meses | Modalidad: Online</p>
              </div>
              <Button variant="outline">
                Más información <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Especialista en Inversiones Inmobiliarias</h3>
                <p className="text-sm text-gray-500">Duración: 4 meses | Modalidad: Semipresencial</p>
              </div>
              <Button variant="outline">
                Más información <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

