import { LandingFeatures } from "@/components/home/landing-features"
import { LandingHero } from "@/components/home/landing-hero"
import { LandingHighlights } from "@/components/home/landing-highlights"
import { LandingGradientBackground } from "@/components/motion/landing-gradient-background"

export default function HomePage() {
  return (
    <main className="relative min-h-svh overflow-hidden bg-background">
      <LandingGradientBackground />
      <LandingHero />
      <LandingFeatures />
      <LandingHighlights />
    </main>
  )
}
