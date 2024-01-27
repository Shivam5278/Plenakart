import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import defaultStyles from '../config/styles';
import colors from '../config/colors';
import Search from '../assets/icons/Search.svg';

function AppTextInput({icon, width = '90%', ...otherProps}) {
  return (
    <View style={[styles.container, {width}]}>
      {icon && <Search width={15} height={15} />}
      <TextInput
        placeholderTextColor={defaultStyles.colors.fontLight}
        style={[
          defaultStyles.text,
          {flex: 1, color: colors.light, fontSize: 14, paddingLeft: 12},
        ]}
        {...otherProps}
      />
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
});

export default AppTextInput;
