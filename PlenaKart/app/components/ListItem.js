import React from 'react';
import {View, StyleSheet, Image, TouchableHighlight} from 'react-native';
import AppText from './AppText';

import colors from '../config/colors';
import Icon from './Icon';

function ListItem({
  title,
  subTitle,
  imageUrl,
  onPress,
  quantity = 1,
  onPressMinus,
  onPressPlus,
}) {
  return (
    <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
      <View style={styles.container}>
        {imageUrl && <Image style={styles.image} source={{uri: imageUrl}} />}
        <View style={styles.detailsContainer}>
          <AppText style={styles.title} numberOfLines={1}>
            {title}
          </AppText>
          {subTitle && (
            <AppText style={styles.subTitle} numberOfLines={1}>
              {subTitle}
            </AppText>
          )}
        </View>
        <Icon name={'minus'} onPress={onPressMinus} />
        <AppText style={styles.quantity}>{quantity}</AppText>
        <Icon name={'plus'} onPress={onPressPlus} />
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
    backgroundColor: colors.white,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 13,
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 15,
  },
  subTitle: {
    fontSize: 14,
    color: colors.fontDark,
    lineHeight: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
  quantity: {
    paddingHorizontal: 11,
    fontSize: 14,
  },
});

export default ListItem;
