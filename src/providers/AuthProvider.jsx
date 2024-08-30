import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useCallback } from 'react';
import axios from 'axios';
import { save, getValueFor, deleteKey } from '~lib/utils/secureStorage';
import { API_ROUTES } from '~core/constants/apiRoutes';
import { STORAGE_KEYS } from '~core/constants/asyncKeys';

const AuthContext = createContext();
// LOGIC TO SAVE TOKEN TO storage
// LOGIC TO MONITOR TIME(1HR50MIN) TO DELETE SAVED TOKEN FROM storage AND SET AUTHENICATION TO FALSE==> REDIRECT BACK TO LOGIN
// CREATE transaction mProvider
// creqte homescreen

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkAuthStatus = useCallback(async () => {
    try {
      const [token, expiresAt] = await Promise.all([
        getValueFor(STORAGE_KEYS.AUTH_TOKEN),
        getValueFor(STORAGE_KEYS.EXPIRES_AT),
      ]);

      const expiresAtDate = new Date(expiresAt);
      const hasExpired = new Date() > expiresAtDate;

      setIsAuthenticated(!!token && !hasExpired);
      setAuthToken(token);
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsAuthenticated(false);
      setAuthToken(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const authenticateUser = async (userDetails) => {
    const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000 + 50 * 60 * 1000); // 2 hours from now
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.EXPO_PUBLIC_BASE_API_URL}${API_ROUTES.AUTHENTICATE_USER}?partnerName=${process.env.EXPO_PUBLIC_BASE_PARTNER_NAME}&partnerPassword=${process.env.EXPO_PUBLIC_BASE_PARTNER_PASSWORD}&partnerUserID=${userDetails.email}&partnerUserSecret=${userDetails.password}`
      );

      await Promise.all([
        save(STORAGE_KEYS.AUTH_TOKEN, res.data.authToken),
        save(STORAGE_KEYS.EXPIRES_AT, expiresAt.toISOString()),
      ]);

      // Immediately update the state
      setAuthToken(res.data.authToken);
      setIsAuthenticated(true);
    } catch (err) {
      console.error('Authentication error:', err);
      setIsAuthenticated(false);
      setAuthToken(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = useCallback(async () => {
    try {
      await Promise.all([save(STORAGE_KEYS.AUTH_TOKEN, ''), save(STORAGE_KEYS.EXPIRES_AT, '')]);
      setIsAuthenticated(false);
      setAuthToken(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, []);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authToken,
        authenticateUser,
        logout,
        loading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
