"use client"

import { useState } from "react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Ban, Eye, MoreHorizontal, ShieldBan } from "lucide-react"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { getUserStatus, type MockUser } from "@/lib/mock-data/users"

type UserRowActionsProps = {
  user: MockUser
}

export function UserRowActions({ user }: UserRowActionsProps) {
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [blockDialogOpen, setBlockDialogOpen] = useState(false)
  const [banDialogOpen, setBanDialogOpen] = useState(false)

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  const status = getUserStatus(user)

  const handleBlock = () => {
    toast.success(`${user.name} a été bloqué`)
    setBlockDialogOpen(false)
  }

  const handleBan = () => {
    toast.success(`${user.name} a été banni`)
    setBanDialogOpen(false)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <span className="sr-only">Ouvrir le menu</span>
            <MoreHorizontal data-icon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setDetailsOpen(true)}>
            <Eye data-icon />
            Voir les détails
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setBlockDialogOpen(true)}>
            <ShieldBan data-icon />
            Bloquer
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setBanDialogOpen(true)}
          >
            <Ban data-icon />
            Bannir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Sheet open={detailsOpen} onOpenChange={setDetailsOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Détails utilisateur</SheetTitle>
            <SheetDescription>
              Informations complètes du compte utilisateur.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-6 px-4">
            <div className="flex items-center gap-4">
              <Avatar className="size-14">
                <AvatarImage src={user.image ?? undefined} alt={user.name} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <dl className="grid gap-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Rôle</dt>
                <dd className="capitalize">{user.role ?? "user"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Statut</dt>
                <dd>
                  <Badge
                    variant={status === "active" ? "default" : "destructive"}
                  >
                    {status === "active" ? "Actif" : "Banni"}
                  </Badge>
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Email vérifié</dt>
                <dd>{user.emailVerified ? "Oui" : "Non"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">2FA</dt>
                <dd>{user.twoFactorEnabled ? "Activé" : "Désactivé"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Créé le</dt>
                <dd>
                  {format(user.createdAt, "dd MMMM yyyy", { locale: fr })}
                </dd>
              </div>
              {user.banReason && (
                <div className="flex flex-col gap-1">
                  <dt className="text-muted-foreground">Raison du bannissement</dt>
                  <dd>{user.banReason}</dd>
                </div>
              )}
            </dl>
          </div>
        </SheetContent>
      </Sheet>

      <AlertDialog open={blockDialogOpen} onOpenChange={setBlockDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bloquer l&apos;utilisateur ?</AlertDialogTitle>
            <AlertDialogDescription>
              {user.name} ne pourra plus accéder à certaines fonctionnalités
              jusqu&apos;au déblocage.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleBlock}>
              Bloquer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={banDialogOpen} onOpenChange={setBanDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bannir l&apos;utilisateur ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action empêchera {user.name} d&apos;accéder à la
              plateforme. Cette action peut être réversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-white hover:bg-destructive/90"
              onClick={handleBan}
            >
              Bannir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
