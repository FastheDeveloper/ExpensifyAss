import { createContext, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { useCallback } from 'react';
import axios from 'axios';

import { save, getValueFor } from '~lib/utils/secureStorage';
import { API_ROUTES } from '~core/constants/apiRoutes';
import { STORAGE_KEYS } from '~core/constants/asyncKeys';
import { withModal } from '~core/services/modalService';
import { Modal } from '~lib/components/Modal/Modal';

const AuthContext = createContext();

function AuthProvider({ children, openModal }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authToken, setAuthToken] = useState(null);
  const [hasBeenUsed, setHasBeenUsed] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check authentication status from storage
  const checkAuthStatus = useCallback(async () => {
    try {
      const [token, expiresAt] = await Promise.all([
        getValueFor(STORAGE_KEYS.AUTH_TOKEN),
        getValueFor(STORAGE_KEYS.EXPIRES_AT),
      ]);

      // Determine if the token has expired
      const expiresAtDate = new Date(expiresAt);
      const hasExpired = new Date() > expiresAtDate;

      setIsAuthenticated(!!token && !hasExpired);
      setAuthToken(token);
    } catch (error) {
      setIsAuthenticated(false);
      setAuthToken(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Check if the app has been used before
  const checkBeenUsed = useCallback(async () => {
    try {
      const usedApp = await getValueFor(STORAGE_KEYS.HAS_APP_BEEN_USED);
      setHasBeenUsed(!!usedApp);
    } catch (err) {}
  }, []);

  useEffect(() => {
    checkBeenUsed();
  }, [checkBeenUsed]);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  // Handle authentication response and store auth data
  const handleAuthResponse = async (res, expiresAt, setAuthToken, setIsAuthenticated) => {
    const ERROR_MESSAGES = {
      401: 'Incorrect password. Please try again.',
      402: 'Incorrect password. Please try again.',
      404: 'Incorrect password. Please try again.',
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
      const title = errorMessage.split('.')[0];
      const message = errorMessage.split('.')[1];
      openModal?.(<Modal text={message} isError errorTitle={title} />, {
        transparent: true,
        animationType: 'none',
      });
      // Alert.alert('Authentication Error', errorMessage);
      return false;
    }
  };

  // Authenticate user by sending credentials to the server
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
      if (!isAuthenticated) {
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

  // Logout user by clearing auth data
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

  // Provide auth context to children components
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authToken,
        authenticateUser,
        logout,
        loading,
        hasBeenUsed,
        setHasBeenUsed,
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
