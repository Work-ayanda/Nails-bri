'use client'

import { Info } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { POLICIES } from '@/lib/data'

export function PolicyCard() {
  return (
    <Card className="mt-6 rounded-[24px] border border-[#d8c2a6]/40 bg-white/70 shadow-sm backdrop-blur">
      <CardContent className="p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d8c2a6]/40 bg-[#faf7f3]">
            <Info className="h-4 w-4 text-[#b08b57]" />
          </div>

          <div>
            <h3 className="mb-2 text-sm font-medium text-[#111111]">
              Booking Policies
            </h3>

            <ul className="space-y-2">
              {POLICIES.map((policy, index) => (
                <li
                  key={index}
                  className="text-xs leading-relaxed text-[#6b5f55] sm:text-sm"
                >
                  {policy}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
