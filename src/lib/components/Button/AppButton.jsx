import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { ComponentProps } from 'react';
import { APP_COLOR } from '~core/constants/colorConstants';
import { FontAwesome } from '@expo/vector-icons';

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
    borderRadius: 24,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: APP_COLOR.MAIN_WHITE,
    fontSize: 18,
    fontWeight: '700',
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
    backgroundColor: '#00FF00',
  },
});
