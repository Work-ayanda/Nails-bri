"use client"

import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { Check, Calendar, MessageCircle, Instagram, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { BookingData } from '@/lib/types'
import { CONTACT_INFO } from '@/lib/data'

interface ConfirmationStateProps {
  bookingData: BookingData
  onClose: () => void
  onRebook: () => void
}

export function ConfirmationState({ bookingData, onClose, onRebook }: ConfirmationStateProps) {
  const confirmationMessage = `Hi Bridget, I've just submitted a booking request with Nails @ Bri's.

📅 Date: ${bookingData.selectedDate ? format(bookingData.selectedDate, 'EEEE, MMMM d, yyyy') : ''}
⏰ Time: ${bookingData.selectedTime}
💅 Service: ${bookingData.selectedService?.name}
💰 Deposit paid: R${bookingData.deposit}

Looking forward to hearing from you!`

  return (
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.4 }}
            className="w-14 h-14 rounded-full bg-primary flex items-center justify-center"
          >
            <Check className="w-8 h-8 text-primary-foreground" />
          </motion.div>
        </motion.div>
        
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-serif text-2xl font-bold text-foreground mb-2"
        >
          Booking Submitted!
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground font-sans mb-8"
        >
          Your appointment request has been received. We&apos;ll confirm your booking shortly.
        </motion.p>
        
        {/* Booking Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-2xl border border-border p-6 mb-6 text-left"
        >
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-5 h-5 text-primary" />
            <div>
              <p className="font-semibold text-foreground font-sans">
                {bookingData.selectedDate ? format(bookingData.selectedDate, 'EEEE, MMMM d') : ''}
              </p>
              <p className="text-sm text-muted-foreground font-sans">
                at {bookingData.selectedTime}
              </p>
            </div>
          </div>
          
          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground font-sans mb-1">Service</p>
            <p className="font-medium text-foreground font-sans">
              {bookingData.selectedService?.name}
            </p>
          </div>
          
          <div className="pt-4 border-t border-border mt-4">
            <div className="flex justify-between text-sm font-sans">
              <span className="text-muted-foreground">Deposit paid</span>
              <span className="text-primary font-semibold">R{bookingData.deposit}</span>
            </div>
            <div className="flex justify-between text-sm font-sans mt-1">
              <span className="text-muted-foreground">Balance due</span>
              <span className="text-foreground font-semibold">R{bookingData.remainingBalance}</span>
            </div>
          </div>
        </motion.div>
        
        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-primary/5 rounded-2xl p-4 mb-6"
        >
          <p className="text-sm text-muted-foreground font-sans">
            <strong className="text-foreground">What&apos;s next?</strong> We&apos;ll review your booking and send confirmation via {bookingData.clientDetails.preferredContact === 'whatsapp' ? 'WhatsApp' : bookingData.clientDetails.preferredContact} within 24 hours.
          </p>
        </motion.div>
        
        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-3"
        >
          <Button
            asChild
            className="w-full h-12"
          >
            <a
              href={`${CONTACT_INFO.whatsappLink}?text=${encodeURIComponent(confirmationMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Confirm via WhatsApp
            </a>
          </Button>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 h-12"
              asChild
            >
              <a
                href="https://instagram.com/nailsatbris"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-5 h-5 mr-2" />
                Follow Us
              </a>
            </Button>
            <Button
              variant="outline"
              className="flex-1 h-12"
              onClick={onRebook}
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Book Another
            </Button>
          </div>
          
          <Button
            variant="ghost"
            className="w-full"
            onClick={onClose}
          >
            Close
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
