# React Query Integration Guide

## Overview

Cette boilerplate utilise **TanStack React Query v5** pour gérer l'état des requêtes vers un backend externe.

## Structure

### 1. **Query Client Setup** (`lib/query-client.ts`)

- Crée et configure le `QueryClient` avec les defaults
- Configuration globale du caching, retry, stale time

### 2. **Query Keys Factory** (`lib/query-keys.ts`)

- Centralise toutes les query keys de manière hiérarchique
- Facilite les invalidations et les patterns de caching
- Maintient la cohérence à travers l'app

### 3. **API Client** (`lib/api-client.ts`)

- Wrapper autour de `fetch` native
- Gère l'authentification (Bearer token)
- Intercepte les erreurs (401 déconnexion auto)
- Support GET, POST, PUT, PATCH, DELETE

### 4. **Query Provider** (`providers/query-provider.tsx`)

- Enveloppe l'app avec `QueryClientProvider`
- À intégrer dans le root layout

### 5. **Custom Hooks** (`hooks/`)

- `use-auth.ts`: Login, Register, Logout, Profile
- `use-users.ts`: CRUD utilisateurs
- Extensible pour d'autres ressources

## Usage

### Basic Query (Lecture)

```tsx
"use client";

import { useGetUsers } from "@/hooks";

export function UsersList() {
	const { data, isLoading, error } = useGetUsers({ page: 1, limit: 10 });

	if (isLoading) return <div>Chargement...</div>;
	if (error) return <div>Erreur: {error.message}</div>;

	return (
		<ul>
			{data?.data.map((user) => (
				<li key={user.id}>{user.name}</li>
			))}
		</ul>
	);
}
```

### Basic Mutation (Création/Modification)

```tsx
"use client";

import { useCreateUser } from "@/hooks";

export function CreateUserForm() {
	const mutation = useCreateUser();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		mutation.mutate({
			name: "John Doe",
			email: "john@example.com",
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<button type="submit" disabled={mutation.isPending}>
				{mutation.isPending ? "Création..." : "Créer"}
			</button>
			{mutation.error && <p>Erreur: {mutation.error.message}</p>}
			{mutation.isSuccess && <p>✅ Utilisateur créé!</p>}
		</form>
	);
}
```

### Authentication Flow

```tsx
import { useLogin, useGetProfile, useLogout } from "@/hooks";

export function AuthDemo() {
	const profileQuery = useGetProfile();
	const loginMutation = useLogin();
	const logoutMutation = useLogout();

	if (profileQuery.data) {
		return (
			<div>
				<p>Connecté: {profileQuery.data.name}</p>
				<button onClick={() => logoutMutation.mutate()}>
					Déconnecter
				</button>
			</div>
		);
	}

	return (
		<button
			onClick={() =>
				loginMutation.mutate({
					email: "user@example.com",
					password: "password",
				})
			}
		>
			Se connecter
		</button>
	);
}
```

## Important Defaults

| Setting                | Value | Description                                       |
| ---------------------- | ----- | ------------------------------------------------- |
| `staleTime`            | 60s   | Durée avant que les données ne deviennent "stale" |
| `gcTime`               | 10min | Durée de conservation en cache après inactivité   |
| `retry`                | 1     | Nombre de retry en cas d'erreur                   |
| `refetchOnWindowFocus` | false | Ne pas refetch au retour du focus                 |

## Query Invalidation

Après une mutation, invalider les queries liées:

```tsx
export const useCreateUser = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CreateUserInput) =>
			apiClient.post<User>("/users", data),
		onSuccess: () => {
			// Invalide et refetch automatiquement
			queryClient.invalidateQueries({
				queryKey: queryKeys.users.lists(),
			});
		},
	});
};
```

## Adding New Endpoints

### 1. Ajouter les query keys dans `lib/query-keys.ts`

```tsx
posts: {
  all: ['api', 'posts'] as const,
  lists: () => [...queryKeys.posts.all, 'list'] as const,
  list: (filters?: { page?: number }) =>
    [...queryKeys.posts.lists(), filters] as const,
  details: () => [...queryKeys.posts.all, 'detail'] as const,
  detail: (id: string | number) =>
    [...queryKeys.posts.details(), id] as const,
}
```

### 2. Créer les hooks dans `hooks/use-posts.ts`

```tsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { queryKeys } from "@/lib/query-keys";

export const useGetPosts = () => {
	return useQuery({
		queryKey: queryKeys.posts.list(),
		queryFn: () => apiClient.get("/posts"),
	});
};

export const useCreatePost = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data) => apiClient.post("/posts", data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: queryKeys.posts.lists(),
			});
		},
	});
};
```

### 3. Exporter depuis `hooks/index.ts`

```tsx
export * from "./use-posts";
```

## Error Handling

```tsx
const { error } = useGetUsers();

if (error) {
	const apiError = error as ApiError;
	console.log("Status:", apiError.status);
	console.log("Message:", apiError.message);
}
```

## TypeScript Support

```tsx
// Types automatiquement inférés
const { data } = useGetUsers();
// data: ListResponse<User> | undefined

const mutation = useCreateUser();
// mutate: (variables: CreateUserInput) => void
// data: User | undefined
```

## DevTools (Bonus)

Pour déboguer les queries en dev:

```bash
pnpm add @tanstack/react-query-devtools
```

Ajouter dans le layout:

```tsx
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function RootLayout({ children }) {
	return (
		<QueryProvider>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryProvider>
	);
}
```

## Best Practices

1. **Toujours** utiliser les query keys du factory
2. **Invalider** les queries après mutations (cascade pattern)
3. **Définir** les types de réponse du backend
4. **Gérer** les 401/403 pour déconnecter l'user
5. **Tester** avec des mocks de requêtes (MSW)
6. **Préfetcher** les données attendues (prefetchQuery)

## Ressources

- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Query Keys Guide](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys)
- [Mutations Guide](https://tanstack.com/query/latest/docs/framework/react/guides/mutations)
- [TypeScript Support](https://tanstack.com/query/latest/docs/framework/react/typescript)
