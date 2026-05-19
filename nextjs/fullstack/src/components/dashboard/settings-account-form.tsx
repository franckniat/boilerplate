"use client"

import { useRef, useState, useTransition } from "react"
import { Loader2, Upload } from "lucide-react"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { authClient } from "@/lib/auth-client"
import { FadeInView } from "@/components/motion/fade-in-view"

export function SettingsAccountForm() {
  const { useSession } = authClient
  const { data: session } = useSession()
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    session?.user?.image ?? null
  )
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isPending, startTransition] = useTransition()

  const initials =
    session?.user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "U"

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => setAvatarPreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    startTransition(() => {
      toast.success("Profil mis à jour", {
        description: "Vos informations ont été enregistrées.",
      })
    })
  }

  return (
    <FadeInView>
    <Card>
      <CardHeader>
        <CardTitle>Informations du profil</CardTitle>
        <CardDescription>
          Mettez à jour vos informations personnelles et votre avatar.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <FieldGroup>
            <Field orientation="horizontal">
              <FieldLabel>Avatar</FieldLabel>
              <div className="flex items-center gap-4">
                <Avatar className="size-16">
                  <AvatarImage src={avatarPreview ?? undefined} alt="Avatar" />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleAvatarChange}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload data-icon />
                    Changer l&apos;avatar
                  </Button>
                  <FieldDescription>
                    JPG, PNG ou GIF. Max 2 Mo.
                  </FieldDescription>
                </div>
              </div>
            </Field>

            <Field>
              <FieldLabel htmlFor="name">Nom complet</FieldLabel>
              <Input
                id="name"
                name="name"
                defaultValue={session?.user?.name ?? ""}
                placeholder="Votre nom"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={session?.user?.email ?? ""}
                placeholder="vous@example.com"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="username">Nom d&apos;utilisateur</FieldLabel>
              <Input
                id="username"
                name="username"
                placeholder="nom_utilisateur"
              />
              <FieldDescription>
                Votre identifiant public unique sur la plateforme.
              </FieldDescription>
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
