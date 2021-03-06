import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import RoutesListScreen from '../screens/RoutesListScreen';
import CountryRoutesScreen from '../screens/CountryRoutesScreen';
import StateRoutesScreen from '../screens/StateRoutesScreen';
import RoutesScreen from '../screens/RoutesScreen';
import RouteDetailsScreen from '../screens/RouteDetailsScreen';

const Stack = createNativeStackNavigator();

const RoutesNav = () => {
    return (
        <Stack.Navigator
            initialRouteName="RoutesList"
        >
            <Stack.Screen name="RoutesList" component={RoutesListScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CountryRoutes" component={ CountryRoutesScreen } options={{ headerShown: false }} />
            <Stack.Screen name="StateRoutes" component={ StateRoutesScreen } options={{ headerShown: false }} />
            <Stack.Screen name="RoutesScreen" component={ RoutesScreen } options={{ headerShown: false }} />
            <Stack.Screen name="RouteDetails" component={ RouteDetailsScreen } options={{ headerShown: false }} />
        </Stack.Navigator>
      );
}

export default RoutesNav

const styles = StyleSheet.create({})


