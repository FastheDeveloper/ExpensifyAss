import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { APP_COLOR } from '~/src/core/constants/colorConstants';

// CheckBox component to toggle selection state
export const CheckBox = ({ onPress, selected }) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: selected ? APP_COLOR.MAIN_GREEN : 'white',
      borderRadius: 30,
      borderWidth: 1,
      borderColor: '#D3D8FF',
      width: 20,
      height: 20,
      borderRadius: 3,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress()} activeOpacity={0.8}>
      {selected && <FontAwesome name="check" size={15} color={APP_COLOR.MAIN_WHITE} />}
    </TouchableOpacity>
  );
};
