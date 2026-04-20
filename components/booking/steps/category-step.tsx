'use client'

import { Hand, Footprints } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Category } from '@/lib/types'

interface CategoryStepProps {
  selected: Category | null
  onSelect: (category: Category) => void
}

const categories: { id: Category; label: string; description: string; icon: typeof Hand }[] = [
  {
    id: 'hands',
    label: 'Hands',
    description: 'Manicure services',
    icon: Hand
  },
  {
    id: 'toes',
    label: 'Toes',
    description: 'Pedicure services',
    icon: Footprints
  }
]

export function CategoryStep({ selected, onSelect }: CategoryStepProps) {
  return (
    <div>
      <div className="mb-6 text-center">
        <h2 className="font-serif text-xl font-semibold text-foreground">
          Choose a Category
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          What would you like done today?
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => {
          const Icon = category.icon
          const isSelected = selected === category.id

          return (
            <button
              key={category.id}
              onClick={() => onSelect(category.id)}
              className={cn(
                'group relative flex flex-col items-center justify-center rounded-2xl border-2 p-8 transition-all duration-200',
                isSelected
                  ? 'border-primary bg-primary/5 shadow-md'
                  : 'border-border/50 bg-background hover:border-primary/50 hover:bg-muted/50'
              )}
            >
              <div
                className={cn(
                  'mb-4 flex h-16 w-16 items-center justify-center rounded-full transition-colors',
                  isSelected
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                )}
              >
                <Icon className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-lg font-medium text-foreground">
                {category.label}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {category.description}
              </p>
              
              {isSelected && (
                <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
