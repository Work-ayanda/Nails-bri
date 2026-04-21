'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import {
  CheckCircle2,
  MessageCircle,
  Copy,
  RefreshCw,
  Check,
  MapPin,
} from 'lucide-react'
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

export function ConfirmationStep({
  booking,
  onReset,
  totalDuration,
}: ConfirmationStepProps) {
  const [copied, setCopied] = useState(false)

  const bookingSummary = `
Booking Request - Nails @ Bri's

Service: ${booking.service?.name}
Category: ${booking.category}
${booking.addons.length > 0 ? `Add-ons: ${booking.addons.map((a) => a.name).join(', ')}` : ''}

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

  const whatsappUrl = `${CONTACT_INFO.whatsappLink}?text=${encodeURIComponent(
    whatsappMessage
  )}`

  return (
    <div className="p-4 md:p-6">
      {/* Success icon */}
      <div className="mb-6 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>

        <h2 className="text-xl font-semibold tracking-tight text-[#111111]">
          Booking Request Received
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#6b5f55]">
          Thank you! {CONTACT_INFO.owner} will confirm your appointment via{' '}
          {booking.clientDetails.preferredContact === 'whatsapp'
            ? 'WhatsApp'
            : 'email'}{' '}
          shortly.
        </p>
      </div>

      {/* Booking summary card */}
      <div className="mb-6 rounded-[20px] border border-[#d8c2a6]/40 bg-white/80 p-4 shadow-sm">
        <h3 className="mb-3 text-sm font-medium text-[#111111]">
          Booking Summary
        </h3>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-[#8a7f75]">Service</span>
            <span className="text-right font-medium text-[#111111]">
              {booking.service?.name}
            </span>
          </div>

          {booking.addons.length > 0 && (
            <div className="flex justify-between gap-4">
              <span className="text-[#8a7f75]">Add-ons</span>
              <span className="text-right text-[#111111]">
                {booking.addons.map((a) => a.name).join(', ')}
              </span>
            </div>
          )}

          <div className="flex justify-between gap-4">
            <span className="text-[#8a7f75]">Date</span>
            <span className="text-right text-[#111111]">
              {booking.date ? format(booking.date, 'EEE, MMM d, yyyy') : '-'}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-[#8a7f75]">Time</span>
            <span className="text-[#111111]">{booking.time}</span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-[#8a7f75]">Duration</span>
            <span className="text-[#111111]">
              {formatDuration(totalDuration)}
            </span>
          </div>

          <div className="my-2 border-t border-[#eadfce]" />

          <div className="flex justify-between gap-4">
            <span className="text-[#8a7f75]">Subtotal</span>
            <span className="text-[#111111]">R{booking.subtotal}</span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-[#b08b57]">Deposit</span>
            <span className="font-medium text-[#b08b57]">
              R{booking.deposit}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-[#8a7f75]">Balance</span>
            <span className="text-[#111111]">R{booking.remainingBalance}</span>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="mb-6 rounded-[20px] border border-[#d8c2a6]/40 bg-[#fcf8f3] p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111111] text-white">
            <MapPin className="h-4 w-4" />
          </div>

          <div>
            <h3 className="text-sm font-medium text-[#111111]">
              Salon Location
            </h3>
            <p className="text-xs text-[#6b5f55]">
              Tap below to open directions
            </p>
          </div>
        </div>

        <a
          href="https://maps.app.goo.gl/6S96Rga1RA1DDmUu9"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full rounded-full border border-[#111111] px-4 py-3 text-center text-sm font-medium text-[#111111] transition-all hover:bg-[#111111] hover:text-white"
        >
          Open in Google Maps
        </a>
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
          className="w-full gap-2 rounded-full border-[#d8c2a6] bg-white text-[#111111] hover:bg-[#faf7f3]"
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
          className="w-full gap-2 rounded-full text-[#111111] hover:bg-[#faf7f3]"
          size="lg"
        >
          <RefreshCw className="h-4 w-4" />
          Make Another Booking
        </Button>
      </div>

      {/* Contact note */}
      <p className="mt-6 text-center text-xs text-[#8a7f75]">
        Need help? Contact us on WhatsApp at {CONTACT_INFO.whatsapp}
      </p>
    </div>
  )
}
