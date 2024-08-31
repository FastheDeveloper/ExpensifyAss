import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const TransactionDetailScreen = ({ route }) => {
  const { item } = route.params;
  return (
    <View style={{ marginVertical: 50 }}>
      <Text>{item.amount}</Text>
    </View>
  );
};

export default TransactionDetailScreen;

const styles = StyleSheet.create({});
