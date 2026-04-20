'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import type { ClientDetails, ContactMethod } from '@/lib/types'
import { NAIL_SHAPES, NAIL_LENGTHS } from '@/lib/data'

interface DetailsStepProps {
  details: ClientDetails
  onChange: (details: ClientDetails) => void
}

export function DetailsStep({ details, onChange }: DetailsStepProps) {
  const updateField = <K extends keyof ClientDetails>(
    field: K,
    value: ClientDetails[K]
  ) => {
    onChange({ ...details, [field]: value })
  }

  const updateNailPreference = (field: 'shape' | 'length', value: string) => {
    onChange({
      ...details,
      nailPreferences: {
        ...details.nailPreferences,
        [field]: value
      }
    })
  }

  return (
    <div>
      <div className="mb-6 text-center">
        <h2 className="font-serif text-xl font-semibold text-foreground">
          Your Details
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Tell us a bit about yourself
        </p>
      </div>

      <div className="space-y-4">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-sm font-medium">
            Full Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="fullName"
            value={details.fullName}
            onChange={(e) => updateField('fullName', e.target.value)}
            placeholder="Enter your full name"
            className="h-12"
          />
        </div>

        {/* Mobile Number */}
        <div className="space-y-2">
          <Label htmlFor="mobile" className="text-sm font-medium">
            Mobile Number <span className="text-destructive">*</span>
          </Label>
          <Input
            id="mobile"
            type="tel"
            value={details.mobile}
            onChange={(e) => updateField('mobile', e.target.value)}
            placeholder="+27 XX XXX XXXX"
            className="h-12"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email Address <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={details.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="your@email.com"
            className="h-12"
          />
        </div>

        {/* Preferred Contact Method */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">
            Preferred Contact Method
          </Label>
          <RadioGroup
            value={details.preferredContact}
            onValueChange={(value) => updateField('preferredContact', value as ContactMethod)}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="whatsapp" id="whatsapp" />
              <Label htmlFor="whatsapp" className="cursor-pointer text-sm font-normal">
                WhatsApp
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="email" id="email-contact" />
              <Label htmlFor="email-contact" className="cursor-pointer text-sm font-normal">
                Email
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Nail Preferences */}
        <div className="rounded-xl border border-border/50 bg-muted/30 p-4">
          <h3 className="mb-3 text-sm font-medium text-foreground">
            Nail Preferences (Optional)
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Shape</Label>
              <Select
                value={details.nailPreferences.shape || undefined}
                onValueChange={(value) => updateNailPreference('shape', value)}
              >
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select shape" />
                </SelectTrigger>
                <SelectContent>
                  {NAIL_SHAPES.map((shape) => (
                    <SelectItem key={shape.value} value={shape.value}>
                      {shape.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Length</Label>
              <Select
                value={details.nailPreferences.length || undefined}
                onValueChange={(value) => updateNailPreference('length', value)}
              >
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select length" />
                </SelectTrigger>
                <SelectContent>
                  {NAIL_LENGTHS.map((length) => (
                    <SelectItem key={length.value} value={length.value}>
                      {length.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Special Notes */}
        <div className="space-y-2">
          <Label htmlFor="notes" className="text-sm font-medium">
            Special Notes (Optional)
          </Label>
          <Textarea
            id="notes"
            value={details.specialNotes}
            onChange={(e) => updateField('specialNotes', e.target.value)}
            placeholder="Any allergies, sensitivities, or special requests..."
            rows={3}
            className="resize-none"
          />
        </div>
      </div>
    </div>
  )
}
