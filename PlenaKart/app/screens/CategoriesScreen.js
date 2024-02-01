import React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import AppText from '../components/AppText';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
function CategoriesScreen(props) {
  const offset = useSharedValue(0);

  const style = useAnimatedStyle(() => ({
    transform: [{translateX: offset.value}],
  }));
  const OFFSET = 60;
  const TIME = 500;
  const handlePress = () => {
    offset.value = withSequence(
      withTiming(-OFFSET, {duration: TIME / 2}),
      withRepeat(withTiming(OFFSET, {duration: TIME}), 6, true),
      withTiming(0, {duration: TIME / 2}),
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <AppText style={styles.header}>Categories</AppText>
      </View>
      <Animated.View
        style={[
          {
            width: 100,
            height: 100,
            backgroundColor: 'violet',
          },
          style,
        ]}
      />
      <Button onPress={handlePress} title="Shake" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 90,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default CategoriesScreen;
