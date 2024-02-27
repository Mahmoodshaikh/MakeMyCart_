import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface PriceDetailsProps {
  totalPrice: number;
  totalDiscount: number;
  amountPayable: number;
  onPressCheckout: () => void;
}

const PriceDetails: React.FC<PriceDetailsProps> = ({ totalPrice, totalDiscount, amountPayable, onPressCheckout }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.productPrice}>Total Price: ${totalPrice}</Text>
      <Text style={styles.priceText}>Total Discount: ${totalDiscount.toFixed(3)}</Text>
      <Text style={[styles.priceText, styles.amountPayable]}>Amount Payable: ${amountPayable.toFixed(3)}</Text>
      <TouchableOpacity style={styles.placeOrderButton} onPress={onPressCheckout}>
        <Text style={styles.placeOrderButtonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#191919',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  productPrice: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 5,
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
});

export default PriceDetails;
