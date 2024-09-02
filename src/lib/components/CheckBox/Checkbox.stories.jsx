import { View } from 'react-native';
import React from 'react';

import { CheckBox } from './Checkbox';

// Meta configuration for Storybook stories of the CheckBox component
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

// Story configuration for the checkbox in its selected state
export const SelectedButton = {};

// Story configuration for the checkbox in its unselected state
export const unselectedButton = {
  args: {
    selected: false,
  },
};
