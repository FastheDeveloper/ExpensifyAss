import { InteractionManager, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useTransactions } from '~providers/TransactionProvider';
import { formatDateTime } from '~lib/utils/timeUtil';
import { APP_COLOR } from '~core/constants/colorConstants';
import { BackButton } from '~components/Button/BackButton';
import { FONT_NAMES } from '~core/constants/fontConstants';
import InputField from '~lib/components/InputField/InputField';
import { Calendar } from '~lib/components/Calendar/Calendar';
import { withModal } from '~core/services/modalService';
import AppButton from '~lib/components/Button/AppButton';
import { handleAmountBlur } from '~lib/utils/fieldValidators';

const AddTransaction = withModal(({ openModal, closeModal }) => {
  const { top, bottom, left } = useSafeAreaInsets();
  const { addTransaction, loadingTransaction } = useTransactions();
  const navigation = useNavigation();
  const now = new Date();
  const formattedDateTime = formatDateTime(now);
  const [date, setDate] = useState(formattedDateTime.split(' ')[0]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [taskDetails, setTaskDetails] = useState({
    amount: 0,
    merchant: '',
    inserted: formattedDateTime,
    created: date,
    currency: 'USD',
    transactionID: '',
  });

  useEffect(() => {
    // Compute and update transactionID once taskDetails is set
    const transactionID = `${taskDetails.amount}${taskDetails.merchant}_${Date.now()}`;
    setTaskDetails((prevState) => ({
      ...prevState,
      transactionID: transactionID,
    }));
  }, [taskDetails.amount, taskDetails.merchant]); // Dependencies to recalculate if these values change

  useEffect(() => {
    handleAmountBlur(taskDetails.amount, setErrorMessage);
  }, [taskDetails.amount]);

  const handleInputFocus = () => {
    setErrorMessage('');
    setShowError(false);
  };

  const handleClose = useCallback(() => {
    closeModal?.();
    InteractionManager.runAfterInteractions(() => {
      navigation?.navigate('HomeScreen');
    });
  }, []);

  const handleAddTransaction = async (item) => {
    setLoading(true);
    await addTransaction(item, handleClose);
  };

  const taskCreatedDate = (date) => {
    handleChange('created', date?.dateString);
  };

  const handleChange = (name, value) => {
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  function OpenVerifyModal() {
    openModal?.(<Calendar onDateSelected={taskCreatedDate} />, {
      transparent: true,
      animationType: 'none',
    });
  }

  return (
    <View style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}>
      <View style={styles.headerView}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={styles.headerText}>Add Transaction</Text>
      </View>
      <View style={styles.contentView}>
        <View>
          <InputField
            label={'Amount'}
            onChangeText={(text) => handleChange('amount', Number(text))}
            keyboardType="numeric"
            onBlur={() => setShowError(true)}
            onFocus={handleInputFocus}
          />

          {errorMessage && showError && <Text style={styles.amountError}>{errorMessage}</Text>}
        </View>
        <InputField label={'Merchant'} onChangeText={(text) => handleChange('merchant', text)} />

        <InputField
          label={'Date'}
          editable={false}
          value={taskDetails.created}
          onPress={OpenVerifyModal}
        />
      </View>
      <AppButton
        label={'Add Transaction'}
        disabled={!Number(taskDetails.amount) || !taskDetails.merchant}
        onPress={() => {
          handleAddTransaction(taskDetails);
        }}
        loading={loading}
      />
    </View>
  );
});

export default AddTransaction;

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
  contentView: {
    marginVertical: '8%',
    gap: 10,
  },
  amountError: {
    color: APP_COLOR.MAIN_RED,
    paddingHorizontal: '2%',
    fontFamily: FONT_NAMES.INTER_REGULAR,
    fontSize: 12,
  },
});
