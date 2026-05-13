/**
 * Query Keys Factory
 * Centralized management of query keys for consistency and maintainability
 * https://tanstack.com/query/latest/docs/framework/react/guides/query-keys
 */

export const queryKeys = {
    all: ['api'] as const,

    // Auth queries
    auth: {
        all: ['api', 'auth'] as const,
        login: () => [...queryKeys.auth.all, 'login'] as const,
        register: () => [...queryKeys.auth.all, 'register'] as const,
        logout: () => [...queryKeys.auth.all, 'logout'] as const,
        profile: () => [...queryKeys.auth.all, 'profile'] as const,
        refreshToken: () => [...queryKeys.auth.all, 'refresh'] as const,
    },

    // User queries
    users: {
        all: ['api', 'users'] as const,
        lists: () => [...queryKeys.users.all, 'list'] as const,
        list: (filters?: { page?: number; limit?: number }) =>
            [...queryKeys.users.lists(), filters] as const,
        details: () => [...queryKeys.users.all, 'detail'] as const,
        detail: (id: string | number) =>
            [...queryKeys.users.details(), id] as const,
    },

    // Posts/Articles queries
    posts: {
        all: ['api', 'posts'] as const,
        lists: () => [...queryKeys.posts.all, 'list'] as const,
        list: (filters?: { page?: number; limit?: number; userId?: string }) =>
            [...queryKeys.posts.lists(), filters] as const,
        details: () => [...queryKeys.posts.all, 'detail'] as const,
        detail: (id: string | number) =>
            [...queryKeys.posts.details(), id] as const,
    },

    // Comments queries
    comments: {
        all: ['api', 'comments'] as const,
        lists: () => [...queryKeys.comments.all, 'list'] as const,
        list: (postId?: string | number) =>
            [...queryKeys.comments.lists(), postId] as const,
        details: () => [...queryKeys.comments.all, 'detail'] as const,
        detail: (id: string | number) =>
            [...queryKeys.comments.details(), id] as const,
    },
} as const;
