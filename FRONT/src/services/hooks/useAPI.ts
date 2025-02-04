import axios, { AxiosInstance, AxiosError } from 'axios';

// Load environment variables for different environments
const BASE_URL = import.meta.env.VITE_APP_PROD;
const REFRESH_URL = `${BASE_URL}/auth/refresh`;

export function useApi(): AxiosInstance {
    const api: AxiosInstance = axios.create({
        baseURL: BASE_URL,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true, // Allows sending cookies if used
    });

    /**
     * ✅ Request Interceptor:
     * - Attaches `Authorization` header with the access token for each request.
     */
    api.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers['Authorization'] = `Bearer ${JSON.parse(token)}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    /**
     * ✅ Response Interceptor:
     * - Handles token expiration (401 errors).
     * - Attempts to refresh the token if a refresh token exists.
     * - Retries the original request with the new access token.
     */
    api.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {
            const originalRequest = error.config as any;

            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    const refreshToken = localStorage.getItem('refreshToken');

                    if (!refreshToken) {
                        throw new Error('No refresh token found');
                    }

                    const { data } = await axios.post(REFRESH_URL, { refreshToken: JSON.parse(refreshToken) });

                    // Save new tokens
                    localStorage.setItem('token', JSON.stringify(data.accessToken));
                    localStorage.setItem('refreshToken', JSON.stringify(data.refreshToken));

                    // Update Authorization header and retry request
                    originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
                    return api(originalRequest); // Retry original request with new token
                } catch (refreshError) {
                    console.error('Failed to refresh token:', refreshError);
                    localStorage.removeItem('token');
                    localStorage.removeItem('refreshToken');
                    window.location.href = '/signin'; // Redirect to login page
                }
            }

            return Promise.reject(error);
        }
    );

    return api;
}
