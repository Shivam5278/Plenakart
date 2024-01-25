import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import colors from '../config/colors';

function AppButton({title, onPress, type = 'primary'}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {backgroundColor: type === 'secondary' ? colors.white : colors.primary},
      ]}
      onPress={onPress}>
      <Text
        style={[
          styles.text,
          {color: type === 'secondary' ? colors.primary : colors.white},
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 19,
    margin: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    flex: 1,
  },
  text: {
    fontSize: 14,
    textTransform: 'capitalize',
  },
});
export default AppButton;
