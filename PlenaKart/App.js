import React from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import AppNavigator from './app/navigation/AppBottomTabNavigator';
import OfflineNotice from './app/components/OfflineNotice';
import {Provider} from 'react-redux';
import store from './app/redux/store';

function App(props) {
  return (
    <>
      <OfflineNotice />
      <Provider store={store}>
        <StatusBar barStyle={'light-content'} />
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default App;
