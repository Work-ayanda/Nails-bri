"use client"

import { useCallback } from 'react'
import { motion } from 'framer-motion'
import { Upload, X, Image as ImageIcon, Sparkles } from 'lucide-react'
import Image from 'next/image'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import type { BookingData } from '@/lib/types'

interface InspirationUploadProps {
  inspiration: BookingData['inspiration']
  onUpdate: (updates: Partial<BookingData['inspiration']>) => void
}

export function InspirationUpload({ inspiration, onUpdate }: InspirationUploadProps) {
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        onUpdate({
          file,
          preview: reader.result as string
        })
      }
      reader.readAsDataURL(file)
    }
  }, [onUpdate])

  const handleRemoveImage = useCallback(() => {
    onUpdate({
      file: null,
      preview: null
    })
  }, [onUpdate])

  return (
    <div className="p-4 pb-24">
      <div className="max-w-lg mx-auto">
        <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
          Inspiration Photo
        </h3>
        <p className="text-sm text-muted-foreground font-sans mb-6">
          Share a photo of your dream nails (optional)
        </p>
        
        {/* Upload Area */}
        {!inspiration.preview ? (
          <motion.label
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="block cursor-pointer"
          >
            <div className="border-2 border-dashed border-border hover:border-primary/50 rounded-2xl p-8 text-center transition-colors">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <p className="font-medium text-foreground font-sans mb-1">
                Tap to upload
              </p>
              <p className="text-sm text-muted-foreground font-sans">
                PNG, JPG up to 10MB
              </p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </motion.label>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary">
              <Image
                src={inspiration.preview}
                alt="Inspiration"
                fill
                className="object-cover"
              />
            </div>
            <button
              onClick={handleRemoveImage}
              className="absolute top-3 right-3 w-8 h-8 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center shadow-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
        
        {/* Description */}
        <div className="mt-6 space-y-2">
          <Label htmlFor="description" className="flex items-center gap-2 font-sans">
            <Sparkles className="w-4 h-4 text-primary" />
            Describe your vision (optional)
          </Label>
          <Textarea
            id="description"
            value={inspiration.description}
            onChange={(e) => onUpdate({ description: e.target.value })}
            placeholder="Tell us about the colours, patterns, or style you're dreaming of..."
            className="min-h-[100px] font-sans resize-none"
          />
        </div>
        
        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 p-4 bg-primary/5 rounded-xl"
        >
          <div className="flex items-start gap-3">
            <ImageIcon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground font-sans mb-1">
                Tip
              </p>
              <p className="text-sm text-muted-foreground font-sans">
                Clear, well-lit photos help us understand your vision better. You can also send more photos via WhatsApp after booking.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
