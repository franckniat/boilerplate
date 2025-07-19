"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const navLinks = [
    {
        title: "Home",
        href: "/",
    },
    {
        title: "About",
        href: "/about",
    },
    {
        title: "Blog",
        href: "/blog",
    },
    {
        title: "Pricing",
        href: "/pricing",
    },
    {
        title: "Contact",
        href: "/contact",
    }
]

export default function Navbar() {
    const { theme, setTheme } = useTheme();
	return (
		<header className="sticky top-0 w-full bg-background/90 backdrop-blur-sm border-b border-foreground/10">
			<nav className="max-w-[1280px] mx-auto px-4">
				<div className="flex items-center gap-3 justify-between h-[60px]">
					<Link href={"/"}>
						<div className="flex items-center gap-2">
							<Image
								className="dark:invert"
								src="/next.svg"
								alt="Next.js logo"
								width={80}
								height={20}
								priority
							/>
							<Separator orientation="vertical" className="h-4" />
							<span className="text-sm font-semibold font-mono">
								Frontend
							</span>
						</div>
					</Link>
                    <div className="flex items-center gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.title}
                                href={link.href}
                                className="text-sm font-medium hover:text-primary transition-colors"
                            >
                                {link.title}
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant={"ghost"} onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="relative">
                            <Sun className="rotate-0 dark:rotate-12 scale-100 dark:scale-0 absolute" size={18} />
                            <Moon className="rotate-12 dark:rotate-0 scale-0 dark:scale-100" size={18} />
                        </Button>
                        <Link href={"/start"} className={cn(buttonVariants({variant: "outline"}))}>Sign up</Link>
                        <Link href={"/start"} className={cn(buttonVariants({variant: "default"}))}>Login</Link>
                    </div>
				</div>
			</nav>
		</header>
	);
}
