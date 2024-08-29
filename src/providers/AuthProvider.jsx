import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import axios from 'axios';
import { API_ROUTES } from '~core/constants/apiRoutes';
const AuthContext = createContext({
  isAuthenticated: false,
});
// const baseurl
export default function AuthProvider({ children }) {
  const [userSession, setUserSession] = useState({
    // user: {
    //   id: 123,
    // },
  });

  const [isReady, setIsReady] = useState(true);
  const [loading, setLoading] = useState(false);
  const authenticateUser = async (userDetails) => {
    console.log('Signing in');
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.EXPO_PUBLIC_BASE_API_URL}${API_ROUTES.AUTHENTICATE_USER}?partnerName=${process.env.EXPO_PUBLIC_BASE_PARTNER_NAME}&partnerPassword=${process.env.EXPO_PUBLIC_BASE_PARTNER_PASSWORD}&partnerUserID=${userDetails.email}&partnerUserSecret=${userDetails.password}`
      );
      setUserSession(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  if (!isReady) {
    return <ActivityIndicator />;
  }

  return (
    <AuthContext.Provider
      value={{
        userSession,
        isAuthenticated: !!userSession?.authToken,
        userId: userSession?.accountID,
        authenticateUser,
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
