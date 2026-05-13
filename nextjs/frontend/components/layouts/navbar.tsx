"use client";

import Link from "next/link";
import { Menu, Moon, Sparkles, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button, buttonVariants } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const navLinks = [
    { title: "Accueil", href: "#top" },
    { title: "Fonctionnalités", href: "#features" },
    { title: "Démarrer", href: "#cta" },
];

export default function Navbar() {
    const { theme, setTheme } = useTheme();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-foreground/10 bg-background/90 backdrop-blur-md">
            <nav className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex size-9 items-center justify-center rounded-xl border bg-background shadow-sm">
                        <Sparkles className="size-4 text-primary" />
                    </div>
                    <div className="leading-tight">
                        <div className="text-sm font-semibold tracking-tight">Frontend</div>
                        <div className="text-xs text-muted-foreground">Boilerplate compact</div>
                    </div>
                </Link>

                <div className="hidden items-center gap-6 md:flex">
                    {navLinks.map((link) => (
                        <Link key={link.title} href={link.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                            {link.title}
                        </Link>
                    ))}
                </div>

                <div className="hidden items-center gap-3 md:flex">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        aria-label="Changer le thème"
                        className="relative"
                    >
                        <Sun className="absolute size-4 rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
                        <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    </Button>
                    <Link href="#features" className={cn(buttonVariants({ variant: "outline" }), "h-10 px-4")}>Voir plus</Link>
                    <Link href="#cta" className={cn(buttonVariants({ variant: "default" }), "h-10 px-4")}>Commencer</Link>
                </div>

                <div className="flex items-center gap-2 md:hidden">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        aria-label="Changer le thème"
                        className="relative"
                    >
                        <Sun className="absolute size-4 rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
                        <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    </Button>

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" aria-label="Ouvrir le menu">
                                <Menu className="size-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[340px]">
                            <div className="flex h-full flex-col">
                                <div className="flex items-center gap-2 border-b pb-4">
                                    <div className="flex size-9 items-center justify-center rounded-xl border bg-background shadow-sm">
                                        <Sparkles className="size-4 text-primary" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold tracking-tight">Frontend</div>
                                        <div className="text-xs text-muted-foreground">Navigation compacte</div>
                                    </div>
                                </div>

                                <div className="flex flex-1 flex-col justify-between py-6">
                                    <div className="space-y-2">
                                        {navLinks.map((link) => (
                                            <Link
                                                key={link.title}
                                                href={link.href}
                                                className="flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                                            >
                                                {link.title}
                                                <span className="text-muted-foreground">→</span>
                                            </Link>
                                        ))}
                                    </div>

                                    <div className="space-y-3 border-t pt-4">
                                        <Link href="#features" className={cn(buttonVariants({ variant: "outline" }), "w-full justify-center")}>Voir les fonctionnalités</Link>
                                        <Link href="#cta" className={cn(buttonVariants({ variant: "default" }), "w-full justify-center")}>Démarrer maintenant</Link>
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </header>
    );
}
