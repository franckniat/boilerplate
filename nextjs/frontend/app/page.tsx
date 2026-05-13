import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Code2,
  Database,
  Github,
  Layers3,
  Palette,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layouts/navbar";
import { cn } from "@/lib/utils";

const highlights = [
  {
    icon: ShieldCheck,
    title: "Base propre et sécurisée",
    description: "Une structure claire pour partir vite sans accumuler de dette visuelle ou technique.",
  },
  {
    icon: Database,
    title: "Composants déjà prêts",
    description: "Une bibliothèque shadcn complète pour construire une interface cohérente et rapide.",
  },
  {
    icon: Layers3,
    title: "UI compacte",
    description: "Des blocs plus légers, lisibles et faciles à faire évoluer sans alourdir la page.",
  },
];

const metrics = [
  { label: "Composants installés", value: "+25" },
  { label: "Pages de départ", value: "3" },
  { label: "Stack", value: "Next + Tailwind" },
];

const steps = [
  {
    icon: Code2,
    title: "Cloner et lancer",
    description: "Installer le projet et démarrer en local sans setup superflu.",
  },
  {
    icon: Palette,
    title: "Adapter le style",
    description: "Modifier les variables, la typographie et les sections selon ton produit.",
  },
  {
    icon: TerminalSquare,
    title: "Brancher le métier",
    description: "Ajouter tes pages, ton auth et ton backend sur une base stable.",
  },
];

export default function Home() {
  return (
    <div id="top" className="relative min-h-screen overflow-hidden bg-background">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(0,0,0,0.08),transparent_28%),radial-gradient(circle_at_top_right,rgba(0,0,0,0.05),transparent_24%),linear-gradient(to_bottom,transparent,rgba(0,0,0,0.03))] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_28%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_24%),linear-gradient(to_bottom,transparent,rgba(255,255,255,0.03))]"
      />

      <Navbar />

      <section className="container mx-auto px-4 pb-8 pt-14 lg:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="gap-1.5 px-3 py-1">
                <Sparkles className="size-3.5" />
                Frontend prêt à lancer
              </Badge>
              <h1 className="max-w-2xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Une landing plus moderne, plus légère, et déjà utile pour démarrer vite.
              </h1>
              <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                Cette base frontend garde le meilleur du boilerplate: des composants shadcn,
                une structure claire et une mise en page plus compacte pour éviter l&apos;effet bloc.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="#features" className={cn(buttonVariants({ size: "lg" }), "gap-2")}>
                Explorer la démo
                <ArrowRight className="size-4" />
              </Link>
              <Link href="#cta" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "gap-2")}>
                <Github className="size-4" />
                Voir la structure
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {metrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border bg-background/70 p-4 backdrop-blur">
                  <div className="text-2xl font-semibold tracking-tight">{metric.value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Card className="border-border/70 bg-background/80 shadow-xl shadow-black/5 backdrop-blur">
              <CardHeader className="space-y-3 border-b pb-5">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Next.js</Badge>
                  <Badge variant="secondary">shadcn/ui</Badge>
                  <Badge variant="secondary">Tailwind v4</Badge>
                </div>
                <CardTitle className="text-xl">Une base simple à comprendre, rapide à faire évoluer</CardTitle>
                <CardDescription className="max-w-md">
                  Une page d&apos;accueil plus aérienne, avec des blocs courts et des surfaces visuelles lisibles.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-5 pt-6">
                <div className="rounded-2xl border bg-muted/40 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <TerminalSquare className="size-4 text-muted-foreground" />
                    Démarrage rapide
                  </div>
                  <div className="mt-3 space-y-2 font-mono text-sm text-muted-foreground">
                    <div className="flex items-center justify-between gap-4">
                      <span>pnpm install</span>
                      <span className="text-foreground/70">setup</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between gap-4">
                      <span>pnpm dev</span>
                      <span className="text-foreground/70">localhost</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between gap-4">
                      <span>pnpm build</span>
                      <span className="text-foreground/70">prod</span>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border p-3">
                    <Code2 className="size-4 text-muted-foreground" />
                    <p className="mt-2 text-sm font-medium">Code propre</p>
                    <p className="text-xs text-muted-foreground">Structure nette et lisible.</p>
                  </div>
                  <div className="rounded-2xl border p-3">
                    <BadgeCheck className="size-4 text-muted-foreground" />
                    <p className="mt-2 text-sm font-medium">UX compacte</p>
                    <p className="text-xs text-muted-foreground">Moins de volume, plus de clarté.</p>
                  </div>
                  <div className="rounded-2xl border p-3">
                    <ShieldCheck className="size-4 text-muted-foreground" />
                    <p className="mt-2 text-sm font-medium">Base solide</p>
                    <p className="text-xs text-muted-foreground">Prête pour une vraie app.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="features" className="container mx-auto px-4 py-10 lg:py-14">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Pourquoi cette base
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Des blocs utiles, courts et faciles à adapter.
            </h2>
          </div>
          <Badge variant="outline" className="hidden sm:inline-flex">
            Compact et extensible
          </Badge>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {highlights.map((item) => {
            const Icon = item.icon;

            return (
              <Card key={item.title} className="border-border/70 bg-background/80">
                <CardHeader className="space-y-3 pb-3">
                  <div className="flex size-10 items-center justify-center rounded-2xl bg-muted/70 text-foreground">
                    <Icon className="size-5" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription className="text-sm leading-6">{item.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16 lg:pb-24">
        <Card className="border-border/70 bg-background/80 shadow-xl shadow-black/5 backdrop-blur">
          <CardHeader className="space-y-3 border-b pb-5">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Setup rapide</Badge>
              <Badge variant="secondary">Responsive</Badge>
              <Badge variant="secondary">Prêt pour l&apos;évolution</Badge>
            </div>
            <CardTitle className="text-xl">Un squelette stable pour lancer un vrai produit, pas juste une démo</CardTitle>
            <CardDescription className="max-w-2xl">
              La page reste volontairement sobre et légère, avec assez de structure pour servir de base à un SaaS,
              un dashboard ou une vitrine plus crédible.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-3 pt-6 md:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div key={step.title} className="rounded-2xl border bg-background/70 p-4">
                  <div className="flex size-10 items-center justify-center rounded-2xl bg-muted/70 text-foreground">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.description}</p>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </section>

      <section id="cta" className="container mx-auto px-4 pb-16 lg:pb-24">
        <Card className="border-none bg-gradient-to-r from-primary/10 to-accent/10 shadow-sm">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl md:text-3xl">Prêt à démarrer ton projet ?</CardTitle>
            <CardDescription className="mx-auto max-w-xl text-base">
              Cette base rassemble les blocs essentiels sans surcharger l&apos;interface. Tu peux l&apos;adapter en quelques minutes.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pt-4 pb-6">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="gap-2">
                <Sparkles className="size-4" />
                Lancer le projet
              </Button>
              <Button size="lg" variant="outline">
                Lire la documentation
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <footer className="border-t border-border py-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Build with</span>
            <span aria-hidden="true">♥</span>
            <span>
              by <a href="https://fndev.vercel.app" target="_blank" rel="noreferrer" className="text-foreground underline-offset-4 hover:underline">franckniat</a>
            </span>
            <Separator orientation="vertical" className="h-4" />
            <span>© {new Date().getFullYear()}</span>
          </div>
          <div className="flex gap-6">
            <Link href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Fonctionnalités
            </Link>
            <Link href="#cta" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Démarrer
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}