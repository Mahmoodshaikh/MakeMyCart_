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
    <TouchableOpacity onPress={handleCartPress} style={styles.container}>
      <Image source={{ uri: cartLogo }} style={styles.cartIcon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 2,
  },
  cartIcon: {
    width: 34,
    height: 32,
    resizeMode: 'center',
    padding: 1,
  },
});

export default CartIcon;
