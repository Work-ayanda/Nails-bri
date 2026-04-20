"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Gift, Crown, Sparkles, Heart, Star, Award } from "lucide-react"

const loyaltyTiers = [
  {
    name: "Bronze",
    visits: "5 visits",
    benefit: "10% off your next service",
    icon: Star,
    color: "bg-amber-100 text-amber-700",
  },
  {
    name: "Silver",
    visits: "10 visits",
    benefit: "15% off + free nail art on one nail",
    icon: Award,
    color: "bg-gray-100 text-gray-600",
  },
  {
    name: "Gold",
    visits: "20 visits",
    benefit: "20% off + free luxury add-on",
    icon: Crown,
    color: "bg-primary/10 text-primary",
  },
]

const perks = [
  {
    icon: Gift,
    title: "Birthday Treat",
    description: "Enjoy 25% off during your birthday month",
  },
  {
    icon: Heart,
    title: "Referral Rewards",
    description: "Get R50 off when you refer a friend",
  },
  {
    icon: Sparkles,
    title: "Exclusive Access",
    description: "Early access to new designs and services",
  },
]

export function LoyaltySection() {
  return (
    <section id="loyalty" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            <Crown className="h-3 w-3 mr-1" />
            Loyalty Program
          </Badge>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4 text-balance">
            Rewards for Our VIPs
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Join our loyalty program and earn exclusive rewards with every visit. The more you visit, the more you save!
          </p>
        </motion.div>

        {/* Loyalty Tiers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {loyaltyTiers.map((tier, index) => (
            <Card
              key={tier.name}
              className={`relative overflow-hidden hover:shadow-lg transition-shadow ${
                index === 2 ? "ring-2 ring-primary" : ""
              }`}
            >
              {index === 2 && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-bl-lg">
                  Best Value
                </div>
              )}
              <CardContent className="p-6 text-center">
                <div
                  className={`w-16 h-16 rounded-full ${tier.color} flex items-center justify-center mx-auto mb-4`}
                >
                  <tier.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {tier.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {tier.visits}
                </p>
                <p className="text-primary font-medium">{tier.benefit}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Additional Perks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-muted/50 rounded-3xl p-8 md:p-12"
        >
          <h3 className="text-2xl font-serif font-bold text-foreground text-center mb-8">
            Additional Perks
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {perks.map((perk, index) => (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <perk.icon className="h-7 w-7 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">
                  {perk.title}
                </h4>
                <p className="text-sm text-muted-foreground text-pretty">
                  {perk.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
