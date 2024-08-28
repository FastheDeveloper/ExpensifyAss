import { Redirect, Slot, Stack } from 'expo-router';
import { useAuth } from '~/src/providers/AuthProvider';

export default function HomeLayout() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Redirect href={'/auth'} />;
  }

  // return <Slot />;
  return (
    <Stack screenOptions={{ headerTintColor: 'blue' }}>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="addTransaction" options={{ headerShown: false, title: 'add' }} />
    </Stack>
  );
}
