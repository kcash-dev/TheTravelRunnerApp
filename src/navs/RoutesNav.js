import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import RoutesListScreen from '../screens/RoutesListScreen';

const Stack = createNativeStackNavigator();

const RoutesNav = () => {
    return (
        <Stack.Navigator
            initialRouteName="RoutesList"
        >
            <Stack.Screen name="RoutesList" component={RoutesListScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      );
}

export default RoutesNav

const styles = StyleSheet.create({})
