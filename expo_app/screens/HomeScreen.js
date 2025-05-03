import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import axios from 'axios';
import env from '../config/env';

const Tab = createBottomTabNavigator();

function HomeTab({ token }) {
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
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

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

function ProfileTab({ token }) {
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
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

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

function SettingsTab({ token }) {
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
        console.error('Error fetching settings data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings Data:</Text>
      <Text>{data.data}</Text>
    </View>
  );
}

export default function HomeScreen({ route }) {
  const { token } = route.params;

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        options={{ tabBarTestID: 'home-tab' }}
      >
        {() => <HomeTab token={token} />}
      </Tab.Screen>
      <Tab.Screen
        name="Profile"
        options={{ tabBarTestID: 'profile-tab' }}
      >
        {() => <ProfileTab token={token} />}
      </Tab.Screen>
      <Tab.Screen
        name="Settings"
        options={{ tabBarTestID: 'settings-tab' }}
      >
        {() => <SettingsTab token={token} />}
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
});
