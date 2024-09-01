import { Fragment } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { BackButton } from '~components/Button/BackButton';
import HomeScreen from 'src/screens/HomeScreen';
import LoginScreen from 'src/screens/LoginScreen';
import AddTransaction from 'src/screens/AddTransaction';
import AllTransactionList from 'src/screens/AllTransactionList';
import TransactionDetailScreen from 'src/screens/TransactionDetailScreen';
import { useAuth } from '~providers/AuthProvider';

const Stack = createStackNavigator();
const options = {
  headerShown: false,
};

export default function StackNavigator() {
  const { isAuthenticated } = useAuth();

  const renderApp = () => {
    const list = [
      {
        cond: !isAuthenticated,
        node: (
          <Fragment>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
          </Fragment>
        ),
      },
      {
        cond: true,
        node: (
          <Fragment>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="AddTransaction" component={AddTransaction} />
            <Stack.Screen name="AllTransactionList" component={AllTransactionList} />
            <Stack.Screen name="TransactionDetailScreen" component={TransactionDetailScreen} />
          </Fragment>
        ),
      },
    ];

    return list.find(({ cond }) => !!cond)?.node;
  };
  return <Stack.Navigator screenOptions={options}>{renderApp()}</Stack.Navigator>;
}
