import axios, { AxiosInstance, AxiosError } from 'axios';

// Load environment variables for different environments
const BASE_URL = import.meta.env.VITE_APP_PROD;
const REFRESH_URL = `${BASE_URL}/auth/refresh`;

export function useApi(): AxiosInstance {
    const api: AxiosInstance = axios.create({
        baseURL: BASE_URL,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true, // Ensure cookies are sent with requests
    });

    api.interceptors.request.use(
        (config) => {
            // No need to manually attach Authorization header since cookies are automatically sent
            return config;
        },
        (error) => Promise.reject(error)
    );

    /**
     * Response Interceptor:
     * - Handles token expiration (401 errors).
     * - Attempts to refresh the token if a refresh token exists in the cookie.
     * - Retries the original request with the new access token.
     */
    api.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {
            const originalRequest = error.config as any;

            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    // Attempt to refresh the access token using cookies
                    await axios.post(REFRESH_URL, {}, { withCredentials: true });

                    // Retry the original request after refresh
                    return api(originalRequest);
                } catch (refreshError) {
                    console.error('Failed to refresh token:', refreshError);
                    window.location.href = '/signin'; // Redirect to login page
                }
            }

            return Promise.reject(error);
        }
    );

    return api;
}
