import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AuthProvider from '~/src/providers/AuthProvider';

export default function Layout() {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <GestureHandlerRootView style={{ flex: 1, paddingTop: top, paddingBottom: bottom }}>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar style="dark" />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
