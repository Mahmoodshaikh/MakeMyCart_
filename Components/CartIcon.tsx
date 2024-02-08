/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { cartLogo } from '../Src/Logos/cartLogo'

const CartIcon = () => {
  const navigation = useNavigation();

  const handleCartPress = () => {
    navigation.navigate('CartScreen');
  };

  return (
    <TouchableOpacity onPress={handleCartPress}>
      <Image source={{ uri: cartLogo }} style={styles.cartIcon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cartIcon: {
    width: 38,
    height: 44,
    resizeMode: 'contain',
    padding: 11,
  },
});

export default CartIcon;
