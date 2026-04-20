'use client'

import { CreditCard, Lock, Info } from 'lucide-react'
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
          Secure Booking
        </p>

        <h2 className="text-2xl font-semibold tracking-tight text-[#111111]">
          Secure Your Booking
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#6b5f55]">
          A minimum deposit is required to confirm your appointment
        </p>
      </div>

      {/* Deposit Card */}
      <div className="mb-6 rounded-[26px] border border-[#111111] bg-[#111111] p-6 text-center text-white shadow-lg">
        <p className="text-sm opacity-80">Deposit Amount</p>

        <p className="mt-2 text-4xl font-semibold tracking-tight">
          R{booking.deposit}
        </p>

        <p className="mt-3 text-xs opacity-70">
          This goes toward your total of R{booking.subtotal}
        </p>
      </div>

      {/* Payment Options */}
      <div className="rounded-[22px] border border-[#d8c2a6]/40 bg-white/80 p-4 shadow-sm">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-medium text-[#111111]">
          <CreditCard className="h-4 w-4 text-[#b08b57]" />
          Payment Method
        </h3>

        <div className="space-y-3">
          {/* Card / EFT */}
          <div className="flex items-center gap-3 rounded-xl border border-[#eadfce] bg-[#faf7f3] p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
              💳
            </div>

            <div className="flex-1">
              <p className="text-sm font-medium text-[#111111]">
                Card / EFT Payment
              </p>
              <p className="text-xs text-[#8a7f75]">
                Online payment integration coming soon
              </p>
            </div>
          </div>

          {/* WhatsApp Option */}
          <div className="flex items-center gap-3 rounded-xl border border-[#eadfce] bg-[#faf7f3] p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
              💬
            </div>

            <div className="flex-1">
              <p className="text-sm font-medium text-[#111111]">
                Confirm via WhatsApp
              </p>
              <p className="text-xs text-[#8a7f75]">
                Bridget will assist you directly
              </p>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="mt-4 flex items-start gap-2 rounded-[16px] border border-[#eadfce] bg-[#fcf8f3] p-3">
          <Lock className="mt-0.5 h-4 w-4 text-[#b08b57]" />
          <p className="text-xs text-[#6b5f55]">
            Your booking is handled securely. Payment confirmation will be
            arranged after submission.
          </p>
        </div>
      </div>

      {/* Info */}
      <div className="mt-5 flex items-start gap-3 rounded-[18px] border border-[#d8c2a6]/40 bg-[#fcf8f3] p-4">
        <Info className="mt-0.5 h-4 w-4 text-[#b08b57]" />
        <p className="text-xs leading-relaxed text-[#6b5f55] sm:text-sm">
          After confirming, Bridget will contact you via your selected method to
          finalise your booking and arrange payment.
        </p>
      </div>

      {/* CTA */}
      <div className="mt-6">
        <Button
          onClick={onConfirm}
          className="w-full rounded-full bg-[#111111] py-4 text-sm font-medium text-white hover:opacity-95"
        >
          Proceed to Secure Booking
        </Button>
      </div>
    </div>
  )
}
