"use client"

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Upload, CreditCard, Smartphone, Copy, Check, AlertCircle, X } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import type { BookingData } from '@/lib/types'
import { CONTACT_INFO, POLICIES } from '@/lib/data'

interface PaymentStepProps {
  bookingData: BookingData
  onReceiptUpdate: (updates: Partial<BookingData['receipt']>) => void
  onComplete: () => void
}

const BANK_DETAILS = {
  bank: 'Capitec Bank',
  accountName: "Bridget Chisangwa",
  accountNumber: '123 456 7890',
  reference: `NB-${Date.now().toString(36).toUpperCase()}`
}

export function PaymentStep({ bookingData, onReceiptUpdate, onComplete }: PaymentStepProps) {
  const [copied, setCopied] = useState<string | null>(null)
  const [agreed, setAgreed] = useState(false)

  const handleCopy = useCallback((text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopied(field)
    setTimeout(() => setCopied(null), 2000)
  }, [])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        onReceiptUpdate({
          file,
          preview: reader.result as string,
          uploaded: true
        })
      }
      reader.readAsDataURL(file)
    }
  }, [onReceiptUpdate])

  const handleRemoveReceipt = useCallback(() => {
    onReceiptUpdate({
      file: null,
      preview: null,
      uploaded: false
    })
  }, [onReceiptUpdate])

  const canSubmit = bookingData.receipt.uploaded && agreed

  return (
    <div className="p-4 pb-24">
      <div className="max-w-lg mx-auto">
        <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
          Secure Your Booking
        </h3>
        <p className="text-sm text-muted-foreground font-sans mb-6">
          Pay your R{bookingData.deposit} deposit to confirm
        </p>
        
        {/* Payment Methods */}
        <div className="space-y-4 mb-6">
          {/* Bank Transfer */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-card rounded-xl border border-border"
          >
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-primary" />
              <h4 className="font-semibold text-foreground font-sans">Bank Transfer</h4>
            </div>
            
            <div className="space-y-3">
              {[
                { label: 'Bank', value: BANK_DETAILS.bank },
                { label: 'Account Name', value: BANK_DETAILS.accountName },
                { label: 'Account Number', value: BANK_DETAILS.accountNumber },
                { label: 'Reference', value: BANK_DETAILS.reference },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground font-sans">{item.label}</p>
                    <p className="text-sm font-medium text-foreground font-sans">{item.value}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(item.value, item.label)}
                    className="p-2 hover:bg-secondary rounded-lg transition-colors"
                  >
                    {copied === item.label ? (
                      <Check className="w-4 h-4 text-primary" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* SnapScan */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-4 bg-card rounded-xl border border-border"
          >
            <div className="flex items-center gap-2 mb-3">
              <Smartphone className="w-5 h-5 text-primary" />
              <h4 className="font-semibold text-foreground font-sans">SnapScan / Mobile Payment</h4>
            </div>
            <p className="text-sm text-muted-foreground font-sans">
              Contact us on WhatsApp for SnapScan or alternative payment options.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3"
              asChild
            >
              <a
                href={`${CONTACT_INFO.whatsappLink}?text=${encodeURIComponent(`Hi Bridget, I'd like to pay my R${bookingData.deposit} deposit via SnapScan. Reference: ${BANK_DETAILS.reference}`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Message on WhatsApp
              </a>
            </Button>
          </motion.div>
        </div>
        
        {/* Upload Receipt */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <h4 className="font-semibold text-foreground font-sans mb-3 flex items-center gap-2">
            <Upload className="w-4 h-4 text-primary" />
            Upload Payment Proof
          </h4>
          
          {!bookingData.receipt.preview ? (
            <label className="block cursor-pointer">
              <div className="border-2 border-dashed border-border hover:border-primary/50 rounded-xl p-6 text-center transition-colors">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground font-sans">
                  Upload your proof of payment
                </p>
                <p className="text-xs text-muted-foreground font-sans">
                  Screenshot or photo of transfer confirmation
                </p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          ) : (
            <div className="relative">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-secondary">
                <Image
                  src={bookingData.receipt.preview}
                  alt="Payment proof"
                  fill
                  className="object-contain"
                />
              </div>
              <button
                onClick={handleRemoveReceipt}
                className="absolute top-2 right-2 w-8 h-8 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center shadow-lg"
              >
                <X className="w-4 h-4" />
              </button>
              <p className="text-sm text-primary font-sans mt-2 flex items-center gap-1">
                <Check className="w-4 h-4" />
                Receipt uploaded
              </p>
            </div>
          )}
        </motion.div>
        
        {/* Policies */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="font-sans text-xs">
              <ul className="space-y-1 mt-1">
                {POLICIES.slice(0, 4).map((policy, index) => (
                  <li key={index}>• {policy}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        </motion.div>
        
        {/* Agreement */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-6"
        >
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary"
            />
            <span className="text-sm text-muted-foreground font-sans">
              I agree to the booking policies and understand that my deposit is non-refundable for late cancellations or missed appointments.
            </span>
          </label>
        </motion.div>
        
        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            onClick={onComplete}
            disabled={!canSubmit}
            className="w-full h-14 text-base font-sans"
          >
            <Check className="w-5 h-5 mr-2" />
            Confirm Booking
          </Button>
          {!canSubmit && (
            <p className="text-xs text-muted-foreground font-sans text-center mt-2">
              Please upload your payment proof and agree to the policies
            </p>
          )}
        </motion.div>
      </div>
    </div>
  )
}
