'use client'

import { format } from 'date-fns'
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MessageCircle,
  ImageIcon,
  Sparkles,
} from 'lucide-react'
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
  return NAIL_SHAPES.find((s) => s.value === value)?.label ?? value
}

function getLengthLabel(value: string): string {
  return NAIL_LENGTHS.find((l) => l.value === value)?.label ?? value
}

export function ReviewStep({ booking, totalDuration }: ReviewStepProps) {
  const hasInspiration =
    booking.inspiration.photos.length > 0 ||
    booking.inspiration.description

  return (
    <div>
      {/* Heading */}
      <div className="mb-8 text-center">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.28em] text-[#b08b57]">
          Booking Summary
        </p>

        <h2 className="text-2xl font-semibold tracking-tight text-[#111111]">
          Review Your Booking
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#6b5f55]">
          Please confirm your details before securing your appointment
        </p>
      </div>

      <div className="space-y-5">
        {/* Service */}
        <div className="rounded-[20px] border border-[#d8c2a6]/40 bg-white/80 p-4 shadow-sm">
          <h3 className="mb-3 text-sm font-medium text-[#111111]">
            Service Details
          </h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#8a7f75]">Category</span>
              <span className="capitalize text-[#111111]">
                {booking.category}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-[#8a7f75]">Service</span>
              <span className="text-[#111111]">
                {booking.service?.name}
              </span>
            </div>

            {booking.addons.length > 0 && (
              <div className="flex justify-between">
                <span className="text-[#8a7f75]">Add-ons</span>
                <div className="text-right">
                  {booking.addons.map((addon) => (
                    <div key={addon.id} className="text-[#111111]">
                      {addon.name} (+R{addon.price})
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Appointment */}
        <div className="rounded-[20px] border border-[#d8c2a6]/40 bg-white/80 p-4 shadow-sm">
          <h3 className="mb-3 text-sm font-medium text-[#111111]">
            Appointment
          </h3>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-[#111111]">
              <Calendar className="h-4 w-4 text-[#b08b57]" />
              {booking.date
                ? format(booking.date, 'EEEE, MMMM d, yyyy')
                : '-'}
            </div>

            <div className="flex items-center gap-2 text-[#111111]">
              <Clock className="h-4 w-4 text-[#b08b57]" />
              {booking.time} ({formatDuration(totalDuration)})
            </div>
          </div>
        </div>

        {/* Client */}
        <div className="rounded-[20px] border border-[#d8c2a6]/40 bg-white/80 p-4 shadow-sm">
          <h3 className="mb-3 text-sm font-medium text-[#111111]">
            Your Details
          </h3>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-[#b08b57]" />
              {booking.clientDetails.fullName}
            </div>

            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#b08b57]" />
              {booking.clientDetails.mobile}
            </div>

            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#b08b57]" />
              {booking.clientDetails.email}
            </div>

            <div className="flex items-center gap-2 capitalize">
              <MessageCircle className="h-4 w-4 text-[#b08b57]" />
              {booking.clientDetails.preferredContact}
            </div>
          </div>

          {(booking.clientDetails.nailPreferences.shape ||
            booking.clientDetails.nailPreferences.length) && (
            <div className="mt-3 border-t border-[#eadfce] pt-3 text-sm text-[#6b5f55]">
              {booking.clientDetails.nailPreferences.shape && (
                <div>
                  Shape:{' '}
                  <span className="text-[#111111]">
                    {getShapeLabel(
                      booking.clientDetails.nailPreferences.shape
                    )}
                  </span>
                </div>
              )}
              {booking.clientDetails.nailPreferences.length && (
                <div>
                  Length:{' '}
                  <span className="text-[#111111]">
                    {getLengthLabel(
                      booking.clientDetails.nailPreferences.length
                    )}
                  </span>
                </div>
              )}
            </div>
          )}

          {booking.clientDetails.specialNotes && (
            <div className="mt-3 border-t border-[#eadfce] pt-3 text-sm text-[#6b5f55]">
              {booking.clientDetails.specialNotes}
            </div>
          )}
        </div>

        {/* Inspiration */}
        {hasInspiration && (
          <div className="rounded-[20px] border border-[#d8c2a6]/40 bg-white/80 p-4 shadow-sm">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-medium text-[#111111]">
              <Sparkles className="h-4 w-4 text-[#b08b57]" />
              Inspiration
            </h3>

            {booking.inspiration.photos.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-[#6b5f55]">
                <ImageIcon className="h-4 w-4" />
                {booking.inspiration.photos.length} photo
                {booking.inspiration.photos.length > 1 ? 's' : ''}
              </div>
            )}

            {booking.inspiration.description && (
              <p className="mt-2 text-sm text-[#6b5f55]">
                {booking.inspiration.description}
              </p>
            )}
          </div>
        )}

        {/* Pricing */}
        <div className="rounded-[22px] border border-[#111111] bg-[#111111] p-5 text-white shadow-md">
          <h3 className="mb-4 text-sm font-medium tracking-wide">
            Payment Summary
          </h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>{booking.service?.name}</span>
              <span>R{booking.service?.price}</span>
            </div>

            {booking.addons.map((addon) => (
              <div key={addon.id} className="flex justify-between opacity-90">
                <span>{addon.name}</span>
                <span>R{addon.price}</span>
              </div>
            ))}

            <div className="my-3 border-t border-white/20" />

            <div className="flex justify-between font-medium">
              <span>Subtotal</span>
              <span>R{booking.subtotal}</span>
            </div>

            <div className="flex justify-between text-[#d8c2a6]">
              <span>Deposit (due now)</span>
              <span>R{booking.deposit}</span>
            </div>

            <div className="flex justify-between opacity-80">
              <span>Balance (at appointment)</span>
              <span>R{booking.remainingBalance}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
