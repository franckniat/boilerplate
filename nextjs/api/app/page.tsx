
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useGetUsers, useCreateUser, useDeleteUser } from '@/hooks';
import { useGetProfile, useLogin, useLogout } from '@/hooks';
import { ThemeSwitcher } from '@/components/layouts/theme-switcher';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Database,
  Lock,
  LogOut,
  Plus,
  Trash2,
  Users,
} from 'lucide-react';

export default function Home() {
  const [loginEmail, setLoginEmail] = useState('');
  const [createEmail, setCreateEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // Auth hooks
  const profileQuery = useGetProfile();
  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  // Users hooks
  const usersQuery = useGetUsers({ page: 1, limit: 10 });
  const createUserMutation = useCreateUser();
  const deleteUserMutation = useDeleteUser();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email: loginEmail, password });
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    createUserMutation.mutate({ name, email: createEmail }, {
      onSuccess: () => {
        setName('');
        setCreateEmail('');
      },
    });
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_10%_20%,hsl(var(--muted))_0%,transparent_45%),radial-gradient(circle_at_90%_0%,hsl(var(--accent))_0%,transparent_40%)] px-4 py-8 sm:px-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <Card className="border-border/60 bg-card/90 backdrop-blur">
          <CardContent className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">API Playground</Badge>
                <Badge variant="outline">TanStack Query v5</Badge>
              </div>
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Interface de test moderne</h1>
              <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
                Teste l authentification, les mutations et le cache dans une UI compacte.
              </p>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <ThemeSwitcher />
              <Button asChild>
                <Link href="/dashboard">
                  Dashboard
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
          <Card className="border-border/60">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Lock className="size-4 text-cyan-600" />
                <CardTitle className="text-base">Authentification</CardTitle>
              </div>
              <CardDescription>Session utilisateur et token</CardDescription>
            </CardHeader>
            <CardContent>
              {profileQuery.data ? (
                <div className="space-y-4">
                  <Alert>
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertTitle>Connecte</AlertTitle>
                    <AlertDescription>
                      Connecte en tant que <span className="font-medium">{profileQuery.data.name}</span>
                    </AlertDescription>
                  </Alert>

                  <div className="rounded-lg border bg-muted/40 p-3 text-sm text-muted-foreground">
                    <p>
                      <span className="font-medium text-foreground">Email:</span> {profileQuery.data.email}
                    </p>
                  </div>

                  <Button
                    onClick={handleLogout}
                    disabled={logoutMutation.isPending}
                    variant="destructive"
                    className="w-full"
                  >
                    <LogOut className="size-4" />
                    {logoutMutation.isPending ? 'Deconnexion...' : 'Se deconnecter'}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleLogin} className="space-y-3">
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="password" className="text-sm font-medium">Mot de passe</label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  {loginMutation.error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Connexion echouee</AlertTitle>
                      <AlertDescription>
                        {(loginMutation.error as { message?: string })?.message || 'Erreur de connexion'}
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" disabled={loginMutation.isPending} className="w-full">
                    {loginMutation.isPending ? 'Connexion...' : 'Se connecter'}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          <Card className="border-border/60">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Users className="size-4 text-emerald-600" />
                <CardTitle className="text-base">Utilisateurs</CardTitle>
              </div>
              <CardDescription>Creation, listing et suppression</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="create">
                <TabsList>
                  <TabsTrigger value="create">Creer</TabsTrigger>
                  <TabsTrigger value="list">Liste</TabsTrigger>
                  <TabsTrigger value="config">Config</TabsTrigger>
                </TabsList>

                <TabsContent value="create" className="mt-4">
                  <form onSubmit={handleCreateUser} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-sm font-medium">Nom</label>
                      <Input
                        id="name"
                        placeholder="Jean Dupont"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="email-create" className="text-sm font-medium">Email</label>
                      <Input
                        id="email-create"
                        type="email"
                        placeholder="jean@example.com"
                        value={createEmail}
                        onChange={(e) => setCreateEmail(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" disabled={createUserMutation.isPending} className="sm:mb-[1px]">
                      <Plus className="size-4" />
                      {createUserMutation.isPending ? 'Creation...' : 'Ajouter'}
                    </Button>
                  </form>

                  <div className="mt-3 space-y-2">
                    {createUserMutation.error && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Creation echouee</AlertTitle>
                        <AlertDescription>
                          {(createUserMutation.error as { message?: string })?.message || 'Erreur inconnue'}
                        </AlertDescription>
                      </Alert>
                    )}
                    {createUserMutation.isSuccess && (
                      <Alert>
                        <CheckCircle2 className="h-4 w-4" />
                        <AlertTitle>Utilisateur cree</AlertTitle>
                        <AlertDescription>Le cache de la liste a ete invalide automatiquement.</AlertDescription>
                      </Alert>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="list" className="mt-4 space-y-3">
                  <div className="flex items-center justify-between rounded-lg border bg-muted/30 px-3 py-2 text-sm">
                    <span className="text-muted-foreground">Total en base</span>
                    <Badge variant="secondary">{usersQuery.data?.total ?? 0} utilisateurs</Badge>
                  </div>

                  {usersQuery.isLoading && (
                    <div className="space-y-2">
                      {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="h-11 w-full" />
                      ))}
                    </div>
                  )}

                  {usersQuery.error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Chargement impossible</AlertTitle>
                      <AlertDescription>
                        {(usersQuery.error as { message?: string })?.message || 'Erreur inconnue'}
                      </AlertDescription>
                    </Alert>
                  )}

                  {!usersQuery.isLoading && usersQuery.data && usersQuery.data.data.length === 0 && (
                    <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
                      Aucun utilisateur pour le moment.
                    </div>
                  )}

                  {!usersQuery.isLoading && usersQuery.data && usersQuery.data.data.length > 0 && (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nom</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead className="w-[90px] text-right">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {usersQuery.data.data.map((user: { id: string | number; name: string; email: string }) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.name}</TableCell>
                            <TableCell className="text-muted-foreground">{user.email}</TableCell>
                            <TableCell className="text-right">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    onClick={() => deleteUserMutation.mutate(user.id)}
                                    disabled={deleteUserMutation.isPending}
                                    variant="ghost"
                                    size="icon"
                                    className="text-destructive hover:text-destructive"
                                  >
                                    <Trash2 className="size-4" />
                                    <span className="sr-only">Supprimer</span>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Supprimer {user.name}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </TabsContent>

                <TabsContent value="config" className="mt-4 space-y-4">
                  <div className="rounded-xl border bg-muted/30 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Database className="size-4 text-cyan-600" />
                      <p className="text-sm font-medium">Parametres React Query</p>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span>staleTime</span>
                          <span className="text-muted-foreground">60 secondes</span>
                        </div>
                        <Progress value={60} />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span>gcTime</span>
                          <span className="text-muted-foreground">10 minutes</span>
                        </div>
                        <Progress value={75} />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span>retry</span>
                          <span className="text-muted-foreground">1 tentative</span>
                        </div>
                        <Progress value={25} />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <p className="text-sm text-muted-foreground">
                    Consulte le guide REACT_QUERY_GUIDE.md pour les patterns avances et les bonnes pratiques.
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
