# Boilerplates Collection

Une collection de boilerplates Next.js 15 prêts à l'emploi pour démarrer rapidement vos projets.

## 📁 Structure du projet

```
boilerplate/
├── nextjs/
│   ├── api/        # Backend API avec authentification
│   ├── frontend/   # Frontend avec interface utilisateur moderne
│   └── fullstack/  # Projet fullstack minimaliste
```

## 🚀 Boilerplates disponibles

### 1. API Backend (`nextjs/api/`)

**Boilerplate orienté backend avec système d'authentification complet**

#### 🛠️ Stack technique
- **Framework:** Next.js 15.4.2 avec App Router
- **Runtime:** React 19.1.0
- **Language:** TypeScript 5
- **UI Library:** Shadcn/UI + Radix UI
- **Styling:** Tailwind CSS 4
- **Authentification:** JWT avec Jose + Sessions sécurisées
- **Validation:** Zod pour la validation des formulaires
- **State Management:** React Hook Form avec resolvers

#### ✨ Fonctionnalités principales
- 🔐 **Système d'authentification complet**
  - Inscription/Connexion avec validation
  - Sessions sécurisées avec cookies HttpOnly
  - Middleware de protection des routes
  - Gestion des redirections automatiques

- 🎨 **Interface utilisateur moderne**
  - Composants UI pré-configurés (Shadcn/UI)
  - Système de thème dark/light
  - Composants d'authentification stylisés
  - Notifications avec Sonner

- 🛡️ **Sécurité renforcée**
  - Chiffrement JWT avec rotation des clés
  - Validation stricte des formulaires
  - Protection CSRF et XSS
  - Middleware de sécurité des routes

#### 🏗️ Architecture
```
api/
├── actions/          # Server Actions
│   └── auth.ts      # Actions d'authentification
├── components/      # Composants React
│   ├── auth/        # Composants d'auth
│   └── ui/          # Composants UI Shadcn
├── lib/             # Utilitaires
│   ├── auth.ts      # Logique d'authentification
│   ├── encode.ts    # Chiffrement/Déchiffrement
│   └── user.ts      # Gestion utilisateurs
├── services/        # Services métier
├── types/           # Types TypeScript
└── middleware.ts    # Middleware de protection
```

#### 🚀 Démarrage rapide
```bash
cd nextjs/api
pnpm install
pnpm dev
```

---

### 2. Frontend (`nextjs/frontend/`)

**Boilerplate frontend avec interface utilisateur avancée et dashboard**

#### 🛠️ Stack technique
- **Framework:** Next.js 15.4.2 avec App Router
- **Runtime:** React 19.1.0
- **Language:** TypeScript 5
- **UI Library:** Shadcn/UI + Radix UI (collection complète)
- **Styling:** Tailwind CSS 4
- **Charts:** Recharts pour les graphiques
- **Mobile:** Composants responsive avec Vaul (drawer mobile)
- **Progress:** BProgress pour les barres de progression
- **Icons:** Lucide React

#### ✨ Fonctionnalités principales
- 🎨 **Interface utilisateur complète**
  - 25+ composants UI pré-stylisés
  - Sidebar avec navigation avancée
  - Dashboard layout responsive
  - Système de thème complet

- 📊 **Dashboard avancé**
  - Composants de navigation modulaires
  - Sidebar collapsible
  - Team switcher
  - User navigation avec avatar

- 📱 **Responsive Design**
  - Mobile-first approach
  - Drawer components pour mobile
  - Hooks de détection mobile
  - Interface adaptive

- 📈 **Visualisation de données**
  - Intégration Recharts
  - Composants de graphiques
  - Cartes de statistiques

#### 🏗️ Architecture
```
frontend/
├── app/
│   ├── dashboard/   # Pages du dashboard
│   └── fonts/       # Polices personnalisées
├── components/
│   ├── layouts/     # Layouts réutilisables
│   ├── ui/          # 25+ composants Shadcn
│   ├── app-sidebar.tsx
│   ├── nav-*.tsx    # Composants de navigation
│   └── team-switcher.tsx
├── hooks/           # Custom hooks
├── providers/       # Context providers
└── lib/             # Utilitaires
```

#### 🎨 Composants UI disponibles
- Navigation: Sidebar, Breadcrumb, Pagination
- Formulaires: Form, Input, Select, Textarea
- Feedback: Alert Dialog, Sonner, Skeleton
- Layout: Card, Sheet, Tabs, Accordion
- Data: Table, Chart, Badge
- Et bien plus...

#### 🚀 Démarrage rapide
```bash
cd nextjs/frontend
pnpm install
pnpm dev
```

---

### 3. Fullstack (`nextjs/fullstack/`)

**Boilerplate minimaliste pour démarrer rapidement un projet fullstack**

#### 🛠️ Stack technique
- **Framework:** Next.js 15.3.1 avec App Router
- **Runtime:** React 19.0.0
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **Build:** Configuration ESLint optimisée

#### ✨ Caractéristiques
- 🚀 **Setup minimal et rapide**
- 🎨 **Tailwind CSS pré-configuré**
- 📱 **Structure responsive de base**
- ⚡ **Configuration optimisée pour le développement**

#### 🏗️ Architecture
```
fullstack/
├── src/
│   └── app/         # App Router pages
├── public/          # Assets statiques
└── config files     # Configuration TypeScript, Tailwind, ESLint
```

#### 🚀 Démarrage rapide
```bash
cd nextjs/fullstack
pnpm install
pnpm dev
```

## 🔧 Scripts disponibles

Chaque boilerplate inclut les scripts suivants :

```bash
pnpm dev          # Démarrage en mode développement (avec Turbopack)
pnpm build        # Build de production
pnpm start        # Démarrage du serveur de production
pnpm lint         # Linting avec ESLint
```

## 📋 Prérequis

- **Node.js** 18.17 ou plus récent
- **pnpm** (gestionnaire de packages recommandé)
- **Git** pour le versioning

## 🤝 Contribution

1. Fork le projet
2. Créez votre branche feature (`git checkout -b feature/amazing-feature`)
3. Committez vos changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

## 📝 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

*Boilerplates maintenus avec ❤️ pour la communauté des développeurs*
