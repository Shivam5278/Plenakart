import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

function Screen({children, style}) {
  return (
    <SafeAreaView style={[styles.screen]}>
      <View style={[styles.screen, style]}>{children}</View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default Screen;
