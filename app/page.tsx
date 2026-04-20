"use client"

import { useEffect, useState } from "react"
import { CompactHeader } from "@/components/compact-header"
import { BookingApp } from "@/components/booking-app"
import { PolicyCard } from "@/components/policy-card"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { MessageCircle, ArrowRight } from "lucide-react"

export default function Home() {
  const [started, setStarted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isEntering, setIsEntering] = useState(false)

  const whatsappMessage =
    "Hi Bridget, I’d like to book an appointment with Nails @ Bri’s."
  const whatsappLink = `https://wa.me/27629704661?text=${encodeURIComponent(
    whatsappMessage
  )}`

  useEffect(() => {
    const hasVisited = localStorage.getItem("nails-at-bris-started")
    if (hasVisited === "true") {
      setStarted(true)
    }
    setIsLoaded(true)
  }, [])

  const handleStart = () => {
    setIsEntering(true)
    localStorage.setItem("nails-at-bris-started", "true")

    setTimeout(() => {
      setStarted(true)
    }, 350)
  }

  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-[#f7f1eb] text-[#171717] flex items-center justify-center px-5">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#d8c2a6] border-t-[#111111]" />
      </main>
    )
  }

  if (!started) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[#f7f1eb] text-[#171717] flex items-center justify-center px-5 py-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(198,169,107,0.18),transparent_30%),linear-gradient(to_bottom,#f7f1eb,#f3e7dc,#efe2d3)]" />
        <div className="absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#d8c2a6]/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-[#ffffff]/30 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-64 w-64 rounded-full bg-[#b08b57]/10 blur-3xl" />

        <div
          className={`relative z-10 w-full max-w-md rounded-[32px] border border-[#d8c2a6]/40 bg-white/75 p-8 shadow-[0_20px_70px_rgba(0,0,0,0.08)] backdrop-blur transition-all duration-500 ${
            isEntering
              ? "translate-y-3 opacity-0 scale-[0.98]"
              : "translate-y-0 opacity-100 scale-100"
          }`}
        >
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#d8c2a6]/50 bg-[#faf7f3] shadow-sm">
              <span className="text-lg font-semibold tracking-[0.2em] text-[#b08b57]">
                NB
              </span>
            </div>

            <p className="mb-3 text-xs font-medium uppercase tracking-[0.35em] text-[#b08b57]">
              Luxury Nail Studio
            </p>

            <h1 className="mb-3 text-4xl font-semibold tracking-tight text-[#111111] md:text-5xl">
              Welcome to Nails @ Bri&apos;s
            </h1>

            <p className="mx-auto max-w-sm text-sm leading-6 text-[#5c5248] md:text-base">
              Luxury nail appointments, effortlessly booked.
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleStart}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#111111] px-5 py-4 text-sm font-medium text-white transition hover:opacity-95"
            >
              Book Now
              <ArrowRight className="h-4 w-4" />
            </button>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-[#d8c2a6] bg-white px-5 py-4 text-sm font-medium text-[#111111] transition hover:bg-[#faf7f3]"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background animate-in fade-in duration-500">
      <CompactHeader />
      <div className="px-4 pb-32 pt-6 md:px-6 md:pb-8">
        <div className="mx-auto max-w-lg">
          <BookingApp />
          <PolicyCard />
        </div>
      </div>
      <WhatsAppButton />
    </main>
  )
}
