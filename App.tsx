import 'react-native-gesture-handler';

import RootStack from './navigation';
import React from 'react';
import Constants from 'expo-constants';
import { View } from 'react-native';

function App() {
  return <RootStack />;
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
