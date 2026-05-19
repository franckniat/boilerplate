"use client"

import { motion } from "motion/react"
import { TrendingDown, TrendingUp } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { hoverLift, staggerContainer, staggerItem } from "@/lib/motion-presets"
import { cn } from "@/lib/utils"
import { dashboardStats } from "@/lib/mock-data/dashboard"

export function DashboardStats() {
  return (
    <motion.div
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {dashboardStats.map((stat) => (
        <motion.div key={stat.id} variants={staggerItem}>
          <Card {...hoverLift}>
            <CardHeader className="pb-2">
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-3xl font-bold tabular-nums">
                {stat.value}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1.5 text-sm">
                {stat.trend === "up" ? (
                  <TrendingUp
                    className="size-4 text-emerald-600 dark:text-emerald-400"
                    data-icon
                  />
                ) : stat.trend === "down" ? (
                  <TrendingDown className="size-4 text-destructive" data-icon />
                ) : null}
                <span
                  className={cn(
                    "font-medium",
                    stat.trend === "up" &&
                      "text-emerald-600 dark:text-emerald-400",
                    stat.trend === "down" && "text-destructive"
                  )}
                >
                  {stat.change}
                </span>
                <span className="text-muted-foreground">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
