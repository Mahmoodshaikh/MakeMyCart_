import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Image, StyleSheet, Modal, View, Text, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SavedProfileIcon from '../Components/SavedProfileIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileIcon = () => {
    const navigation = useNavigation();
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    //   useEffect(() => {
    //     loadProfilePicFromStorage(); 
    //   }, []);

    loadProfilePicFromStorage();
    const handlePress = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleLogout = () => {
        setIsModalOpen(false);
        navigation.navigate('LoginScreen');
        saveProfilePicToStorage('')
    };
    const handleProfileSet = () => {
        setIsModalOpen(false);
        console.log(isModalOpen, 'isModalOpen')
        navigation.navigate('ProfileScreen');
    };

    const handleMyOrders = () => {
        setIsModalOpen(false);
        navigation.navigate('MyOrdersScreen');
    };

    const saveProfilePicToStorage = async (profilePic) => {
        try {
            await AsyncStorage.setItem('profilePic', profilePic);
        } catch (error) {
            console.error('Error saving profile picture to storage:', error);
        }
    };

    return (
        <>
            <TouchableOpacity onPress={handlePress} style={styles.container}>
                <Image source={{ uri: profilePic }} style={styles.icon} defaultSource={{ uri: defaultProfilePic }} />

            </TouchableOpacity>
            <Modal
                visible={isModalOpen}
                animationType='fade'
                transparent={true}
                onRequestClose={closeModal}
            >
                <TouchableWithoutFeedback onPress={closeModal}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <TouchableOpacity onPress={handleProfileSet}><SavedProfileIcon /></TouchableOpacity>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity onPress={handleMyOrders}><Text style={styles.button}>My Orders</Text></TouchableOpacity>
                                <TouchableOpacity onPress={handleLogout}><Text style={styles.button}>Logout</Text></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 4,
        borderRadius: 20,
        backgroundColor: '#fff',
        margin: 0,
    },
    icon: {
        width: 34,
        height: 34,
        borderRadius: 17,
        resizeMode: 'cover',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        width: '50%',
        height: '90%',
        padding: 20,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    buttonContainer: {
        marginTop: 20,
    },
    button: {
        fontSize: 16,
        marginVertical: 10,
        color: '#333',
        borderWidth: 1.2,
        borderColor: '#FC6736',
        padding: 10,
        borderRadius: 5,
        fontWeight: 'bold',
    },
});

export default ProfileIcon;
