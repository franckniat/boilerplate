import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { queryKeys } from '@/lib/query-keys';

export interface User {
    id: string;
    name: string;
    email: string;
    createdAt: string;
}

export interface CreateUserInput {
    name: string;
    email: string;
}

export interface UpdateUserInput {
    name?: string;
    email?: string;
}

interface ListResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
}

// Queries
export const useGetUsers = (filters?: { page?: number; limit?: number }) => {
    return useQuery({
        queryKey: queryKeys.users.list(filters),
        queryFn: () => {
            const params = new URLSearchParams();
            if (filters?.page) params.append('page', String(filters.page));
            if (filters?.limit) params.append('limit', String(filters.limit));
            const query = params.toString();
            return apiClient.get<ListResponse<User>>(`/users${query ? `?${query}` : ''}`);
        },
    });
};

export const useGetUser = (id: string | number) => {
    return useQuery({
        queryKey: queryKeys.users.detail(id),
        queryFn: () => apiClient.get<User>(`/users/${id}`),
        enabled: !!id,
    });
};

// Mutations
export const useCreateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateUserInput) => apiClient.post<User>('/users', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() });
        },
    });
};

export const useUpdateUser = (id: string | number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateUserInput) =>
            apiClient.put<User>(`/users/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.users.detail(id) });
            queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() });
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string | number) =>
            apiClient.delete(`/users/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() });
        },
    });
};
