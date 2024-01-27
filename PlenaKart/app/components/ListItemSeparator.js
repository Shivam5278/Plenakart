import React from 'react';
import {StyleSheet, View} from 'react-native';

function ListItemSeparator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#EBEBFB',
    marginHorizontal: 24,
  },
});
export default ListItemSeparator;
