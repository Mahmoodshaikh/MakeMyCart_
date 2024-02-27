import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
// import Geolocation from '@react-native-community/geolocation';

const LocationScreen = () => {
  const [cityName, setCityName] = useState('Hyderabad');

  useEffect(() => {
    // getCityName();
  }, []);

  const getCityName = async () => {
    Geolocation.getCurrentPosition(
      async position => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          if (data.address && data.address.city) {
            setCityName(data.address.city);
          }
        } catch (error) {
          console.error('Error fetching city name:', error);
        }
      },
      error => {
        console.log('Error getting location:', error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Your current Location is <Text style={styles.cityName}>{cityName}</Text>
        !</Text>
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
