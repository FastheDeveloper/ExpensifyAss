import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const AddTransaction = () => {
  return (
    <View>
      <Link href="./" asChild>
        <Text>AddTransaction</Text>
      </Link>
    </View>
  );
};

export default AddTransaction;

const styles = StyleSheet.create({});
