'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { CheckCircle2, MessageCircle, Copy, RefreshCw, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { BookingData } from '@/lib/types'
import { CONTACT_INFO } from '@/lib/data'

interface ConfirmationStepProps {
  booking: BookingData
  onReset: () => void
  totalDuration: number
}

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (hours === 0) return `${mins} minutes`
  if (mins === 0) return `${hours} hour${hours > 1 ? 's' : ''}`
  return `${hours}h ${mins}m`
}

export function ConfirmationStep({ booking, onReset, totalDuration }: ConfirmationStepProps) {
  const [copied, setCopied] = useState(false)

  const bookingSummary = `
Booking Request - Nails @ Bri's

Service: ${booking.service?.name}
Category: ${booking.category}
${booking.addons.length > 0 ? `Add-ons: ${booking.addons.map(a => a.name).join(', ')}` : ''}

Date: ${booking.date ? format(booking.date, 'EEEE, MMMM d, yyyy') : ''}
Time: ${booking.time}
Duration: ${formatDuration(totalDuration)}

Client: ${booking.clientDetails.fullName}
Mobile: ${booking.clientDetails.mobile}
Email: ${booking.clientDetails.email}
Contact via: ${booking.clientDetails.preferredContact}

Subtotal: R${booking.subtotal}
Deposit: R${booking.deposit}
Balance: R${booking.remainingBalance}
  `.trim()

  const handleCopy = async () => {
    await navigator.clipboard.writeText(bookingSummary)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const whatsappMessage = `Hi Bridget, I've just submitted a booking request with Nails @ Bri's and would like to confirm my appointment.

${booking.service?.name}
${booking.date ? format(booking.date, 'EEEE, MMMM d') : ''} at ${booking.time}

Name: ${booking.clientDetails.fullName}
Subtotal: R${booking.subtotal}
Deposit: R${booking.deposit}`

  const whatsappUrl = `${CONTACT_INFO.whatsappLink}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <div className="p-4 md:p-6">
      {/* Success icon */}
      <div className="mb-6 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="font-serif text-xl font-semibold text-foreground">
          Booking Request Received
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Thank you! {CONTACT_INFO.owner} will confirm your appointment via{' '}
          {booking.clientDetails.preferredContact === 'whatsapp' ? 'WhatsApp' : 'email'} shortly.
        </p>
      </div>

      {/* Booking summary card */}
      <div className="mb-6 rounded-xl border border-border/50 bg-muted/30 p-4">
        <h3 className="mb-3 font-serif text-sm font-medium text-foreground">
          Booking Summary
        </h3>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Service</span>
            <span className="font-medium text-foreground">{booking.service?.name}</span>
          </div>
          {booking.addons.length > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Add-ons</span>
              <span className="text-right text-foreground">
                {booking.addons.map(a => a.name).join(', ')}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Date</span>
            <span className="text-foreground">
              {booking.date ? format(booking.date, 'EEE, MMM d, yyyy') : '-'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Time</span>
            <span className="text-foreground">{booking.time}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Duration</span>
            <span className="text-foreground">{formatDuration(totalDuration)}</span>
          </div>
          <div className="my-2 border-t border-border/50" />
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-foreground">R{booking.subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-primary">Deposit</span>
            <span className="font-medium text-primary">R{booking.deposit}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Balance</span>
            <span className="text-foreground">R{booking.remainingBalance}</span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="space-y-3">
        <Button
          asChild
          className="w-full gap-2 bg-[#25D366] hover:bg-[#20bd5a]"
          size="lg"
        >
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-4 w-4" />
            Confirm via WhatsApp
          </a>
        </Button>

        <Button
          variant="outline"
          onClick={handleCopy}
          className="w-full gap-2"
          size="lg"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy Booking Summary
            </>
          )}
        </Button>

        <Button
          variant="ghost"
          onClick={onReset}
          className="w-full gap-2"
          size="lg"
        >
          <RefreshCw className="h-4 w-4" />
          Make Another Booking
        </Button>
      </div>

      {/* Contact note */}
      <p className="mt-6 text-center text-xs text-muted-foreground">
        Need help? Contact us on WhatsApp at {CONTACT_INFO.whatsapp}
      </p>
    </div>
  )
}
