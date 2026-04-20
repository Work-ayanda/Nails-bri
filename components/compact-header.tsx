'use client'

import Image from 'next/image'
import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CONTACT_INFO } from '@/lib/data'

export function CompactHeader() {
  const whatsappUrl = `${CONTACT_INFO.whatsappLink}?text=${encodeURIComponent(CONTACT_INFO.prefillMessage)}`

  return (
    <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="mx-auto max-w-lg px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Nails @ Bri's"
              width={56}
              height={56}
              className="h-14 w-14 object-contain"
              priority
            />
            <div>
              <h1 className="font-serif text-xl font-semibold tracking-tight text-foreground">
                {CONTACT_INFO.businessName}
              </h1>
              <p className="text-sm text-muted-foreground">
                {CONTACT_INFO.tagline}
              </p>
            </div>
          </div>
          <Button
            asChild
            size="sm"
            className="gap-2 bg-[#25D366] text-white hover:bg-[#20bd5a]"
          >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </Button>
        </div>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Reserve your appointment with ease.
        </p>
      </div>
    </header>
  )
}
