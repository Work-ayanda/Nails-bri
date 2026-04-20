'use client'

import { Check, Plus, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Addon } from '@/lib/types'
import { ADDONS } from '@/lib/data'

interface AddonsStepProps {
  selected: Addon[]
  onSelect: (addons: Addon[]) => void
}

export function AddonsStep({ selected, onSelect }: AddonsStepProps) {
  const toggleAddon = (addon: Addon) => {
    const isSelected = selected.some((a) => a.id === addon.id)

    if (isSelected) {
      onSelect(selected.filter((a) => a.id !== addon.id))
    } else {
      onSelect([...selected, addon])
    }
  }

  const totalAddonsPrice = selected.reduce((sum, addon) => sum + addon.price, 0)

  return (
    <div>
      <div className="mb-8 text-center">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.28em] text-[#b08b57]">
          Personalise Your Booking
        </p>

        <h2 className="text-2xl font-semibold tracking-tight text-[#111111]">
          Add-ons
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#6b5f55]">
          Enhance your service with finishing touches
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {ADDONS.map((addon) => {
          const isSelected = selected.some((a) => a.id === addon.id)

          return (
            <button
              key={addon.id}
              type="button"
              onClick={() => toggleAddon(addon)}
              className={cn(
                'group relative rounded-[22px] border p-4 text-left transition-all duration-300',
                isSelected
                  ? 'border-[#d8c2a6] bg-[#fcf8f3] shadow-[0_16px_40px_rgba(0,0,0,0.06)]'
                  : 'border-[#eadfce] bg-white/80 hover:border-[#d8c2a6] hover:bg-[#fdfaf6] hover:shadow-[0_12px_30px_rgba(0,0,0,0.05)]'
              )}
            >
              <div className="pr-8">
                <h3 className="text-sm font-semibold tracking-tight text-[#111111] sm:text-base">
                  {addon.name}
                </h3>

                <p className="mt-1.5 text-xs leading-5 text-[#6b5f55] sm:text-sm">
                  {addon.description}
                </p>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center rounded-full border border-[#eadfce] bg-[#faf7f3] px-3 py-1.5 text-sm font-semibold text-[#111111]">
                    +R{addon.price}
                  </span>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#eadfce] bg-[#faf7f3] px-3 py-1.5 text-xs text-[#7b6f64] sm:text-sm">
                    <Clock className="h-3.5 w-3.5 text-[#b08b57]" />
                    +{addon.duration}m
                  </span>
                </div>
              </div>

              <div
                className={cn(
                  'absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full border transition-all duration-300',
                  isSelected
                    ? 'border-[#111111] bg-[#111111] text-white'
                    : 'border-[#d8c2a6] bg-white text-[#b08b57]'
                )}
              >
                {isSelected ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <Plus className="h-3.5 w-3.5" />
                )}
              </div>
            </button>
          )
        })}
      </div>

      {selected.length > 0 && (
        <div className="mt-5 rounded-[20px] border border-[#d8c2a6]/40 bg-[#fcf8f3] p-4 shadow-sm">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="text-[#6b5f55]">
              {selected.length} add-on{selected.length > 1 ? 's' : ''} selected
            </span>

            <span className="font-semibold text-[#111111]">
              +R{totalAddonsPrice}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
