import { QueryClient } from '@tanstack/react-query';

export const createQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000, // 1 minute
                gcTime: 10 * 60 * 1000, // 10 minutes
                retry: 1,
                refetchOnWindowFocus: false,
            },
            mutations: {
                retry: 1,
            },
        },
    });

let clientSingleton: QueryClient | undefined;

export const getQueryClient = () => {
    if (!clientSingleton) {
        clientSingleton = createQueryClient();
    }
    return clientSingleton;
};
