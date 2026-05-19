import type { LucideIcon } from "lucide-react"
import {
  BarChart3,
  Command,
  KeyRound,
  LayoutDashboard,
  LogIn,
  Rocket,
  Settings,
  Shield,
  SlidersHorizontal,
  Table2,
  UserPlus,
} from "lucide-react"

export type LandingFeature = {
  title: string
  description: string
  href: string
  icon: LucideIcon
  badge?: string
}

export type LandingFeatureSection = {
  id: string
  title: string
  description: string
  features: LandingFeature[]
}

export const landingFeatureSections: LandingFeatureSection[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    description:
      "Un espace applicatif complet avec sidebar, métriques, graphiques et navigation rapide.",
    features: [
      {
        title: "Vue d'ensemble",
        description:
          "Cartes de stats SaaS, graphiques linéaires et barres avec Recharts.",
        href: "/dashboard",
        icon: LayoutDashboard,
        badge: "Charts",
      },
      {
        title: "Palette de commande",
        description:
          "Recherche globale et navigation instantanée via Ctrl+K depuis le header.",
        href: "/dashboard",
        icon: Command,
        badge: "Ctrl+K",
      },
      {
        title: "Onboarding",
        description:
          "Assistant multi-étapes avec progression, checklist et persistance locale.",
        href: "/dashboard/onboarding",
        icon: Rocket,
      },
    ],
  },
  {
    id: "auth",
    title: "Authentification",
    description:
      "Flux d'auth complets avec Better Auth, formulaires shadcn et emails transactionnels.",
    features: [
      {
        title: "Connexion",
        description: "Formulaire de login avec validation et gestion des erreurs.",
        href: "/login",
        icon: LogIn,
      },
      {
        title: "Inscription",
        description:
          "Création de compte, OAuth et vérification d'email intégrée.",
        href: "/register",
        icon: UserPlus,
      },
      {
        title: "Mot de passe oublié",
        description:
          "Demande de reset, email de confirmation et page de nouveau mot de passe.",
        href: "/forgot-password",
        icon: KeyRound,
      },
    ],
  },
  {
    id: "settings",
    title: "Paramètres",
    description:
      "Pages de configuration découpées par onglets avec routes dédiées.",
    features: [
      {
        title: "Compte",
        description:
          "Profil, avatar, nom, email et username avec pattern FieldGroup.",
        href: "/dashboard/settings/account",
        icon: Settings,
      },
      {
        title: "Préférences",
        description:
          "Langue, fuseau horaire, thème sombre et préférences de notifications.",
        href: "/dashboard/settings/preferences",
        icon: SlidersHorizontal,
      },
      {
        title: "Sécurité",
        description:
          "Changement de mot de passe, 2FA et gestion des sessions actives.",
        href: "/dashboard/settings/security",
        icon: Shield,
      },
    ],
  },
  {
    id: "admin",
    title: "Administration",
    description:
      "Outils back-office prêts à brancher sur votre API et votre base Prisma.",
    features: [
      {
        title: "Utilisateurs",
        description:
          "Data-table avec tri, filtres, pagination, actions et données mock alignées sur le schéma User.",
        href: "/dashboard/users",
        icon: Table2,
        badge: "TanStack Table",
      },
      {
        title: "Métriques détaillées",
        description:
          "Retournez sur le dashboard pour explorer les graphiques et indicateurs.",
        href: "/dashboard",
        icon: BarChart3,
      },
      {
        title: "Tous les paramètres",
        description: "Hub central vers compte, préférences et sécurité.",
        href: "/dashboard/settings",
        icon: Settings,
      },
    ],
  },
]
