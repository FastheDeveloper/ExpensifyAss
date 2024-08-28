import { View } from 'react-native';

import React from 'react';
import { CheckBox } from './Checkbox';

const CheckButton = {
  title: 'CheckBox',
  component: CheckBox,
  argTypes: {
    onPress: { action: 'pressed the button' },
  },
  args: {
    selected: true,
  },
  decorators: [
    (Story) => (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Story />
      </View>
    ),
  ],
};

export default CheckButton;

export const SelectedButton = {};

export const unselectedButton = {
  args: {
    selected: false,
  },
};
