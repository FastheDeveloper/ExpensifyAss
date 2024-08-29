import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const LoginScreen = () => {
  const { top, bottom, left } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}>
      <Text>LoginScreen</Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});
