import type { LucideIcon } from "lucide-react"
import {
  BookOpen,
  LayoutDashboard,
  Rocket,
  Settings,
  Shield,
  SlidersHorizontal,
  Tickets,
  ToolCase,
  User,
  Users,
} from "lucide-react"

export type DashboardNavItem = {
  href: string
  icon: LucideIcon
  label: string
  keywords?: string[]
  group: "navigation" | "admin" | "settings"
}

export const dashboardNavItems: DashboardNavItem[] = [
  {
    href: "/dashboard",
    icon: LayoutDashboard,
    label: "Vue d'ensemble",
    keywords: ["overview", "accueil", "stats", "métriques"],
    group: "navigation",
  },
  {
    href: "/dashboard/documents",
    icon: BookOpen,
    label: "Documents",
    keywords: ["fichiers", "docs"],
    group: "navigation",
  },
  {
    href: "/dashboard/items",
    icon: ToolCase,
    label: "Items",
    keywords: ["éléments", "produits"],
    group: "navigation",
  },
  {
    href: "/dashboard/onboarding",
    icon: Rocket,
    label: "Onboarding",
    keywords: ["introduction", "démarrage", "guide"],
    group: "navigation",
  },
  {
    href: "/dashboard/settings",
    icon: Settings,
    label: "Paramètres",
    keywords: ["settings", "configuration", "compte"],
    group: "navigation",
  },
  {
    href: "/dashboard/users",
    icon: Users,
    label: "Utilisateurs",
    keywords: ["users", "membres", "comptes"],
    group: "admin",
  },
  {
    href: "/dashboard/supports",
    icon: Tickets,
    label: "Supports",
    keywords: ["tickets", "aide", "assistance"],
    group: "admin",
  },
  {
    href: "/dashboard/settings/account",
    icon: User,
    label: "Compte",
    keywords: ["profil", "avatar", "email", "nom"],
    group: "settings",
  },
  {
    href: "/dashboard/settings/preferences",
    icon: SlidersHorizontal,
    label: "Préférences",
    keywords: ["langue", "thème", "notifications", "fuseau"],
    group: "settings",
  },
  {
    href: "/dashboard/settings/security",
    icon: Shield,
    label: "Sécurité",
    keywords: ["mot de passe", "2fa", "sessions"],
    group: "settings",
  },
]

export function getNavItemsByGroup(group: DashboardNavItem["group"]) {
  return dashboardNavItems.filter((item) => item.group === group)
}

export function getSearchValue(...parts: (string | undefined)[]) {
  return parts.filter(Boolean).join(" ").toLowerCase()
}
