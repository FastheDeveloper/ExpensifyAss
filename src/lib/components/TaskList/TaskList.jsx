import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const TaskList = ({ tasks, renderItem: customRenderItem }) => {
  const [refreshing, setRefreshing] = useState(false);

  const defaultRenderItem = useCallback(
    ({ item }) => (
      <View style={styles.item}>
        <Text style={styles.merchant}>{item.merchant}</Text>
        <Text style={styles.amount}>
          {item.currency} {(item.amount / 100).toFixed(2)}
        </Text>
        <Text style={styles.date}>{item.created}</Text>
      </View>
    ),
    []
  );

  const renderItem = useCallback(
    (itemProps) => (
      <>
        <View>{customRenderItem ? customRenderItem(itemProps) : defaultRenderItem(itemProps)}</View>
      </>
    ),
    [customRenderItem, defaultRenderItem]
  );

  const keyExtractor = useCallback((item) => item.transactionID, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Implement your refresh logic here
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  return (
    <FlatList
      data={tasks}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      refreshing={refreshing}
      onRefresh={onRefresh}
      initialNumToRender={10}
      maxToRenderPerBatch={20}
      windowSize={21}
      removeClippedSubviews={true}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
  },
  merchant: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 14,
    color: '#888',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
});

export default TaskList;
