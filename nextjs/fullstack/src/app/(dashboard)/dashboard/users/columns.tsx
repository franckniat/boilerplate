"use client"

import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { ArrowUpDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { getUserStatus, type MockUser } from "@/lib/mock-data/users"
import { UserRowActions } from "./user-row-actions"

export const columns: ColumnDef<MockUser>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Tout sélectionner"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Sélectionner la ligne"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    filterFn: (row, _columnId, filterValue) => {
      const search = String(filterValue).toLowerCase()
      if (!search) return true
      return (
        row.original.name.toLowerCase().includes(search) ||
        row.original.email.toLowerCase().includes(search)
      )
    },
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nom
        <ArrowUpDown data-icon />
      </Button>
    ),
    cell: ({ row }) => {
      const user = row.original
      const initials = user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()

      return (
        <div className="flex items-center gap-3">
          <Avatar className="size-8">
            <AvatarImage src={user.image ?? undefined} alt={user.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{user.name}</span>
            {user.username && (
              <span className="text-xs text-muted-foreground">
                @{user.username}
              </span>
            )}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDown data-icon />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue("email")}</span>
    ),
  },
  {
    accessorKey: "role",
    filterFn: (row, _columnId, filterValue) => {
      if (!filterValue) return true
      return row.original.role === filterValue
    },
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Rôle
        <ArrowUpDown data-icon />
      </Button>
    ),
    cell: ({ row }) => {
      const role = row.getValue("role") as string | null
      return (
        <Badge variant="outline" className="capitalize">
          {role ?? "user"}
        </Badge>
      )
    },
  },
  {
    id: "status",
    accessorFn: (row) => getUserStatus(row),
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Statut
        <ArrowUpDown data-icon />
      </Button>
    ),
    cell: ({ row }) => {
      const status = getUserStatus(row.original)
      return (
        <Badge variant={status === "active" ? "default" : "destructive"}>
          {status === "active" ? "Actif" : "Banni"}
        </Badge>
      )
    },
    filterFn: (row, id, value) => value.includes(getUserStatus(row.original)),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Créé le
        <ArrowUpDown data-icon />
      </Button>
    ),
    cell: ({ row }) =>
      format(row.getValue("createdAt"), "dd MMM yyyy", { locale: fr }),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <UserRowActions user={row.original} />,
  },
]
