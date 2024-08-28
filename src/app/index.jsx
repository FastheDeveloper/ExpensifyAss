import { Redirect } from 'expo-router';

import Constants from 'expo-constants';
import { View } from 'react-native';
import React from 'react';

function Home() {
  return <Redirect href={'/(secureScreens)/'} />;
}

let AppEntryPoint = Home;

if (Constants?.expoConfig?.extra?.storybookEnabled === 'true') {
  const StorybookUI = require('../../.storybook').default;
  AppEntryPoint = () => {
    return (
      <View style={{ flex: 1 }}>
        <StorybookUI />
      </View>
    );
  };
}

export default AppEntryPoint;
