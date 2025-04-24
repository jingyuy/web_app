import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                const data = await response.json();
                const token = data.token;
                navigation.navigate('Home', { token });
            } else {
                const errorText = await response.text(); // Log server response for debugging
                console.error('Login failed:', errorText);
                Alert.alert('Login failed', 'Invalid email or password');
            }
        } catch (error) {
            console.error('Error during login:', error); // Log error details
            Alert.alert('Error', 'Something went wrong');
        }
    };

    return (
        <View>
            <Text>Login</Text>
            <TextInput testID="email"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                testID="password"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button testID="login" title="Login" onPress={handleLogin} />
        </View>
    );
};

export default LoginScreen;
