import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { useAuth } from '~providers/AuthProvider';

const HomeScreen = () => {
  const { logout } = useAuth();

  return (
    <View style={{ paddingTop: 100 }}>
      <Text onPress={() => logout()}>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
