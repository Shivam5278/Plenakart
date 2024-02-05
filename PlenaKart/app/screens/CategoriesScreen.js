import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import AppText from '../components/AppText';

import {fetchProductCategories} from '../redux/ProductSlice';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../config/colors';
import ListItemSeparator from '../components/ListItemSeparator';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import Screen from '../components/Screen';

function CategoriesScreen({navigation}) {
  const bottomTabHeight = useBottomTabBarHeight();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getProductCategories();
  }, []);

  const getProductCategories = () => {
    dispatch(fetchProductCategories());
    setLoading(false);
  };

  const categories = useSelector(state => state.products.categories);
  const renderItem = ({item}) => (
    <TouchableHighlight
      onPress={() =>
        navigation.navigate('Search', {type: 'category', search: item})
      }
      style={styles.item}>
      <AppText style={styles.title} numberOfLines={1}>
        {item}
      </AppText>
    </TouchableHighlight>
  );
  return (
    <Screen style={[styles.container, {marginBottom: bottomTabHeight}]}>
      <View style={styles.headerContainer}>
        <AppText style={styles.header}>Categories</AppText>
      </View>
      {loading ? (
        <>
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <ActivityIndicator size={'large'} color={colors.secondary} />
          </View>
        </>
      ) : (
        <View style={{flex: 1}}>
          <FlatList
            data={categories}
            renderItem={renderItem}
            keyExtractor={item => item}
            ItemSeparatorComponent={<ListItemSeparator />}
          />
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
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
  item: {
    alignItems: 'flex-start',
    paddingLeft: 20,
    paddingVertical: 10,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 20,
    // fontFamily: 'Manrope-Semibold',
    textTransform: 'capitalize',
  },
});

export default CategoriesScreen;
