import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import colors from '../config/colors';

function AppButtonIcon({title = '+', onPress, size = '40'}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          height: Number(size),
          width: Number(size),
          borderRadius: Number(size) / 2,
        },
      ]}
      onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.light,
  },
  text: {
    fontSize: 18,
    textTransform: 'capitalize',
    color: colors.dark,
  },
});
export default AppButtonIcon;
