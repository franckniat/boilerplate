import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { queryKeys } from '@/lib/query-keys';

/**
 * Advanced React Query Patterns
 * 
 * Ce fichier montre les patterns avancés pour des cas d'usage complexes
 */

// ============================================
// 1. INFINITE QUERIES (Infinite Scroll / Pagination)
// ============================================

export interface InfinitePostsResponse {
    data: Array<{ id: string; title: string; content: string }>;
    nextPage?: number;
    hasMore: boolean;
}

export const useInfinitePosts = () => {
    return useInfiniteQuery({
        queryKey: queryKeys.posts.lists(),
        queryFn: ({ pageParam = 1 }) =>
            apiClient.get<InfinitePostsResponse>(`/posts?page=${pageParam}`),
        getNextPageParam: (lastPage) => {
            return lastPage.hasMore ? lastPage.nextPage : undefined;
        },
        initialPageParam: 1,
    });
};

// Usage:
// const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfinitePosts();
// 
// return (
//   <>
//     {data?.pages.map(page => 
//       page.data.map(post => <PostCard key={post.id} post={post} />)
//     )}
//     {hasNextPage && (
//       <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
//         {isFetchingNextPage ? 'Chargement...' : 'Charger plus'}
//       </button>
//     )}
//   </>
// );

// ============================================
// 2. DEPENDENT QUERIES (Requêtes en cascade)
// ============================================

export const useDependentQuery = (userId: string | null) => {
    // Cette query attend que userId soit disponible
    return useQuery({
        queryKey: queryKeys.users.detail(userId || ''),
        queryFn: () => apiClient.get(`/users/${userId}`),
        enabled: !!userId, // Désactiver si userId n'existe pas
    });
};

// Usage:
// const { data: userProfile } = useDependentQuery(currentUserId);
// 
// Ne sera exécutée que si currentUserId est fourni

// ============================================
// 3. OPTIMISTIC UPDATES (Mise à jour optimiste)
// ============================================

export const useOptimisticUpdateUser = (userId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newData: { name: string; email: string }) =>
            apiClient.put(`/users/${userId}`, newData),

        onMutate: async (newData) => {
            // Annuler les queries en attente pour éviter les conflits
            await queryClient.cancelQueries({
                queryKey: queryKeys.users.detail(userId),
            });

            // Sauvegarder les données précédentes
            const previousData = queryClient.getQueryData(
                queryKeys.users.detail(userId)
            );

            // Mettre à jour le cache de manière optimiste
            queryClient.setQueryData(
                queryKeys.users.detail(userId),
                (old: any) => ({ ...old, ...newData })
            );

            // Retourner un contexte pour le rollback
            return { previousData };
        },

        onError: (error, newData, context) => {
            // Rollback en cas d'erreur
            if (context?.previousData) {
                queryClient.setQueryData(
                    queryKeys.users.detail(userId),
                    context.previousData
                );
            }
        },

        onSuccess: () => {
            // Invalider et refetch pour synchroniser avec le serveur
            queryClient.invalidateQueries({
                queryKey: queryKeys.users.detail(userId),
            });
        },
    });
};

// Usage:
// const mutation = useOptimisticUpdateUser(userId);
// 
// mutation.mutate({ name: 'John Doe', email: 'john@example.com' });
// // L'UI se met à jour immédiatement, puis se synchronise après la réponse serveur

// ============================================
// 4. PREFETCHING (Préchargement de données)
// ============================================

export const usePrefetchUserDetails = () => {
    const queryClient = useQueryClient();

    return (userId: string) => {
        queryClient.prefetchQuery({
            queryKey: queryKeys.users.detail(userId),
            queryFn: () => apiClient.get(`/users/${userId}`),
            staleTime: 60 * 1000, // Frais pendant 1 minute
        });
    };
};

// Usage:
// const prefetchUser = usePrefetchUserDetails();
// 
// <button 
//   onMouseEnter={() => prefetchUser('123')} 
//   onClick={() => navigate(`/users/123`)}
// >
//   Voir les détails
// </button>
// 
// // La donnée sera prête quand l'utilisateur clique

// ============================================
// 5. PARALLEL QUERIES (Requêtes en parallèle)
// ============================================

export const useParallelQueries = (userIds: string[]) => {
    return useQuery({
        queryKey: ['users', 'parallel', userIds],
        queryFn: async () => {
            // Toutes les requêtes se font en parallèle
            const responses = await Promise.all(
                userIds.map(id => apiClient.get(`/users/${id}`))
            );
            return responses;
        },
        enabled: userIds.length > 0,
    });
};

// Usage:
// const { data: users } = useParallelQueries(['user1', 'user2', 'user3']);
// // Les 3 requêtes se font en même temps

// ============================================
// 6. POLLING (Mise à jour périodique)
// ============================================

export const usePolledData = (intervalMs = 5000) => {
    return useQuery({
        queryKey: queryKeys.posts.lists(),
        queryFn: () => apiClient.get('/posts'),
        refetchInterval: intervalMs, // Refetch toutes les 5 secondes
    });
};

// Usage:
// const { data } = usePolledData(5000); // Mise à jour toutes les 5 secondes

// ============================================
// 7. QUERY RESETS & INVALIDATION
// ============================================

export const useAdvancedMutations = () => {
    const queryClient = useQueryClient();

    return {
        // Invalider toutes les queries pour un utilisateur
        invalidateUserCache: (userId: string) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.users.detail(userId),
            });
        },

        // Invalider complètement le cache des utilisateurs
        invalidateAllUsers: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.users.all,
            });
        },

        // Refetch immédiatement
        refetchUser: (userId: string) => {
            queryClient.refetchQueries({
                queryKey: queryKeys.users.detail(userId),
            });
        },

        // Effacer les données en cache
        clearUserCache: (userId: string) => {
            queryClient.removeQueries({
                queryKey: queryKeys.users.detail(userId),
            });
        },

        // Mettre à jour manuellement le cache
        setUserData: (userId: string, data: any) => {
            queryClient.setQueryData(
                queryKeys.users.detail(userId),
                data
            );
        },

        // Pré-charger des données
        setInitialUserData: (userId: string, data: any) => {
            queryClient.setQueryData(
                queryKeys.users.detail(userId),
                data,
                { updatedAt: Date.now() }
            );
        },
    };
};

// ============================================
// 8. ERROR HANDLING & RETRIES
// ============================================

export const useRobustQuery = (endpoint: string) => {
    return useQuery({
        queryKey: ['api', endpoint],
        queryFn: () => apiClient.get(endpoint),
        retry: (failureCount, error: any) => {
            // Ne pas retry sur 404 ou 403
            if (error.status === 404 || error.status === 403) {
                return false;
            }
            // Retry maximum 3 fois
            return failureCount < 3;
        },
        retryDelay: (attemptIndex) => {
            // Exponential backoff: 1s, 2s, 4s
            return Math.min(1000 * Math.pow(2, attemptIndex), 30000);
        },
    });
};

// Usage:
// const { data, error, isError } = useRobustQuery('/api/endpoint');
// 
// if (isError) {
//   const apiError = error as ApiError;
//   if (apiError.status === 401) {
//     // Rediriger vers login
//   }
// }

// ============================================
// 9. MUTATION WITH SEQUENTIAL CALLBACKS
// ============================================

export const useSequentialMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: any) => {
            return apiClient.post('/data', data);
        },
        onSuccess: async (data) => {
            console.log('✅ Succès:', data);
            // Attendre la fin du callback avant le prochain
        },
        onError: async (error) => {
            console.error('❌ Erreur:', error);
        },
        onSettled: async () => {
            // Toujours exécuté à la fin
            queryClient.invalidateQueries({ queryKey: queryKeys.all });
        },
    });
};

// ============================================
// 10. MUTATION WITH MUTATION KEY SCOPES
// ============================================

export const useSerialMutation = () => {
    return useMutation({
        mutationFn: (data: any) => apiClient.post('/data', data),
        scope: {
            id: 'data-mutations', // Toutes les mutations avec ce scope s'exécutent en série
        },
    });
};

// Usage:
// const mutation1 = useSerialMutation();
// const mutation2 = useSerialMutation();
// 
// mutation1.mutate(data1); // Exécution immédiate
// mutation2.mutate(data2); // En attente jusqu'à la fin de mutation1
