import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCheckAuthQuery } from '../services/apiSlice';
import { apiLoginSuccess, apiLogoutSuccess } from '../redux/authSlice';

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();
  const { data, isFetching, isSuccess, isError, error } = useCheckAuthQuery();
  
  useEffect(() => {
    if (isSuccess && data && data.success && data.user) {
      // User is authenticated, update state
      dispatch(apiLoginSuccess({
        user: data.user,
        sessionToken: null,
        rememberMe: false
      }));
    } else if (isError || (isSuccess && !data.success)) {
      // User is not authenticated or check failed, ensure state is cleared
      dispatch(apiLogoutSuccess());
    }
  }, [data, isSuccess, isError, dispatch]);

  // While the initial auth check is loading, show a full-page loader.
  // This prevents the rest of the app (and ProtectedRoutes) from rendering
  // with a false "unauthenticated" state.
  if (isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-700">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Initializing Session...</p>
        </div>
      </div>
    );
  }

  // Once loading is complete (either success or error), render the app.
  // The Redux store will have the correct authentication state.
  return <>{children}</>;
};

export default AuthInitializer;