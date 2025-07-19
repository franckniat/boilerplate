import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Navbar from "@/components/layouts/navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/5">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto py-16 md:py-24 max-w-5xl">
        <div className="flex flex-col gap-8 items-center text-center">
          <Badge variant="secondary" className="px-4 py-1.5">v1.0.0 • Shadcn UI + Next.js + Tailwind v4</Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            La boilerplate <span className="text-primary">parfaite</span> pour ton prochain projet
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Une structure élégante et personnalisable avec les meilleurs composants prêts à l&apos;emploi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button size="lg">
              Commencer →
            </Button>
            <Button size="lg" variant="outline">
              Documentation
            </Button>
          </div>
        </div>
      </section>

      {/* Features Tabs */}
      <section className="container mx-auto py-12 max-w-4xl">
        <Tabs defaultValue="components" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="components">Composants UI</TabsTrigger>
            <TabsTrigger value="theming">Thème</TabsTrigger>
            <TabsTrigger value="utilities">Utilitaires</TabsTrigger>
          </TabsList>
          <TabsContent value="components" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Composants UI prêts à l&apos;emploi</CardTitle>
                <CardDescription>
                  Plus de 25 composants accessibles et personnalisables pour construire rapidement ton interface.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex flex-col items-center p-4 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors">
                  <span className="text-sm font-medium">Buttons</span>
                </div>
                <div className="flex flex-col items-center p-4 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors">
                  <span className="text-sm font-medium">Cards</span>
                </div>
                <div className="flex flex-col items-center p-4 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors">
                  <span className="text-sm font-medium">Forms</span>
                </div>
                <div className="flex flex-col items-center p-4 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors">
                  <span className="text-sm font-medium">Dialogs</span>
                </div>
                <div className="flex flex-col items-center p-4 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors">
                  <span className="text-sm font-medium">Tooltips</span>
                </div>
                <div className="flex flex-col items-center p-4 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors">
                  <span className="text-sm font-medium">+20 autres</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Voir tous les composants</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="theming" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Thème personnalisable</CardTitle>
                <CardDescription>
                  Un système de thème basé sur les variables CSS avec support du mode sombre automatique.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-card border border-border">
                    <h3 className="text-sm font-medium mb-2">Mode clair</h3>
                    <div className="flex gap-2 flex-wrap">
                      <div className="w-8 h-8 rounded-full bg-background border border-border"></div>
                      <div className="w-8 h-8 rounded-full bg-primary"></div>
                      <div className="w-8 h-8 rounded-full bg-secondary"></div>
                      <div className="w-8 h-8 rounded-full bg-accent"></div>
                      <div className="w-8 h-8 rounded-full bg-muted"></div>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-card border border-border dark">
                    <h3 className="text-sm font-medium mb-2 text-foreground">Mode sombre</h3>
                    <div className="flex gap-2 flex-wrap">
                      <div className="w-8 h-8 rounded-full bg-background border border-border"></div>
                      <div className="w-8 h-8 rounded-full bg-primary"></div>
                      <div className="w-8 h-8 rounded-full bg-secondary"></div>
                      <div className="w-8 h-8 rounded-full bg-accent"></div>
                      <div className="w-8 h-8 rounded-full bg-muted"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">En savoir plus</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="utilities" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Utilitaires</CardTitle>
                <CardDescription>
                  Des outils et fonctionnalités pour améliorer ton flux de développement.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg border border-border">
                  <div className="mt-1 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Animations</h3>
                    <p className="text-sm text-muted-foreground">Des transitions et animations fluides intégrées</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg border border-border">
                  <div className="mt-1 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" x2="12" y1="8" y2="12" />
                      <line x1="12" x2="12.01" y1="16" y2="16" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Validation de formulaires</h3>
                    <p className="text-sm text-muted-foreground">Avec React Hook Form et Zod</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg border border-border">
                  <div className="mt-1 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                      <path d="M9 9h.01" />
                      <path d="M15 9h.01" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Auth prêt à l&apos;emploi</h3>
                    <p className="text-sm text-muted-foreground">Intégration NextAuth pour l&apos;authentification</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Explorer les utilitaires</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto py-16 max-w-5xl">
        <h2 className="text-2xl font-bold text-center mb-12">Adopté par des développeurs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-card/60">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Avatar>
                    <AvatarImage src={`https://avatar.vercel.sh/user${i}@example.com`} />
                    <AvatarFallback>U{i}</AvatarFallback>
                  </Avatar>
                  <div className="text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H10V18H0Z" />
                    </svg>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {i === 1 ? (
                    "Cette boilerplate m'a fait gagner des jours de configuration. Les composants sont élégants et la personnalisation est super simple."
                  ) : i === 2 ? (
                    "Exactement ce dont j'avais besoin pour lancer rapidement mes projets. La combinaison de Tailwind v4 et shadcn/ui est parfaite."
                  ) : (
                    "J'ai essayé plusieurs templates, mais celui-ci est de loin le plus complet et le mieux structuré. Un vrai gain de temps."
                  )}
                </p>
              </CardContent>
              <CardFooter className="pt-2">
                <div className="flex justify-between items-center w-full">
                  <div className="text-sm font-medium">
                    {i === 1 ? "Sarah L." : i === 2 ? "Thomas M." : "Julie D."}
                  </div>
                  <div className="flex">
                    {Array(5).fill(0).map((_, idx) => (
                      <svg key={idx} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto py-16 max-w-5xl">
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-none shadow-sm">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl md:text-3xl">Prêt à démarrer ton projet ?</CardTitle>
            <CardDescription className="text-base max-w-xl mx-auto">
              Cette boilerplate contient tout ce dont tu as besoin pour développer rapidement et efficacement.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4 pb-6 flex justify-center">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                </svg>
                Clone le repo
              </Button>
              <Button size="lg" variant="outline">
                Explorer la doc
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <h1>Build with ❤️  by <a href="https://fndev.vercel.app" target="_blank" className="text-primary hover:underline text-sm">franckniat</a></h1>
            <Separator orientation="vertical" className="h-4" />
            <span className="text-xs text-muted-foreground">© {new Date().getFullYear()}</span>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              GitHub
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Twitter
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Discord
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}