import AppButton from './AppButton';

import React from 'react';
import { View } from 'react-native';

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
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Story />
      </View>
    ),
  ],
};

export default AppButtonMeta;

export const Default = {};

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
