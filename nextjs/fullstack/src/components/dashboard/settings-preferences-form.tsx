"use client"

import { useState, useTransition } from "react"
import { Loader2 } from "lucide-react"
import { useTheme } from "next-themes"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { FadeInView } from "@/components/motion/fade-in-view"

export function SettingsPreferencesForm() {
  const { theme, setTheme } = useTheme()
  const [isPending, startTransition] = useTransition()
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: false,
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    startTransition(() => {
      toast.success("Préférences enregistrées")
    })
  }

  return (
    <FadeInView>
    <Card>
      <CardHeader>
        <CardTitle>Préférences</CardTitle>
        <CardDescription>
          Personnalisez votre langue, thème et notifications.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <FieldGroup>
            <Field orientation="horizontal">
              <div className="flex flex-1 flex-col gap-1">
                <FieldLabel>Langue</FieldLabel>
                <FieldDescription>
                  Langue d&apos;affichage de l&apos;interface.
                </FieldDescription>
              </div>
              <Select defaultValue="fr">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Langue" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field orientation="horizontal">
              <div className="flex flex-1 flex-col gap-1">
                <FieldLabel>Fuseau horaire</FieldLabel>
                <FieldDescription>
                  Utilisé pour les dates et rappels.
                </FieldDescription>
              </div>
              <Select defaultValue="europe-paris">
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="Fuseau horaire" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="europe-paris">
                    Europe/Paris (UTC+1)
                  </SelectItem>
                  <SelectItem value="europe-london">
                    Europe/London (UTC+0)
                  </SelectItem>
                  <SelectItem value="america-new-york">
                    America/New_York (UTC-5)
                  </SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field orientation="horizontal">
              <div className="flex flex-1 flex-col gap-1">
                <FieldLabel>Thème sombre</FieldLabel>
                <FieldDescription>
                  Activer le mode sombre pour l&apos;interface.
                </FieldDescription>
              </div>
              <Switch
                checked={theme === "dark"}
                onCheckedChange={(checked) =>
                  setTheme(checked ? "dark" : "light")
                }
              />
            </Field>

            <Field>
              <FieldLabel>Notifications</FieldLabel>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-2">
                  <Checkbox
                    checked={notifications.email}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({
                        ...prev,
                        email: checked === true,
                      }))
                    }
                  />
                  <span className="text-sm">Notifications par email</span>
                </label>
                <label className="flex items-center gap-2">
                  <Checkbox
                    checked={notifications.push}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({
                        ...prev,
                        push: checked === true,
                      }))
                    }
                  />
                  <span className="text-sm">Notifications push</span>
                </label>
                <label className="flex items-center gap-2">
                  <Checkbox
                    checked={notifications.marketing}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({
                        ...prev,
                        marketing: checked === true,
                      }))
                    }
                  />
                  <span className="text-sm">Emails marketing</span>
                </label>
              </div>
            </Field>
          </FieldGroup>
        </CardContent>
        <CardFooter className="border-t">
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="animate-spin" data-icon />}
            Enregistrer
          </Button>
        </CardFooter>
      </form>
    </Card>
    </FadeInView>
  )
}
