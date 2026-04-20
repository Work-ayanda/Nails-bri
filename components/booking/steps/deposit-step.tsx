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
      <div className="mb-6 text-center">
        <h2 className="font-serif text-xl font-semibold text-foreground">
          Secure Your Booking
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          A minimum deposit is required to confirm your appointment
        </p>
      </div>

      {/* Deposit amount card */}
      <div className="mb-6 rounded-xl border-2 border-primary/20 bg-primary/5 p-6 text-center">
        <p className="text-sm text-muted-foreground">Deposit Amount</p>
        <p className="mt-1 font-serif text-4xl font-bold text-foreground">
          R{booking.deposit}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          This amount goes toward your final total of R{booking.subtotal}
        </p>
      </div>

      {/* Payment method placeholder */}
      <div className="rounded-xl border border-border/50 bg-background p-4">
        <h3 className="mb-4 flex items-center gap-2 font-serif text-sm font-medium text-foreground">
          <CreditCard className="h-4 w-4" />
          Payment Method
        </h3>

        {/* Mock payment options */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-muted/30 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                <path d="M21.5 12c0-5.25-4.25-9.5-9.5-9.5S2.5 6.75 2.5 12s4.25 9.5 9.5 9.5 9.5-4.25 9.5-9.5zm-9.5 7.5c-4.14 0-7.5-3.36-7.5-7.5S7.86 4.5 12 4.5s7.5 3.36 7.5 7.5-3.36 7.5-7.5 7.5z"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Pay via EFT or Card</p>
              <p className="text-xs text-muted-foreground">Integration coming soon</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-muted/30 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background">
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#25D366]" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">WhatsApp to arrange payment</p>
              <p className="text-xs text-muted-foreground">Confirm booking via message</p>
            </div>
          </div>
        </div>

        {/* Security note */}
        <div className="mt-4 flex items-start gap-2 rounded-lg bg-muted/50 p-3">
          <Lock className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">
            Your payment information is secure. Full payment integration coming soon.
          </p>
        </div>
      </div>

      {/* Info note */}
      <div className="mt-4 flex items-start gap-2 rounded-lg bg-muted/30 p-3">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
        <p className="text-xs text-muted-foreground">
          After clicking confirm, Bridget will contact you to arrange payment and finalize your booking.
        </p>
      </div>

      {/* CTA Button */}
      <div className="mt-6">
        <Button
          onClick={onConfirm}
          className="w-full"
          size="lg"
        >
          Proceed to Deposit
        </Button>
      </div>
    </div>
  )
}
