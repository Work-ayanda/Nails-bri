"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"
import { BookingWizard } from "@/components/booking/booking-wizard"

export function BookingSection() {
  return (
    <section id="booking" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4">
            <Calendar className="h-3 w-3 mr-1" />
            Book Now
          </Badge>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4 text-balance">
            Schedule Your Appointment
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Ready to treat yourself? Book your appointment in just a few simple steps. We can&apos;t wait to pamper you!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <BookingWizard />
        </motion.div>
      </div>
    </section>
  )
}
