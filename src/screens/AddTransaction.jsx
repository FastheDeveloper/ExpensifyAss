import { InteractionManager, StyleSheet, Text, View, Keyboard, Pressable } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import currency from 'currency.js';

import { useTransactions } from '~providers/TransactionProvider';
import { formatDateTime } from '~lib/utils/timeUtil';
import { APP_COLOR } from '~core/constants/colorConstants';
import { BackButton } from '~components/Button/BackButton';
import { FONT_NAMES } from '~core/constants/fontConstants';
import InputField from '~/src/lib/components/InputField/InputField';
import { Calendar } from '~lib/components/Calendar/Calendar';
import { withModal } from '~core/services/modalService';
import AppButton from '~lib/components/Button/AppButton';
import { handleAmountBlur } from '~lib/utils/fieldValidators';

// Wrap the component with modal functionality
const AddTransaction = withModal(({ openModal, closeModal }) => {
  const { top, bottom } = useSafeAreaInsets();
  const { addTransaction } = useTransactions();
  const navigation = useNavigation();
  const now = new Date();
  const formattedDateTime = formatDateTime(now);
  const [date, setDate] = useState(formattedDateTime.split(' ')[0]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [edittedAmount, setEdittedAmount] = useState(0);
  const [taskDetails, setTaskDetails] = useState({
    amount: 0,
    merchant: '',
    inserted: formattedDateTime,
    created: date,
    currency: 'USD',
    transactionID: '',
  });

  // Listen to keyboard visibility changes
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () =>
      setIsKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
      setIsKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Update edited amount when taskDetails.amount changes
  useEffect(() => {
    setEdittedAmount(taskDetails.amount);
  }, [taskDetails.amount]);

  // Generate transactionID based on amount and merchant
  useEffect(() => {
    // Compute and update transactionID once taskDetails is set(LOCAL USE CASE)
    const transactionID = `${taskDetails.amount}${taskDetails.merchant}_${Date.now()}`;
    setTaskDetails((prevState) => ({
      ...prevState,
      transactionID: transactionID,
    }));
  }, [taskDetails.amount, taskDetails.merchant]);

  // Validate amount on blur
  useEffect(() => {
    handleAmountBlur(taskDetails.amount, setErrorMessage);
  }, [taskDetails.amount]);

  // Clear error message and hide error on input focus
  const handleInputFocus = () => {
    handleChange('amount', Number(''));
    setErrorMessage('');
    setShowError(false);
  };

  // Close the modal and navigate to HomeScreen
  const handleClose = useCallback(() => {
    closeModal?.();
    InteractionManager.runAfterInteractions(() => {
      navigation?.navigate('HomeScreen');
    });
  }, []);

  // Add transaction
  const handleAddTransaction = async (item) => {
    setLoading(true);
    await addTransaction(item, handleClose);
  };

  // Handle date change from calendar modal
  const taskCreatedDate = (date) => {
    handleChange('created', date?.dateString);
  };

  // Format amount as currency
  const formatCurrency = (value) => {
    // Format the value as currency, ensuring it is treated as a currency
    return currency(value || 0, { precision: 2, symbol: '' }).format();
  };

  // Update taskDetails with changed value
  const handleChange = (name, value) => {
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Open calendar modal for date selection
  function OpenVerifyModal() {
    openModal?.(<Calendar onDateSelected={taskCreatedDate} />, {
      transparent: true,
      animationType: 'none',
    });
  }

  // Format amount on blur and show error
  const handleBlurFormat = () => {
    setEdittedAmount((edittedAmount) => {
      if (edittedAmount !== 0) {
        return formatCurrency(edittedAmount);
      }
    });
    setShowError(true);
  };

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: APP_COLOR.MAIN_WHITE }}
      scrollEnabled={isKeyboardVisible}
      showsVerticalScrollIndicator={false}>
      <View style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}>
        <View style={styles.headerView}>
          <BackButton onPress={() => navigation?.goBack()} />
          <Text style={styles.headerText}>Add Transaction</Text>
        </View>
        <View style={styles.contentView}>
          <View>
            <InputField
              label={'Amount'}
              onChangeText={(text) => handleChange('amount', Number(text))}
              keyboardType="numeric"
              onBlur={handleBlurFormat}
              onFocus={handleInputFocus}
              leftIcon={'dollar'}
              value={edittedAmount}
            />

            {errorMessage && showError && <Text style={styles.amountError}>{errorMessage}</Text>}
          </View>
          <InputField label={'Merchant'} onChangeText={(text) => handleChange('merchant', text)} />

          <Pressable onPress={OpenVerifyModal}>
            <Text style={styles.label}>Date</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.input}>{taskDetails.created}</Text>
            </View>
          </Pressable>
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
    </KeyboardAwareScrollView>
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
  inputContainer: {
    justifyContent: 'center',
    height: 52,
    marginTop: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0.3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: APP_COLOR.LIGHT_GREY,
    paddingLeft: '2%',
    marginHorizontal: '2%',
  },
  input: {
    paddingHorizontal: '2%',
    color: APP_COLOR.MAIN_DARK,
    fontFamily: FONT_NAMES.INTER_MEDIUM,
  },
  label: {
    fontSize: 16,
    fontFamily: FONT_NAMES.INTER_MEDIUM,
    marginVertical: 4,
    color: APP_COLOR.MAIN_GREY,
    marginHorizontal: '2%',
  },
});
