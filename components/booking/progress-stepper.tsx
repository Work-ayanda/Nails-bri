'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { type BookingStep, BOOKING_STEPS } from '@/lib/types'

interface ProgressStepperProps {
  currentStep: BookingStep
}

export function ProgressStepper({ currentStep }: ProgressStepperProps) {
  const currentIndex = BOOKING_STEPS.findIndex(s => s.id === currentStep)

  return (
    <div className="border-b border-border/50 bg-muted/30 px-4 py-4">
      {/* Mobile: Show current step */}
      <div className="flex items-center justify-between md:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
            {currentIndex + 1}
          </div>
          <span className="font-serif text-sm font-medium">
            {BOOKING_STEPS[currentIndex]?.label}
          </span>
        </div>
        <span className="text-xs text-muted-foreground">
          Step {currentIndex + 1} of {BOOKING_STEPS.length}
        </span>
      </div>

      {/* Desktop: Show all steps */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between">
          {BOOKING_STEPS.map((step, index) => {
            const isComplete = index < currentIndex
            const isCurrent = index === currentIndex
            
            return (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-colors',
                      isComplete && 'bg-primary text-primary-foreground',
                      isCurrent && 'bg-primary text-primary-foreground ring-2 ring-primary/30 ring-offset-2 ring-offset-background',
                      !isComplete && !isCurrent && 'bg-muted text-muted-foreground'
                    )}
                  >
                    {isComplete ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <span
                    className={cn(
                      'mt-1.5 text-[10px] font-medium',
                      isCurrent ? 'text-foreground' : 'text-muted-foreground'
                    )}
                  >
                    {step.label}
                  </span>
                </div>
                {index < BOOKING_STEPS.length - 1 && (
                  <div
                    className={cn(
                      'mx-2 h-0.5 w-8 transition-colors',
                      index < currentIndex ? 'bg-primary' : 'bg-border'
                    )}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
