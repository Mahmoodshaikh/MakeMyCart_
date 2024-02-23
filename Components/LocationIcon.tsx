import React, { useState, useEffect } from 'react';
import { Image, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { locationLogo } from '../Src/Logos/locationLogo'

const LocationIcon = () => {
    const navigation = useNavigation();
    const [location, setLocation] = useState('');

    useEffect(() => {
        fetchCityName(17.4065, 78.4772);
    }, []);

    const fetchCityName = (latitude: number, longitude: number) => {
        fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
            .then(response => response.json())
            .then(data => {
                if (data.address) {
                    setLocation(data.address.city);
                }
            })
            .catch(error => {
                console.error('Error fetching city name:', error);
            });
    };

    // const handleCartPress = () => {
    //     console.log("Location Screen 3")
    //     navigation.navigate('LocationScreen');
    // };

    return (
        <View style={styles.container}>
            <View>
                <Image source={{ uri: locationLogo }} style={styles.locationIcon} />
            </View>
            <Text style={styles.location}>{location || 'Fetching location...'}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 2,
    },
    locationIcon: {
        width: 32,
        height: 32,
        resizeMode: 'center',
        padding: 1,
    },
    location: {
        fontSize: 11,
        fontWeight: 'bold',
        marginTop: 5,
    },
});

export default LocationIcon;
