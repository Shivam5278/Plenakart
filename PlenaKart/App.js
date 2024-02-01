import React from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import AppNavigator from './app/navigation/AppNavigator';
import OfflineNotice from './app/components/OfflineNotice';
import {Provider} from 'react-redux';
import store from './app/redux/store';
import FeedNavigator from './app/navigation/FeedNavigator';

function App(props) {
  return (
    <>
      <OfflineNotice />
      <Provider store={store}>
        <StatusBar barStyle={'light-content'} />
        <NavigationContainer>
          <FeedNavigator />
        </NavigationContainer>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default App;
