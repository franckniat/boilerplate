"use client"

import { motion } from "motion/react"
import { Database, Layers3, ShieldCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FadeInView } from "@/components/motion/fade-in-view"
import { hoverLift, staggerContainer, staggerItem } from "@/lib/motion-presets"

const highlights = [
  {
    icon: ShieldCheck,
    title: "Auth prête à l'emploi",
    description:
      "Inscription, connexion, reset de mot de passe et vérification d'email déjà câblés.",
  },
  {
    icon: Database,
    title: "Base de données solide",
    description:
      "Prisma, PostgreSQL et migrations en place pour partir sur une architecture propre.",
  },
  {
    icon: Layers3,
    title: "UI moderne et compacte",
    description:
      "Une bibliothèque shadcn étendue pour composer vite sans alourdir l'expérience.",
  },
]

export function LandingHighlights() {
  return (
    <section
      id="features"
      className="container mx-auto px-4 pb-16 lg:pb-24"
    >
      <FadeInView className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
            Pourquoi ce starter
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Un socle pensé pour aller vite, puis rester maintenable.
          </h2>
        </div>
        <Badge
          variant="outline"
          className="hidden border-violet-500/30 bg-violet-500/10 sm:inline-flex"
        >
          Compact et extensible
        </Badge>
      </FadeInView>

      <motion.div
        className="grid gap-4 lg:grid-cols-3"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-40px" }}
      >
        {highlights.map((item) => {
          const Icon = item.icon

          return (
            <motion.div key={item.title} variants={staggerItem} {...hoverLift}>
              <Card className="h-full border-white/40 bg-white/60 backdrop-blur-md dark:border-white/10 dark:bg-white/5">
                <CardHeader className="gap-3 pb-3">
                  <div className="flex size-10 items-center justify-center rounded-2xl bg-linear-to-br from-violet-500/20 to-cyan-500/20">
                    <Icon className="size-5 text-violet-600 dark:text-violet-400" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription className="text-sm leading-6">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                    <li>• Pensé pour être compris en quelques minutes.</li>
                    <li>• Suffisamment neutre pour ton produit ou ton client.</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
