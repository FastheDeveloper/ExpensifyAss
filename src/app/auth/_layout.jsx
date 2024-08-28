import { Redirect, Slot } from 'expo-router';

import AuthProvide, { useAuth } from '~providers/AuthProvider';

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect href={'/secureScreens'} />;
  }

  return <Slot />;
}
