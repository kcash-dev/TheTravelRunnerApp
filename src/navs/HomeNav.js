import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import HomeScreen from '../screens/HomeScreen';
import ReadPostScreen from '../screens/ReadPostScreen';

const Stack = createNativeStackNavigator();

const HomeNav = () => {
    return (
        <Stack.Navigator
            initialRouteName="HomeScreen"
        >
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ReadPost" component={ReadPostScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      );
}

export default HomeNav

const styles = StyleSheet.create({})
