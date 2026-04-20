'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { BookingStep } from '@/lib/types'

interface StickyNavigationProps {
  currentStep: BookingStep
  canProceed: boolean
  onBack: () => void
  onNext: () => void
  isFirstStep: boolean
  isLastStep: boolean
}

export function StickyNavigation({
  currentStep,
  canProceed,
  onBack,
  onNext,
  isFirstStep,
  isLastStep,
}: StickyNavigationProps) {
  const primaryLabel = isLastStep ? 'Confirm Booking' : 'Continue'

  return (
    <>
      <div className="hidden border-t border-[#eadfce] bg-white/70 p-4 backdrop-blur md:block">
        <div className="flex items-center justify-between gap-3">
          <Button
            variant="outline"
            onClick={onBack}
            disabled={isFirstStep}
            className={cn(
              'rounded-full border-[#d8c2a6] bg-white px-5 text-[#111111] shadow-none transition hover:bg-[#faf7f3]',
              isFirstStep && 'opacity-50'
            )}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <Button
            onClick={onNext}
            disabled={!canProceed}
            className={cn(
              'rounded-full bg-[#111111] px-6 text-white transition hover:opacity-95',
              !canProceed && 'opacity-50'
            )}
          >
            {primaryLabel}
            {!isLastStep && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#eadfce] bg-[#f7f1eb]/95 px-4 pb-4 pt-3 backdrop-blur md:hidden">
        <div className="mx-auto max-w-lg">
          <div className="rounded-[24px] border border-[#d8c2a6]/40 bg-white/85 p-3 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            <div className="mb-2 flex items-center justify-between px-1">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#b08b57]">
                Booking Step
              </p>
              <p className="text-xs text-[#8a7f75] capitalize">
                {currentStep.replace('-', ' ')}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={onBack}
                disabled={isFirstStep}
                size="lg"
                className={cn(
                  'h-12 flex-1 rounded-full border-[#d8c2a6] bg-white text-[#111111] shadow-none transition hover:bg-[#faf7f3]',
                  isFirstStep && 'opacity-50'
                )}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>

              <Button
                onClick={onNext}
                disabled={!canProceed}
                size="lg"
                className={cn(
                  'h-12 flex-[1.35] rounded-full bg-[#111111] text-white transition hover:opacity-95',
                  !canProceed && 'opacity-50'
                )}
              >
                {isLastStep ? 'Confirm' : 'Continue'}
                {!isLastStep && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
