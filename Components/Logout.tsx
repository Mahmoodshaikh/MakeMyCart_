import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Logout = () => {
  const navigation = useNavigation();

  const logoutPressHandler = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <TouchableOpacity onPress={logoutPressHandler} style={styles.logoutButton}>
      <Text style={styles.logoutButtonText}>Logout</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    padding: 7,
    backgroundColor: '#4E4E6A',
    borderRadius: 12,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 1,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default Logout;
