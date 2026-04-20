'use client'

import { useCallback } from 'react'
import { ImagePlus, X, Sparkles } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import type { InspirationData } from '@/lib/types'

interface InspirationStepProps {
  inspiration: InspirationData
  onChange: (inspiration: InspirationData) => void
}

export function InspirationStep({ inspiration, onChange }: InspirationStepProps) {
  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    Array.from(files).forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64 = reader.result as string
        onChange({
          ...inspiration,
          photos: [...inspiration.photos, base64]
        })
      }
      reader.readAsDataURL(file)
    })

    // Reset input
    e.target.value = ''
  }, [inspiration, onChange])

  const removePhoto = (index: number) => {
    onChange({
      ...inspiration,
      photos: inspiration.photos.filter((_, i) => i !== index)
    })
  }

  const updateDescription = (description: string) => {
    onChange({ ...inspiration, description })
  }

  return (
    <div>
      <div className="mb-6 text-center">
        <h2 className="font-serif text-xl font-semibold text-foreground">
          Inspiration
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Share your vision (optional)
        </p>
      </div>

      {/* Info card */}
      <div className="mb-6 flex items-start gap-3 rounded-xl bg-primary/5 p-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <Sparkles className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-foreground">
            Help us prepare for your visit
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Sharing inspiration photos and describing your desired look helps us understand your vision and prepare the perfect materials for your appointment.
          </p>
        </div>
      </div>

      {/* Photo upload */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">
          Inspiration Photos
        </Label>
        
        <div className="grid grid-cols-3 gap-3">
          {/* Existing photos */}
          {inspiration.photos.map((photo, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-xl border border-border/50"
            >
              <img
                src={photo}
                alt={`Inspiration ${index + 1}`}
                className="h-full w-full object-cover"
              />
              <button
                onClick={() => removePhoto(index)}
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}

          {/* Upload button */}
          {inspiration.photos.length < 4 && (
            <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border/50 bg-muted/30 transition-colors hover:border-primary/50 hover:bg-muted/50">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
              <ImagePlus className="h-6 w-6 text-muted-foreground" />
              <span className="mt-1 text-xs text-muted-foreground">
                Add photo
              </span>
            </label>
          )}
        </div>

        <p className="text-xs text-muted-foreground">
          Upload up to 4 photos. JPG, PNG accepted.
        </p>
      </div>

      {/* Description */}
      <div className="mt-6 space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">
          Describe Your Desired Look
        </Label>
        <Textarea
          id="description"
          value={inspiration.description}
          onChange={(e) => updateDescription(e.target.value)}
          placeholder="Describe the style, colors, or specific details you'd like..."
          rows={4}
          className="resize-none"
        />
      </div>
    </div>
  )
}
