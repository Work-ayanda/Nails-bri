"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react"

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=600&fit=crop",
    alt: "Elegant nude nail art",
    category: "Gel Extensions",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1610992015732-2449b0dd2f3f?w=600&h=600&fit=crop",
    alt: "French tip manicure",
    category: "Classic French",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=600&h=600&fit=crop",
    alt: "Artistic nail design",
    category: "Nail Art",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=600&h=600&fit=crop",
    alt: "Luxury spa manicure",
    category: "Spa Manicure",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=600&h=600&fit=crop",
    alt: "Chrome nail finish",
    category: "Chrome Finish",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=800&fit=crop",
    alt: "Ombre nail design",
    category: "Ombre",
  },
]

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const openLightbox = (index: number) => setSelectedImage(index)
  const closeLightbox = () => setSelectedImage(null)
  const nextImage = () =>
    setSelectedImage((prev) =>
      prev !== null ? (prev + 1) % galleryImages.length : null
    )
  const prevImage = () =>
    setSelectedImage((prev) =>
      prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null
    )

  return (
    <section id="gallery" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            <Camera className="h-3 w-3 mr-1" />
            Portfolio
          </Badge>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4 text-balance">
            Our Work Speaks for Itself
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Browse through our collection of stunning nail art and designs. Each creation is a testament to our dedication to perfection.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => openLightbox(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <Badge className="bg-primary/90 text-primary-foreground">
                  {image.category}
                </Badge>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-white/20"
                onClick={closeLightbox}
              >
                <X className="h-6 w-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation()
                  prevImage()
                }}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-4xl max-h-[80vh] aspect-square"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={galleryImages[selectedImage].src}
                  alt={galleryImages[selectedImage].alt}
                  fill
                  className="object-contain rounded-lg"
                />
              </motion.div>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation()
                  nextImage()
                }}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-white/20 text-white backdrop-blur-sm">
                  {galleryImages[selectedImage].category}
                </Badge>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
