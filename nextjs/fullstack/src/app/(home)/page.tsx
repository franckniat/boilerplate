import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Github } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
	return (
		<div className="min-h-screen bg-background flex items-center">
			{/* Hero Section */}
			<section className="container mx-auto px-4 py-16 text-center">
				<h1 className="text-5xl tracking-tight font-bold text-foreground mb-6">
					Next.js Fullstack
					<span className="text-primary"> Boilerplate</span>
				</h1>
				<p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
					Un boilerplate moderne et complet pour démarrer rapidement
					vos projets Next.js avec toutes les fonctionnalités
					essentielles intégrées.
				</p>
				<div className="flex justify-center items-center gap-8 mb-8">
					<div className="flex items-center gap-2">
						<img
							src="/icons/nextjs.svg"
							alt="Next.js"
							className="w-8 h-8"
						/>
						<span className="text-sm font-medium">Next.js</span>
					</div>
					<div className="flex items-center gap-2">
						<img
							src="/icons/shadcnui.svg"
							alt="shadcn/ui"
							className="w-8 h-8"
						/>
						<span className="text-sm font-medium">shadcn/ui</span>
					</div>
					<div className="flex items-center gap-2">
						<img
							src="/icons/prisma.svg"
							alt="Prisma"
							className="w-8 h-8"
						/>
						<span className="text-sm font-medium">Prisma</span>
					</div>
					<div className="flex items-center gap-2">
						<img
							src="/icons/tailwindcss.svg"
							alt="Tailwind CSS"
							className="w-8 h-8"
						/>
						<span className="text-sm font-medium">Tailwind</span>
					</div>
					<div className="flex items-center gap-2">
						<img
							src="/icons/ts.svg"
							alt="TypeScript"
							className="w-8 h-8"
						/>
						<span className="text-sm font-medium">TypeScript</span>
					</div>
					<div className="flex items-center gap-2">
						<img
							src="/icons/postgresql.svg"
							alt="PostgreSQL"
							className="w-8 h-8"
						/>
						<span className="text-sm font-medium">PostgreSQL</span>
					</div>
				</div>

				<div className="flex items-center justify-center my-3 gap-3">
					<Link
						href="/docs"
						className={cn(
							buttonVariants({ variant: "default", size: "lg" })
						)}
					>
						Commencer
					</Link>
					<Link
						href="https://github.com/franckniat/boilerplate/tree/main/nextjs/fullstack"
						className={cn(
							buttonVariants({ variant: "secondary", size: "lg" }), "gap-3"
						)}
					>
                        <Github size={16}/>
						Github
					</Link>
				</div>
			</section>
		</div>
	);
}
