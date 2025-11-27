'use client'

import Image from "next/image"
import { motion } from "framer-motion"
import { Wifi, Shield, Sparkles, Check } from "lucide-react"

const features = [
  {
    icon: Wifi,
    title: "Works Offline, Always",
    description: "Stay productive during connectivity challenges. EasyJoey keeps working — and syncs automatically when you're back online.",
    bullets: [
      "Access patient records even without internet connection",
      "Continue documenting visits and writing prescriptions offline",
      "Patients in areas with unreliable internet still get full care",
    ],
    imagePosition: "left" as const,
    image: "/features/works-offline.mp4",
  },
  {
    icon: Shield,
    title: "Your Data, Your Control",
    description: "Bank-level encryption keeps patient data protected. Your records stay in the Philippines, under your control.",
    bullets: [
      "Patient information stays private and protected",
      "Control who can access patient information",
      "Automatic backups keep your records safe",
    ],
    imagePosition: "right" as const,
    image: "/features/your-data-your-control.webp",
  },
  {
    icon: Sparkles,
    title: "Quick to Master",
    description: "Learn it in 15 minutes. Master it by lunch. Less time learning software means more time with patients.",
    bullets: [
      "Clean interface designed for quick documentation",
      "Start using it in minutes, not days",
      "Built by healthcare professionals for healthcare professionals",
    ],
    imagePosition: "left" as const,
    image: "/features/simple-not-simplified.png",
  },
]

export function SocialProof() {
  return (
    <section id="why-choose-us" className="w-full py-20 md:py-32">
      <div className="container px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-16"
        >
          <div
            className="inline-flex items-center justify-center px-3 py-1 mb-4 text-xs font-medium rounded-full"
            style={{ backgroundColor: '#f0fdfa', borderWidth: '1px', borderStyle: 'solid', borderColor: '#5eead4', color: '#134e4a' }}
          >
            Why 500+ Filipino Clinics Trust Us
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Reliable When It Matters Most
          </h2>
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            Designed for real Philippine conditions — from Metro Manila to provincial clinics.
          </p>
        </motion.div>

        {/* Features - Alternating Layout */}
        <div className="space-y-20">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isImageLeft = feature.imagePosition === "left"
            const isVideo = feature.image.endsWith('.mp4')

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid lg:grid-cols-2 gap-12 items-center"
              >
                {/* Feature Image/Video */}
                <div className={`${isImageLeft ? 'order-2 lg:order-1' : 'lg:order-2'} relative`}>
                  {isVideo ? (
                    <video
                      src={feature.image}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="rounded-xl w-full h-auto"
                      style={{ clipPath: 'inset(5px 3px)' }}
                      aria-label={`${feature.title} Demo`}
                    />
                  ) : (
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      width={640}
                      height={400}
                      className="rounded-xl w-full h-auto"
                    />
                  )}
                </div>

                {/* Content */}
                <div className={`${isImageLeft ? 'order-1 lg:order-2' : 'lg:order-1'} space-y-6`}>
                  <div className="space-y-4">
                    <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold">{feature.title}</h3>
                    <p className="text-muted-foreground text-lg">{feature.description}</p>
                  </div>
                  <ul className="space-y-3">
                    {feature.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="flex items-start gap-3">
                        <Check className="size-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
