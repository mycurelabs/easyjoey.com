'use client'

import React from "react"
import { Root, Animation, Waypoint } from "@bsmnt/scrollytelling"
import { motion } from "framer-motion"
import { LayoutDashboard, FileText, WifiOff, ShieldCheck } from "lucide-react"

const features = [
  {
    icon: LayoutDashboard,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    titleColor: "text-primary",
    gradientFrom: "from-primary/5",
    gradientTo: "to-primary/10",
    borderColor: "border-primary/20",
    badgeBgStyle: { backgroundColor: '#ccf0ed' },
    badgeTextStyle: { color: '#115e59' },
    title: "Your Clinical Command Center",
    subtitle: "Everything at a glance",
    description: "See your entire day from one powerful dashboard. Active encounters, patient queue, pending prescriptions, and today's appointments — all visible without clicking through menus.",
    cardTitle: "Active Encounters",
    cardSubtitle: "3 patients in progress",
    badgeText: "Live",
    animationStart: 0,
    animationEnd: 30,
    waypointAt: 25,
  },
  {
    icon: FileText,
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-600",
    titleColor: "text-purple-600",
    gradientFrom: "from-purple-500/5",
    gradientTo: "to-purple-500/10",
    borderColor: "border-purple-500/20",
    badgeBgStyle: { backgroundColor: '#e9d5ff' },
    badgeTextStyle: { color: '#581c87' },
    title: "Document in Seconds",
    subtitle: "Clinical notes made simple",
    description: "Write complete clinical notes in minutes, not hours. Smart templates, quick-fill options, and one-click prescriptions mean you spend less time typing and more time with patients.",
    cardTitle: "Patient Note",
    cardSubtitle: "Last saved 2 mins ago",
    badgeText: "Auto-saved",
    animationStart: 20,
    animationEnd: 50,
    waypointAt: 50,
  },
  {
    icon: WifiOff,
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-600",
    titleColor: "text-orange-600",
    gradientFrom: "from-orange-500/5",
    gradientTo: "to-orange-500/10",
    borderColor: "border-orange-500/20",
    badgeBgStyle: { backgroundColor: '#fed7aa' },
    badgeTextStyle: { color: '#9a3412' },
    title: "Works Offline, Always",
    subtitle: "No internet? No problem.",
    description: "Connectivity issues happen. EasyJoey keeps working offline — patient records, prescriptions, billing, everything. When you're back online, it syncs automatically. Zero data loss, guaranteed.",
    cardTitle: "Offline Mode",
    cardSubtitle: "12 records pending sync",
    badgeText: "Ready to sync",
    animationStart: 35,
    animationEnd: 65,
    waypointAt: 75,
  },
  {
    icon: ShieldCheck,
    iconBg: "bg-green-500/10",
    iconColor: "text-green-600",
    titleColor: "text-green-600",
    gradientFrom: "from-green-500/5",
    gradientTo: "to-green-500/10",
    borderColor: "border-green-500/20",
    badgeBgStyle: { backgroundColor: '#bbf7d0' },
    badgeTextStyle: { color: '#166534' },
    title: "Your Data Stays Yours",
    subtitle: "Bank-level protection",
    description: "Patient trust is everything. EasyJoey keeps that trust with secure encryption, staff access controls, and automatic backups. Your records stay in the Philippines, under your control.",
    cardTitle: "Security Status",
    cardSubtitle: "All systems protected",
    badgeText: "Encrypted",
    animationStart: 45,
    animationEnd: 75,
    waypointAt: 100,
  },
]

export function StickyScrollFeatures() {
  return (
    <Root start="top bottom" end="bottom top" scrub={true}>
      <section className="w-full py-8 sm:py-12 md:py-16 mb-16 sm:mb-20 md:mb-32 relative">
        <div className="container px-4 sm:px-6 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Sticky Left Content */}
            <div className="lg:sticky lg:top-32 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* Badge */}
                <div
                  className="rounded-full px-3 py-1 inline-flex items-center justify-center h-8 w-fit"
                  style={{ backgroundColor: '#f0fdfa', borderWidth: '1px', borderStyle: 'solid', borderColor: '#5eead4' }}
                >
                  <span className="text-xs font-medium" style={{ color: '#134e4a' }}>
                    Built for Solo Practitioners
                  </span>
                </div>

                {/* Main Heading */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mt-4">
                  One platform.
                  <br />
                  <span className="text-primary">Complete control.</span>
                </h2>

                {/* Description */}
                <p className="text-lg md:text-xl text-muted-foreground mt-6 max-w-lg">
                  Solo practitioners deserve technology that matches their dedication.
                  EasyJoey combines powerful features with simplicity — less admin
                  work for you, better experiences for your patients.
                </p>
              </motion.div>
            </div>

            {/* Progressive Feature Reveals */}
            <div className="space-y-40">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <React.Fragment key={index}>
                    <Animation
                      tween={{
                        start: feature.animationStart,
                        end: feature.animationEnd,
                        from: { opacity: 0, y: 60, scale: 0.9 }
                      }}
                    >
                      <div className="space-y-6">
                        {/* Feature Header */}
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 ${feature.iconBg} rounded-2xl flex items-center justify-center`}>
                            <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                          </div>
                          <div>
                            <h3 className={`text-2xl md:text-3xl font-bold ${feature.titleColor}`}>
                              {feature.title}
                            </h3>
                            <p className="text-muted-foreground">{feature.subtitle}</p>
                          </div>
                        </div>

                        {/* Feature Description */}
                        <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>

                        {/* Feature Card */}
                        <div className={`bg-gradient-to-br ${feature.gradientFrom} ${feature.gradientTo} rounded-2xl p-6 ${feature.borderColor} border`}>
                          <div className="space-y-3">
                            <div
                              className="flex items-center justify-between p-3 rounded-xl shadow-sm dark:bg-gray-800"
                              style={{ backgroundColor: '#ffffff' }}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 ${feature.iconBg} rounded-full flex items-center justify-center`}>
                                  <Icon className={`w-4 h-4 ${feature.iconColor}`} />
                                </div>
                                <div>
                                  <div className="font-semibold text-sm dark:text-white" style={{ color: '#111827' }}>{feature.cardTitle}</div>
                                  <div className="text-xs dark:text-gray-300" style={{ color: '#4b5563' }}>{feature.cardSubtitle}</div>
                                </div>
                              </div>
                              <div
                                className="text-xs rounded-full px-3 py-1 inline-flex items-center justify-center h-7 min-w-fit"
                                style={feature.badgeBgStyle}
                              >
                                <span className="font-medium" style={feature.badgeTextStyle}>
                                  {feature.badgeText}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Animation>
                    <Waypoint at={feature.waypointAt} label={`feature-${index + 1}`} />
                  </React.Fragment>
                )
              })}
            </div>

          </div>
        </div>
      </section>
    </Root>
  )
}
