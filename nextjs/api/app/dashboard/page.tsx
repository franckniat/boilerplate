'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useGetProfile, useGetUsers } from '@/hooks';
import { ThemeSwitcher } from '@/components/layouts/theme-switcher';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import {
    ArrowLeft,
    ChartNoAxesCombined,
    CircleCheck,
    Clock3,
    ShieldCheck,
    Sparkles,
    Users,
} from 'lucide-react';

export default function DashboardPage() {
    const profileQuery = useGetProfile();
    const usersQuery = useGetUsers({ page: 1, limit: 8 });

    const users = usersQuery.data?.data ?? [];
    const totalUsers = usersQuery.data?.total ?? 0;
    const activeRate = useMemo(() => {
        if (!totalUsers) return 0;
        return Math.min(100, Math.round((users.length / totalUsers) * 100));
    }, [users.length, totalUsers]);

    return (
        <main className="min-h-screen bg-[radial-gradient(circle_at_0%_0%,hsl(var(--accent))_0%,transparent_34%),radial-gradient(circle_at_100%_100%,hsl(var(--muted))_0%,transparent_35%)] px-4 py-8 sm:px-6">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
                <Card className="border-border/60 bg-card/90 backdrop-blur">
                    <CardContent className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Badge variant="secondary">Dashboard</Badge>
                                <Badge variant="outline">Vue temps reel</Badge>
                            </div>
                            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Pilotage du boilerplate API</h1>
                            <p className="text-sm text-muted-foreground sm:text-base">
                                Visualise les donnees React Query et les indicateurs de session.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 self-start sm:self-auto">
                            <ThemeSwitcher />
                            <Button variant="outline" asChild>
                                <Link href="/">
                                    <ArrowLeft className="size-4" />
                                    Retour
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <Card className="border-border/60">
                        <CardHeader className="pb-2">
                            <CardDescription>Utilisateurs en cache</CardDescription>
                            <CardTitle className="text-2xl">{users.length}</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Users className="size-3.5" />
                                Charge sur la page courante
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/60">
                        <CardHeader className="pb-2">
                            <CardDescription>Total utilisateurs</CardDescription>
                            <CardTitle className="text-2xl">{totalUsers}</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <ChartNoAxesCombined className="size-3.5" />
                                Donnee backend
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/60">
                        <CardHeader className="pb-2">
                            <CardDescription>Etat session</CardDescription>
                            <CardTitle className="text-2xl">{profileQuery.data ? 'Active' : 'Invite'}</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <ShieldCheck className="size-3.5" />
                                Auth via bearer token
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/60">
                        <CardHeader className="pb-2">
                            <CardDescription>Taux page/total</CardDescription>
                            <CardTitle className="text-2xl">{activeRate}%</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock3 className="size-3.5" />
                                Rapport instantane
                            </div>
                        </CardContent>
                    </Card>
                </section>

                <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                    <Card className="border-border/60">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">Activite utilisateurs</CardTitle>
                            <CardDescription>Donnees synchronisees avec React Query</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {usersQuery.error && (
                                <Alert variant="destructive">
                                    <CircleCheck className="h-4 w-4" />
                                    <AlertTitle>Echec de chargement</AlertTitle>
                                    <AlertDescription>
                                        {(usersQuery.error as { message?: string })?.message || 'Erreur inconnue'}
                                    </AlertDescription>
                                </Alert>
                            )}

                            {!usersQuery.error && (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nom</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead className="text-right">Statut</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {users.map((user: { id: string | number; name: string; email: string }, index: number) => (
                                            <TableRow key={user.id}>
                                                <TableCell className="font-medium">{user.name}</TableCell>
                                                <TableCell className="text-muted-foreground">{user.email}</TableCell>
                                                <TableCell className="text-right">
                                                    <Badge variant={index % 2 === 0 ? 'secondary' : 'outline'}>
                                                        {index % 2 === 0 ? 'Actif' : 'Observe'}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="border-border/60">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">Sante du cache</CardTitle>
                            <CardDescription>Indicateurs de fonctionnement</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Tabs defaultValue="cache">
                                <TabsList>
                                    <TabsTrigger value="cache">Cache</TabsTrigger>
                                    <TabsTrigger value="actions">Actions</TabsTrigger>
                                </TabsList>

                                <TabsContent value="cache" className="mt-4 space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span>Fraicheur staleTime</span>
                                            <span className="text-muted-foreground">60s</span>
                                        </div>
                                        <Progress value={60} />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span>Retention gcTime</span>
                                            <span className="text-muted-foreground">10m</span>
                                        </div>
                                        <Progress value={80} />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span>Tolerance retry</span>
                                            <span className="text-muted-foreground">1x</span>
                                        </div>
                                        <Progress value={25} />
                                    </div>
                                </TabsContent>

                                <TabsContent value="actions" className="mt-4 grid grid-cols-2 gap-2">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="outline" className="justify-start">
                                                <Sparkles className="size-4" />
                                                Prefetch
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Prepare les donnees avant navigation</p>
                                        </TooltipContent>
                                    </Tooltip>

                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="outline" className="justify-start">
                                                <Clock3 className="size-4" />
                                                Refetch
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Force un rafraichissement immediat</p>
                                        </TooltipContent>
                                    </Tooltip>

                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="outline" className="justify-start">
                                                <Users className="size-4" />
                                                Invalidate
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Invalide les listes utilisateurs</p>
                                        </TooltipContent>
                                    </Tooltip>

                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="outline" className="justify-start">
                                                <ShieldCheck className="size-4" />
                                                Audit
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Controle l etat global des requetes</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
}
