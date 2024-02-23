import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image, StyleSheet, View } from 'react-native';

const SavedProfileIcon = () => {
  const defaultProfilePic = 'https://github.com/Mahmoodshaikh/CV/blob/V-1.0/profile_avatar-removebg-preview.png?raw=true';
  const [profilePic, setProfilePic] = useState(defaultProfilePic);


  const loadProfilePicFromStorage = async () => {
    try {
      const storedProfilePic = await AsyncStorage.getItem('profilePic');
      if (storedProfilePic !== null) {
        setProfilePic(storedProfilePic);
      }
    } catch (error) {
      console.error('Error loading profile picture from storage:', error);
    }
  };

  useEffect(() => {
    loadProfilePicFromStorage();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={{ uri: profilePic }} style={styles.icon} defaultSource={{ uri: defaultProfilePic }} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
    borderRadius: 36,
    backgroundColor: '#fff',
    margin: 12,
  },
  icon: {
    width: 88,
    height: 88,
    borderRadius: 36,
    resizeMode: 'cover',
  },
});

export default SavedProfileIcon;
