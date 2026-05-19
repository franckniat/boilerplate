"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { getNavItemsByGroup, getSearchValue } from "@/lib/dashboard-navigation"
import { mockUsers } from "@/lib/mock-data/users"

const GROUP_LABELS = {
  navigation: "Navigation",
  admin: "Administration",
  settings: "Paramètres",
  users: "Utilisateurs",
} as const

export function DashboardCommandMenu() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isMac, setIsMac] = useState(false)

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().includes("MAC"))
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((current) => !current)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  const runCommand = useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  const navigationItems = getNavItemsByGroup("navigation")
  const adminItems = getNavItemsByGroup("admin")
  const settingsItems = getNavItemsByGroup("settings")

  return (
    <>
      <Button
        variant="outline"
        className="gap-3 text-sm"
        onClick={() => setOpen(true)}
      >
        <Search className="size-[15px]" data-icon />
        Rechercher
        <KbdGroup>
          <Kbd>{isMac ? "⌘" : "Ctrl"}</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Rechercher"
        description="Naviguez rapidement dans le dashboard"
      >
        <CommandInput placeholder="Rechercher une page, un paramètre ou un utilisateur..." />
        <CommandList>
          <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>

          <CommandGroup heading={GROUP_LABELS.navigation}>
            {navigationItems.map((item) => (
              <CommandItem
                key={item.href}
                value={getSearchValue(item.label, ...(item.keywords ?? []))}
                onSelect={() =>
                  runCommand(() => router.push(item.href))
                }
              >
                <item.icon data-icon />
                <span>{item.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading={GROUP_LABELS.admin}>
            {adminItems.map((item) => (
              <CommandItem
                key={item.href}
                value={getSearchValue(item.label, ...(item.keywords ?? []))}
                onSelect={() =>
                  runCommand(() => router.push(item.href))
                }
              >
                <item.icon data-icon />
                <span>{item.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading={GROUP_LABELS.settings}>
            {settingsItems.map((item) => (
              <CommandItem
                key={item.href}
                value={getSearchValue(item.label, ...(item.keywords ?? []))}
                onSelect={() =>
                  runCommand(() => router.push(item.href))
                }
              >
                <item.icon data-icon />
                <span>{item.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading={GROUP_LABELS.users}>
            {mockUsers.map((user) => (
              <CommandItem
                key={user.id}
                value={getSearchValue(
                  user.name,
                  user.email,
                  user.username ?? undefined,
                  user.role ?? undefined
                )}
                onSelect={() =>
                  runCommand(() => router.push("/dashboard/users"))
                }
              >
                <Users data-icon />
                <div className="flex flex-col">
                  <span>{user.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
