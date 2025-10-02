import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCheckAuthQuery, useLoginMutation, useLogoutMutation } from '../services/apiSlice';
import { apiLoginSuccess, apiLogoutSuccess } from '../redux/authSlice';

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();
  const { data, isLoading, isError, error } = useCheckAuthQuery();
  const [loginMutation] = useLoginMutation();
  const [logoutMutation] = useLogoutMutation();
  
  useEffect(() => {
    if (!isLoading) {
      if (data && data.success && data.user) {
        // User is authenticated, update state
        dispatch(apiLoginSuccess({
          user: data.user,
          sessionToken: null, // Session token may not be returned with check-auth
          rememberMe: false
        }));
      } else {
        // User is not authenticated, ensure state is cleared
        dispatch(apiLogoutSuccess());
      }
    }
  }, [data, isLoading, dispatch]);

  return <>{children}</>;
};

export default AuthInitializer;