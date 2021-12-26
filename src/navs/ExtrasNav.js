import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import ExtrasScreen from '../screens/ExtrasScreen';
import ShoeGuideScreen from '../screens/ShoeGuideScreen';

const Stack = createNativeStackNavigator();

const ExtrasNav = () => {
    return (
        <Stack.Navigator
            initialRouteName="ExtrasScreen"
        >
            <Stack.Screen name="ExtrasScreen" component={ExtrasScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ShoeGuideScreen" component={ShoeGuideScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      );
}

export default ExtrasNav

const styles = StyleSheet.create({})
