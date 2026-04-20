'use client'

import { Clock, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Category, Service } from '@/lib/types'
import { HANDS_SERVICES, TOES_SERVICES, MINIMUM_DEPOSIT } from '@/lib/data'

interface ServiceStepProps {
  category: Category
  selected: Service | null
  onSelect: (service: Service) => void
}

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (hours === 0) return `${mins}m`
  if (mins === 0) return `${hours}h`
  return `${hours}h ${mins}m`
}

export function ServiceStep({ category, selected, onSelect }: ServiceStepProps) {
  const services = category === 'hands' ? HANDS_SERVICES : TOES_SERVICES

  return (
    <div>
      <div className="mb-6 text-center">
        <h2 className="font-serif text-xl font-semibold text-foreground">
          Choose Your Service
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Select from our {category === 'hands' ? 'manicure' : 'pedicure'} menu
        </p>
      </div>

      <div className="space-y-3">
        {services.map((service) => {
          const isSelected = selected?.id === service.id

          return (
            <button
              key={service.id}
              onClick={() => onSelect(service)}
              className={cn(
                'group relative w-full rounded-xl border-2 p-4 text-left transition-all duration-200',
                isSelected
                  ? 'border-primary bg-primary/5 shadow-md'
                  : 'border-border/50 bg-background hover:border-primary/50 hover:bg-muted/30'
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-serif text-base font-medium text-foreground">
                    {service.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {service.description}
                  </p>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {formatDuration(service.duration)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      R{MINIMUM_DEPOSIT} deposit
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-serif text-lg font-semibold text-foreground">
                    R{service.price}
                  </div>
                  {service.priceNote && (
                    <span className="text-xs text-muted-foreground">
                      {service.priceNote}
                    </span>
                  )}
                </div>
              </div>

              {isSelected && (
                <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-4 w-4" />
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
