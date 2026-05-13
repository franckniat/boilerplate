/**
 * API Client
 * Centralized HTTP client for communicating with the backend
 * Handles authentication, error handling, and request/response intercepting
 */

export interface ApiError {
    status: number;
    message: string;
    data?: unknown;
}

export interface ApiResponse<T = unknown> {
    data: T;
    status: number;
    message?: string;
}

class ApiClient {
    private baseUrl: string;
    private token: string | null = null;

    constructor(baseUrl: string = process.env.NEXT_PUBLIC_API_URL || '/api') {
        this.baseUrl = this.normalizeBaseUrl(baseUrl);

        // Try to load token from localStorage if in browser
        if (typeof window !== 'undefined') {
            this.token = localStorage.getItem('auth_token');
        }
    }

    private normalizeBaseUrl(baseUrl: string): string {
        const trimmed = baseUrl.trim();
        if (!trimmed) return '/api';
        return trimmed.endsWith('/') ? trimmed.slice(0, -1) : trimmed;
    }

    private buildUrl(endpoint: string): string {
        if (!endpoint) return this.baseUrl;
        if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
            return endpoint;
        }
        const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
        return `${this.baseUrl}${normalizedEndpoint}`;
    }

    setToken(token: string | null) {
        this.token = token;
        if (typeof window !== 'undefined') {
            if (token) {
                localStorage.setItem('auth_token', token);
            } else {
                localStorage.removeItem('auth_token');
            }
        }
    }

    getToken(): string | null {
        return this.token;
    }

    private getHeaders(extraHeaders?: HeadersInit): Headers {
        const headers = new Headers(extraHeaders);

        if (!headers.has('Content-Type')) {
            headers.set('Content-Type', 'application/json');
        }

        if (this.token) {
            headers.set('Authorization', `Bearer ${this.token}`);
        }

        return headers;
    }

    private async handleResponse<T>(response: Response): Promise<T> {
        if (response.status === 204) {
            return undefined as T;
        }

        const contentType = response.headers.get('content-type');
        let data;

        if (contentType?.includes('application/json')) {
            data = await response.json();
        } else {
            data = await response.text();
        }

        if (!response.ok) {
            const error: ApiError = {
                status: response.status,
                message: data?.message || `HTTP ${response.status}`,
                data,
            };

            // Handle 401 Unauthorized - clear token
            if (response.status === 401) {
                this.setToken(null);
                // Could trigger a logout event here
            }

            throw error;
        }

        return data;
    }

    async get<T = unknown>(endpoint: string, options?: RequestInit): Promise<T> {
        const url = this.buildUrl(endpoint);
        const response = await fetch(url, {
            method: 'GET',
            headers: this.getHeaders(options?.headers),
            ...options,
        });
        return this.handleResponse<T>(response);
    }

    async post<T = unknown>(endpoint: string, body?: unknown, options?: RequestInit): Promise<T> {
        const url = this.buildUrl(endpoint);
        const response = await fetch(url, {
            method: 'POST',
            headers: this.getHeaders(options?.headers),
            body: JSON.stringify(body),
            ...options,
        });
        return this.handleResponse<T>(response);
    }

    async put<T = unknown>(endpoint: string, body?: unknown, options?: RequestInit): Promise<T> {
        const url = this.buildUrl(endpoint);
        const response = await fetch(url, {
            method: 'PUT',
            headers: this.getHeaders(options?.headers),
            body: JSON.stringify(body),
            ...options,
        });
        return this.handleResponse<T>(response);
    }

    async patch<T = unknown>(endpoint: string, body?: unknown, options?: RequestInit): Promise<T> {
        const url = this.buildUrl(endpoint);
        const response = await fetch(url, {
            method: 'PATCH',
            headers: this.getHeaders(options?.headers),
            body: JSON.stringify(body),
            ...options,
        });
        return this.handleResponse<T>(response);
    }

    async delete<T = unknown>(endpoint: string, options?: RequestInit): Promise<T> {
        const url = this.buildUrl(endpoint);
        const response = await fetch(url, {
            method: 'DELETE',
            headers: this.getHeaders(options?.headers),
            ...options,
        });
        return this.handleResponse<T>(response);
    }
}

// Export singleton instance
export const apiClient = new ApiClient();
