import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import Constants from 'expo-constants';
import { View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AuthProvider from 'src/providers/AuthProvider';
import TransactionProvider from 'src/providers/TransactionProvider';

import StackNavigator from 'src/navigation/StackNavigator';
import { ModalsProvider } from '~core/services/modalService';
import { FONT_NAMES } from '~core/constants/fontConstants';
import { StatusBar } from 'expo-status-bar';

SplashScreen.preventAutoHideAsync();

function App() {
  const [loaded, error] = useFonts({
    [FONT_NAMES.INTER_MEDIUM]: require('~lib/assets/fonts/InterMedium.ttf'),
    [FONT_NAMES.INTER_REGULAR]: require('~lib/assets/fonts/InterRegular.ttf'),
    [FONT_NAMES.INTER_SEMIBOLD]: require('~lib/assets/fonts/InterSemiBold.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return <Text>Couldnt get fonts</Text>;
  }

  return (
    <SafeAreaProvider>
      <ModalsProvider>
        <AuthProvider>
          <TransactionProvider>
            <NavigationContainer>
              <StackNavigator />
              <StatusBar style="dark" />
            </NavigationContainer>
          </TransactionProvider>
        </AuthProvider>
      </ModalsProvider>
    </SafeAreaProvider>
  );
}

let AppEntryPoint = App;

if (Constants?.expoConfig?.extra?.storybookEnabled === 'true') {
  const StorybookUI = require('./.storybook').default;
  AppEntryPoint = () => {
    return (
      <View style={{ flex: 1 }}>
        <StorybookUI />
      </View>
    );
  };
}

export default AppEntryPoint;
