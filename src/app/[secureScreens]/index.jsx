import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
const Home = () => {
  return (
    <View style={{ backgroundColor: 'red', flex: 1 }}>
      <Link href="./addTransaction" asChild>
        <Text>Fas</Text>
      </Link>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
