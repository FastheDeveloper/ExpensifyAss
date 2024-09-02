import { FlatList, StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useTransactions } from '~providers/TransactionProvider';
import { LoadingRow } from '~components/LoadingRows/LoadingRow';
import { APP_COLOR } from '~/src/core/constants/colorConstants';
import { FONT_NAMES } from '~/src/core/constants/fontConstants';
import { formatDateDisplay } from '~lib/utils/timeUtil';
import EmptyIcon from '~lib/assets/emptyIcon';

const TaskList = () => {
  const { loadingTransaction, filteredTransactionList } = useTransactions();
  const navigation = useNavigation();

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

  const listHeader = () => (
    <View style={styles.listHeaderView}>
      <Text style={styles.listHeaderTextTitle}>Transactions</Text>
      <Text
        style={styles.listHeaderTextRedirect}
        onPress={() => navigation.navigate('AllTransactionList')}>
        View all
      </Text>
    </View>
  );
  const keyExtractor = useCallback((item) => item.transactionID, []);

  if (loadingTransaction) {
    return (
      <View style={styles.transactionView}>
        <View style={styles.listHeaderView}>
          <Text style={styles.listHeaderTextTitle}>Transactions</Text>
          <Text style={styles.listHeaderTextRedirect}>View all</Text>
        </View>
        <LoadingRow />
        <LoadingRow />
        <LoadingRow />
        <LoadingRow />
      </View>
    );
  }

  if (filteredTransactionList.length === 0) {
    return (
      <View style={styles.transactionView}>
        <View style={styles.listHeaderView}>
          <Text style={styles.listHeaderTextTitle}>Transactions</Text>
        </View>
        <View style={styles.emptyView}>
          <EmptyIcon height={210} width={235} />
          <Text style={styles.headerText}>No transactions found!</Text>
        </View>
      </View>
    );
  }

  return (
    <FlatList
      data={filteredTransactionList}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      initialNumToRender={10}
      maxToRenderPerBatch={20}
      windowSize={21}
      removeClippedSubviews={true}
      ListHeaderComponent={listHeader}
      contentContainerStyle={styles.transactionView}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default TaskList;

const styles = StyleSheet.create({
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
    marginTop: '10%',
  },
  listHeaderView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2%',
    borderBottomWidth: 0.2,
    paddingHorizontal: '5%',
    borderColor: APP_COLOR.LIGHT_GREY,
    paddingBottom: '5%',
  },
  listHeaderTextRedirect: {
    fontSize: 16,
    fontFamily: FONT_NAMES.INTER_MEDIUM,
    color: APP_COLOR.MAIN_DARK,
  },
  listHeaderTextTitle: {
    fontSize: 14,
    fontFamily: FONT_NAMES.INTER_REGULAR,
    color: APP_COLOR.LIGHT_GREY,
  },
  itemView: {
    marginVertical: '2%',
    marginHorizontal: '5%',
    borderBottomWidth: 0.2,
    borderColor: APP_COLOR.LIGHT_GREY,
    paddingBottom: '5%',
  },
  emptyView: {
    alignItems: 'center',
    paddingVertical: '5%',
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
  headerText: {
    fontFamily: FONT_NAMES.INTER_SEMIBOLD,
    textAlign: 'center',
    color: APP_COLOR.MAIN_DARK,
    fontSize: 24,
    marginVertical: '5%',
  },
});
