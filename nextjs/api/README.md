# API Boilerplate Next.js

Boilerplate front client pour consommer:

- une API externe (Laravel, NestJS, Rails, etc.)
- ou une API interne Next.js (routes `app/api/*`)

Stack principale:

- Next.js App Router
- TanStack React Query v5
- UI shadcn
- Theme clair/sombre via `next-themes`

## Demarrage rapide

```bash
pnpm install
pnpm dev
```

Application: http://localhost:3000

## Configuration API

Le client HTTP est dans `lib/api-client.ts`.

- Si `NEXT_PUBLIC_API_URL` est defini, il est utilise.
- Sinon, la valeur par defaut est `/api` (ideal pour des routes internes Next.js).

Exemple `.env.local` pour API externe:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Organisation

- `lib/api-client.ts`: client HTTP centralise (token bearer, erreurs, normalisation)
- `lib/query-client.ts`: config globale React Query
- `lib/query-keys.ts`: factory de query keys
- `hooks/use-auth.ts`: auth (login/register/logout/profile)
- `hooks/use-users.ts`: CRUD users
- `providers/index.tsx`: providers globaux (theme + query + tooltip)
- `app/page.tsx`: playground API
- `app/dashboard/page.tsx`: dashboard demo

## Internal API Next.js

Ce boilerplate est deja compatible avec une API interne Next.js:

1. creer tes handlers `app/api/.../route.ts`
2. laisser `NEXT_PUBLIC_API_URL` vide
3. utiliser les hooks existants ou en creer de nouveaux

## Ajouter une nouvelle ressource

1. Ajouter des keys dans `lib/query-keys.ts`
2. Creer un hook dans `hooks/` (`use-xxx.ts`)
3. Exporter dans `hooks/index.ts`

## Notes UI

- `TooltipProvider` est monte globalement dans `providers/index.tsx`
- Theme switcher disponible via `components/layouts/theme-switcher.tsx`

## Documentation detaillee

Voir `REACT_QUERY_GUIDE.md` pour les patterns avances (invalidations, mutations, etc.).

Voir `AUTHENTICATION_GUIDE.md` pour l architecture auth (session cookie + bearer token), la configuration, et le troubleshooting.
