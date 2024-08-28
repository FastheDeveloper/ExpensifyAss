import { Pressable, Text, TextInput, View, StyleSheet } from 'react-native';
import React, { ComponentProps, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';

const InputField = ({ leftIcon, label, rightIcon, ...inputProps }) => {
  const [hide, setHide] = useState(true);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputContainer}>
        {leftIcon && (
          <View style={styles.leftIcon} testID="left-icon">
            <FontAwesome name={leftIcon} size={20} />
          </View>
        )}

        <TextInput
          style={[
            styles.input,
            rightIcon || inputProps.secureTextEntry
              ? styles.inputWithRightIcon
              : styles.inputFullWidth,
          ]}
          {...inputProps}
          secureTextEntry={inputProps.secureTextEntry && !rightIcon ? hide : undefined}
          testID="text-input"
        />

        {(rightIcon || inputProps.secureTextEntry) && (
          <View style={styles.rightIcon}>
            <Pressable onPress={() => (rightIcon ? null : setHide(!hide))} testID="passwordTest">
              <FontAwesome
                name={
                  rightIcon ||
                  (inputProps.secureTextEntry && (hide ? 'eye' : 'eye-slash')) ||
                  undefined
                }
                size={20}
              />
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
  },
  label: {
    fontSize: 18, // text-lg
    fontWeight: 'bold', // font-bold
    marginBottom: 8, // mb-2
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    marginTop: 8, // mt-2
    borderRadius: 16, // rounded-xl
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#D1D5DB', // border-APP_COLOR-MAIN_GREY
  },
  leftIcon: {
    marginLeft: 8, // ml-2
  },
  input: {
    height: 52,
    paddingHorizontal: '2%', // px-[2%]
  },
  inputFullWidth: {
    width: '100%',
  },
  inputWithRightIcon: {
    width: '85%',
  },
  rightIcon: {
    marginRight: 8, // mr-2
  },
});
