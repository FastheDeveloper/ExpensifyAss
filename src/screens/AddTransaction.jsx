import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useTransactions } from '~providers/TransactionProvider';
import getGreeting, { formatDateTime } from '~lib/utils/greetingUtil';

const AddTransaction = () => {
  const { addTransaction } = useTransactions();
  const navigation = useNavigation();
  const now = new Date();
  const formattedDateTime = formatDateTime(now);

  const [newTask, setNewTask] = useState({
    amount: -200,
    merchant: 'Shady',
    inserted: formattedDateTime,
    currency: 'USD',
    transactionID: 'fas',
  });

  const handleAddTransaction = (item) => {
    addTransaction(item);
    setTimeout(() => {
      console.log('heading back');
      navigation.goBack(); // Navigate back after 5 seconds
    }, 5000); // 5000 milliseconds = 5 seconds
  };

  return (
    <View style={{ marginTop: 100 }}>
      <Text
        onPress={() => {
          handleAddTransaction(newTask);
        }}>
        AddTransaction
      </Text>
    </View>
  );
};

export default AddTransaction;

const styles = StyleSheet.create({});
