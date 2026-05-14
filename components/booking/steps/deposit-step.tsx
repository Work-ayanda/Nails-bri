'use client'

import { Lock, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { BookingData } from '@/lib/types'

interface DepositStepProps {
  booking: BookingData
  onConfirm: () => void
}

export function DepositStep({ booking, onConfirm }: DepositStepProps) {
  return (
    <div>
      {/* Heading */}
      <div className="mb-8 text-center">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.28em] text-[#b08b57]">
          Booking Confirmation
        </p>

        <h2 className="text-2xl font-semibold tracking-tight text-[#111111]">
          Confirm Your Booking
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#6b5f55]">
          Payment will be made in-store during your appointment
        </p>
      </div>

      {/* Total Card */}
      <div className="mb-6 rounded-[26px] border border-[#111111] bg-[#111111] p-6 text-center text-white shadow-lg">
        <p className="text-sm opacity-80">Booking Total</p>

        <p className="mt-2 text-4xl font-semibold tracking-tight">
          R{booking.subtotal}
        </p>

        <p className="mt-3 text-xs opacity-70">
          Cash payment will be made in-store
        </p>
      </div>

      {/* Payment Method */}
      <div className="rounded-[22px] border border-[#d8c2a6]/40 bg-white/80 p-4 shadow-sm">
        <h3 className="mb-4 text-sm font-medium text-[#111111]">
          Payment Method
        </h3>

        <div className="flex items-center gap-3 rounded-xl border border-[#eadfce] bg-[#faf7f3] p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
            💵
          </div>

          <div className="flex-1">
            <p className="text-sm font-medium text-[#111111]">
              Cash Payment In Store
            </p>

            <p className="text-xs text-[#8a7f75]">
              Payment will be made during your appointment
            </p>
          </div>
        </div>

        {/* Security */}
        <div className="mt-4 flex items-start gap-2 rounded-[16px] border border-[#eadfce] bg-[#fcf8f3] p-3">
          <Lock className="mt-0.5 h-4 w-4 text-[#b08b57]" />

          <p className="text-xs text-[#6b5f55]">
            Your booking request will be confirmed directly with Bridget after
            submission.
          </p>
        </div>
      </div>

      {/* Info */}
      <div className="mt-5 flex items-start gap-3 rounded-[18px] border border-[#d8c2a6]/40 bg-[#fcf8f3] p-4">
        <Info className="mt-0.5 h-4 w-4 text-[#b08b57]" />

        <p className="text-xs leading-relaxed text-[#6b5f55] sm:text-sm">
          After confirming, Bridget will contact you via your selected method to
          finalise your appointment details.
        </p>
      </div>

      {/* CTA */}
      <div className="mt-6">
        <Button
          onClick={onConfirm}
          className="w-full rounded-full bg-[#111111] py-4 text-sm font-medium text-white hover:opacity-95"
        >
          Confirm Booking
        </Button>
      </div>
    </div>
  )
}
