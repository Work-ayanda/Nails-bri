'use client'

import { format } from 'date-fns'
import { Calendar, Clock, User, Mail, Phone, MessageCircle, ImageIcon, Sparkles } from 'lucide-react'
import type { BookingData } from '@/lib/types'
import { NAIL_SHAPES, NAIL_LENGTHS } from '@/lib/data'

interface ReviewStepProps {
  booking: BookingData
  totalDuration: number
}

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (hours === 0) return `${mins} minutes`
  if (mins === 0) return `${hours} hour${hours > 1 ? 's' : ''}`
  return `${hours}h ${mins}m`
}

function getShapeLabel(value: string): string {
  return NAIL_SHAPES.find(s => s.value === value)?.label ?? value
}

function getLengthLabel(value: string): string {
  return NAIL_LENGTHS.find(l => l.value === value)?.label ?? value
}

export function ReviewStep({ booking, totalDuration }: ReviewStepProps) {
  const hasInspiration = booking.inspiration.photos.length > 0 || booking.inspiration.description

  return (
    <div>
      <div className="mb-6 text-center">
        <h2 className="font-serif text-xl font-semibold text-foreground">
          Review Your Booking
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Please confirm the details below
        </p>
      </div>

      <div className="space-y-4">
        {/* Service Details */}
        <div className="rounded-xl border border-border/50 bg-background p-4">
          <h3 className="mb-3 font-serif text-sm font-medium text-foreground">
            Service Details
          </h3>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Category</span>
              <span className="text-sm font-medium capitalize text-foreground">
                {booking.category}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Service</span>
              <span className="text-sm font-medium text-foreground">
                {booking.service?.name}
              </span>
            </div>
            {booking.addons.length > 0 && (
              <div className="flex items-start justify-between">
                <span className="text-sm text-muted-foreground">Add-ons</span>
                <div className="text-right">
                  {booking.addons.map(addon => (
                    <div key={addon.id} className="text-sm text-foreground">
                      {addon.name} (+R{addon.price})
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Date & Time */}
        <div className="rounded-xl border border-border/50 bg-background p-4">
          <h3 className="mb-3 font-serif text-sm font-medium text-foreground">
            Appointment
          </h3>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-foreground">
                {booking.date ? format(booking.date, 'EEEE, MMMM d, yyyy') : '-'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-foreground">
                {booking.time} ({formatDuration(totalDuration)} estimated)
              </span>
            </div>
          </div>
        </div>

        {/* Client Details */}
        <div className="rounded-xl border border-border/50 bg-background p-4">
          <h3 className="mb-3 font-serif text-sm font-medium text-foreground">
            Your Details
          </h3>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-foreground">
                {booking.clientDetails.fullName}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-foreground">
                {booking.clientDetails.mobile}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-foreground">
                {booking.clientDetails.email}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm capitalize text-foreground">
                Contact via {booking.clientDetails.preferredContact}
              </span>
            </div>
          </div>

          {/* Nail preferences */}
          {(booking.clientDetails.nailPreferences.shape || booking.clientDetails.nailPreferences.length) && (
            <div className="mt-3 border-t border-border/50 pt-3">
              <div className="flex items-center gap-4 text-sm">
                {booking.clientDetails.nailPreferences.shape && (
                  <span className="text-muted-foreground">
                    Shape: <span className="text-foreground">{getShapeLabel(booking.clientDetails.nailPreferences.shape)}</span>
                  </span>
                )}
                {booking.clientDetails.nailPreferences.length && (
                  <span className="text-muted-foreground">
                    Length: <span className="text-foreground">{getLengthLabel(booking.clientDetails.nailPreferences.length)}</span>
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Special notes */}
          {booking.clientDetails.specialNotes && (
            <div className="mt-3 border-t border-border/50 pt-3">
              <p className="text-xs text-muted-foreground">
                Notes: {booking.clientDetails.specialNotes}
              </p>
            </div>
          )}
        </div>

        {/* Inspiration */}
        {hasInspiration && (
          <div className="rounded-xl border border-border/50 bg-background p-4">
            <h3 className="mb-3 flex items-center gap-2 font-serif text-sm font-medium text-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              Inspiration
            </h3>
            
            {booking.inspiration.photos.length > 0 && (
              <div className="mb-2 flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">
                  {booking.inspiration.photos.length} photo{booking.inspiration.photos.length > 1 ? 's' : ''} uploaded
                </span>
              </div>
            )}
            
            {booking.inspiration.description && (
              <p className="text-sm text-muted-foreground">
                {booking.inspiration.description}
              </p>
            )}
          </div>
        )}

        {/* Pricing Summary */}
        <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-4">
          <h3 className="mb-3 font-serif text-sm font-medium text-foreground">
            Payment Summary
          </h3>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{booking.service?.name}</span>
              <span className="text-foreground">R{booking.service?.price}</span>
            </div>
            {booking.addons.map(addon => (
              <div key={addon.id} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{addon.name}</span>
                <span className="text-foreground">R{addon.price}</span>
              </div>
            ))}
            <div className="my-2 border-t border-border/50" />
            <div className="flex items-center justify-between text-sm font-medium">
              <span className="text-foreground">Subtotal</span>
              <span className="text-foreground">R{booking.subtotal}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-primary">Deposit (due now)</span>
              <span className="font-medium text-primary">R{booking.deposit}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Balance (due at appointment)</span>
              <span className="text-foreground">R{booking.remainingBalance}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
