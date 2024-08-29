import { Keyboard, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AppIcon from '~lib/assets/appIcon';
import AppName from '~lib/assets/appName';
import { APP_COLOR } from '~core/constants/colorConstants';
import InputField from '~components/InputField/InputField';
import AppButton from '~components/Button/AppButton';
import { CheckBox } from '~/src/lib/components/CheckBox/CheckBox';
import { FONT_NAMES } from '~core/constants/fontConstants';
import { validateEmail, allFieldsFilled, handleEmailBlur } from '~lib/utils/fieldValidators';

const LoginScreen = () => {
  const { top, bottom, left } = useSafeAreaInsets();
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
    isSelected: false,
  });
  const [errorMessage, setErrorMessage] = useState('');

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

  const isFormValid = () => {
    return validateEmail(userDetails.email) && allFieldsFilled(userDetails);
  };

  const handleChange = (name, value) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleInputFocus = () => {
    setErrorMessage('');
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
            onBlur={() => handleEmailBlur(userDetails.email, setErrorMessage)}
            onFocus={handleInputFocus}
          />
          {errorMessage && <Text style={styles.emailError}>{errorMessage}</Text>}
          <InputField
            placeholder={'Password'}
            secureTextEntry
            onChangeText={(text) => handleChange('password', text)}
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
          <AppButton label={'Sign in'} disabled={!isFormValid()} />
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
    marginVertical: '2%',
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
