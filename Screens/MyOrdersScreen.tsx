import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/Store';

const MyOrdersScreen = () => {
  const orders = useSelector((state: RootState) => state.order.orders);

  const getOrderItemStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return styles.delivered;
      case 'pending':
        return styles.pending;
      case 'canceled':
        return styles.canceled;
      default:
        return styles.default;
    }
  };

  // Render each order item
  const renderOrderItem = ({ item }: { item: any }) => (
    <View style={[styles.orderItem, getOrderItemStyle(item.status)]}>
      <Text style={styles.orderText}>Order ID: {item.orderId}</Text>
      <Text style={styles.orderText}>Status: {item.status}</Text>
      {/* Render other order details */}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={orders}
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
  },
  orderText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  delivered: {
    backgroundColor: '#4CAF50',
  },
  pending: {
    backgroundColor: '#2196F3',
  },
  canceled: {
    backgroundColor: '#F44336',
  },
});

export default MyOrdersScreen;
