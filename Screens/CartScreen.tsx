/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/Store';

const CartScreen = () => {
  useEffect(() => {
    console.log(cartItems, 'cartItems');
  }, []);

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.ProductPrice,
    0,
  );
  const totalDiscount = cartItems.reduce(
    (total, item) =>
      total + (item.ProductPrice * item.ProductDiscountPercentage) / 100,
    0,
  );

  return (
    <SafeAreaView style={styles.container}>
      {cartItems.length === 0 ? (
        <Text style={[styles.title]}>Your Cart is <Text style={styles.empty}>Empty!</Text></Text>
      ) : (
        <ScrollView style={styles.scrollView}>
          {cartItems.map((item, index) => (
            <View key={index} style={styles.productItem}>
              <Image
                source={{ uri: item.ProductImages.slice(-1).pop() }}
                style={styles.productThumbnail}
              />
              <Text style={styles.productTitle}>{item.ProductTitle}</Text>
              <Text style={styles.productDescription}>
                {item.productDescription}
              </Text>
              <Text>
                <Text style={styles.productPrice}>
                  {' '}
                  Price: ${item.ProductPrice}
                </Text>
                {'    '}
                <Text style={styles.strikeThroughtextStyle}>
                  $
                  {Math.floor(
                    item.ProductPrice +
                    (item.ProductPrice * item.ProductDiscountPercentage) /
                    100,
                  )}
                </Text>{' '}
                <Text style={styles.discountPercentage}>
                  {item.ProductDiscountPercentage}% off
                </Text>
              </Text>
            </View>
          ))}
          <View style={styles.priceDetails}>
            <Text style={styles.productPrice}>Total Price: ${totalPrice}</Text>
            <Text style={styles.priceText}>
              Total Discount: ${totalDiscount.toFixed(3)}
            </Text>
            <Text style={[styles.priceText, styles.amountPayable]}>
              Amount Payable: ${(totalPrice - totalDiscount).toFixed(3)}
            </Text>
          </View>
          <TouchableOpacity style={styles.placeOrderButton}>
            <Text style={styles.placeOrderButtonText}>Place Order</Text>
          </TouchableOpacity>
          <Text>" "</Text>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  scrollView: {
    flex: 1,
  },
  productItem: {
    marginBottom: 20,
    backgroundColor: '#3E3232',
    padding: 20,
    borderRadius: 10,
  },
  productThumbnail: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 10,
  },
  productTitle: {
    color: '#F5EEE6',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    color: '#FDE767',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 16,
    color: '#F5EEE6',
    padding: 2,
  },
  strikeThroughtextStyle: {
    textDecorationLine: 'line-through',
    color: '#F3EDC8',
    fontSize: 18,
  },
  discountPercentage: {
    color: '#65B741',
    fontSize: 18,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 250,
    textAlign: 'center',
    padding: 20,

  },
  empty: {
    color: 'red',
  },
  priceDetails: {
    backgroundColor: '#3E3232',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },

  priceText: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 18,
    padding: 2,
  },

  amountPayable: {
    fontWeight: 'bold',
    color: '#65B741',
    fontSize: 19,
    padding: 6,
  },
  placeOrderButton: {
    backgroundColor: '#8A2BE2',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  placeOrderButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen;
