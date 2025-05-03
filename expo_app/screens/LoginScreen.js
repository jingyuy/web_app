import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Platform } from 'react-native';
import axios from 'axios';
import env from '../config/env';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${env.backendUrl}/login`, { email, password });
      signIn(response.data.token);
    } catch (error) {
      if (error.response) {
        // Handle HTTP errors
        const status = error.response.status;
        Alert.alert('Login Failed', `Error: ${status} - ${error.response.data.message || 'Unexpected error'}`);
      } else if (error.request) {
        // Handle network errors
        Alert.alert('Network Error', 'Unable to reach the server. Please check your connection.');
      } else {
        // Handle other errors
        Alert.alert('Error', 'An unexpected error occurred');
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        testID='email'
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        testID='password'
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button testID="login" title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
