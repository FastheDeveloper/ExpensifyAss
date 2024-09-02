import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { BackButton } from '~components/Button/BackButton';
import { APP_COLOR } from '~/src/core/constants/colorConstants';
import { FONT_NAMES } from '~/src/core/constants/fontConstants';
import { formatDateDisplay } from '~lib/utils/timeUtil';
const TransactionDetailScreen = ({ route }) => {
  const { item } = route.params;
  const { top, bottom, left } = useSafeAreaInsets();
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
  return (
    <View style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}>
      <View style={styles.headerView}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={styles.headerText}>Transaction Details</Text>
      </View>
      <View style={styles.detailView}>
        <View style={styles.outerBorder}>
          <View style={styles.innerBorder}>
            <Text style={styles.titleText}>Amount</Text>
            <Text
              style={[
                styles.amount,
                { color: item.amount < 0 ? APP_COLOR.MAIN_RED : APP_COLOR.MAIN_GREEN },
              ]}>
              {formatAmount(item.amount, item.currency)}
            </Text>
          </View>
          <View style={styles.border} />
          <View style={styles.innerBorder}>
            <Text style={styles.titleText}>Card Name</Text>
            <Text numberOfLines={1} ellipsizeMode="middle" style={styles.merchantText}>
              {item.cardName || '_ _ _'}
            </Text>
          </View>
        </View>

        <View style={styles.outerBorder}>
          <View style={styles.innerBorder}>
            <Text style={styles.titleText}>Merchant</Text>
            <Text numberOfLines={1} ellipsizeMode="middle" style={styles.merchantText}>
              {item.merchant}
            </Text>
          </View>
          <View style={styles.border} />
          <View style={styles.innerBorder}>
            <Text style={styles.titleText}>Transaction Date</Text>
            <Text numberOfLines={1} ellipsizeMode="middle" style={styles.merchantText}>
              {formatDateDisplay(item.inserted) || '_ _ _'}
            </Text>
          </View>
          <View style={styles.border} />
          <View style={styles.innerBorder}>
            <Text style={styles.titleText}>Card ID</Text>
            <Text numberOfLines={1} ellipsizeMode="middle" style={styles.merchantText}>
              {item.cardID || '_ _ _'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TransactionDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLOR.MAIN_WHITE,
    paddingHorizontal: '5%',
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
  detailView: {
    flex: 1,
    paddingTop: '10%',
    gap: 30,
  },
  outerBorder: {
    borderWidth: 0.5,
    borderColor: APP_COLOR.LIGHT_GREY,
    borderRadius: 8,
    padding: '2%',
  },
  titleText: {
    fontSize: 14,
    color: APP_COLOR.MAIN_GREY_TEXT,
    fontFamily: FONT_NAMES.INTER_REGULAR,
  },
  amount: {
    fontFamily: FONT_NAMES.INTER_MEDIUM,
    fontSize: 16,
  },
  innerBorder: {
    gap: 10,
    flexShrink: 1,
  },
  merchantText: {
    fontFamily: FONT_NAMES.INTER_MEDIUM,
    fontSize: 16,
    color: APP_COLOR.MAIN_DARK,
    // marginBottom: '5%',
  },
  border: {
    backgroundColor: APP_COLOR.LIGHT_GREY,
    height: 0.5,
    marginVertical: '3%',
  },
});
