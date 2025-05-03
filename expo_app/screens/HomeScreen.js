import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import axios from 'axios';
import env from '../config/env';
import { useAuth } from '../context/AuthContext';

const Tab = createBottomTabNavigator();

function HomeTab() {
  const { token, signOut } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${env.backendUrl}/home`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data);
      } catch (error) {
        if (error.response?.status === 401) {
          signOut(); // This will redirect to login
        }
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, signOut]);

  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Data:</Text>
      <Text>{data.data}</Text>
    </View>
  );
}

function ProfileTab() {
  const { token, signOut } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${env.backendUrl}/home`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data);
      } catch (error) {
        if (error.response?.status === 401) {
          signOut(); // This will redirect to login
        }
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, signOut]);

  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Data:</Text>
      <Text>{data.data}</Text>
    </View>
  );
}

function SettingsTab() {
  const { token, signOut } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${env.backendUrl}/home`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data);
      } catch (error) {
        if (error.response?.status === 401) {
          signOut(); // This will redirect to login
        }
        console.error('Error fetching settings data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, signOut]);

  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings Data:</Text>
      <Text>{data.data}</Text>
      <TouchableOpacity 
        style={styles.signOutButton} 
        onPress={signOut}
        testID="signout-button"
      >
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function HomeScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        options={{ tabBarTestID: 'home-tab' }}
      >
        {() => <HomeTab />}
      </Tab.Screen>
      <Tab.Screen
        name="Profile"
        options={{ tabBarTestID: 'profile-tab' }}
      >
        {() => <ProfileTab />}
      </Tab.Screen>
      <Tab.Screen
        name="Settings"
        options={{ tabBarTestID: 'settings-tab' }}
      >
        {() => <SettingsTab />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  signOutButton: {
    backgroundColor: '#ff4444',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  signOutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
