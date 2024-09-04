import { Keyboard, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import AppIcon from '~lib/assets/svgs/appIcon';
import AppName from '~lib/assets/svgs/appName';
import { APP_COLOR } from '~core/constants/colorConstants';
import InputField from '~/src/lib/components/InputField/InputField';
import AppButton from '~components/Button/AppButton';
import { CheckBox } from '~/src/lib/components/CheckBox/Checkbox';
import { FONT_NAMES } from '~core/constants/fontConstants';
import { validateEmail, allFieldsFilled, handleEmailBlur } from '~lib/utils/fieldValidators';
import { useAuth } from '~providers/AuthProvider';

const LoginScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
  const { authenticateUser, loading } = useAuth();
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
    isSelected: false,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);

  // Listeners for keyboard visibility to adjust layout
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

  // Validate email when it changes
  useEffect(() => {
    handleEmailBlur(userDetails.email, setErrorMessage);
  }, [userDetails.email]);

  // Form validation function
  const isFormValid = () => {
    return validateEmail(userDetails.email) && allFieldsFilled(userDetails);
  };

  // Handler for input changes
  const handleChange = (name, value) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Reset error messages when an input field is focused
  const handleInputFocus = () => {
    setErrorMessage('');
    setShowError(false);
  };

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: APP_COLOR.MAIN_WHITE }}
      scrollEnabled={isKeyboardVisible}
      showsVerticalScrollIndicator={false}>
      <View style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}>
        <View style={styles.header}>
          <AppIcon height={95} width={96} />
          <AppName height={38} width={164} />
        </View>
        <View>
          <InputField
            placeholder={'Email Address'}
            onChangeText={(text) => handleChange('email', text)}
            onBlur={() => setShowError(true)}
            onFocus={handleInputFocus}
            keyboardType="email-address"
            label={'\u200B'}
          />
          {errorMessage && showError && <Text style={styles.emailError}>{errorMessage}</Text>}
          <InputField
            placeholder={'Password'}
            secureTextEntry
            onChangeText={(text) => handleChange('password', text)}
            label={'\u200B'}
          />
        </View>
        <View style={[styles.outerRow]}>
          <View style={styles.row}>
            <CheckBox
              onPress={() =>
                setUserDetails({ ...userDetails, isSelected: !userDetails.isSelected })
              }
              selected={userDetails.isSelected}
            />
            <Text style={styles.textStyle}>Rememeber me</Text>
          </View>
          <Text style={[styles.textStyle, { color: APP_COLOR.MAIN_GREEN }]}>Forgot password?</Text>
        </View>
        <View style={styles.buttonView}>
          <AppButton
            label={'Sign in'}
            disabled={!isFormValid()}
            onPress={() => authenticateUser(userDetails)}
            loading={loading}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLOR.MAIN_WHITE,
    paddingHorizontal: '3%',
  },
  header: {
    alignItems: 'center',
    marginTop: '15%',
    marginBottom: '10%',
  },
  outerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '2%',
    alignItems: 'center',
    marginVertical: '5%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonView: {
    flex: 1,
    paddingTop: '30%',
  },
  textStyle: {
    fontFamily: FONT_NAMES.INTER_REGULAR,
    fontSize: 12,
    marginLeft: '2%',
    color: APP_COLOR.MAIN_GREY,
  },
  emailError: {
    color: APP_COLOR.MAIN_RED,
    paddingHorizontal: '2%',
    fontFamily: FONT_NAMES.INTER_REGULAR,
    fontSize: 12,
  },
});
