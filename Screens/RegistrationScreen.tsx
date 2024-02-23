/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import GenieLogo from '../Components/GenieLogo';

const RegistrationScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const navigation = useNavigation<any>();

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      showAlert('All fields are required');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Invalid email address');
      return;
    }

    if (password !== confirmPassword) {
      showAlert('Passwords do not match');
      return;
    }

    if (!validatePassword(password)) {
      showAlert('Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long.');
      return;
    }

    try {
      await AsyncStorage.multiSet([
        ['username', username],
        ['email', email],
        ['password', password],
      ]);
      showAlert('Registration successful!');
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.log('Error storing user data: ', error);
      showAlert('Error occurred during registration');
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const showAlert = (message: string) => {
    Alert.alert('Alert', message, [{ text: 'OK' }]);
  };

  const handleLoginNavigation = () => {
    navigation.navigate("LoginScreen");
  };

  const handleEmailBlur = () => {
    if (email && !validateEmail(email)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const handleUsernameBlur = () => {
    if (username && username.length < 6) {
      setUsernameError('Username must have at least 6 characters');
    } else {
      setUsernameError('');
    }
  };

  return (
    <View style={styles.container}>
      <GenieLogo />
      <Text style={styles.title}>Registration</Text>
      <TextInput
        style={[styles.input, usernameError ? styles.errorInput : null]}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        onBlur={handleUsernameBlur}
      />
      {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}
      <TextInput
        style={[styles.input, emailError ? styles.errorInput : null]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        onBlur={handleEmailBlur}
        keyboardType="email-address"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
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
    marginBottom: 30,
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
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
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
  loginText: {
    marginTop: 10,
    color: theme.secondaryColor,
    textDecorationLine: 'underline',
  },
});

export default RegistrationScreen;
