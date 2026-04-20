'use client'

import { Hand, Footprints, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Category } from '@/lib/types'

interface CategoryStepProps {
  selected: Category | null
  onSelect: (category: Category) => void
}

const categories: {
  id: Category
  label: string
  description: string
  icon: typeof Hand
}[] = [
  {
    id: 'hands',
    label: 'Hands',
    description: 'Manicure and nail enhancement services',
    icon: Hand,
  },
  {
    id: 'toes',
    label: 'Toes',
    description: 'Pedicure and toe finish services',
    icon: Footprints,
  },
]

export function CategoryStep({ selected, onSelect }: CategoryStepProps) {
  return (
    <div>
      <div className="mb-8 text-center">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.28em] text-[#b08b57]">
          Appointment Category
        </p>

        <h2 className="text-2xl font-semibold tracking-tight text-[#111111]">
          Choose a Category
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#6b5f55]">
          What would you like done today?
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {categories.map((category) => {
          const Icon = category.icon
          const isSelected = selected === category.id

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelect(category.id)}
              className={cn(
                'group relative flex min-h-[220px] flex-col items-center justify-center rounded-[28px] border p-6 text-center transition-all duration-300',
                isSelected
                  ? 'border-[#d8c2a6] bg-[#fcf8f3] shadow-[0_16px_40px_rgba(0,0,0,0.06)]'
                  : 'border-[#eadfce] bg-white/80 hover:border-[#d8c2a6] hover:bg-[#fdfaf6] hover:shadow-[0_12px_30px_rgba(0,0,0,0.05)]'
              )}
            >
              <div
                className={cn(
                  'mb-5 flex h-16 w-16 items-center justify-center rounded-full border transition-all duration-300',
                  isSelected
                    ? 'border-[#d8c2a6] bg-[#111111] text-white'
                    : 'border-[#e8d9c3] bg-[#faf7f3] text-[#b08b57] group-hover:border-[#d8c2a6] group-hover:bg-white'
                )}
              >
                <Icon className="h-7 w-7" />
              </div>

              <h3 className="text-lg font-semibold tracking-tight text-[#111111]">
                {category.label}
              </h3>

              <p className="mt-2 max-w-[14rem] text-sm leading-6 text-[#6b5f55]">
                {category.description}
              </p>

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
