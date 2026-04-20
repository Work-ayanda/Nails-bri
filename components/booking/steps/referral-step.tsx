"use client"

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Tag, Users, Check, AlertCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import type { BookingData } from '@/lib/types'
import { REFERRAL_SOURCES } from '@/lib/data'

interface ReferralStepProps {
  referral: BookingData['referral']
  onUpdate: (updates: Partial<BookingData['referral']>) => void
}

// Mock promo codes - in production, this would be validated server-side
const VALID_PROMO_CODES: Record<string, number> = {
  'WELCOME10': 10,
  'NEWCLIENT': 15,
  'LOYALTY20': 20,
}

export function ReferralStep({ referral, onUpdate }: ReferralStepProps) {
  const [promoError, setPromoError] = useState('')
  const [isValidating, setIsValidating] = useState(false)

  const handleApplyPromo = useCallback(async () => {
    if (!referral.promoCode) return
    
    setIsValidating(true)
    setPromoError('')
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const code = referral.promoCode.toUpperCase()
    const discount = VALID_PROMO_CODES[code]
    
    if (discount) {
      onUpdate({ 
        applied: true, 
        discount,
        promoCode: code
      })
    } else {
      setPromoError('Invalid promo code')
      onUpdate({ applied: false, discount: 0 })
    }
    
    setIsValidating(false)
  }, [referral.promoCode, onUpdate])

  const handleRemovePromo = useCallback(() => {
    onUpdate({
      promoCode: '',
      applied: false,
      discount: 0
    })
    setPromoError('')
  }, [onUpdate])

  return (
    <div className="p-4 pb-24">
      <div className="max-w-lg mx-auto">
        <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
          Referrals & Promotions
        </h3>
        <p className="text-sm text-muted-foreground font-sans mb-6">
          Add any codes or let us know how you found us (optional)
        </p>
        
        {/* Promo Code */}
        <div className="space-y-3 mb-8">
          <Label className="flex items-center gap-2 font-sans">
            <Tag className="w-4 h-4 text-primary" />
            Promo Code
          </Label>
          
          {referral.applied ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-primary/10 rounded-xl border border-primary/20"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground font-sans">
                      {referral.promoCode}
                    </p>
                    <p className="text-sm text-primary font-sans">
                      {referral.discount}% discount applied
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemovePromo}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Remove
                </Button>
              </div>
            </motion.div>
          ) : (
            <div className="flex gap-2">
              <Input
                value={referral.promoCode}
                onChange={(e) => {
                  onUpdate({ promoCode: e.target.value })
                  setPromoError('')
                }}
                placeholder="Enter promo code"
                className="h-12 font-sans"
              />
              <Button
                onClick={handleApplyPromo}
                disabled={!referral.promoCode || isValidating}
                className="h-12 px-6"
              >
                {isValidating ? 'Checking...' : 'Apply'}
              </Button>
            </div>
          )}
          
          {promoError && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-destructive text-sm font-sans"
            >
              <AlertCircle className="w-4 h-4" />
              {promoError}
            </motion.div>
          )}
        </div>
        
        {/* Referral Code */}
        <div className="space-y-3 mb-8">
          <Label htmlFor="referralCode" className="flex items-center gap-2 font-sans">
            <Users className="w-4 h-4 text-primary" />
            Referral Code (from a friend)
          </Label>
          <Input
            id="referralCode"
            value={referral.referralCode}
            onChange={(e) => onUpdate({ referralCode: e.target.value })}
            placeholder="e.g., BRISBESTIE"
            className="h-12 font-sans"
          />
        </div>
        
        {/* How did you find us */}
        <div className="space-y-3">
          <Label className="font-sans">How did you find us?</Label>
          <div className="grid grid-cols-2 gap-2">
            {REFERRAL_SOURCES.map((source) => (
              <button
                key={source}
                onClick={() => onUpdate({ source })}
                className={`
                  py-2.5 px-3 rounded-lg text-sm font-sans text-left transition-all
                  ${referral.source === source
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'bg-card border border-border hover:border-primary/50'
                  }
                `}
              >
                {source}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
