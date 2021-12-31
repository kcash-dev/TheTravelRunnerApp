import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import ShoppingScreen from '../screens/ShoppingScreen';
import ProductInfoScreen from '../screens/ProductInfoScreen';

const Stack = createNativeStackNavigator();

const ShoppingNav = () => {
    return (
        <Stack.Navigator
            initialRouteName="ShoppingScreen"
        >
            <Stack.Screen name="ShoppingScreen" component={ShoppingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ProductInfoScreen" component={ProductInfoScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      );
}

export default ShoppingNav

const styles = StyleSheet.create({})
