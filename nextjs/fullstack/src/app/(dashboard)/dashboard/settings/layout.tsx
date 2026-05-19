import { SettingsNav } from "@/components/dashboard/settings-nav"

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Paramètres</h1>
        <p className="text-muted-foreground">
          Gérez votre compte, vos préférences et la sécurité.
        </p>
      </div>
      <SettingsNav />
      {children}
    </div>
  )
}
