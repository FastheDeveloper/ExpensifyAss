import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInLeft, SlideInLeft, SlideOutRight } from 'react-native-reanimated';

import { APP_COLOR } from '~/src/core/constants/colorConstants';
import { FONT_NAMES } from '~/src/core/constants/fontConstants';
import { useAuth } from '~providers/AuthProvider';
import { save } from '~lib/utils/secureStorage';
import { STORAGE_KEYS } from '~core/constants/asyncKeys';
import OnBoardOne from '~lib/assets/svgs/onBoardOne';
import OnBoardTwo from '~lib/assets/svgs/onBoardTwo';
import OnboardThree from '~lib/assets/svgs/onBoardThree';
import AppButton from '../lib/components/Button/AppButton';

// Array of onboarding steps, each containing an icon, title, and description
const onboardingSteps = [
  {
    icon: <OnBoardOne width={250} height={244} />,
    title: 'Send Invoices & Pay Bills',
    description: ' Streamline your finances with easy invoicing and bill payments. ',
  },
  {
    icon: <OnBoardTwo width={244} height={244} />,
    title: 'Access Corporate Cards',
    description: " Manage your company's cards and track spending effortlessly.",
  },
  {
    icon: <OnboardThree width={244} height={244} />,
    title: 'Track Receipt & Manage Expenses',
    description: ' Keep your spending organized and under control.',
  },
];

const Onboarding = () => {
  const { top, bottom } = useSafeAreaInsets();
  const { setHasBeenUsed } = useAuth();

  // State to track the current onboarding step
  const [step, setStep] = useState(0);
  const data = onboardingSteps[step]; // Get the current step data

  // Move to the next step or finish onboarding
  const onContinue = () => {
    const isLastScreen = step === onboardingSteps.length - 1;
    if (isLastScreen) {
      endOnboarding();
    } else {
      setStep(step + 1);
    }
  };

  // Mark onboarding as completed and save the state
  const endOnboarding = async () => {
    try {
      setHasBeenUsed(true);
      await save(STORAGE_KEYS.HAS_APP_BEEN_USED, 'true');
    } catch (err) {}
  };

  return (
    <View style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}>
      <View style={styles.onboardingView}>
        {data.icon}
        <Animated.Text entering={SlideInLeft} exiting={SlideOutRight} style={[styles.title]}>
          {data.title}
        </Animated.Text>
        <Animated.Text entering={FadeInLeft.delay(300)} style={styles.description}>
          {data.description}
        </Animated.Text>
        <View style={styles.stepContainer}>
          {onboardingSteps.map((dat, index) => (
            <View
              key={index}
              style={[
                styles.stepIndicator,
                { backgroundColor: index === step ? APP_COLOR.MAIN_GREEN : APP_COLOR.LIGHT_GREY },
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        {step === onboardingSteps.length - 1 ? (
          <>
            <AppButton label={'Get Started'} onPress={endOnboarding} />
          </>
        ) : (
          <View style={styles.buttonRow}>
            <Text onPress={endOnboarding} style={styles.description}>
              Skip
            </Text>
            <View style={{ flex: 0.4 }}>
              <AppButton onPress={onContinue} label={'Next'} />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLOR.MAIN_WHITE,
    paddingHorizontal: '5%',
  },
  stepContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginHorizontal: '40%',
  },
  stepIndicator: {
    flex: 1,
    height: 3,
    borderRadius: 10,
    marginTop: '10%',
  },
  onboardingView: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '15%',
    gap: 10,
  },
  title: {
    fontFamily: FONT_NAMES.INTER_MEDIUM,
    fontSize: 24,
    color: APP_COLOR.MAIN_DARK,
    textAlign: 'center',
    // marginVertical: '5%',
  },
  description: {
    fontFamily: FONT_NAMES.INTER_REGULAR,
    fontSize: 14,
    color: APP_COLOR.MAIN_GREY_TEXT,
    textAlign: 'center',
    marginHorizontal: '5%',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    justifyContent: 'space-between',
  },
  footer: {
    marginBottom: '5%',
  },
});
