import { Fragment, useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NetInfo from '@react-native-community/netinfo';

import HomeScreen from 'src/screens/HomeScreen';
import LoginScreen from 'src/screens/LoginScreen';
import AddTransaction from 'src/screens/AddTransaction';
import AllTransactionList from 'src/screens/AllTransactionList';
import TransactionDetailScreen from 'src/screens/TransactionDetailScreen';
import NoInternet from 'src/screens/NoInternet';
import Onboarding from '~/src/screens/Onboarding';

import { useAuth } from '~providers/AuthProvider';

const Stack = createStackNavigator();
const options = {
  headerShown: false,
};

export default function StackNavigator() {
  const { isAuthenticated, hasBeenUsed } = useAuth();
  const [isOffline, setIsOffline] = useState(false);

  // Setting up a NetInfo listener to track network connectivity
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOffline(!state.isConnected);
    });

    // Cleanup function to remove the NetInfo listener on component unmount
    return () => {
      unsubscribe();
    };
  });

  // Function to determine which screens to render based on conditions
  const renderApp = () => {
    // Array of conditional screen configurations
    const list = [
      {
        cond: isOffline,
        node: (
          <Fragment>
            <Stack.Screen name={'NoInternet'} component={NoInternet} />
          </Fragment>
        ),
      },
      {
        cond: !hasBeenUsed,
        node: (
          <Fragment>
            <Stack.Screen name={'Onboarding'} component={Onboarding} />
          </Fragment>
        ),
      },
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

    // Return the first node where condition is true
    return list.find(({ cond }) => !!cond)?.node;
  };

  // Render the Stack Navigator with the appropriate screens
  return <Stack.Navigator screenOptions={options}>{renderApp()}</Stack.Navigator>;
}
