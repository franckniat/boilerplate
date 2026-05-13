import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { queryKeys } from '@/lib/query-keys';

// Types
export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials extends LoginCredentials {
    name: string;
}

export interface AuthResponse {
    token: string;
    user: {
        id: string;
        email: string;
        name: string;
    };
}

export interface User {
    id: string;
    email: string;
    name: string;
}

// Queries
export const useGetProfile = () => {
    return useQuery({
        queryKey: queryKeys.auth.profile(),
        queryFn: () => apiClient.get<User>('/auth/profile'),
        retry: false,
    });
};

// Mutations
export const useLogin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (credentials: LoginCredentials) =>
            apiClient.post<AuthResponse>('/auth/login', credentials),
        onSuccess: (data) => {
            apiClient.setToken(data.token);
            queryClient.setQueryData(queryKeys.auth.profile(), data.user);
        },
    });
};

export const useRegister = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (credentials: RegisterCredentials) =>
            apiClient.post<AuthResponse>('/auth/register', credentials),
        onSuccess: (data) => {
            apiClient.setToken(data.token);
            queryClient.setQueryData(queryKeys.auth.profile(), data.user);
        },
    });
};

export const useLogout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => apiClient.post('/auth/logout'),
        onSuccess: () => {
            apiClient.setToken(null);
            queryClient.removeQueries({ queryKey: queryKeys.auth.all });
        },
    });
};
