import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/Hero"
import { Features } from "@/components/Features"
import { SocialProof } from "@/components/social-proof"
import { StickyScrollFeatures } from "@/components/sticky-scroll-features"
import { Pricing } from "@/components/Pricing"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <SocialProof />
        <StickyScrollFeatures />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
