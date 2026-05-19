"use client"

import Link from "next/link"
import { motion } from "motion/react"
import {
  ArrowRight,
  BadgeCheck,
  Code2,
  Github,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
} from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { hoverLift, staggerContainer, staggerItem } from "@/lib/motion-presets"
import { cn } from "@/lib/utils"

const stack = [
  { label: "Next.js", src: "/icons/nextjs.svg" },
  { label: "shadcn/ui", src: "/icons/shadcnui.svg" },
  { label: "Prisma", src: "/icons/prisma.svg" },
  { label: "Tailwind", src: "/icons/tailwindcss.svg" },
  { label: "TypeScript", src: "/icons/ts.svg" },
  { label: "PostgreSQL", src: "/icons/postgresql.svg" },
]

const quickStats = [
  { title: "Auth", description: "Login, register, reset et vérification d'email." },
  { title: "Data", description: "Prisma, migrations et schéma prêt à évoluer." },
  { title: "UI", description: "Composants shadcn déjà installés et cohérents." },
]

export function LandingHero() {
  return (
    <section className="container mx-auto px-4 py-14 lg:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          className="flex flex-col gap-8"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div className="flex flex-col gap-4" variants={staggerItem}>
            <Badge
              variant="outline"
              className="w-fit gap-1.5 border-violet-500/30 bg-violet-500/10 px-3 py-1 text-violet-700 dark:text-violet-300"
            >
              <Sparkles className="size-3.5" />
              Fullstack prêt à lancer
            </Badge>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              <span className="bg-linear-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent dark:from-violet-300 dark:via-fuchsia-300 dark:to-cyan-300">
                Une base Next.js
              </span>{" "}
              claire, moderne et déjà utile pour livrer vite.
            </h1>
            <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Ce starter fullstack rassemble l&apos;auth, Prisma, PostgreSQL et
              une bibliothèque shadcn bien fournie pour démarrer un produit sans
              passer une semaine à recoller les briques de base.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-3"
            variants={staggerItem}
          >
            <Link
              href="#demo"
              className={cn(
                buttonVariants({ size: "lg" }),
                "gap-2 bg-linear-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/25 hover:from-violet-500 hover:to-fuchsia-500"
              )}
            >
              Explorer le starter
              <ArrowRight className="size-4" data-icon />
            </Link>
            <Link
              href="https://github.com/franckniat/boilerplate/tree/main/nextjs/fullstack"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "gap-2 border-white/20 bg-white/50 backdrop-blur dark:bg-white/5"
              )}
            >
              <Github className="size-4" data-icon />
              Voir le dépôt
            </Link>
          </motion.div>

          <motion.div
            className="grid gap-3 sm:grid-cols-3"
            variants={staggerItem}
          >
            {quickStats.map((stat) => (
              <motion.div
                key={stat.title}
                className="rounded-2xl border border-white/40 bg-white/60 p-4 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5"
                {...hoverLift}
              >
                <div className="text-sm font-medium">{stat.title}</div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card className="border-white/40 bg-white/70 shadow-2xl shadow-violet-500/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-violet-500/5">
            <CardHeader className="gap-3 border-b border-white/30 pb-5 dark:border-white/10">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-violet-600/90 hover:bg-violet-600">Next.js 16</Badge>
                <Badge variant="secondary">Prisma</Badge>
                <Badge variant="secondary">shadcn/ui</Badge>
              </div>
              <CardTitle className="text-xl">
                Tout ce qu&apos;il faut pour démarrer sans bricolage
              </CardTitle>
              <CardDescription className="max-w-md">
                Une base lisible, structurée et suffisamment légère pour que tu
                puisses la transformer en vrai produit.
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-5 pt-6">
              <div className="rounded-2xl border border-violet-500/20 bg-linear-to-br from-violet-500/10 via-transparent to-cyan-500/10 p-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <TerminalSquare className="size-4 text-violet-600 dark:text-violet-400" />
                  Démarrage rapide
                </div>
                <div className="mt-3 flex flex-col gap-2 font-mono text-sm text-muted-foreground">
                  <div className="flex items-center justify-between gap-4">
                    <span>pnpm install</span>
                    <span className="text-foreground/70">1 min</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between gap-4">
                    <span>pnpm prisma migrate dev</span>
                    <span className="text-foreground/70">DB</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between gap-4">
                    <span>pnpm dev</span>
                    <span className="text-foreground/70">localhost</span>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { icon: Code2, title: "Code propre", desc: "Structure prête pour scaler." },
                  { icon: BadgeCheck, title: "UX nette", desc: "Composants cohérents." },
                  { icon: ShieldCheck, title: "Sécurisé", desc: "Auth déjà pensée." },
                ].map((item) => (
                  <motion.div
                    key={item.title}
                    className="rounded-2xl border border-white/30 bg-white/40 p-3 dark:border-white/10 dark:bg-white/5"
                    {...hoverLift}
                  >
                    <item.icon className="size-4 text-violet-600 dark:text-violet-400" />
                    <p className="mt-2 text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          <motion.div
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {stack.map((item, index) => (
              <motion.div
                key={item.label}
                variants={staggerItem}
                custom={index}
                className="flex items-center gap-3 rounded-2xl border border-white/40 bg-white/60 px-4 py-3 backdrop-blur-md dark:border-white/10 dark:bg-white/5"
                {...hoverLift}
              >
                <img src={item.src} alt={item.label} className="size-7" />
                <span className="text-sm font-medium">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
