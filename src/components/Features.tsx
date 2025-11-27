'use client'

import { motion } from "framer-motion"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ClipboardList, UserPlus, Receipt, Pill, BarChart3, ShieldCheck, LucideIcon } from "lucide-react"

const features: { icon: LucideIcon; bgColor: string; title: string; description: string }[] = [
  {
    icon: ClipboardList,
    bgColor: "bg-teal-500/10",
    title: "Electronic Medical Records",
    description: "Complete patient records and clinical notes in one place. Find what you need instantly — no searching, no delays.",
  },
  {
    icon: UserPlus,
    bgColor: "bg-teal-600/10",
    title: "Patient Registration",
    description: "Quick patient intake that gets patients from the waiting room to your care faster. Less paperwork, more face time.",
  },
  {
    icon: Receipt,
    bgColor: "bg-emerald-500/10",
    title: "Simple Billing",
    description: "Clear billing that patients understand. Track payments and generate receipts without complex accounting.",
  },
  {
    icon: Pill,
    bgColor: "bg-teal-500/15",
    title: "Prescription Management",
    description: "Create accurate prescriptions in seconds. Built-in drug reference and prescription history keep patients safe.",
  },
  {
    icon: BarChart3,
    bgColor: "bg-emerald-600/10",
    title: "Practice Analytics",
    description: "See what's working for your practice and your patients. Simple reports that help you improve care.",
  },
  {
    icon: ShieldCheck,
    bgColor: "bg-teal-600/15",
    title: "Offline-First & Secure",
    description: "Works without internet — patients never wait because of connectivity issues. Their information stays protected and secure.",
  },
]

export function Features() {
  return (
    <section id="features" className="w-full py-20 md:py-32 bg-muted/50">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight leading-tight md:text-5xl lg:text-6xl mb-6">
            All the Essentials. None of the Complexity.
          </h2>
          <p className="mx-auto max-w-[800px] text-base sm:text-lg text-muted-foreground leading-relaxed">
            Most clinic software takes weeks to learn. EasyJoey takes minutes. Here&apos;s what you get out of the box.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-card border-border/40 hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                  <CardHeader className="space-y-2">
                    <div className={`size-12 rounded-full ${feature.bgColor} flex items-center justify-center mb-3`}>
                      <Icon className="size-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl md:text-2xl tracking-tight">{feature.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
