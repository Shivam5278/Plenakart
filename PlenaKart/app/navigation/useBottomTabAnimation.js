import {useEffect, useMemo} from 'react';
import Animated, {
  interpolateColor,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import colors from '../config/colors';

const useBottomTabAnimation = isFocused => {
  const translateY = useSharedValue(0);
  const backgroundColor = useSharedValue(0);

  const handleFocused = () => {
    translateY.value = -14;
    backgroundColor.value = withTiming(1, {
      duration: 400,
    });
  };

  const handleNotFocused = () => {
    translateY.value = 0;
    backgroundColor.value = withTiming(0);
  };

  useEffect(() => {
    if (isFocused) {
      handleFocused();
    } else {
      handleNotFocused();
    }
  }, [isFocused]);

  const animatedStyles = useMemo(
    () => ({
      transform: [
        {
          translateY: translateY.value,
        },
      ],
      height: withSpring(isFocused ? 56 : 40, {
        stiffness: 500,
        damping: 15,
      }),
      width: withSpring(isFocused ? 56 : 40, {
        stiffness: 500,
        damping: 15,
      }),

      backgroundColor: interpolateColor(
        backgroundColor.value,
        [0, 1],
        ['transparent', colors.fontDark],
      ),
    }),
    [isFocused, translateY.value, backgroundColor],
  );

  const animatedLabelStyles = useMemo(
    () => ({
      color: withTiming(isFocused ? 'transparent' : colors.fontLight, {
        duration: 200,
      }),
    }),
    [isFocused],
  );

  return {animatedStyles, animatedLabelStyles};
};

export default useBottomTabAnimation;
