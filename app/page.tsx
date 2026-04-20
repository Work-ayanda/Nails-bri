import { CompactHeader } from "@/components/compact-header"
import { BookingApp } from "@/components/booking-app"
import { PolicyCard } from "@/components/policy-card"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
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

