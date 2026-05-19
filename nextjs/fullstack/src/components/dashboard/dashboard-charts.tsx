"use client"

import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FadeInView } from "@/components/motion/fade-in-view"
import {
  dashboardChartConfig,
  planComparisonData,
  revenueTrendData,
} from "@/lib/mock-data/dashboard"

export function DashboardCharts() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <FadeInView delay={0.1}>
        <Card>
          <CardHeader>
            <CardTitle>Évolution des revenus</CardTitle>
            <CardDescription>
              Revenus mensuels et croissance des utilisateurs sur 12 mois
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={dashboardChartConfig}
              className="aspect-auto h-[280px] w-full"
            >
              <LineChart data={revenueTrendData} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  dataKey="revenue"
                  type="monotone"
                  stroke="var(--color-revenue)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  dataKey="users"
                  type="monotone"
                  stroke="var(--color-users)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </FadeInView>

      <FadeInView delay={0.2}>
        <Card>
          <CardHeader>
            <CardTitle>Répartition par plan</CardTitle>
            <CardDescription>
              Comparaison du nombre d&apos;abonnés par offre
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={dashboardChartConfig}
              className="aspect-auto h-[280px] w-full"
            >
              <BarChart data={planComparisonData} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="plan"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="subscribers"
                  fill="var(--color-subscribers)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </FadeInView>
    </div>
  )
}
