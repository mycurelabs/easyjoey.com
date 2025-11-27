'use client'

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ShimmerButton } from "@/components/magicui/shimmer-button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, ChevronRight } from "lucide-react"

const plans = [
  {
    name: "Solo",
    price: "Free",
    period: "forever",
    description: "Perfect for solo practitioners",
    features: [
      "1 user account",
      "Up to 500 patients",
      "Patient records & clinical notes",
      "Prescription management",
      "Simple billing & receipts",
      "Offline mode",
    ],
    popular: false,
  },
  {
    name: "Clinic",
    price: "₱3,999",
    period: "per month",
    description: "Ideal for small clinics",
    features: [
      "Up to 5 user accounts",
      "Unlimited patients",
      "All Solo features",
      "Practice analytics",
      "Team access management",
      "Priority email support",
    ],
    popular: true,
  },
  {
    name: "Practice",
    price: "Custom",
    period: "pricing",
    description: "For growing practices",
    features: [
      "Unlimited users",
      "All Clinic features",
      "Multi-branch support",
      "Dedicated account manager",
      "Connect with other tools",
      "On-site training",
    ],
    popular: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="w-full py-20 md:py-32 bg-muted/50">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight leading-tight md:text-5xl lg:text-6xl mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="mx-auto max-w-[800px] text-base sm:text-lg text-muted-foreground leading-relaxed">
            Start free, upgrade when you're ready. No credit card required.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card className={`h-full flex flex-col bg-card border-border/40 transition-all duration-300 ${plan.popular ? 'border-primary shadow-md scale-105 hover:scale-110' : 'hover:shadow-md hover:scale-105'}`}>
                {plan.popular && (
                  <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-semibold rounded-t-lg">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl md:text-3xl tracking-tight">{plan.name}</CardTitle>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                  <div className="mt-6">
                    <span className="text-4xl md:text-5xl font-bold tracking-tight">{plan.price}</span>
                    <span className="text-muted-foreground ml-2 text-base">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="size-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-base leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  {plan.popular ? (
                    <ShimmerButton
                      background="#009688"
                      shimmerColor="#ffffff"
                      className="w-full h-11 px-6 text-base font-semibold rounded-full"
                    >
                      Get Started Free
                      <ChevronRight className="ml-1 size-4" />
                    </ShimmerButton>
                  ) : (
                    <Button
                      className="w-full h-11 px-6 text-base font-semibold rounded-full transition-all duration-300"
                      variant="outline"
                    >
                      {plan.price === "Custom" ? "Contact Us" : plan.price === "Free" ? "Get Started Free" : "Start Free Trial"}
                      <ChevronRight className="ml-1 size-4" />
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
