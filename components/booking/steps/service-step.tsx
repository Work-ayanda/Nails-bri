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
      <div className="mb-8 text-center">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.28em] text-[#b08b57]">
          Service Selection
        </p>

        <h2 className="text-2xl font-semibold tracking-tight text-[#111111]">
          Choose Your Service
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#6b5f55]">
          Select from our {category === 'hands' ? 'manicure' : 'pedicure'} menu
        </p>
      </div>

      <div className="space-y-4">
        {services.map((service) => {
          const isSelected = selected?.id === service.id

          return (
            <button
              key={service.id}
              type="button"
              onClick={() => onSelect(service)}
              className={cn(
                'group relative w-full rounded-[24px] border p-5 text-left transition-all duration-300',
                isSelected
                  ? 'border-[#d8c2a6] bg-[#fcf8f3] shadow-[0_16px_40px_rgba(0,0,0,0.06)]'
                  : 'border-[#eadfce] bg-white/80 hover:border-[#d8c2a6] hover:bg-[#fdfaf6] hover:shadow-[0_12px_30px_rgba(0,0,0,0.05)]'
              )}
            >
              <div className="flex items-start justify-between gap-4 pr-8">
                <div className="flex-1">
                  <h3 className="text-base font-semibold tracking-tight text-[#111111] sm:text-lg">
                    {service.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#6b5f55]">
                    {service.description}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[#7b6f64] sm:text-sm">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#eadfce] bg-[#faf7f3] px-3 py-1.5">
                      <Clock className="h-3.5 w-3.5 text-[#b08b57]" />
                      {formatDuration(service.duration)}
                    </span>

                    <span className="inline-flex items-center rounded-full border border-[#eadfce] bg-[#faf7f3] px-3 py-1.5">
                      R{MINIMUM_DEPOSIT} deposit
                    </span>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <div className="text-lg font-semibold tracking-tight text-[#111111] sm:text-xl">
                    R{service.price}
                  </div>

                  {service.priceNote && (
                    <span className="mt-1 block text-xs text-[#8a7f75]">
                      {service.priceNote}
                    </span>
                  )}
                </div>
              </div>

              {isSelected && (
                <div className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-[#111111] text-white shadow-sm">
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
