'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import type { ClientDetails, ContactMethod } from '@/lib/types'
import { NAIL_SHAPES, NAIL_LENGTHS } from '@/lib/data'
import { cn } from '@/lib/utils'

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
        [field]: value,
      },
    })
  }

  const inputStyle =
    'h-12 rounded-xl border border-[#eadfce] bg-white/80 text-[#111111] placeholder:text-[#a89c90] focus:border-[#d8c2a6] focus:ring-0'

  return (
    <div>
      {/* Heading */}
      <div className="mb-8 text-center">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.28em] text-[#b08b57]">
          Your Details
        </p>

        <h2 className="text-2xl font-semibold tracking-tight text-[#111111]">
          Your Details
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#6b5f55]">
          Tell us a bit about yourself
        </p>
      </div>

      <div className="space-y-5">
        {/* Full Name */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-[#111111]">
            Full Name <span className="text-[#b08b57]">*</span>
          </Label>
          <Input
            value={details.fullName}
            onChange={(e) => updateField('fullName', e.target.value)}
            placeholder="Enter your full name"
            className={inputStyle}
          />
        </div>

        {/* Mobile */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-[#111111]">
            Mobile Number <span className="text-[#b08b57]">*</span>
          </Label>
          <Input
            type="tel"
            value={details.mobile}
            onChange={(e) => updateField('mobile', e.target.value)}
            placeholder="+27 XX XXX XXXX"
            className={inputStyle}
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-[#111111]">
            Email Address <span className="text-[#b08b57]">*</span>
          </Label>
          <Input
            type="email"
            value={details.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="your@email.com"
            className={inputStyle}
          />
        </div>

        {/* Contact Method */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-[#111111]">
            Preferred Contact Method
          </Label>

          <RadioGroup
            value={details.preferredContact}
            onValueChange={(value) =>
              updateField('preferredContact', value as ContactMethod)
            }
            className="grid grid-cols-2 gap-3"
          >
            {['whatsapp', 'email'].map((method) => {
              const isSelected = details.preferredContact === method

              return (
                <label
                  key={method}
                  className={cn(
                    'flex cursor-pointer items-center justify-center rounded-xl border px-4 py-3 text-sm transition-all',
                    isSelected
                      ? 'border-[#111111] bg-[#111111] text-white'
                      : 'border-[#eadfce] bg-white text-[#6b5f55] hover:border-[#d8c2a6] hover:bg-[#faf7f3]'
                  )}
                >
                  <RadioGroupItem value={method} className="hidden" />
                  {method === 'whatsapp' ? 'WhatsApp' : 'Email'}
                </label>
              )
            })}
          </RadioGroup>
        </div>

        {/* Nail Preferences */}
        <div className="rounded-[20px] border border-[#d8c2a6]/40 bg-[#fcf8f3] p-4">
          <h3 className="mb-4 text-sm font-medium text-[#111111]">
            Nail Preferences (Optional)
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-xs text-[#8a7f75]">Shape</Label>
              <Select
                value={details.nailPreferences.shape || undefined}
                onValueChange={(value) =>
                  updateNailPreference('shape', value)
                }
              >
                <SelectTrigger className="h-11 rounded-xl border border-[#eadfce] bg-white">
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
              <Label className="text-xs text-[#8a7f75]">Length</Label>
              <Select
                value={details.nailPreferences.length || undefined}
                onValueChange={(value) =>
                  updateNailPreference('length', value)
                }
              >
                <SelectTrigger className="h-11 rounded-xl border border-[#eadfce] bg-white">
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

        {/* Notes */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-[#111111]">
            Special Notes (Optional)
          </Label>
          <Textarea
            value={details.specialNotes}
            onChange={(e) => updateField('specialNotes', e.target.value)}
            placeholder="Any allergies, sensitivities, or special requests..."
            rows={3}
            className="resize-none rounded-xl border border-[#eadfce] bg-white/80 text-[#111111] placeholder:text-[#a89c90]"
          />
        </div>
      </div>
    </div>
  )
}
