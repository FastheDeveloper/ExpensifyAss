import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Constants from 'expo-constants';
import { View, Text } from 'react-native';
import AuthProvider from 'src/providers/AuthProvider';
import StackNavigator from 'src/navigation/StackNavigator';
import { ModalsProvider } from '~core/services/modalService';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <ModalsProvider>
            <StackNavigator />
          </ModalsProvider>
        </NavigationContainer>
      </AuthProvider>
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
