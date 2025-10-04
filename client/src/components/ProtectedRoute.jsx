import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { selectIsAuthInitialized, selectIsAuthenticated, selectUser } from '../redux/authSlice';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const isAuthInitialized = useSelector(selectIsAuthInitialized);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  if (!isAuthInitialized) {
    // While the initial auth check is loading, show a full-page loader.
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-700">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Initializing Session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // User is not authenticated, redirect to login
    navigate('/login');
    return null; // Return null to prevent rendering anything while redirecting
  }

  const userRole = user?.role || user?.profileInfo?.role;

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    // User does not have the required role, redirect to home
    navigate('/');
    return null; // Return null to prevent rendering anything while redirecting
  }

  return children;
};

export default ProtectedRoute;
