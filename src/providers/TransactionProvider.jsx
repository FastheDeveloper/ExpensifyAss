import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { ActivityIndicator, Alert, InteractionManager } from 'react-native';
import axios from 'axios';
import { API_ROUTES } from '~core/constants/apiRoutes';
import { STORAGE_KEYS } from '~core/constants/asyncKeys';
import { withModal } from '~core/services/modalService';
import { sortTransactionsByInsertedDate } from '~lib/utils/greetingUtil';
import { Modal } from '~lib/components/Modal/Modal';
import { LoginModal } from '~lib/components/Modal/LoginModal';

import { useAuth } from './AuthProvider';

const TransactionContext = createContext();

function TransactionProvider({ children, openModal, closeModal }) {
  const [transactionList, setTransactionList] = useState([]);
  const [filteredTransactionList, setFilteredTransactionList] = useState([]);
  const [loadingTransaction, setLoadingTransactions] = useState(false);
  const { authToken, logout } = useAuth();
  const sortedTransactions = useMemo(() => {
    return sortTransactionsByInsertedDate([...transactionList]);
  }, [transactionList]);

  const handleVerify = useCallback(() => {
    closeModal?.();
    InteractionManager.runAfterInteractions(() => {
      logout();
    });
  }, []);
  useEffect(() => {
    // Update filteredTransactionList only when sortedTransactions changes
    setFilteredTransactionList(sortedTransactions);
    // setLoadingTransactions(false);
  }, [sortedTransactions]);

  const addTransaction = (newTransaction) => {
    console.log('Adding');
    // setLoadingTransactions(true);
    setTransactionList((prevList) => [...prevList, newTransaction]);
  };

  const handleAuthResponse = async (res) => {
    console.log(res.data);
    if (res.data.jsonCode === 200) {
      setTransactionList(res.data?.transactionList);
      return true;
    } else if (res.data.jsonCode === 407) {
      openModal?.(<LoginModal text={'Please Login again'} isError auth={handleVerify} />, {
        transparent: true,
        animationType: 'none',
      });
    } else {
      const errorMessage = 'Something went wrong';
      openModal?.(<Modal text={errorMessage} isError />, {
        transparent: true,
        animationType: 'none',
      });

      return false;
    }
  };

  const sendTransactionToServer = () => {};

  const fetchAllTransactions = async () => {
    console.log('Fetching');

    try {
      setLoadingTransactions(true);
      const res = await axios.get(
        `${process.env.EXPO_PUBLIC_BASE_API_URL}${API_ROUTES.GET_ALL_TRANSACTIONS}?authToken=${authToken}&returnValueList=transactionList`
      );
      handleAuthResponse(res);
    } catch (err) {
      openModal?.(<Modal text={'Something went wrong'} isError />, {
        transparent: true,
        animationType: 'none',
      });
    } finally {
      setLoadingTransactions(false);
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        transactionList,
        setTransactionList,
        loadingTransaction,
        filteredTransactionList,
        addTransaction,
        fetchAllTransactions,
      }}>
      {children}
    </TransactionContext.Provider>
  );
}

export default withModal(TransactionProvider);
export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useAuth must be used within a TransactionProvider');
  }
  return context;
};
