/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const RegistrationScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation<any>();

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      showAlert('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      showAlert('Passwords do not match');
      return;
    }

    try {
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
      showAlert('Registration successful!');
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.log('Error storing user data: ', error);
      showAlert('Error occurred during registration');
    }
  };

  const showAlert = (message: string) => {
    Alert.alert('Alert', message, [{ text: 'OK' }]);
  };

  const handleLoginNavigation = () => {
    navigation.navigate("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Create Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register Now</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLoginNavigation}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1E9FF',
  },
  title: {
    fontSize: 36,
    marginBottom: 30,
    fontFamily: 'Billabong',
    color: '#8A2BE2',
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#A98CFD',
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#8A2BE2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  loginText: {
    marginTop: 10,
    color: '#8A2BE2',
    textDecorationLine: 'underline',
  },
});

export default RegistrationScreen;
