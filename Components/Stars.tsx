import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

import { starImgFilled, starImgCorner } from '../Src/APIs/productsAPI';

interface StarsProps {
  rating: number;
}

const Stars: React.FC<StarsProps> = ({ rating }) => (
  <View style={styles.ratingContainer}>
    <Text style={styles.productRating}>Rating: {rating}</Text>
    {[1, 2, 3, 4, 5].map((_, index) => (
      <Image
        key={index}
        style={styles.starImage}
        source={
          rating >= 4.5
            ? { uri: starImgFilled }
            : index < Math.floor(rating)
              ? { uri: starImgFilled }
              : { uri: starImgCorner }
        }
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
  },
  starImage: {
    width: '8%',
    height: '118%',
    marginLeft: 4,
  },
  productRating: {
    fontSize: 18,
    marginLeft: 5,
    color: '#000000',
    fontWeight: 'bold',
  },
});

export default Stars;
