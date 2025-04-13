import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated, isTokenExpired, getToken, clearAuth } from '../utils/tokenUtils';
import axiosInstance from '../utils/axioInstance';

/**
 * ProtectedRoute component that checks if the user is authenticated
 * If not authenticated, redirects to login page
 */
const ProtectedRoute = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if token exists and is not expired
        const token = getToken();
        if (!token || isTokenExpired(token)) {
          clearAuth();
          setIsAuthorized(false);
          return;
        }

        // Verify token with backend
        await axiosInstance.get('/auth/get-user');
        setIsAuthorized(true);
      } catch (error) {
        console.error('Auth check error:', error);
        clearAuth();
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  // Render the protected content
  return <Outlet />;
};

export default ProtectedRoute; 