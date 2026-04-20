"use client"

import { motion } from 'framer-motion'
import { Clock, Check } from 'lucide-react'
import type { Service } from '@/lib/types'

interface ServiceSelectionProps {
  services: Service[]
  selectedService: Service | null
  onSelect: (service: Service) => void
}

export function ServiceSelection({ services, selectedService, onSelect }: ServiceSelectionProps) {
  return (
    <div className="p-4 pb-24">
      <div className="max-w-lg mx-auto">
        <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
          Choose Your Service
        </h3>
        <p className="text-sm text-muted-foreground font-sans mb-6">
          Select the service that best fits your needs
        </p>

        <div className="space-y-3">
          {services.map((service, index) => {
            const isSelected = selectedService?.id === service.id
            
            return (
              <motion.button
                key={service.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onSelect(service)}
                className={`
                  w-full p-4 rounded-xl border-2 text-left transition-all duration-200
                  ${isSelected 
                    ? 'border-primary bg-primary/5 shadow-md' 
                    : 'border-border bg-card hover:border-primary/50 hover:shadow-sm'
                  }
                `}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-foreground font-sans">
                        {service.name}
                      </h4>
                      {isSelected && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                        >
                          <Check className="w-3 h-3 text-primary-foreground" />
                        </motion.span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground font-sans mb-2">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground font-sans">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {service.duration}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-primary font-sans">
                      R{service.price}
                    </p>
                    <p className="text-xs text-muted-foreground font-sans">
                      R{service.deposit} deposit
                    </p>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
