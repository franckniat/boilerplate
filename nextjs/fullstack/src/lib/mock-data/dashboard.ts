export type DashboardStat = {
  id: string
  label: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  description: string
}

export const dashboardStats: DashboardStat[] = [
  {
    id: "users",
    label: "Utilisateurs totaux",
    value: "12 847",
    change: "+12,4 %",
    trend: "up",
    description: "vs le mois dernier",
  },
  {
    id: "sessions",
    label: "Sessions actives",
    value: "3 291",
    change: "+8,2 %",
    trend: "up",
    description: "utilisateurs connectés",
  },
  {
    id: "revenue",
    label: "Revenus MRR",
    value: "48 920 €",
    change: "+18,7 %",
    trend: "up",
    description: "revenus récurrents mensuels",
  },
  {
    id: "growth",
    label: "Taux de croissance",
    value: "24,3 %",
    change: "-2,1 %",
    trend: "down",
    description: "nouveaux abonnements",
  },
]

export const revenueTrendData = [
  { month: "Jan", revenue: 32000, users: 8200 },
  { month: "Fév", revenue: 34500, users: 8900 },
  { month: "Mar", revenue: 36200, users: 9400 },
  { month: "Avr", revenue: 38100, users: 10100 },
  { month: "Mai", revenue: 41200, users: 10800 },
  { month: "Jun", revenue: 43800, users: 11500 },
  { month: "Jul", revenue: 45200, users: 12000 },
  { month: "Aoû", revenue: 46100, users: 12300 },
  { month: "Sep", revenue: 47200, users: 12600 },
  { month: "Oct", revenue: 48100, users: 12800 },
  { month: "Nov", revenue: 48600, users: 12840 },
  { month: "Déc", revenue: 48920, users: 12847 },
]

export const planComparisonData = [
  { plan: "Gratuit", subscribers: 4200 },
  { plan: "Pro", subscribers: 5100 },
  { plan: "Business", subscribers: 2800 },
  { plan: "Enterprise", subscribers: 747 },
]

export const dashboardChartConfig = {
  revenue: {
    label: "Revenus",
    color: "var(--chart-1)",
  },
  users: {
    label: "Utilisateurs",
    color: "var(--chart-2)",
  },
  subscribers: {
    label: "Abonnés",
    color: "var(--chart-1)",
  },
} as const
