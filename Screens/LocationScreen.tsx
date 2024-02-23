import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';

const LocationScreen = () => {
  const [cityName, setCityName] = useState('');

  useEffect(() => {
    getCityName();
  }, []);

  const getCityName = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=17.4065&lon=78.4772`
      );
      const data = await response.json();
      if (data.address) {
        setCityName(data.address.city);
      }
    } catch (error) {
      console.error('Error fetching city name:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to React Native!</Text>
      <Text style={styles.instructions}>City Name:</Text>
      <Text style={styles.cityName}>{cityName}</Text>
    </View>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    marginTop: 20,
  },
  cityName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});
