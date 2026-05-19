export type OnboardingStep = {
  id: string
  title: string
  description: string
}

export const onboardingSteps: OnboardingStep[] = [
  {
    id: "welcome",
    title: "Bienvenue",
    description:
      "Découvrez votre nouvel espace de travail et les outils à votre disposition.",
  },
  {
    id: "profile",
    title: "Profil",
    description:
      "Complétez votre profil pour personnaliser votre expérience.",
  },
  {
    id: "features",
    title: "Fonctionnalités",
    description:
      "Parcourez les principales fonctionnalités de la plateforme.",
  },
  {
    id: "checklist",
    title: "Premiers pas",
    description:
      "Suivez cette checklist pour bien démarrer avec votre compte.",
  },
]

export const featureHighlights = [
  {
    title: "Tableau de bord",
    description: "Visualisez vos métriques SaaS en temps réel.",
  },
  {
    title: "Gestion des utilisateurs",
    description: "Administrez les comptes, rôles et permissions.",
  },
  {
    title: "Paramètres avancés",
    description: "Configurez la sécurité, les préférences et les notifications.",
  },
]

export const gettingStartedChecklist = [
  { id: "profile", label: "Compléter votre profil", done: false },
  { id: "invite", label: "Inviter un membre d'équipe", done: false },
  { id: "integration", label: "Connecter une intégration", done: false },
  { id: "dashboard", label: "Explorer le tableau de bord", done: false },
]

export const ONBOARDING_STORAGE_KEY = "dashboard.onboarding.completed"
