import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Constants from 'expo-constants';
import { View, Text } from 'react-native';
import AuthProvider from 'src/providers/AuthProvider';
import StackNavigator from 'src/navigation/StackNavigator';
import { ModalsProvider } from '~core/services/modalService';
function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <ModalsProvider>
          <StackNavigator />
        </ModalsProvider>
      </NavigationContainer>
    </AuthProvider>
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
