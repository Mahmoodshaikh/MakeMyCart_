import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, PermissionsAndroid } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const defaultProfilePic = 'https://github.com/Mahmoodshaikh/CV/blob/V-1.0/profile_avatar-removebg-preview.png?raw=true';
  const [profilePic, setProfilePic] = useState(defaultProfilePic);

  useEffect(() => {
    requestCameraPermission();
    loadProfilePicFromStorage();
  }, []);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission granted');
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const openCamera = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 200,
      maxHeight: 200,
      includeBase64: true,
    };

    launchCamera(options, (response) => {
      handleImagePickerResponse(response);
    });
  };

  const openGallery = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 200,
      maxHeight: 200,
      includeBase64: true,
    };

    launchImageLibrary(options, (response) => {
      handleImagePickerResponse(response);
    });
  };

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

  const handleImagePickerResponse = (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      if (response.assets && response.assets.length > 0 && response.assets[0].base64) {
        const base64Image = `data:${response.assets[0].type};base64,${response.assets[0].base64}`;
        setProfilePic(base64Image);
        saveProfilePicToStorage(base64Image);
      } else {
        console.log('Base64 data not found in image picker response');
      }
    }
  };

  const saveProfilePicToStorage = async (profilePic) => {
    try {
      await AsyncStorage.setItem('profilePic', profilePic);
    } catch (error) {
      console.error('Error saving profile picture to storage:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: profilePic }} style={styles.profilePic} defaultSource={{ uri: defaultProfilePic }} />
      <TouchableOpacity style={styles.button} onPress={openCamera}>
        <Text style={styles.buttonText}>Open Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={openGallery}>
        <Text style={styles.buttonText}>Open Gallery</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default ProfileScreen;
