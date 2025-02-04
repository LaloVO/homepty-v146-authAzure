"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Video } from "lucide-react"

interface PropertyImageGalleryProps {
  images: string[]
}

export function PropertyImageGallery({ images }: PropertyImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-4 md:col-span-2 lg:col-span-2 relative aspect-[4/3] rounded-lg overflow-hidden">
          <Image
            src={images[0] || "/placeholder.svg"}
            alt="Property main view"
            fill
            className="object-cover hover:scale-105 transition-transform cursor-pointer"
            onClick={() => setSelectedImage(images[0])}
          />
          <Button
            variant="secondary"
            className="absolute bottom-4 left-4 bg-white/90 hover:bg-white"
            onClick={() => window.open("/virtual-tour", "_blank")}
          >
            <Video className="h-4 w-4 mr-2" />
            Virtual Tour
          </Button>
        </div>
        <div className="col-span-4 md:col-span-2 lg:col-span-2 grid grid-cols-2 gap-4">
          {images.slice(1, 4).map((image, index) => (
            <div
              key={index}
              className={cn(
                "relative aspect-[4/3] rounded-lg overflow-hidden",
                index === 2 && "col-span-2 md:col-span-1",
              )}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`Property view ${index + 2}`}
                fill
                className="object-cover hover:scale-105 transition-transform cursor-pointer"
                onClick={() => setSelectedImage(image)}
              />
            </div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0">
          {selectedImage && (
            <div className="relative aspect-[16/9]">
              <Image src={selectedImage || "/placeholder.svg"} alt="Property view" fill className="object-contain" />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

