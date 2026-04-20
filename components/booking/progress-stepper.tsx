'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { type BookingStep, BOOKING_STEPS } from '@/lib/types'

interface ProgressStepperProps {
  currentStep: BookingStep
}

export function ProgressStepper({ currentStep }: ProgressStepperProps) {
  const currentIndex = BOOKING_STEPS.findIndex((s) => s.id === currentStep)

  return (
    <div className="border-b border-[#eadfce] bg-[#fcf8f3]/80 px-4 py-4 backdrop-blur">
      {/* Mobile */}
      <div className="flex items-center justify-between md:hidden">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#111111] text-xs font-medium text-white shadow-sm">
            {currentIndex + 1}
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#b08b57]">
              Booking Progress
            </p>
            <span className="text-sm font-medium text-[#111111]">
              {BOOKING_STEPS[currentIndex]?.label}
            </span>
          </div>
        </div>

        <span className="text-xs text-[#8a7f75]">
          {currentIndex + 1} / {BOOKING_STEPS.length}
        </span>
      </div>

      {/* Desktop */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between gap-2">
          {BOOKING_STEPS.map((step, index) => {
            const isComplete = index < currentIndex
            const isCurrent = index === currentIndex

            return (
              <div key={step.id} className="flex flex-1 items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      'flex h-9 w-9 items-center justify-center rounded-full border text-xs font-medium transition-all duration-300',
                      isComplete &&
                        'border-[#111111] bg-[#111111] text-white',
                      isCurrent &&
                        'border-[#d8c2a6] bg-[#fcf8f3] text-[#111111] ring-4 ring-[#f3e7dc]',
                      !isComplete &&
                        !isCurrent &&
                        'border-[#e8d9c3] bg-white text-[#8a7f75]'
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
                      'mt-2 text-[11px] font-medium tracking-wide',
                      isCurrent ? 'text-[#111111]' : 'text-[#8a7f75]'
                    )}
                  >
                    {step.label}
                  </span>
                </div>

                {index < BOOKING_STEPS.length - 1 && (
                  <div
                    className={cn(
                      'mx-3 h-[1.5px] flex-1 transition-colors duration-300',
                      index < currentIndex ? 'bg-[#111111]' : 'bg-[#eadfce]'
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
