import React, {useState} from 'react';
import {FlatList, Image, View, StyleSheet, Dimensions} from 'react-native';
import colors from '../config/colors';

const {width} = Dimensions.get('window');

function ImageSlider({images}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <View style={styles.container}>
      {images.length == 1 ? (
        <Image source={{uri: images[0]}} style={styles.image} />
      ) : (
        <>
          <FlatList
            data={images}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onScroll={e => {
              const x = e.nativeEvent.contentOffset.x;
              setCurrentIndex((x / width).toFixed(0));
            }}
            renderItem={({item, index}) => {
              return (
                <View style={styles.imageContainer}>
                  <Image source={{uri: item}} style={styles.image} />
                </View>
              );
            }}
          />
          <View style={styles.indicator}>
            {images.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    width: 19,
                    height: 5,
                    borderRadius: 6,
                    backgroundColor:
                      currentIndex == index ? colors.secondary : '#E4E4E4',
                    marginLeft: 5,
                  }}
                />
              );
            })}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 207,
  },
  imageContainer: {
    width,
  },
  image: {
    width: '100%',
    height: 207,
    resizeMode: 'contain',
  },
  indicator: {
    flexDirection: 'row',
    width,
    position: 'absolute',
    left: 20,
    bottom: 20,
  },
});

export default ImageSlider;
