import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { APP_COLOR } from '~/src/core/constants/colorConstants';
import { FONT_NAMES } from '~/src/core/constants/fontConstants';
import NoInternetSvg from '~lib/assets/noInternetIcon';

// This component displays a message and an icon when the device has no internet connection.
const NoInternet = () => {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}>
      <NoInternetSvg height={280} width={280} />
      <Text style={styles.noInternetText}>
        Oops, looks like your connection dropped. Check your network and try again.
      </Text>
    </View>
  );
};

export default NoInternet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLOR.MAIN_WHITE,
    paddingHorizontal: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noInternetText: {
    fontFamily: FONT_NAMES.INTER_SEMIBOLD,
    textAlign: 'center',
    color: APP_COLOR.MAIN_DARK,
    fontSize: 24,
  },
});
