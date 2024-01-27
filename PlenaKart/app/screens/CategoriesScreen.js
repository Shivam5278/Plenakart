import React from 'react';
import {View, StyleSheet} from 'react-native';
import AppText from '../components/AppText';

function CategoriesScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <AppText style={styles.header}>Categories</AppText>
      </View>
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
