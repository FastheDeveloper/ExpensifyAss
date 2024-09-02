import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Fuse from 'fuse.js';
import { useNavigation } from '@react-navigation/native';

import { useTransactions } from '~providers/TransactionProvider';
import { APP_COLOR } from '~/src/core/constants/colorConstants';
import { FONT_NAMES } from '~/src/core/constants/fontConstants';
import { formatDateDisplay } from '~lib/utils/timeUtil';
import InputField from '~/src/lib/components/InputField/InputField';
import { BackButton } from '~components/Button/BackButton';

const AllTransactionList = () => {
  const { top, bottom } = useSafeAreaInsets();
  const { filteredTransactionList } = useTransactions();

  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState(filteredTransactionList);

  const fuse = new Fuse(filteredTransactionList, {
    keys: ['merchant'],
    threshold: 0.3,
  });

  useEffect(() => {
    if (query) {
      const results = fuse.search(query);
      setFilteredTransactions(results.map((result) => result.item));
    } else {
      setFilteredTransactions(filteredTransactionList);
    }
  }, [query, filteredTransactionList]);

  const formatAmount = (amount, currency) => {
    const numberFormatter = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    const formattedAmount = numberFormatter.format(Math.abs(amount));

    const displayCurrency = currency === 'USD' ? '$' : currency;
    return `${amount < 0 ? '-' : ''}${displayCurrency}${formattedAmount}`;
  };

  const renderItem = useCallback(
    ({ item }) => (
      <Pressable
        style={styles.itemView}
        onPress={() => navigation.navigate('TransactionDetailScreen', { item })}>
        <View style={styles.item}>
          <View style={{ flexShrink: 1 }}>
            <Text numberOfLines={1} ellipsizeMode="middle" style={styles.merchantText}>
              {item.merchant}
            </Text>
            <Text style={styles.dateText}>{formatDateDisplay(item.inserted)}</Text>
          </View>
          <Text
            style={[
              styles.amount,
              { color: item.amount < 0 ? APP_COLOR.MAIN_RED : APP_COLOR.MAIN_GREEN },
            ]}>
            {formatAmount(item.amount, item.currency)}
          </Text>
        </View>
      </Pressable>
    ),
    []
  );

  const listHeader = <InputField placeholder={'Search by merchant '} onChangeText={setQuery} />;
  const keyExtractor = useCallback((item) => item.transactionID, []);

  return (
    <View style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}>
      <View style={styles.headerView}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={styles.headerText}>Add Transaction</Text>
      </View>
      <View style={{ marginTop: '5%' }}>
        <InputField placeholder={'Search by merchant '} onChangeText={setQuery} />
        <FlatList
          data={filteredTransactions}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          initialNumToRender={10}
          maxToRenderPerBatch={20}
          windowSize={21}
          removeClippedSubviews={true}
          contentContainerStyle={styles.transactionView}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default AllTransactionList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLOR.MAIN_WHITE,
    paddingHorizontal: '5%',
  },
  transactionView: {
    paddingTop: '4%',
    paddingBottom: '10%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    borderColor: APP_COLOR.LIGHT_GREY,
    borderRadius: 8,
    backgroundColor: APP_COLOR.MAIN_WHITE,
    marginTop: '2%',
  },
  itemView: {
    marginVertical: '2%',
    marginHorizontal: '5%',
    borderBottomWidth: 0.2,
    borderColor: APP_COLOR.LIGHT_GREY,
    paddingBottom: '5%',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  merchantText: {
    fontFamily: FONT_NAMES.INTER_MEDIUM,
    fontSize: 16,
    color: APP_COLOR.MAIN_DARK,
    marginBottom: '5%',
  },
  dateText: {
    fontFamily: FONT_NAMES.INTER_REGULAR,
    fontSize: 14,
    color: APP_COLOR.LIGHT_GREY,
  },
  amount: {
    fontFamily: FONT_NAMES.INTER_MEDIUM,
    fontSize: 16,
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontFamily: FONT_NAMES.INTER_SEMIBOLD,
    fontSize: 24,
  },
});
