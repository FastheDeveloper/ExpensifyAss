import React from 'react';
import { View } from 'react-native';

import InputField from './InputField';

// Meta configuration for Storybook stories of the InputField component
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

// Story configuration for the input field with default settings
export const Default = {};

// Story configuration for a password input field
export const PasswordInput = {
  args: {
    secureTextEntry: true,
  },
};

// Story configuration for an input field with a left icon
export const LeftIconInput = {
  args: {
    leftIcon: 'user-circle',
  },
};

// Story configuration for an input field with a right icon
export const RightIconInput = {
  args: {
    rightIcon: 'star',
  },
};

// Story configuration for an input field with both a right icon and secure text entry
export const SafetyIconWithSecure = {
  args: {
    rightIcon: 'star',
    secureTextEntry: true,
  },
};
