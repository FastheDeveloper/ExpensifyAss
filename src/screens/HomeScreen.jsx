import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useState, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '~providers/AuthProvider';
import { useTransactions } from '~providers/TransactionProvider';
import UserIcon from '~lib/assets/userIcon';
import { APP_COLOR } from '~core/constants/colorConstants';
import { getGreeting, formatDateTime } from '~lib/utils/timeUtil';
import { FONT_NAMES } from '../core/constants/fontConstants';

import TaskList from '~components/TaskList/TaskList';
const HomeScreen = () => {
  const { top, bottom, left } = useSafeAreaInsets();
  const { logout } = useAuth();
  const { addTransaction, fetchAllTransactions, setLoadingTransactions } = useTransactions();
  const navigation = useNavigation();
  const now = new Date();
  const formattedDateTime = formatDateTime(now);

  useEffect(() => {
    const getTransaction = async () => {
      await fetchAllTransactions();
    };
    getTransaction();
  }, []);

  return (
    <View style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}>
      {/* <Text onPress={() => logout()}>xc</Text> */}
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <UserIcon height={45} width={50} />
        </View>
        <Text style={styles.headerText}>Hello, Good {getGreeting()}</Text>
      </View>
      <Pressable
        style={styles.addTransaction}
        onPress={() => navigation.navigate('AddTransaction')}>
        <Entypo name="circle-with-plus" size={24} color={APP_COLOR.MAIN_GREEN} />
        <Text style={styles.addText}>Add Transaction</Text>
      </Pressable>

      <TaskList />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLOR.MAIN_WHITE,
    paddingHorizontal: '5%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '1%',
  },
  headerIcon: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: APP_COLOR.LIGHT_GREY,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '3%',
    width: 60,
    height: 60,
  },
  headerText: {
    fontFamily: FONT_NAMES.INTER_MEDIUM,
    fontSize: 16,
  },
  addTransaction: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: '4%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    // borderWidth: 0.2,
    borderColor: APP_COLOR.LIGHT_GREY,
    borderRadius: 8,
    backgroundColor: APP_COLOR.MAIN_WHITE,
    // marginBottom: '1%',
    marginTop: '5%',
  },
  addText: {
    fontFamily: FONT_NAMES.INTER_MEDIUM,
    fontSize: 16,
    color: APP_COLOR.MAIN_GREEN,
    marginLeft: '2%',
  },
});
