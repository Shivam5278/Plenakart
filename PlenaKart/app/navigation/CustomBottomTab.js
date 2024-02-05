import {View, StyleSheet, Pressable, Keyboard} from 'react-native';
import colors from '../config/colors';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {useEffect, useState} from 'react';
import {useWindowDimensions} from 'react-native';

function CustomBottomTab({state, descriptors, navigation}) {
  const {width} = useWindowDimensions();
  const [selectedTab, setselectedTab] = useState(0);
  const [tabBarVisible, setTabBarVisible] = useState(true);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setTabBarVisible(false);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setTabBarVisible(true);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const animatedCircleStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
      {
        translateY: translateY.value,
      },
    ],
  }));
  useEffect(() => {
    if (selectedTab == 0) {
      translateY.value = withSequence(
        withTiming(14, {duration: 200}),
        withDelay(400, withTiming(0, {duration: 200})),
      );
      translateX.value = withDelay(
        200,
        withTiming((1 * width) / 8 - 28, {duration: 200}),
      );
    } else if (selectedTab == 1) {
      translateY.value = withSequence(
        withTiming(14, {duration: 200}),
        withDelay(400, withTiming(0, {duration: 200})),
      );
      translateX.value = withDelay(
        200,
        withTiming((3 * width) / 8 - 28, {duration: 200}),
      );
    } else if (selectedTab == 2) {
      translateY.value = withSequence(
        withTiming(14, {duration: 200}),
        withDelay(400, withTiming(0, {duration: 200})),
      );
      translateX.value = withDelay(
        200,
        withTiming((5 * width) / 8 - 28, {duration: 200}),
      );
    } else if (selectedTab == 3) {
      translateY.value = withSequence(
        withTiming(14, {duration: 200}),
        withDelay(400, withTiming(0, {duration: 200})),
      );
      translateX.value = withDelay(
        200,
        withTiming((7 * width) / 8 - 28, {duration: 200}),
      );
    }
  }, [selectedTab]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.animatedCircleStyles, animatedCircleStyles]}
      />
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const TabBarIcon = options.tabBarIcon;
        const isFocused = state.index === index;
        // console.log(isFocused);

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const translateY = useSharedValue(0);

        useEffect(() => {
          if (isFocused) {
            setselectedTab(index);
            translateY.value = withDelay(600, withTiming(-14, {duration: 200}));
          } else {
            translateY.value = withTiming(0, {duration: 200});
          }
        }, [isFocused]);

        const animatedStyles = useAnimatedStyle(() => {
          return {
            transform: [
              {
                translateY: translateY.value,
              },
            ],
          };
        });
        const animatedLabelStyles = useAnimatedStyle(() => ({
          color: withDelay(
            250,
            withTiming(isFocused ? 'transparent' : colors.fontLight, {
              duration: 200,
            }),
          ),
        }));
        return (
          <Pressable key={index} onPress={onPress} style={styles.tab}>
            <Animated.View style={[styles.iconContainer, animatedStyles]}>
              <TabBarIcon
                height={24}
                width={24}
                color={isFocused ? colors.secondary : colors.iconDark}
              />
            </Animated.View>
            <Animated.Text style={[styles.label, animatedLabelStyles]}>
              {label}
            </Animated.Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default CustomBottomTab;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#f8f7fb',
    position: 'absolute',
    bottom: 0,
  },
  animatedCircleStyles: {
    backgroundColor: colors.fontDark,
    height: 56,
    width: 56,
    borderRadius: 30,
    position: 'absolute',
    bottom: 30,
  },

  tab: {
    flex: 1,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  iconContainer: {
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  label: {
    paddingTop: 1,
    fontSize: 12,
    color: colors.fontLight,
    fontFamily: 'Manrope-Medium',
  },
});
