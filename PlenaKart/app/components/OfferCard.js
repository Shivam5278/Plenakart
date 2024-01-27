import React from 'react';
import {View, StyleSheet} from 'react-native';
import DefaultIcon from '../assets/DefaultImage.svg';
import AppText from './AppText';
import colors from '../config/colors';

function OfferCard({color}) {
  return (
    <View style={[styles.container, {backgroundColor: color}]}>
      <View style={styles.detailsContainer}>
        <DefaultIcon height={56} width={56} />
        <View>
          <AppText style={styles.line1}>Get</AppText>
          <AppText style={styles.line2}>50% OFF</AppText>
          <AppText style={styles.line3}>On first 03 order</AppText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 123,
    width: 269,
    borderRadius: 16,
    marginLeft: 20,
    marginVertical: 27,
    flex: 1,
    justifyContent: 'center',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 27,
  },
  line1: {
    fontSize: 20,
    fontWeight: '200',
    color: colors.white,
  },
  line2: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.white,
  },
  line3: {
    fontSize: 13,
    color: colors.white,
    fontWeight: '200',
  },
});

export default OfferCard;
