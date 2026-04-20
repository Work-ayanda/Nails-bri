'use client'

import Image from 'next/image'
import { MessageCircle } from 'lucide-react'
import { CONTACT_INFO } from '@/lib/data'

export function CompactHeader() {
  const whatsappUrl = `${CONTACT_INFO.whatsappLink}?text=${encodeURIComponent(CONTACT_INFO.prefillMessage)}`

  return (
    <header className="mb-6">
      <div className="mx-auto max-w-lg px-4 md:px-6">
        <div className="rounded-[24px] border border-[#d8c2a6]/40 bg-white/70 p-4 shadow-sm backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#d8c2a6]/40 bg-[#faf7f3]">
                <Image
                  src="/logo.png"
                  alt="Nails @ Bri's"
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                  priority
                />
              </div>

              <div className="min-w-0">
                <h1 className="truncate text-base font-semibold tracking-tight text-[#111111] sm:text-lg">
                  {CONTACT_INFO.businessName}
                </h1>
                <p className="text-xs text-[#8a7f75] sm:text-sm">
                  {CONTACT_INFO.tagline}
                </p>
              </div>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex shrink-0 items-center gap-2 rounded-full border border-[#d8c2a6] bg-white px-3 py-2 text-xs font-medium text-[#111111] transition hover:bg-[#faf7f3]"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>

          <p className="mt-4 text-center text-sm text-[#6b5f55]">
            Reserve your appointment with ease.
          </p>
        </div>
      </div>
    </header>
  )
}
