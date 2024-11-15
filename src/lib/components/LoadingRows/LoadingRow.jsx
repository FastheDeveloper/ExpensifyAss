import React from 'react';
import { useState, useEffect } from 'react';
import { Animated, View, Easing, StyleSheet } from 'react-native';

import { APP_COLOR } from '~/src/core/constants/colorConstants';

// Component that animates a glowing effect on its children
const GlowView = ({ style, children }) => {
  const [glowAnim] = useState(new Animated.Value(0.3));

  useEffect(() => {
    // Looping animation sequence for the glow effect
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.3,
          duration: 1500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={{
        ...style,
        opacity: glowAnim,
      }}>
      {children}
    </Animated.View>
  );
};

// Component that uses GlowView to show a loading animation
export const LoadingRow = () => (
  <View style={styles.container}>
    <GlowView>
      <View style={styles.loadingItem}>
        <View style={styles.glowView} />
      </View>
    </GlowView>
  </View>
);

export const styles = StyleSheet.create({
  loadingItem: {
    paddingHorizontal: 10,
  },
  glowView: {
    borderColor: '#eee',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: APP_COLOR.LIGHT_GREY,
    color: 'transparent',
    height: 60,
    width: '100%',
  },
  container: {
    paddingHorizontal: 10,
    paddingVertical: '2%',
    width: '100%',
  },
});
