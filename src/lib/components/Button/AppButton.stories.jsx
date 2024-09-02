import React from 'react';
import { View } from 'react-native';

import AppButton from './AppButton';

// Meta configuration for Storybook stories of the AppButton component
const AppButtonMeta = {
  title: 'Button',
  component: AppButton,
  argTypes: {
    onPress: { action: 'pressed the button' },
  },
  args: {
    label: 'Story Button',
    loading: false,
  },
  decorators: [
    (Story) => (
      <View style={{ justifyContent: 'center', flex: 1 }}>
        <Story />
      </View>
    ),
  ],
};

export default AppButtonMeta;

// Default story configuration
export const Default = {};

// Story with only text
export const TextOnlyButton = {
  args: {
    label: 'Text Button',
  },
  argTypes: {
    onPress: { action: 'Yaay' },
  },
  parameters: {
    noBackground: true,
  },
};

// Story with a left icon
export const WithLeftIcon = {
  args: {
    label: 'With Left Icon',
    leftIcon: 'paper-plane',
  },
  argTypes: {
    onPress: { action: 'Lefty Pressed' },
  },
  parameters: {
    noBackground: true,
  },
};

// Story with a right icon
export const WithRightIcon = {
  args: {
    label: 'With Right Icon',
    rightIcon: 'user-circle-o',
  },
  argTypes: {
    onPress: { action: 'Righty Pressed' },
  },
  parameters: {
    noBackground: true,
  },
};

// Story with both left and right icons
export const WithBothIcons = {
  args: {
    label: 'With Both Icons',
    rightIcon: 'user-circle-o',
    leftIcon: 'paper-plane',
  },
  argTypes: {
    onPress: { action: 'Bothy Pressed' },
  },
  parameters: {
    noBackground: true,
  },
};
