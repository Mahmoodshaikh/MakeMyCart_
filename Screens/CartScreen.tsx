import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../Store/Store';
import { incrementQuantity, decrementQuantity } from '../Store/QuantitySlice';
import { createOrder } from '../Store/OrderSlice';
import { useNavigation } from '@react-navigation/native';
import { clearCart } from '../Store/CartSlice';

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const quantity = useSelector((state: RootState) => state.quantity);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.ProductPrice * (quantity[item.productId] || 1),
    0,
  );
  const totalDiscount = cartItems.reduce(
    (total, item) =>
      total + (item.ProductPrice * item.ProductDiscountPercentage * (quantity[item.productId] || 1)) / 100,
    0,
  );

  const generateRandomOrderId = () => {
    return Math.floor(Math.random() * 1000000).toString();
  };

  const placeOrder = () => {
    const orderId = generateRandomOrderId();
    dispatch(createOrder({ orderId, cartItems }));
    dispatch(clearCart());
    navigation.navigate('HomeScreen')
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {cartItems.length === 0 ?
          <Text style={[styles.title]}>Your Cart is <Text style={styles.empty}>Empty!</Text></Text>
          : cartItems.map((item, index) => (
            <View key={index} style={styles.productItem}>
              <Image
                source={{ uri: item.ProductImages.slice(-1).pop() }}
                style={styles.productThumbnail}
              />
              <View style={styles.productInfo}>
                <Text style={styles.productTitle}>{item.ProductTitle}</Text>
                <Text style={styles.productDescription}>{item.productDescription}</Text>
                <Text style={styles.productPrice}>Price: ${item.ProductPrice}</Text>
                <View style={styles.quantityContainer}>
                  <Text style={styles.quantity}>Quantity: </Text>
                  <TouchableOpacity onPress={() => dispatch(decrementQuantity(item.productId))}>
                    <Text style={styles.quantityButton}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{quantity[item.productId] || 1}</Text>
                  <TouchableOpacity onPress={() => dispatch(incrementQuantity(item.productId))}>
                    <Text style={styles.quantityButton}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
      </ScrollView>
      {cartItems.length !== 0 &&
        <View style={styles.priceDetails}>
          <Text style={styles.productPrice}>Total Price: ${totalPrice}</Text>
          <Text style={styles.priceText}>
            Total Discount: ${totalDiscount.toFixed(3)}
          </Text>
          <Text style={[styles.priceText, styles.amountPayable]}>
            Amount Payable: ${(totalPrice - totalDiscount).toFixed(3)}
          </Text>
          <TouchableOpacity style={styles.placeOrderButton} onPress={placeOrder}>
            <Text style={styles.placeOrderButtonText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      }
      <Text style={styles.bottomSpace}></Text>
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
  productItem: {
    marginBottom: 20,
    backgroundColor: '#FD8D14',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productThumbnail: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
    marginRight: 20,
  },
  productInfo: {
    flex: 1,
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
    color: '#FFFFFF',
    marginBottom: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    color: '#FFFFFF',
    fontSize: 20,
    margin: 10,
    backgroundColor: '#000000',
    padding: 5,
    borderRadius: 4,
    fontWeight: 'bold',
  },
  quantity: {
    color: '#FFFFFF',
    fontSize: 18,
    marginRight: 10,
    fontWeight: 'bold',
  },
  priceDetails: {
    backgroundColor: '#191919',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  priceText: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 5,
  },
  amountPayable: {
    color: '#65B741',
    fontSize: 19,
  },
  placeOrderButton: {
    backgroundColor: '#BED754',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  placeOrderButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomSpace: {
    marginBottom: 10,
  }
});

export default CartScreen;
