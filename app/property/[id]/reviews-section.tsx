"use client"

import { Star, ChevronRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface Review {
  id: string
  author: string
  rating: number
  comment: string
}

const reviews: Review[] = [
  {
    id: "1",
    author: "Alberto Flores",
    rating: 4.9,
    comment: "La ubicación es ideal si planeas mudarte con tu familia, tiene excelente",
  },
  {
    id: "2",
    author: "Monica Treviño",
    rating: 4.3,
    comment: "El desarrollo es una de los mejores de la ciudad, prácticamente",
  },
  {
    id: "3",
    author: "Anneth Mendoza",
    rating: 3.2,
    comment: "Visité 5 departamentos del desarrollo, este está un mejor",
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "w-4 h-4",
            star <= Math.floor(rating)
              ? "fill-yellow-400 text-yellow-400"
              : star <= rating
                ? "fill-yellow-400/50 text-yellow-400"
                : "text-gray-300",
          )}
        />
      ))}
      <span className="ml-1 text-sm font-medium">{rating}</span>
    </div>
  )
}

export function ReviewsSection() {
  const averageRating = (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Reviews</h2>
          <p className="text-sm text-gray-500">De 08 Reseñas de expertos</p>
        </div>
        <div className="flex items-center gap-2">
          <StarRating rating={Number(averageRating)} />
          <Button variant="link" className="text-blue-600 hover:text-blue-800 p-0">
            Ver todo
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>

      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-max space-x-4">
          {reviews.map((review) => (
            <Card key={review.id} className="w-[300px] p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{review.author}</h3>
                  <StarRating rating={review.rating} />
                </div>
                <p className="text-sm text-gray-600 whitespace-normal">{review.comment}</p>
              </div>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

