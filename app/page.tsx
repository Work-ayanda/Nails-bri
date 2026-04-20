import { Header } from "@/components/header"
import { HeroSection } from "@/components/sections/hero"
import { ServicesSection } from "@/components/sections/services"
import { GallerySection } from "@/components/sections/gallery"
import { TestimonialsSection } from "@/components/sections/testimonials"
import { FAQSection } from "@/components/sections/faq"
import { LoyaltySection } from "@/components/sections/loyalty"
import { BookingSection } from "@/components/sections/booking"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ServicesSection />
      <GallerySection />
      <TestimonialsSection />
      <FAQSection />
      <LoyaltySection />
      <BookingSection />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
