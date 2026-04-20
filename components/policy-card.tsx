'use client'

import { Info } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { POLICIES } from '@/lib/data'

export function PolicyCard() {
  return (
    <Card className="mt-6 border-border/50 bg-muted/30">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Info className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="mb-2 font-serif text-sm font-medium text-foreground">
              Booking Policies
            </h3>
            <ul className="space-y-1.5">
              {POLICIES.map((policy, index) => (
                <li key={index} className="text-xs leading-relaxed text-muted-foreground">
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
