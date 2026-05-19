"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FadeInView } from "@/components/motion/fade-in-view"
import { hoverLift, staggerContainer, staggerItem } from "@/lib/motion-presets"
import { landingFeatureSections } from "@/lib/landing-features"
import { cn } from "@/lib/utils"

export function LandingFeatures() {
  return (
    <section
      id="demo"
      className="relative border-t border-white/20 bg-linear-to-b from-violet-500/5 via-transparent to-cyan-500/5 py-16 lg:py-24"
    >
      <div className="container mx-auto px-4">
        <FadeInView className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
            Démo interactive
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            Chaque brique du boilerplate est visitable
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Parcourez les écrans déjà implémentés — dashboard, auth, paramètres
            et administration — pour voir comment le starter est structuré avant
            de le personnaliser.
          </p>
        </FadeInView>

        <FadeInView className="mt-10 flex flex-wrap justify-center gap-2" delay={0.1}>
          {landingFeatureSections.map((section) => (
            <motion.a
              key={section.id}
              href={`#${section.id}`}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "rounded-full border-white/30 bg-white/50 backdrop-blur dark:bg-white/5"
              )}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              {section.title}
            </motion.a>
          ))}
        </FadeInView>

        <div className="mt-14 flex flex-col gap-20">
          {landingFeatureSections.map((section, sectionIndex) => (
            <FadeInView
              key={section.id}
              id={section.id}
              className="scroll-mt-24"
              delay={sectionIndex * 0.05}
            >
              <div className="mb-8 max-w-2xl">
                <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  <span className="bg-linear-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent dark:from-violet-300 dark:to-fuchsia-300">
                    {section.title}
                  </span>
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
                  {section.description}
                </p>
              </div>

              <motion.div
                className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-40px" }}
              >
                {section.features.map((feature) => {
                  const Icon = feature.icon

                  return (
                    <motion.div
                      key={`${section.id}-${feature.title}`}
                      variants={staggerItem}
                      {...hoverLift}
                    >
                      <Card className="flex h-full flex-col border-white/40 bg-white/60 shadow-lg shadow-violet-500/5 backdrop-blur-md dark:border-white/10 dark:bg-white/5">
                        <CardHeader className="gap-4 pb-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-violet-500/20 to-fuchsia-500/20">
                              <Icon className="size-5 text-violet-600 dark:text-violet-400" />
                            </div>
                            {feature.badge && (
                              <Badge
                                variant="secondary"
                                className="shrink-0 bg-violet-500/10 text-violet-700 dark:text-violet-300"
                              >
                                {feature.badge}
                              </Badge>
                            )}
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <CardTitle className="text-lg">{feature.title}</CardTitle>
                            <CardDescription className="text-sm leading-6">
                              {feature.description}
                            </CardDescription>
                          </div>
                        </CardHeader>
                        <CardFooter className="mt-auto border-t border-white/30 pt-4 dark:border-white/10">
                          <Link
                            href={feature.href}
                            className={cn(
                              buttonVariants({ variant: "ghost", size: "sm" }),
                              "w-full justify-between gap-2 hover:bg-violet-500/10"
                            )}
                          >
                            Voir la démo
                            <ArrowRight className="size-4" />
                          </Link>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  )
                })}
              </motion.div>
            </FadeInView>
          ))}
        </div>

        <FadeInView className="mt-16" delay={0.15}>
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/40 bg-linear-to-br from-violet-500/10 via-white/60 to-cyan-500/10 p-8 text-center shadow-xl backdrop-blur-xl dark:border-white/10 dark:from-violet-500/15 dark:via-white/5 dark:to-cyan-500/10">
            <p className="max-w-lg text-sm text-muted-foreground">
              Connectez-vous ou créez un compte pour tester l&apos;auth, puis
              explorez le dashboard avec la palette de commande (
              <kbd className="rounded border bg-white/60 px-1.5 py-0.5 font-mono text-xs dark:bg-white/10">
                Ctrl+K
              </kbd>
              ).
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/dashboard"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-linear-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/20"
                )}
              >
                Ouvrir le dashboard
                <ArrowRight className="size-4" data-icon />
              </Link>
              <Link
                href="/login"
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                Se connecter
              </Link>
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  )
}
