import React from 'react';
import {View, StyleSheet} from 'react-native';
import Star from '../assets/icons/Star.svg';
import StarHalf from '../assets/icons/StarHalf.svg';

function StarRating({rating}) {
  const starComponents = [];

  const floorRating = Math.floor(rating);
  const hasHalfStar = rating - floorRating > 0;

  for (let i = 0; i < floorRating; i++) {
    starComponents.push(<StarIcon key={i} />);
  }

  if (hasHalfStar) {
    starComponents.push(<StarHalfIcon key="half" />);
  }

  return <View style={styles.container}>{starComponents}</View>;
}

function StarIcon() {
  return (
    <View style={styles.starContainer}>
      <Star height={15} />
    </View>
  );
}

function StarHalfIcon() {
  return (
    <View style={styles.starContainer}>
      <StarHalf height={15} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  starContainer: {
    margin: 3,
  },
});

export default StarRating;
