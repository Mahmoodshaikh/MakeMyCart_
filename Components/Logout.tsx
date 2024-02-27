import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Logout = () => {
  const navigation = useNavigation();

  const logoutPressHandler = async () => {
    await clearAllData();
    navigation.navigate('LoginScreen');
  };

  const clearAllData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const keysToRemove = keys.filter(key => key === 'orders' || key === 'cartItemsAsyncStore' || key === 'profilePic');
      await AsyncStorage.multiRemove(keysToRemove);
      Alert.alert('Success', 'Selected data removed successfully');
    } catch (error) {
      console.error('Error clearing data from AsyncStorage:', error);
      Alert.alert('Error', 'An error occurred while clearing data. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={logoutPressHandler} >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    padding: 7,
    backgroundColor: '#4E4E6A',
    borderRadius: 12,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 1,
    textAlign: 'center',
    color: '#000000'

  },
});

export default Logout;
