import { columns } from "./columns"
import { DataTable } from "./data-table"
import { mockUsers } from "@/lib/mock-data/users"

export default function UsersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Utilisateurs</h1>
        <p className="text-muted-foreground">
          Gérez les comptes utilisateurs, rôles et statuts.
        </p>
      </div>
      <DataTable columns={columns} data={mockUsers} />
    </div>
  )
}
