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
    const isSelected = selected.some(a => a.id === addon.id)
    if (isSelected) {
      onSelect(selected.filter(a => a.id !== addon.id))
    } else {
      onSelect([...selected, addon])
    }
  }

  const totalAddonsPrice = selected.reduce((sum, addon) => sum + addon.price, 0)

  return (
    <div>
      <div className="mb-6 text-center">
        <h2 className="font-serif text-xl font-semibold text-foreground">
          Add-ons
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Enhance your service (optional)
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {ADDONS.map((addon) => {
          const isSelected = selected.some(a => a.id === addon.id)

          return (
            <button
              key={addon.id}
              onClick={() => toggleAddon(addon)}
              className={cn(
                'group relative rounded-xl border-2 p-3 text-left transition-all duration-200',
                isSelected
                  ? 'border-primary bg-primary/5'
                  : 'border-border/50 bg-background hover:border-primary/50 hover:bg-muted/30'
              )}
            >
              <div className="pr-6">
                <h3 className="text-sm font-medium text-foreground">
                  {addon.name}
                </h3>
                <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                  {addon.description}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-serif text-sm font-semibold text-foreground">
                    +R{addon.price}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    +{addon.duration}m
                  </span>
                </div>
              </div>

              <div
                className={cn(
                  'absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all',
                  isSelected
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background'
                )}
              >
                {isSelected ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <Plus className="h-3 w-3 text-muted-foreground" />
                )}
              </div>
            </button>
          )
        })}
      </div>

      {selected.length > 0 && (
        <div className="mt-4 rounded-lg bg-primary/5 p-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {selected.length} add-on{selected.length > 1 ? 's' : ''} selected
            </span>
            <span className="font-serif font-semibold text-foreground">
              +R{totalAddonsPrice}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
