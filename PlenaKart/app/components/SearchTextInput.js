import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import defaultStyles from '../config/styles';
import colors from '../config/colors';
import Search from '../assets/icons/Search.svg';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import AppText from './AppText';
import {useNavigation} from '@react-navigation/native';

function SearchTextInput({icon, width = '90%', ...otherProps}) {
  const navigation = useNavigation();
  const buttonOpacity = useSharedValue(0);
  const [value, setValue] = useState();

  const buttonStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{scale: 1}],
  }));

  useEffect(() => {
    if (value) buttonOpacity.value = withSpring(1);
    else buttonOpacity.value = withSpring(0);
  }, [value]);
  const handleSubmit = () => {
    if (value) {
      navigation.navigate('Search', {type: 'search', search: value});
      setValue();
    }
  };
  return (
    <View style={[styles.container, {width}]}>
      <Search width={15} height={15} />
      <TextInput
        placeholder="Search Products"
        value={value}
        onChangeText={setValue}
        onSubmitEditing={handleSubmit}
        placeholderTextColor={defaultStyles.colors.fontLight}
        style={[
          defaultStyles.text,
          {flex: 1, color: colors.light, fontSize: 14, paddingLeft: 12},
        ]}
        {...otherProps}
      />
      <Pressable onPress={handleSubmit}>
        <Animated.View style={[styles.button, buttonStyle]}>
          <AppText style={{fontSize: 14, color: colors.white}}>Search</AppText>
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.primaryDark,
    borderRadius: 28,
    flexDirection: 'row',
    paddingLeft: 28,
    marginVertical: 10,
    alignItems: 'center',
    height: 56,
    marginHorizontal: 20,
  },
  icon: {
    marginRight: 12,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginRight: 14,
    borderRadius: 20,
    padding: 5,
    opacity: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchTextInput;
