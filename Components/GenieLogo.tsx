/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { genieLogo } from '../Src/Logos/genieLogo'

const GenieLogo = () => {
  const navigation = useNavigation();

  const handleCartPress = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <TouchableOpacity onPress={handleCartPress}>
      <Image source={{ uri: genieLogo }} style={styles.cartIcon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cartIcon: {
    width: 80,
    height: 60,
    resizeMode: 'cover',
    padding: 0
  },
});

export default GenieLogo;
