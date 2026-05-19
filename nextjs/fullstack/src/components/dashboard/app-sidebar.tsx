"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { usePathname } from "next/navigation";
import { LayoutDashboard } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { getNavItemsByGroup } from "@/lib/dashboard-navigation";
import SwitchTheme from "../layouts/switch-theme";
import { NavUser } from "./nav-user";
import { DashboardCommandMenu } from "./dashboard-command-menu";
import { PageEnter } from "@/components/motion/page-enter";
import { authClient } from "@/lib/auth-client";

type DashboardShellProps = {
    children: React.ReactNode;
};

const SIDEBAR_STORAGE_KEY = "dashboard.sidebar.open";

function isActivePath(pathname: string, href: string) {
    const normalizedPathname = pathname.replace(/\/+$/, "") || "/";
    const normalizedHref = href.replace(/\/+$/, "") || "/";

    if (normalizedHref === "/dashboard") {
        return normalizedPathname === "/dashboard";
    }

    return (
        normalizedPathname === normalizedHref ||
        normalizedPathname.startsWith(`${normalizedHref}/`)
    );
}

export function AppSidebar({ children }: DashboardShellProps) {
    const pathname = usePathname();
    const { useSession } = authClient
    const { data: session } = useSession()
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
        if (typeof window === "undefined") {
            return true;
        }

        try {
            const savedState = window.localStorage.getItem(SIDEBAR_STORAGE_KEY);
            if (savedState === "true") {
                return true;
            }
            if (savedState === "false") {
                return false;
            }
        } catch {
            // Ignore storage access errors and keep default state.
        }

        return true;
    });

    const handleSidebarOpenChange = useCallback((open: boolean) => {
        setIsSidebarOpen(open);
        try {
            window.localStorage.setItem(SIDEBAR_STORAGE_KEY, String(open));
        } catch {
            // Ignore storage access errors.
        }
    }, []);

    const navItems = getNavItemsByGroup("navigation");
    const adminItems = getNavItemsByGroup("admin");

    return (
        <div className="h-dvh overflow-hidden">
            <SidebarProvider
                className="h-full"
                open={isSidebarOpen}
                onOpenChange={handleSidebarOpenChange}
                style={
                    {
                        "--sidebar-width": "14rem",
                    } as React.CSSProperties
                }
            >
                <Sidebar variant="inset" collapsible="icon">
                    <SidebarHeader className="gap-3 p-3">
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton size="lg" asChild>
                                    <Link href="/dashboard">
                                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                            <LayoutDashboard className="size-4" />
                                        </div>
                                        <div className="flex flex-col gap-0.5 leading-none">
                                            <span className="font-medium">ACME</span>
                                            <span>v1.0.0</span>
                                        </div>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarHeader>

                    <SidebarContent className="min-h-0 overflow-y-auto overscroll-contain px-2 py-2">
                        <SidebarGroup className="p-0">
                            <SidebarGroupLabel>
                                Navigation
                            </SidebarGroupLabel>
                            <SidebarMenu>
                                {navItems.map((item) => {
                                    const active = isActivePath(pathname, item.href);

                                    return (
                                        <SidebarMenuItem key={item.href}>
                                            <SidebarMenuButton
                                                asChild
                                                isActive={active}
                                                tooltip={item.label}
                                                className={cn(
                                                    "text-sm",
                                                    active && "shadow-xs"
                                                )}
                                            >
                                                <Link href={item.href}>
                                                    <item.icon className="size-4" />
                                                    <span>{item.label}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroup>
                        <SidebarGroup>
                            <SidebarGroupLabel>
                                Admin
                            </SidebarGroupLabel>
                            <SidebarMenu>
                                {adminItems.map((item) => {
                                    const active = isActivePath(pathname, item.href);

                                    return (
                                        <SidebarMenuItem key={item.href}>
                                            <SidebarMenuButton
                                                asChild
                                                isActive={active}
                                                tooltip={item.label}
                                                className={cn(
                                                    "text-sm",
                                                    active && "shadow-xs"
                                                )}
                                            >
                                                <Link href={item.href}>
                                                    <item.icon className="size-4" />
                                                    <span>{item.label}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroup>
                    </SidebarContent>

                    <SidebarFooter>
                        <NavUser user={{
                            email: session?.user?.email || "",
                            name: session?.user?.name || "",
                            avatar: session?.user?.image || "",
                        }} />
                    </SidebarFooter>
                </Sidebar>

                <SidebarInset>
                    <header className="sticky top-0 z-20 flex h-[60px] items-center gap-3 border-b border-border/70 bg-background/95 px-3 backdrop-blur supports-backdrop-filter:bg-background/80 md:px-5 rounded-t-2xl">
                        <div className="flex items-center gap-2 justify-between w-full">
                            <div className="flex items-center gap-2">
                                <SidebarTrigger />
                                <h1 className="truncate text-sm font-semibold">Dashboard</h1>
                            </div>
                            <DashboardCommandMenu />
                            <SwitchTheme />
                        </div>
                    </header>

                    <div className="h-full min-h-0 overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:w-2">
                        <PageEnter className="mx-auto w-full max-w-6xl px-3 py-4 md:px-6 md:py-6">
                            {children}
                        </PageEnter>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
}
