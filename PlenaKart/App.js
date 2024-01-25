import React from 'react';
import {View, StyleSheet, Text, StatusBar} from 'react-native';
import HomeScreen from './app/screens/HomeScreen';
import ProductDetailsScreen from './app/screens/ProductDetailsScreen';

function App(props) {
  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.container}>
        <HomeScreen />

        {/* <ProductDetailsScreen /> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default App;
