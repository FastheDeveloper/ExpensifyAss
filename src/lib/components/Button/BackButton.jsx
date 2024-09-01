import { Text, View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

export const BackButton = ({ onPress }) => {
  return (
    <View style={styles.backButton}>
      <Feather name="chevron-left" size={16} color="#007AFF" />
      <Text style={styles.backButtonText} onPress={onPress}>
        Back
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  backButton: {
    flexDirection: 'row',
    paddingLeft: 20,
  },
  backButtonText: {
    color: '#007AFF',
    marginLeft: 4,
  },
});
