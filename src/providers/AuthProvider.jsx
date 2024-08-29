import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

const AuthContext = createContext({
  isAuthenticated: false,
});

export default function AuthProvider({ children }) {
  const [userSession, setUserSession] = useState({
    // user: {
    //   id: 123,
    // },
  });
  const [isReady, setIsReady] = useState(true);

  if (!isReady) {
    return <ActivityIndicator />;
  }

  return (
    <AuthContext.Provider
      value={{ userSession, isAuthenticated: !!userSession?.user, userId: userSession?.user?.id }}>
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
