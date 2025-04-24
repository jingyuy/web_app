import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';

const HomeScreen = ({ route }) => {
    const { token } = route.params;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/home`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (response.ok) {
                    const result = await response.json();
                    setData(result);
                } else {
                    const errorText = await response.text(); // Log server response for debugging
                    console.error('Failed to fetch home data:', errorText);
                    Alert.alert('Error', 'Failed to fetch data');
                }
            } catch (error) {
                console.error('Error during data fetch:', error); // Log error details
                Alert.alert('Error', 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    if (loading) {
        return <ActivityIndicator />;
    }

    return (
        <View>
            <Text>{data.data}</Text>
        </View>
    );
};

export default HomeScreen;
