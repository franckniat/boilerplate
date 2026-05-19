import { DashboardCharts } from "@/components/dashboard/dashboard-charts"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Vue d&apos;ensemble</h1>
        <p className="text-muted-foreground">
          Métriques SaaS et tendances de votre plateforme.
        </p>
      </div>

      <DashboardStats />
      <DashboardCharts />
    </div>
  )
}
