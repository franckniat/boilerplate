"use client"

import { useState, useTransition } from "react"
import { Loader2, Monitor, Smartphone, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { FadeInView } from "@/components/motion/fade-in-view"

const mockSessions = [
  {
    id: "sess_1",
    device: "Chrome sur Linux",
    icon: Monitor,
    location: "Paris, France",
    lastActive: "Actif maintenant",
    current: true,
  },
  {
    id: "sess_2",
    device: "Safari sur iPhone",
    icon: Smartphone,
    location: "Lyon, France",
    lastActive: "Il y a 2 heures",
    current: false,
  },
]

export function SettingsSecurityForm() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handlePasswordSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    startTransition(() => {
      toast.success("Mot de passe mis à jour")
    })
  }

  const handleRevokeSession = (sessionId: string) => {
    toast.success("Session révoquée", {
      description: `La session ${sessionId} a été déconnectée.`,
    })
  }

  return (
    <FadeInView className="flex flex-col gap-6">
      <Alert>
        <AlertTitle>Conseil de sécurité</AlertTitle>
        <AlertDescription>
          Utilisez un mot de passe unique et activez l&apos;authentification à
          deux facteurs pour protéger votre compte.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Changer le mot de passe</CardTitle>
          <CardDescription>
            Mettez à jour votre mot de passe régulièrement.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handlePasswordSubmit}>
          <CardContent>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="current-password">
                  Mot de passe actuel
                </FieldLabel>
                <Input
                  id="current-password"
                  name="currentPassword"
                  type="password"
                  autoComplete="current-password"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="new-password">Nouveau mot de passe</FieldLabel>
                <Input
                  id="new-password"
                  name="newPassword"
                  type="password"
                  autoComplete="new-password"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="confirm-password">
                  Confirmer le mot de passe
                </FieldLabel>
                <Input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                />
              </Field>
            </FieldGroup>
          </CardContent>
          <CardFooter className="border-t">
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="animate-spin" data-icon />}
              Mettre à jour
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Authentification à deux facteurs</CardTitle>
          <CardDescription>
            Ajoutez une couche de sécurité supplémentaire à votre compte.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Field orientation="horizontal">
            <div className="flex flex-1 flex-col gap-1">
              <FieldLabel>2FA</FieldLabel>
              <FieldDescription>
                {twoFactorEnabled
                  ? "L'authentification à deux facteurs est activée."
                  : "L'authentification à deux facteurs est désactivée."}
              </FieldDescription>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={twoFactorEnabled ? "default" : "secondary"}>
                {twoFactorEnabled ? "Activé" : "Désactivé"}
              </Badge>
              <Switch
                checked={twoFactorEnabled}
                onCheckedChange={setTwoFactorEnabled}
              />
            </div>
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sessions actives</CardTitle>
          <CardDescription>
            Gérez les appareils connectés à votre compte.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {mockSessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between gap-4 rounded-lg border p-4"
            >
              <div className="flex items-center gap-3">
                <session.icon className="size-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{session.device}</p>
                  <p className="text-sm text-muted-foreground">
                    {session.location} · {session.lastActive}
                  </p>
                </div>
                {session.current && (
                  <Badge variant="outline">Session actuelle</Badge>
                )}
              </div>
              {!session.current && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleRevokeSession(session.id)}
                >
                  <Trash2 data-icon />
                  Révoquer
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </FadeInView>
  )
}
