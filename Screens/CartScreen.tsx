import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../Store/Store';
import { decrementQuantity, incrementQuantity } from '../Store/QuantitySlice';
import { createOrder } from '../Store/OrderSlice';
import { useNavigation } from '@react-navigation/native';
import { clearCart } from '../Store/CartSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const quantity = useSelector((state: RootState) => state.quantity);
  const [cartItemsAsyncStore, setCartItemsAsyncStore] = useState([]);


  const [totalPriceAsyncStore, setTotalPriceAsyncStore] = useState<number>(0);
  const [totalDiscountAsyncStore, setTotalDiscountAsyncStore] = useState<number>(0);
  const [amountPayableAsyncStore, setAmountPayableAsyncStore] = useState<number>(0);

  const [priceDetailsAsyncStore, setPriceDetailsAsyncStore] = useState<{
    totalPrice: number;
    totalDiscount: number;
    amountPayable: number;
  }>({
    totalPrice: 0,
    totalDiscount: 0,
    amountPayable: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await AsyncStorage.getItem('cartItemsAsyncStore');
        console.log("items", items)
        if (items !== null) {
          setCartItemsAsyncStore(JSON.parse(items));
        }

        const priceDetails = await AsyncStorage.getItem('priceDetailsAsyncStore');
        if (priceDetails !== null) {
          const parsedPriceDetails = JSON.parse(priceDetails);
          setTotalPriceAsyncStore(parsedPriceDetails.totalPrice);
          setTotalDiscountAsyncStore(parsedPriceDetails.totalDiscount);
          setAmountPayableAsyncStore(parsedPriceDetails.amountPayable);
          setPriceDetailsAsyncStore(parsedPriceDetails);
        }
      } catch (error) {
        console.error('Error fetching data from AsyncStorage:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("cartItemsAsyncStore", cartItemsAsyncStore)
    const updatePriceDetails = () => {
      const totalPrice = cartItems.reduce(
        (total, item) => total + item.ProductPrice * (quantity[item.productId] || 1),
        0,
      );
      const totalDiscount = cartItems.reduce(
        (total, item) =>
          total + (item.ProductPrice * item.ProductDiscountPercentage * (quantity[item.productId] || 1)) / 100,
        0,
      );
      const amountPayable = totalPrice - totalDiscount;

      setPriceDetailsAsyncStore({
        totalPrice,
        totalDiscount,
        amountPayable,
      });

      setTotalPriceAsyncStore(totalPrice);
      setTotalDiscountAsyncStore(totalDiscount);
      setAmountPayableAsyncStore(amountPayable);
    };

    updatePriceDetails();
  }, [cartItems, quantity]);

  const updateCartItemsAsyncStore = async (updatedCartItems) => {
    try {
      await AsyncStorage.setItem('cartItemsAsyncStore', JSON.stringify(updatedCartItems));
      setCartItemsAsyncStore(updatedCartItems);
    } catch (error) {
      console.error('Error updating cart items in AsyncStorage:', error);
    }
  };

  const handleDecrement = async (productId: number) => {
    dispatch(decrementQuantity(productId));
    const updatedCartItems = cartItems.map(item => {
      if (item.productId === productId) {
        return { ...item, quantity: quantity[item.productId] || 1 };
      }
      return item;
    });
    await updateCartItemsAsyncStore(updatedCartItems);
  };

  const handleIncrement = async (productId: number) => {
    dispatch(incrementQuantity(productId));
    const updatedCartItems = cartItems.map(item => {
      if (item.productId === productId) {
        return { ...item, quantity: quantity[item.productId] || 1 };
      }
      return item;
    });
    await updateCartItemsAsyncStore(updatedCartItems);
  };


  const generateRandomOrderId = () => {
    return Math.floor(Math.random() * 1000000).toString();
  };

  const generateRandomStatus = () => {
    const statuses = ['Delivered', 'Pending', 'Canceled'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  const generateRandomDate = () => {
    const startDate = new Date(2022, 0, 1).getTime();
    const endDate = new Date().getTime();
    const randomDate = new Date(startDate + Math.random() * (endDate - startDate));
    return randomDate.toLocaleDateString();
  };

  const placeOrder = async () => {
    try {
      const orderId = generateRandomOrderId();
      const randomStatus = generateRandomStatus();
      const randomDate = generateRandomDate();
      const totalPrice = cartItems.reduce((total, item) => total + (item.ProductPrice * (quantity[item.productId] || 1)), 0);

      const order = {
        orderId: orderId,
        date: randomDate,
        items: cartItems,
        status: randomStatus,
        totalPrice: totalPrice
      };

      dispatch(createOrder(order));
      dispatch(clearCart());

      const existingOrdersString = await AsyncStorage.getItem('orders');
      const existingOrders = existingOrdersString ? JSON.parse(existingOrdersString) : [];
      existingOrders.push(order);
      await AsyncStorage.setItem('orders', JSON.stringify(existingOrders));

      console.log('Order placed:', order);
      // await AsyncStorage.removeItem('orders');
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {cartItemsAsyncStore.length === 0 ?
          <Text style={[styles.title]}>Your Cart is <Text style={styles.empty}>Empty!</Text></Text>
          : cartItemsAsyncStore.map((item, index) => (
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
                  <TouchableOpacity onPress={() => handleDecrement(item.productId)}>
                    <Text style={styles.quantityButton}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{item.quantity || 1}</Text>
                  <TouchableOpacity onPress={() => handleIncrement(item.productId)}>
                    <Text style={styles.quantityButton}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
      </ScrollView>
      {cartItemsAsyncStore.length !== 0 &&
        <View style={styles.priceDetails}>
          <Text style={styles.productPrice}>Total Price: ${totalPriceAsyncStore}</Text>
          <Text style={styles.priceText}>
            Total Discount: ${totalDiscountAsyncStore.toFixed(3)}
          </Text>
          <Text style={[styles.priceText, styles.amountPayable]}>
            Amount Payable: ${amountPayableAsyncStore.toFixed(3)}
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
