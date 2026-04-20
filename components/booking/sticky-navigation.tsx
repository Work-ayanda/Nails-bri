'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
  canProceed,
  onBack,
  onNext,
  isFirstStep,
  isLastStep
}: StickyNavigationProps) {
  return (
    <>
      {/* Desktop navigation */}
      <div className="hidden border-t border-border/50 bg-card p-4 md:block">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={onBack}
            disabled={isFirstStep}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <Button
            onClick={onNext}
            disabled={!canProceed}
            className="gap-2"
          >
            {isLastStep ? 'Confirm Booking' : 'Continue'}
            {!isLastStep && <ArrowRight className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile sticky navigation */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border/50 bg-card/95 p-4 backdrop-blur-sm md:hidden">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <Button
            variant="outline"
            onClick={onBack}
            disabled={isFirstStep}
            className="flex-1 gap-2"
            size="lg"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <Button
            onClick={onNext}
            disabled={!canProceed}
            className="flex-[2] gap-2"
            size="lg"
          >
            {isLastStep ? 'Confirm' : 'Continue'}
            {!isLastStep && <ArrowRight className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </>
  )
}
