import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import AppText from './AppText';
import colors from '../config/colors';
import AppTextInput from './AppTextInput';
import {useNavigation} from '@react-navigation/native';
import OfferCard from './OfferCard';
import CartIcon from '../assets/icons/bag.svg';
function HomeScreenHeader(props) {
  const navigation = useNavigation();
  const [search, setSearch] = useState();

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.headerSection}>
          <AppText style={styles.headerName}>Hey, Rahul</AppText>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <CartIcon />
          </TouchableOpacity>
        </View>
        <AppTextInput icon={'magnify'} placeholder="Search Products" />

        <View style={styles.infoSection}>
          <View style={styles.infoContainer}>
            <AppText style={styles.type1Text}>Delivery To</AppText>
            <AppText style={styles.type2Text}>Green Way 3000, sas</AppText>
          </View>
          <View style={styles.infoContainer}>
            <AppText style={styles.type1Text}>Within</AppText>
            <AppText style={styles.type2Text}>1 day</AppText>
          </View>
        </View>
      </View>
      <ScrollView
        style={{paddingRight: 20}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        <OfferCard color={colors.secondary} />
        <OfferCard color={'#E4DDCB'} />
        <View style={{width: 20}} />
      </ScrollView>

      <AppText style={styles.header}>Recommended</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  headerSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 52,
    marginHorizontal: 20,
    marginBottom: 25,
    alignItems: 'center',
  },
  headerName: {
    color: colors.light,
    fontSize: 22,
    fontWeight: '600',
  },

  searchBox: {
    backgroundColor: colors.primaryDark,
    flexDirection: 'row',
    flex: 1,
    marginHorizontal: 20,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  searchBar: {
    flex: 1,
    alignItems: 'center',
  },
  topBar: {
    backgroundColor: colors.primary,
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  infoSection: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 12,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  infoContainer: {},
  type1Text: {
    color: colors.light,
    fontSize: 11,
    fontWeight: 'bold',
    opacity: 0.5,
    textTransform: 'capitalize',
  },
  type2Text: {
    color: colors.light,
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  header: {
    fontSize: 30,
    lineHeight: 38,
    color: colors.fontDark,
    paddingHorizontal: 15,
  },
});

export default HomeScreenHeader;
