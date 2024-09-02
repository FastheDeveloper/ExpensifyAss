import { StyleSheet, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { APP_COLOR } from '~/src/core/constants/colorConstants';

// Component for a back navigation button
export const BackButton = ({ onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.backButton}>
      <Feather name="chevron-left" size={30} color={APP_COLOR.MAIN_DARK} />
    </Pressable>
  );
};
const styles = StyleSheet.create({});
