import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import GenieLogo from '../Components/GenieLogo';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<any>();

  const handleLogin = async () => {
    if (!username || !password) {
      showAlert('Username and password are required');
      return;
    }

    try {
      const storedUsername = await AsyncStorage.getItem('username');
      const storedPassword = await AsyncStorage.getItem('password');


      if (storedUsername === username && storedPassword === password) {
        console.log('Login successful!');
        navigation.navigate("HomeScreen");
      } else {
        showAlert('Invalid username or password');
      }
    } catch (error) {
      console.log('Error retrieving user data: ', error);
      showAlert('Error occurred while logging in');
    }
  };

  const showAlert = (message: string | undefined) => {
    Alert.alert('Alert', message, [{ text: 'OK' }]);
  };

  const handleRegister = () => {
    navigation.navigate("RegistrationScreen");
  };

  return (
    <View style={styles.container}>
      <GenieLogo />
      <Text style={styles.title}>Hi user, please Log in</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.registerText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const theme = {
  primaryColor: '#F1E9FF',
  secondaryColor: '#FC6736',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.primaryColor,
  },
  title: {
    fontSize: 24,
    marginBottom: 50,
    fontFamily: 'Billabong',
    color: theme.secondaryColor,
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: theme.secondaryColor,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: theme.secondaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  registerText: {
    marginTop: 10,
    color: theme.secondaryColor,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
