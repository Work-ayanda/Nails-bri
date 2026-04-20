'use client'

import { useState, useCallback, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { ProgressStepper } from '@/components/booking/progress-stepper'
import { CategoryStep } from '@/components/booking/steps/category-step'
import { ServiceStep } from '@/components/booking/steps/service-step'
import { AddonsStep } from '@/components/booking/steps/addons-step'
import { DateTimeStep } from '@/components/booking/steps/datetime-step'
import { DetailsStep } from '@/components/booking/steps/details-step'
import { InspirationStep } from '@/components/booking/steps/inspiration-step'
import { ReviewStep } from '@/components/booking/steps/review-step'
import { DepositStep } from '@/components/booking/steps/deposit-step'
import { ConfirmationStep } from '@/components/booking/steps/confirmation-step'
import { StickyNavigation } from '@/components/booking/sticky-navigation'
import {
  type BookingData,
  type BookingStep,
  type Category,
  type Service,
  type Addon,
  type ClientDetails,
  type InspirationData,
  BOOKING_STEPS,
  getInitialBookingData,
} from '@/lib/types'
import { MINIMUM_DEPOSIT } from '@/lib/data'

const shellClassName =
  'overflow-hidden rounded-[32px] border border-[#d8c2a6]/40 bg-white/75 shadow-[0_20px_70px_rgba(0,0,0,0.08)] backdrop-blur'

export function BookingApp() {
  const [currentStep, setCurrentStep] = useState<BookingStep>('category')
  const [booking, setBooking] = useState<BookingData>(getInitialBookingData())

  const totals = useMemo(() => {
    const servicePrice = booking.service?.price ?? 0
    const addonsPrice = booking.addons.reduce((sum, addon) => sum + addon.price, 0)
    const subtotal = servicePrice + addonsPrice
    const deposit = MINIMUM_DEPOSIT
    const remainingBalance = Math.max(0, subtotal - deposit)

    return { subtotal, deposit, remainingBalance }
  }, [booking.service, booking.addons])

  const totalDuration = useMemo(() => {
    const serviceDuration = booking.service?.duration ?? 0
    const addonsDuration = booking.addons.reduce((sum, addon) => sum + addon.duration, 0)
    return serviceDuration + addonsDuration
  }, [booking.service, booking.addons])

  const bookingWithTotals: BookingData = {
    ...booking,
    ...totals,
  }

  const currentStepIndex = BOOKING_STEPS.findIndex((step) => step.id === currentStep)

  const goToNextStep = useCallback(() => {
    const nextIndex = currentStepIndex + 1

    if (nextIndex < BOOKING_STEPS.length) {
      setCurrentStep(BOOKING_STEPS[nextIndex].id)
    } else if (currentStep === 'deposit') {
      setCurrentStep('confirmation')
    }
  }, [currentStepIndex, currentStep])

  const goToPreviousStep = useCallback(() => {
    const prevIndex = currentStepIndex - 1
    if (prevIndex >= 0) {
      setCurrentStep(BOOKING_STEPS[prevIndex].id)
    }
  }, [currentStepIndex])

  const setCategory = useCallback((category: Category) => {
    setBooking((prev) => ({ ...prev, category, service: null }))
  }, [])

  const setService = useCallback((service: Service) => {
    setBooking((prev) => ({ ...prev, service }))
  }, [])

  const setAddons = useCallback((addons: Addon[]) => {
    setBooking((prev) => ({ ...prev, addons }))
  }, [])

  const setDateTime = useCallback((date: Date | null, time: string | null) => {
    setBooking((prev) => ({ ...prev, date, time }))
  }, [])

  const setClientDetails = useCallback((clientDetails: ClientDetails) => {
    setBooking((prev) => ({ ...prev, clientDetails }))
  }, [])

  const setInspiration = useCallback((inspiration: InspirationData) => {
    setBooking((prev) => ({ ...prev, inspiration }))
  }, [])

  const resetBooking = useCallback(() => {
    setBooking(getInitialBookingData())
    setCurrentStep('category')
  }, [])

  const canProceed = useMemo(() => {
    switch (currentStep) {
      case 'category':
        return booking.category !== null
      case 'service':
        return booking.service !== null
      case 'addons':
        return true
      case 'datetime':
        return booking.date !== null && booking.time !== null
      case 'details':
        return (
          booking.clientDetails.fullName.trim() !== '' &&
          booking.clientDetails.mobile.trim() !== '' &&
          booking.clientDetails.email.trim() !== ''
        )
      case 'inspiration':
        return true
      case 'review':
        return true
      case 'deposit':
        return true
      default:
        return false
    }
  }, [currentStep, booking])

  if (currentStep === 'confirmation') {
    return (
      <Card className={shellClassName}>
        <ConfirmationStep
          booking={bookingWithTotals}
          onReset={resetBooking}
          totalDuration={totalDuration}
        />
      </Card>
    )
  }

  return (
    <Card className={shellClassName}>
      <ProgressStepper currentStep={currentStep} />

      <div className="min-h-[420px] px-5 py-6 md:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {currentStep === 'category' && (
              <CategoryStep selected={booking.category} onSelect={setCategory} />
            )}

            {currentStep === 'service' && (
              <ServiceStep
                category={booking.category!}
                selected={booking.service}
                onSelect={setService}
              />
            )}

            {currentStep === 'addons' && (
              <AddonsStep selected={booking.addons} onSelect={setAddons} />
            )}

            {currentStep === 'datetime' && (
              <DateTimeStep
                selectedDate={booking.date}
                selectedTime={booking.time}
                onSelect={setDateTime}
              />
            )}

            {currentStep === 'details' && (
              <DetailsStep
                details={booking.clientDetails}
                onChange={setClientDetails}
              />
            )}

            {currentStep === 'inspiration' && (
              <InspirationStep
                inspiration={booking.inspiration}
                onChange={setInspiration}
              />
            )}

            {currentStep === 'review' && (
              <ReviewStep
                booking={bookingWithTotals}
                totalDuration={totalDuration}
              />
            )}

            {currentStep === 'deposit' && (
              <DepositStep booking={bookingWithTotals} onConfirm={goToNextStep} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <StickyNavigation
        currentStep={currentStep}
        canProceed={canProceed}
        onBack={goToPreviousStep}
        onNext={goToNextStep}
        isFirstStep={currentStepIndex === 0}
        isLastStep={currentStep === 'deposit'}
      />
    </Card>
  )
}
