"use client"

import { motion } from 'framer-motion'
import { User, Phone, Mail, MessageSquare } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { ClientDetails, NailPreferences } from '@/lib/types'
import { NAIL_SHAPES, NAIL_LENGTHS } from '@/lib/data'

interface ClientDetailsFormProps {
  clientDetails: ClientDetails
  onUpdate: (details: Partial<ClientDetails>) => void
  onNailPreferencesUpdate: (prefs: Partial<NailPreferences>) => void
}

export function ClientDetailsForm({ clientDetails, onUpdate, onNailPreferencesUpdate }: ClientDetailsFormProps) {
  return (
    <div className="p-4 pb-24">
      <div className="max-w-lg mx-auto">
        <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
          Your Details
        </h3>
        <p className="text-sm text-muted-foreground font-sans mb-6">
          Tell us a bit about yourself
        </p>
        
        <div className="space-y-5">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName" className="flex items-center gap-2 font-sans">
              <User className="w-4 h-4 text-primary" />
              Full Name *
            </Label>
            <Input
              id="fullName"
              value={clientDetails.fullName}
              onChange={(e) => onUpdate({ fullName: e.target.value })}
              placeholder="Enter your full name"
              className="h-12 font-sans"
            />
          </div>
          
          {/* Mobile */}
          <div className="space-y-2">
            <Label htmlFor="mobile" className="flex items-center gap-2 font-sans">
              <Phone className="w-4 h-4 text-primary" />
              Mobile Number *
            </Label>
            <Input
              id="mobile"
              type="tel"
              value={clientDetails.mobile}
              onChange={(e) => onUpdate({ mobile: e.target.value })}
              placeholder="e.g., 082 123 4567"
              className="h-12 font-sans"
            />
          </div>
          
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2 font-sans">
              <Mail className="w-4 h-4 text-primary" />
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              value={clientDetails.email}
              onChange={(e) => onUpdate({ email: e.target.value })}
              placeholder="your@email.com"
              className="h-12 font-sans"
            />
          </div>
          
          {/* Preferred Contact Method */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 font-sans">
              <MessageSquare className="w-4 h-4 text-primary" />
              Preferred Contact Method
            </Label>
            <div className="flex gap-3">
              {[
                { value: 'whatsapp', label: 'WhatsApp' },
                { value: 'email', label: 'Email' },
                { value: 'sms', label: 'SMS' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => onUpdate({ preferredContact: option.value as ClientDetails['preferredContact'] })}
                  className={`
                    flex-1 py-2.5 px-4 rounded-lg text-sm font-sans transition-all
                    ${clientDetails.preferredContact === option.value
                      ? 'bg-primary text-primary-foreground font-medium'
                      : 'bg-card border border-border hover:border-primary/50'
                    }
                  `}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Nail Preferences */}
          <div className="pt-4 border-t border-border">
            <h4 className="font-semibold text-foreground font-sans mb-4">
              Nail Preferences
            </h4>
            
            {/* Shape Selection */}
            <div className="space-y-2 mb-4">
              <Label className="font-sans">Preferred Shape *</Label>
              <div className="grid grid-cols-3 gap-2">
                {NAIL_SHAPES.map((shape) => (
                  <button
                    key={shape.value}
                    onClick={() => onNailPreferencesUpdate({ shape: shape.value })}
                    className={`
                      py-2.5 px-3 rounded-lg text-sm font-sans transition-all
                      ${clientDetails.nailPreferences.shape === shape.value
                        ? 'bg-primary text-primary-foreground font-medium'
                        : 'bg-card border border-border hover:border-primary/50'
                      }
                    `}
                  >
                    {shape.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Length Selection */}
            <div className="space-y-2">
              <Label className="font-sans">Preferred Length *</Label>
              <div className="grid grid-cols-4 gap-2">
                {NAIL_LENGTHS.map((length) => (
                  <button
                    key={length.value}
                    onClick={() => onNailPreferencesUpdate({ length: length.value })}
                    className={`
                      py-2.5 px-3 rounded-lg text-sm font-sans transition-all
                      ${clientDetails.nailPreferences.length === length.value
                        ? 'bg-primary text-primary-foreground font-medium'
                        : 'bg-card border border-border hover:border-primary/50'
                      }
                    `}
                  >
                    {length.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Special Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="font-sans">
              Special Notes (optional)
            </Label>
            <Textarea
              id="notes"
              value={clientDetails.specialNotes}
              onChange={(e) => onUpdate({ specialNotes: e.target.value })}
              placeholder="Any allergies, preferences, or special requests..."
              className="min-h-[100px] font-sans resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
