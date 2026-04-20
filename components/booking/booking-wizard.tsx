"use client"

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { BookingData, Service, AddOn, ClientDetails, NailPreferences } from '@/lib/types'
import { SERVICES, ADD_ONS } from '@/lib/data'
import { ServiceSelection } from './steps/service-selection'
import { AddOnSelection } from './steps/addon-selection'
import { DateTimeSelection } from './steps/datetime-selection'
import { ClientDetailsForm } from './steps/client-details'
import { InspirationUpload } from './steps/inspiration-upload'
import { ReferralStep } from './steps/referral-step'
import { BookingSummary } from './steps/booking-summary'
import { PaymentStep } from './steps/payment-step'
import { ConfirmationState } from './steps/confirmation-state'

const STEPS = [
  { id: 1, title: 'Service', shortTitle: 'Service' },
  { id: 2, title: 'Add-ons', shortTitle: 'Add-ons' },
  { id: 3, title: 'Date & Time', shortTitle: 'Date' },
  { id: 4, title: 'Your Details', shortTitle: 'Details' },
  { id: 5, title: 'Inspiration', shortTitle: 'Photos' },
  { id: 6, title: 'Referral', shortTitle: 'Promo' },
  { id: 7, title: 'Summary', shortTitle: 'Review' },
  { id: 8, title: 'Payment', shortTitle: 'Pay' },
]

const initialBookingData: BookingData = {
  selectedService: null,
  selectedAddOns: [],
  selectedDate: null,
  selectedTime: null,
  clientDetails: {
    fullName: '',
    mobile: '',
    email: '',
    preferredContact: 'whatsapp',
    specialNotes: '',
    nailPreferences: {
      shape: '',
      length: ''
    }
  },
  inspiration: {
    file: null,
    preview: null,
    description: ''
  },
  referral: {
    referralCode: '',
    promoCode: '',
    source: '',
    applied: false,
    discount: 0
  },
  receipt: {
    file: null,
    preview: null,
    uploaded: false
  },
  subtotal: 0,
  deposit: 100,
  remainingBalance: 0,
  status: 'pending',
  createdAt: new Date()
}

export function BookingWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState<BookingData>(initialBookingData)
  const [isComplete, setIsComplete] = useState(false)

  const calculateTotals = useCallback((service: Service | null, addOns: AddOn[], discount: number) => {
    const servicePrice = service?.price || 0
    const addOnsPrice = addOns.reduce((sum, addon) => sum + addon.price, 0)
    const subtotal = servicePrice + addOnsPrice
    const discountAmount = discount > 0 ? (subtotal * discount / 100) : 0
    const afterDiscount = subtotal - discountAmount
    const deposit = Math.max(100, service?.deposit || 100)
    const remainingBalance = Math.max(0, afterDiscount - deposit)
    
    return { subtotal: afterDiscount, deposit, remainingBalance }
  }, [])

  const updateBookingData = useCallback((updates: Partial<BookingData>) => {
    setBookingData(prev => {
      const newData = { ...prev, ...updates }
      
      if ('selectedService' in updates || 'selectedAddOns' in updates || 'referral' in updates) {
        const totals = calculateTotals(
          newData.selectedService,
          newData.selectedAddOns,
          newData.referral.discount
        )
        return { ...newData, ...totals }
      }
      
      return newData
    })
  }, [calculateTotals])

  const handleServiceSelect = (service: Service) => {
    updateBookingData({ selectedService: service })
  }

  const handleAddOnToggle = (addOn: AddOn) => {
    setBookingData(prev => {
      const isSelected = prev.selectedAddOns.some(a => a.id === addOn.id)
      const newAddOns = isSelected
        ? prev.selectedAddOns.filter(a => a.id !== addOn.id)
        : [...prev.selectedAddOns, addOn]
      
      const totals = calculateTotals(prev.selectedService, newAddOns, prev.referral.discount)
      return { ...prev, selectedAddOns: newAddOns, ...totals }
    })
  }

  const handleDateSelect = (date: Date | null) => {
    updateBookingData({ selectedDate: date })
  }

  const handleTimeSelect = (time: string) => {
    updateBookingData({ selectedTime: time })
  }

  const handleClientDetailsUpdate = (details: Partial<ClientDetails>) => {
    setBookingData(prev => ({
      ...prev,
      clientDetails: { ...prev.clientDetails, ...details }
    }))
  }

  const handleNailPreferencesUpdate = (prefs: Partial<NailPreferences>) => {
    setBookingData(prev => ({
      ...prev,
      clientDetails: {
        ...prev.clientDetails,
        nailPreferences: { ...prev.clientDetails.nailPreferences, ...prefs }
      }
    }))
  }

  const handleInspirationUpdate = (updates: Partial<BookingData['inspiration']>) => {
    setBookingData(prev => ({
      ...prev,
      inspiration: { ...prev.inspiration, ...updates }
    }))
  }

  const handleReferralUpdate = (updates: Partial<BookingData['referral']>) => {
    setBookingData(prev => {
      const newReferral = { ...prev.referral, ...updates }
      const totals = calculateTotals(prev.selectedService, prev.selectedAddOns, newReferral.discount)
      return { ...prev, referral: newReferral, ...totals }
    })
  }

  const handleReceiptUpdate = (updates: Partial<BookingData['receipt']>) => {
    setBookingData(prev => ({
      ...prev,
      receipt: { ...prev.receipt, ...updates }
    }))
  }

  const handlePaymentComplete = () => {
    setIsComplete(true)
  }

  const handleRebook = () => {
    setBookingData(initialBookingData)
    setCurrentStep(1)
    setIsComplete(false)
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1: return bookingData.selectedService !== null
      case 2: return true
      case 3: return bookingData.selectedDate !== null && bookingData.selectedTime !== null
      case 4: 
        const { fullName, mobile, email, nailPreferences } = bookingData.clientDetails
        return fullName.trim() !== '' && 
               mobile.trim() !== '' && 
               email.trim() !== '' &&
               nailPreferences.shape !== '' &&
               nailPreferences.length !== ''
      case 5: return true
      case 6: return true
      case 7: return true
      case 8: return true
      default: return false
    }
  }

  const handleNext = () => {
    if (currentStep < STEPS.length && canProceed()) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  if (isComplete) {
    return (
      <ConfirmationState 
        bookingData={bookingData} 
        onClose={handleRebook}
        onRebook={handleRebook}
      />
    )
  }

  return (
    <div className="bg-card rounded-3xl border border-border shadow-xl overflow-hidden max-w-2xl mx-auto">
      {/* Header */}
      <div className="border-b border-border bg-muted/30 p-4">
        <h3 className="font-serif text-lg font-semibold text-foreground text-center mb-4">
          Book Your Appointment
        </h3>
        
        {/* Progress Steps */}
        <div className="flex items-center justify-between gap-1">
          {STEPS.map((step) => (
            <div key={step.id} className="flex-1 flex flex-col items-center">
              <div className={`
                w-full h-1.5 rounded-full transition-all duration-300
                ${currentStep > step.id ? 'bg-primary' : currentStep === step.id ? 'bg-primary' : 'bg-border'}
              `} />
              <span className={`
                mt-1.5 text-[10px] font-sans hidden sm:block
                ${currentStep >= step.id ? 'text-foreground font-medium' : 'text-muted-foreground'}
              `}>
                {step.shortTitle}
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground font-sans mt-3 text-center sm:hidden">
          Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1].title}
        </p>
      </div>

      {/* Content */}
      <div className="min-h-[500px] max-h-[60vh] overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {currentStep === 1 && (
              <ServiceSelection
                services={SERVICES}
                selectedService={bookingData.selectedService}
                onSelect={handleServiceSelect}
              />
            )}
            {currentStep === 2 && (
              <AddOnSelection
                addOns={ADD_ONS}
                selectedAddOns={bookingData.selectedAddOns}
                onToggle={handleAddOnToggle}
              />
            )}
            {currentStep === 3 && (
              <DateTimeSelection
                selectedDate={bookingData.selectedDate}
                selectedTime={bookingData.selectedTime}
                onDateSelect={handleDateSelect}
                onTimeSelect={handleTimeSelect}
                serviceDuration={bookingData.selectedService?.durationMinutes || 60}
              />
            )}
            {currentStep === 4 && (
              <ClientDetailsForm
                clientDetails={bookingData.clientDetails}
                onUpdate={handleClientDetailsUpdate}
                onNailPreferencesUpdate={handleNailPreferencesUpdate}
              />
            )}
            {currentStep === 5 && (
              <InspirationUpload
                inspiration={bookingData.inspiration}
                onUpdate={handleInspirationUpdate}
              />
            )}
            {currentStep === 6 && (
              <ReferralStep
                referral={bookingData.referral}
                onUpdate={handleReferralUpdate}
              />
            )}
            {currentStep === 7 && (
              <BookingSummary
                bookingData={bookingData}
              />
            )}
            {currentStep === 8 && (
              <PaymentStep
                bookingData={bookingData}
                onReceiptUpdate={handleReceiptUpdate}
                onComplete={handlePaymentComplete}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      <div className="border-t border-border bg-muted/30 p-4">
        <div className="flex gap-3 max-w-lg mx-auto">
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex-1 h-12 font-sans"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          )}
          {currentStep < 8 && (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex-1 h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-sans"
            >
              {currentStep === 7 ? (
                <>
                  <Check className="w-4 h-4 mr-1" />
                  Proceed to Payment
                </>
              ) : (
                <>
                  Continue
                  <ChevronRight className="w-4 h-4 ml-1" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
