"use client"

import { motion } from 'framer-motion'
import { Check, Plus } from 'lucide-react'
import type { AddOn } from '@/lib/types'

interface AddOnSelectionProps {
  addOns: AddOn[]
  selectedAddOns: AddOn[]
  onToggle: (addOn: AddOn) => void
}

export function AddOnSelection({ addOns, selectedAddOns, onToggle }: AddOnSelectionProps) {
  return (
    <div className="p-4 pb-24">
      <div className="max-w-lg mx-auto">
        <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
          Enhance Your Experience
        </h3>
        <p className="text-sm text-muted-foreground font-sans mb-6">
          Add extras to personalise your appointment (optional)
        </p>

        <div className="grid grid-cols-2 gap-3">
          {addOns.map((addOn, index) => {
            const isSelected = selectedAddOns.some(a => a.id === addOn.id)
            
            return (
              <motion.button
                key={addOn.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onToggle(addOn)}
                className={`
                  p-3 rounded-xl border-2 text-left transition-all duration-200
                  ${isSelected 
                    ? 'border-primary bg-primary/5 shadow-md' 
                    : 'border-border bg-card hover:border-primary/50'
                  }
                `}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-medium text-sm text-foreground font-sans leading-tight">
                    {addOn.name}
                  </h4>
                  <div className={`
                    w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors
                    ${isSelected ? 'bg-primary' : 'bg-secondary'}
                  `}>
                    {isSelected ? (
                      <Check className="w-3 h-3 text-primary-foreground" />
                    ) : (
                      <Plus className="w-3 h-3 text-muted-foreground" />
                    )}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground font-sans mb-2 line-clamp-2">
                  {addOn.description}
                </p>
                <p className="text-sm font-semibold text-primary font-sans">
                  +R{addOn.price}
                </p>
              </motion.button>
            )
          })}
        </div>

        {selectedAddOns.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-secondary rounded-xl"
          >
            <p className="text-sm text-muted-foreground font-sans mb-2">
              Selected add-ons:
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedAddOns.map(addOn => (
                <span
                  key={addOn.id}
                  className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-sans"
                >
                  {addOn.name} (+R{addOn.price})
                </span>
              ))}
            </div>
            <p className="text-sm font-semibold text-foreground font-sans mt-3">
              Total add-ons: R{selectedAddOns.reduce((sum, a) => sum + a.price, 0)}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
