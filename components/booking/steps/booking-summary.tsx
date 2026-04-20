"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { format } from 'date-fns'
import { Calendar, Clock, User, Mail, Phone, Sparkles, Tag } from 'lucide-react'
import type { BookingData } from '@/lib/types'

interface BookingSummaryProps {
  bookingData: BookingData
}

export function BookingSummary({ bookingData }: BookingSummaryProps) {
  const {
    selectedService,
    selectedAddOns,
    selectedDate,
    selectedTime,
    clientDetails,
    inspiration,
    referral,
    subtotal,
    deposit,
    remainingBalance
  } = bookingData

  return (
    <div className="p-4 pb-24">
      <div className="max-w-lg mx-auto">
        <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
          Review Your Booking
        </h3>
        <p className="text-sm text-muted-foreground font-sans mb-6">
          Please confirm all details are correct
        </p>
        
        <div className="space-y-4">
          {/* Service */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-card rounded-xl border border-border"
          >
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider font-sans mb-3">
              Service
            </h4>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-foreground font-sans">
                  {selectedService?.name}
                </p>
                <p className="text-sm text-muted-foreground font-sans flex items-center gap-1 mt-1">
                  <Clock className="w-3.5 h-3.5" />
                  {selectedService?.duration}
                </p>
              </div>
              <p className="font-semibold text-primary font-sans">
                R{selectedService?.price}
              </p>
            </div>
          </motion.div>
          
          {/* Add-ons */}
          {selectedAddOns.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="p-4 bg-card rounded-xl border border-border"
            >
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider font-sans mb-3">
                Add-ons
              </h4>
              <div className="space-y-2">
                {selectedAddOns.map(addon => (
                  <div key={addon.id} className="flex justify-between items-center">
                    <p className="text-sm text-foreground font-sans">{addon.name}</p>
                    <p className="text-sm font-medium text-primary font-sans">+R{addon.price}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          
          {/* Date & Time */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-4 bg-card rounded-xl border border-border"
          >
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider font-sans mb-3">
              Appointment
            </h4>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="font-semibold text-foreground font-sans">
                  {selectedDate ? format(selectedDate, 'EEEE, MMMM d, yyyy') : '-'}
                </p>
                <p className="text-sm text-muted-foreground font-sans">
                  at {selectedTime || '-'}
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Client Details */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="p-4 bg-card rounded-xl border border-border"
          >
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider font-sans mb-3">
              Your Details
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                <p className="text-sm text-foreground font-sans">{clientDetails.fullName}</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <p className="text-sm text-foreground font-sans">{clientDetails.mobile}</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <p className="text-sm text-foreground font-sans">{clientDetails.email}</p>
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-border mt-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <p className="text-sm text-foreground font-sans">
                  {clientDetails.nailPreferences.shape} shape, {clientDetails.nailPreferences.length} length
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Inspiration */}
          {inspiration.preview && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-4 bg-card rounded-xl border border-border"
            >
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider font-sans mb-3">
                Inspiration
              </h4>
              <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                <Image
                  src={inspiration.preview}
                  alt="Inspiration"
                  fill
                  className="object-cover"
                />
              </div>
              {inspiration.description && (
                <p className="text-sm text-muted-foreground font-sans mt-2">
                  {inspiration.description}
                </p>
              )}
            </motion.div>
          )}
          
          {/* Promo Applied */}
          {referral.applied && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="p-4 bg-primary/10 rounded-xl border border-primary/20"
            >
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-primary" />
                <p className="text-sm font-medium text-primary font-sans">
                  {referral.promoCode} - {referral.discount}% discount applied
                </p>
              </div>
            </motion.div>
          )}
          
          {/* Total */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-4 bg-secondary rounded-xl"
          >
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-sans">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">R{subtotal}</span>
              </div>
              <div className="flex justify-between text-sm font-sans">
                <span className="text-muted-foreground">Deposit (due now)</span>
                <span className="text-primary font-semibold">R{deposit}</span>
              </div>
              <div className="flex justify-between text-sm font-sans pt-2 border-t border-border">
                <span className="text-muted-foreground">Balance (due at appointment)</span>
                <span className="text-foreground font-semibold">R{remainingBalance}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
