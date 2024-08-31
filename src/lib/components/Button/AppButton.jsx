import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { ComponentProps } from 'react';
import { FontAwesome } from '@expo/vector-icons';

import { APP_COLOR } from '~core/constants/colorConstants';
import { FONT_NAMES } from '~/src/core/constants/fontConstants';

const AppButton = ({ loading, leftIcon, label, rightIcon, ...pressableProps }) => {
  const content = loading ? (
    <>
      <View style={styles.loaderWrapper}>
        <ActivityIndicator size="small" color={'white'} animating={true} />
      </View>
    </>
  ) : (
    <>
      {leftIcon && (
        <View style={styles.leftIcon}>
          <FontAwesome name={leftIcon} size={20} />
        </View>
      )}
      <Text style={styles.buttonText}>{label}</Text>
      {rightIcon && (
        <View style={styles.rightIcon}>
          <FontAwesome name={rightIcon} size={20} />
        </View>
      )}
    </>
  );

  return (
    <Pressable
      style={[styles.button, pressableProps.disabled ? styles.disabled : styles.enabled]}
      {...pressableProps}>
      {content}
    </Pressable>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: APP_COLOR.MAIN_GREEN,
    borderRadius: 8,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
    marginHorizontal: '2%',
  },
  buttonText: {
    color: APP_COLOR.MAIN_WHITE,
    fontSize: 16,
    fontFamily: FONT_NAMES.INTER_MEDIUM,
    textAlign: 'center',
  },
  loaderWrapper: {
    height: 24,
    justifyContent: 'center',
  },
  rightIcon: {
    position: 'absolute',
    right: 20,
  },
  leftIcon: {
    position: 'absolute',
    left: 20,
  },

  enabled: {
    backgroundColor: APP_COLOR.MAIN_GREEN,
  },
  disabled: {
    backgroundColor: '#A9CABC',
  },
});
