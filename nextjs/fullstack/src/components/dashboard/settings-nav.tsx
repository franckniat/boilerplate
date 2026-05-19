"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const settingsTabs = [
  { href: "/dashboard/settings/account", label: "Compte" },
  { href: "/dashboard/settings/preferences", label: "Préférences" },
  { href: "/dashboard/settings/security", label: "Sécurité" },
] as const

function getActiveTab(pathname: string) {
  if (pathname.includes("/settings/security")) return "security"
  if (pathname.includes("/settings/preferences")) return "preferences"
  return "account"
}

export function SettingsNav() {
  const pathname = usePathname()
  const activeTab = getActiveTab(pathname)

  return (
    <Tabs value={activeTab} className="w-full">
      <TabsList>
        {settingsTabs.map((tab) => {
          const value =
            tab.href === "/dashboard/settings/account"
              ? "account"
              : tab.href === "/dashboard/settings/preferences"
                ? "preferences"
                : "security"

          return (
            <TabsTrigger key={tab.href} value={value} asChild>
              <Link
                href={tab.href}
                className={cn(
                  pathname === tab.href || pathname.startsWith(`${tab.href}/`)
                    ? ""
                    : ""
                )}
              >
                {tab.label}
              </Link>
            </TabsTrigger>
          )
        })}
      </TabsList>
    </Tabs>
  )
}
