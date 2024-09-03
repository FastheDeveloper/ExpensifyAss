import { Fragment } from 'react';
import { Platform, StyleSheet, View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Entypo from '@expo/vector-icons/Entypo';

import { APP_COLOR } from '~core/constants/colorConstants';
import { withModal } from '~core/services/modalService';
import { FONT_NAMES } from '~/src/core/constants/fontConstants';

// Modal component for displaying login authentication status
export const LoginModal = withModal(({ closeModal, text, isError, auth, errorTitle }) => {
  const insets = useSafeAreaInsets();

  // Calculate top margin based on the platform and safe area insets
  const marginTop = Platform.select({
    ios: 115 + insets.top,
    android: 115 + insets.top,
    default: 0,
  });

  return (
    <Fragment>
      <Pressable style={s.root} onPress={auth}>
        <View style={[s.container, { marginVertical: marginTop * 1.3, marginHorizontal: '10%' }]}>
          <View
            style={[
              s.topView,
              { backgroundColor: isError ? APP_COLOR.MAIN_RED : APP_COLOR.MAIN_GREEN },
            ]}>
            <Entypo name={isError ? 'cross' : 'check'} size={80} color={APP_COLOR.MAIN_WHITE} />
            {isError && <Text style={s.typeText}>Authentication failed</Text>}
          </View>
          <View style={s.bottomView}>
            <Text style={s.headerText}>{!isError ? 'Successful' : errorTitle}</Text>

            <Text style={s.descriptionText}>{text}</Text>
            <Text style={s.close} onPress={auth}>
              Login
            </Text>
          </View>
        </View>
      </Pressable>
    </Fragment>
  );
});

const s = StyleSheet.create({
  border: {
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
  },
  root: {
    flex: 1,
    backgroundColor: 'rgba(226, 226, 226, 0.8)',
  },
  container: {
    flex: 1,
    backgroundColor: APP_COLOR.MAIN_WHITE,
    borderRadius: 26,

    overflow: 'hidden',
  },
  topView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  bottomView: {
    marginTop: '5%',
    marginHorizontal: '12%',
    flex: 1,
    backgroundColor: APP_COLOR.MAIN_WHITE,
  },
  typeText: {
    fontFamily: FONT_NAMES.INTER_SEMIBOLD,
    textAlign: 'center',
    color: APP_COLOR.MAIN_WHITE,
    fontSize: 30,
  },
  descriptionText: {
    fontFamily: FONT_NAMES.INTER_REGULAR,
    textAlign: 'center',
    color: APP_COLOR.MAIN_DARK,
    fontSize: 14,
    marginBottom: '5%',
  },
  headerText: {
    fontFamily: FONT_NAMES.INTER_SEMIBOLD,
    textAlign: 'center',
    color: APP_COLOR.MAIN_DARK,
    fontSize: 24,
    marginBottom: '5%',
  },
  close: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: APP_COLOR.ACCENT_GREEN,
    textAlign: 'center',
    fontFamily: FONT_NAMES.INTER_SEMIBOLD,
    textAlign: 'center',
    color: APP_COLOR.LIGHT_GREY,
    fontSize: 16,
    marginVertical: '5%',

    padding: '5%',
  },
});
