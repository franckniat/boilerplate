import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
	ArrowRight,
	BadgeCheck,
	Code2,
	Database,
	Github,
	Layers3,
	ShieldCheck,
	Sparkles,
	TerminalSquare,
} from "lucide-react";
import Link from "next/link";

const stack = [
	{ label: "Next.js", src: "/icons/nextjs.svg" },
	{ label: "shadcn/ui", src: "/icons/shadcnui.svg" },
	{ label: "Prisma", src: "/icons/prisma.svg" },
	{ label: "Tailwind", src: "/icons/tailwindcss.svg" },
	{ label: "TypeScript", src: "/icons/ts.svg" },
	{ label: "PostgreSQL", src: "/icons/postgresql.svg" },
];

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
];

export default function HomePage() {
	return (
		<main className="relative overflow-hidden bg-background">
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(0,0,0,0.08),transparent_30%),radial-gradient(circle_at_top_right,rgba(0,0,0,0.05),transparent_28%),linear-gradient(to_bottom,transparent,rgba(0,0,0,0.02))] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_28%),linear-gradient(to_bottom,transparent,rgba(255,255,255,0.03))]"
			/>

			<section className="container mx-auto px-4 py-14 lg:py-20">
				<div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
					<div className="space-y-8">
						<div className="space-y-4">
							<Badge variant="outline" className="gap-1.5 px-3 py-1">
								<Sparkles className="size-3.5" />
								Fullstack prêt à lancer
							</Badge>
							<h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
								Une base Next.js claire, moderne et déjà utile pour livrer vite.
							</h1>
							<p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
								Ce starter fullstack rassemble l'auth, Prisma, PostgreSQL et une
								bibliothèque shadcn bien fournie pour démarrer un produit sans
								passer une semaine à recoller les briques de base.
							</p>
						</div>

						<div className="flex flex-wrap gap-3">
							<Link
								href="/dashboard"
								className={cn(buttonVariants({ size: "lg" }), "gap-2")}
							>
								Explorer le starter
								<ArrowRight className="size-4" />
							</Link>
							<Link
								href="https://github.com/franckniat/boilerplate/tree/main/nextjs/fullstack"
								className={cn(
									buttonVariants({ variant: "secondary", size: "lg" }),
									"gap-2"
								)}
							>
								<Github className="size-4" />
								Voir le dépôt
							</Link>
						</div>

						<div className="grid gap-3 sm:grid-cols-3">
							<div className="rounded-2xl border bg-background/70 p-4 backdrop-blur">
								<div className="text-sm font-medium">Auth</div>
								<div className="mt-1 text-sm text-muted-foreground">
									Login, register, reset et vérification d'email.
								</div>
							</div>
							<div className="rounded-2xl border bg-background/70 p-4 backdrop-blur">
								<div className="text-sm font-medium">Data</div>
								<div className="mt-1 text-sm text-muted-foreground">
									Prisma, migrations et schéma prêt à évoluer.
								</div>
							</div>
							<div className="rounded-2xl border bg-background/70 p-4 backdrop-blur">
								<div className="text-sm font-medium">UI</div>
								<div className="mt-1 text-sm text-muted-foreground">
									Composants shadcn déjà installés et cohérents.
								</div>
							</div>
						</div>
					</div>

					<div className="space-y-4">
						<Card className="border-border/70 bg-background/80 shadow-xl shadow-black/5 backdrop-blur">
							<CardHeader className="space-y-3 border-b pb-5">
								<div className="flex flex-wrap gap-2">
									<Badge variant="secondary">Next.js 16</Badge>
									<Badge variant="secondary">Prisma</Badge>
									<Badge variant="secondary">shadcn/ui</Badge>
								</div>
								<CardTitle className="text-xl">
									Tout ce qu'il faut pour démarrer sans bricolage
								</CardTitle>
								<CardDescription className="max-w-md">
									Une base lisible, structurée et suffisamment légère pour que tu puisses
									la transformer en vrai produit.
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
									<div className="rounded-2xl border p-3">
										<Code2 className="size-4 text-muted-foreground" />
										<p className="mt-2 text-sm font-medium">Code propre</p>
										<p className="text-xs text-muted-foreground">
											Structure prête pour scaler.
										</p>
									</div>
									<div className="rounded-2xl border p-3">
										<BadgeCheck className="size-4 text-muted-foreground" />
										<p className="mt-2 text-sm font-medium">UX nette</p>
										<p className="text-xs text-muted-foreground">
											Composants cohérents et compacts.
										</p>
									</div>
									<div className="rounded-2xl border p-3">
										<ShieldCheck className="size-4 text-muted-foreground" />
										<p className="mt-2 text-sm font-medium">Sécurisé</p>
										<p className="text-xs text-muted-foreground">
											Auth et flux sensibles déjà pensés.
										</p>
									</div>
								</div>
							</CardContent>
						</Card>

						<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
							{stack.map((item) => (
								<div
									key={item.label}
									className="flex items-center gap-3 rounded-2xl border bg-background/70 px-4 py-3 backdrop-blur"
								>
									<img src={item.src} alt={item.label} className="size-7" />
									<span className="text-sm font-medium">{item.label}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			<section id="features" className="container mx-auto px-4 pb-16 lg:pb-24">
				<div className="mb-6 flex items-end justify-between gap-4">
					<div>
						<p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
							Pourquoi ce starter
						</p>
						<h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
							Un socle pensé pour aller vite, puis rester maintenable.
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
									<CardDescription className="text-sm leading-6">
										{item.description}
									</CardDescription>
								</CardHeader>
								<CardContent className="pt-0">
									<ul className="space-y-2 text-sm text-muted-foreground">
										<li>• Pensé pour être compris en quelques minutes.</li>
										<li>• Suffisamment neutre pour ton produit ou ton client.</li>
									</ul>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</section>
		</main>
	);
}
