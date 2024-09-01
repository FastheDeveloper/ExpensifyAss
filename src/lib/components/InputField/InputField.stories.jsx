import React from 'react';
import { View } from 'react-native';

import InputField from './InputField';

const InputFieldMeta = {
  title: 'Input Field',
  component: InputField,
  argTypes: {},
  args: {
    label: 'Story Input',
  },
  decorators: [
    (Story) => (
      <View style={{ justifyContent: 'center', flex: 1 }}>
        <Story />
      </View>
    ),
  ],
};

export default InputFieldMeta;

export const Default = {};

export const PasswordInput = {
  args: {
    secureTextEntry: true,
  },
};

export const LeftIconInput = {
  args: {
    leftIcon: 'user-circle',
  },
};

export const RightIconInput = {
  args: {
    rightIcon: 'star',
  },
};

export const SafetyIconWithSecure = {
  args: {
    rightIcon: 'star',
    secureTextEntry: true,
  },
};
