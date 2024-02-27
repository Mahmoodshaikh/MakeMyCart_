import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/Store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyOrdersScreen = () => {
  const orders = useSelector((state: RootState) => state.order.orders);
  const [ordersFromAsyncStorage, setOrdersFromAsyncStorage] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const storedOrders = await AsyncStorage.getItem('orders');
        if (storedOrders !== null) {
          setOrdersFromAsyncStorage(JSON.parse(storedOrders));
        }
      } catch (error) {
        console.error('Error fetching orders from AsyncStorage:', error);
      }
    };

    fetchOrders();
  }, []);

  console.log("orders", orders)

  const getOrderItemStyle = (status: string | undefined) => {
    if (!status) {
      return styles.orderText;
    }

    switch (status.toLowerCase()) {
      case 'delivered':
        return { ...styles.orderText, backgroundColor: '#4CAF50' };
      case 'pending':
        return { ...styles.orderText, backgroundColor: '#2196F3' };
      case 'canceled':
        return { ...styles.orderText, backgroundColor: '#F44336' };
      default:
        return styles.orderText;
    }
  };


  const renderOrderItem = ({ item }: { item: any }) => (
    <View style={styles.orderItem}>
      <View style={styles.row}>
        <Text style={[styles.orderText, styles.orderId]}>Order ID: {item.orderId}</Text>
        <Text style={[styles.orderText, styles.totalAmount]}>Total Amount: ${item.totalPrice?.toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.orderText}>Date: {item.date}</Text>
        <Text style={[getOrderItemStyle(item.status), styles.status]}>Status: {item.status}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={ordersFromAsyncStorage}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.orderId}
        contentContainerStyle={styles.flatListContainer}
      />
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
  flatListContainer: {
    flexGrow: 1,
  },
  orderItem: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#EEEEEE',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  orderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderId: {
    flex: 1,
  },
  totalAmount: {
    flex: 1,
    textAlign: 'right',
  },
  status: {
    paddingHorizontal: 10,
    borderRadius: 5,
    color: '#FFFFFF',
  },
});

export default MyOrdersScreen;
