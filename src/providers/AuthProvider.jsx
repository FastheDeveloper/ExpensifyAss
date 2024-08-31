import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { useCallback } from 'react';
import axios from 'axios';

import { save, getValueFor, deleteKey } from '~lib/utils/secureStorage';
import { API_ROUTES } from '~core/constants/apiRoutes';
import { STORAGE_KEYS } from '~core/constants/asyncKeys';
import { withModal } from '~core/services/modalService';
import { Modal } from '~lib/components/Modal/Modal';

const AuthContext = createContext();

function AuthProvider({ children, openModal }) {
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
      console.log(token, ' Fas \n Fas', authToken);
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

  const handleAuthResponse = async (res, expiresAt, setAuthToken, setIsAuthenticated) => {
    const ERROR_MESSAGES = {
      401: 'Incorrect password. Please try again.',
      402: 'Incorrect password. Please try again.',
      404: 'Account does not exist. Please check your credentials.',
    };

    if (res.data.jsonCode === 200) {
      try {
        await Promise.all([
          save(STORAGE_KEYS.AUTH_TOKEN, res.data.authToken),
          save(STORAGE_KEYS.EXPIRES_AT, expiresAt.toISOString()),
        ]);

        setAuthToken(res.data.authToken);
        setIsAuthenticated(true);
        return true;
      } catch (error) {
        console.error('Error saving auth data:', error);
        Alert.alert('Error', 'Failed to save authentication data. Please try again.');
        return false;
      }
    } else {
      const errorMessage =
        ERROR_MESSAGES[res.data.jsonCode] || 'An unexpected error occurred. Please try again.';
      openModal?.(<Modal text={errorMessage} isError />, {
        transparent: true,
        animationType: 'none',
      });
      // Alert.alert('Authentication Error', errorMessage);
      return false;
    }
  };

  const authenticateUser = async (userDetails) => {
    const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000 + 50 * 60 * 1000);
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.EXPO_PUBLIC_BASE_API_URL}${API_ROUTES.AUTHENTICATE_USER}?partnerName=${process.env.EXPO_PUBLIC_BASE_PARTNER_NAME}&partnerPassword=${process.env.EXPO_PUBLIC_BASE_PARTNER_PASSWORD}&partnerUserID=${userDetails.email}&partnerUserSecret=${userDetails.password}`
      );

      const isAuthenticated = await handleAuthResponse(
        res,
        expiresAt,
        setAuthToken,
        setIsAuthenticated
      );
      console.log(isAuthenticated);
      if (!isAuthenticated) {
        console.log('Not auth');
        setAuthToken(null);
        setIsAuthenticated(false);
      }
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

export default withModal(AuthProvider);
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
