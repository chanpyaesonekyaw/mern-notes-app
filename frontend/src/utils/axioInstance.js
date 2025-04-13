import axios from 'axios';
import { getToken, isTokenExpired, clearAuth } from './tokenUtils';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token to requests
axiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken();
        
        // Check if token is expired
        if (token && isTokenExpired(token)) {
            console.warn('Token is expired, redirecting to login');
            clearAuth();
            window.location.href = '/login';
            return Promise.reject('Token expired');
        }
        
        // Add token to request headers if it exists
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle common errors
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle timeout errors
        if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
            console.error('Request timed out:', error);
            return Promise.reject({
                response: {
                    data: {
                        message: 'Request timed out. Please try again.'
                    }
                }
            });
        }
        
        // Handle 401 Unauthorized errors (token invalid or expired)
        if (error.response && error.response.status === 401) {
            console.warn('Unauthorized access, clearing auth data');
            clearAuth();
            window.location.href = '/login';
        }
        
        // Handle 403 Forbidden errors
        if (error.response && error.response.status === 403) {
            console.warn('Forbidden access, token may be invalid');
            // You could redirect to login here if needed
        }
        
        // Handle 504 Gateway Timeout errors
        if (error.response && error.response.status === 504) {
            console.error('Gateway timeout:', error);
            return Promise.reject({
                response: {
                    data: {
                        message: 'Server is taking too long to respond. Please try again later.'
                    }
                }
            });
        }
        
        return Promise.reject(error);
    }
);

export default axiosInstance;