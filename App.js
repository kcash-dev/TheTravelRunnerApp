import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

//Navs
import HomeNav from './src/navs/HomeNav';
import RoutesNav from './src/navs/RoutesNav';
import ExtrasNav from './src/navs/ExtrasNav';
import ShoppingNav from './src/navs/ShoppingNav';

//Redux Store
import store from './src/store/store'
import { Provider } from 'react-redux'

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={ store }>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = 'feed'
              } else if (route.name === 'Routes') {
                iconName = 'map-signs'
              } else if (route.name === 'Extras') {
                iconName = 'user-plus'
              } else if (route.name === 'Shopping') {
                iconName = 'shopping-cart'
              }

              // You can return any component that you like here!
              return <FontAwesome name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#79B45D',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Home" component={ HomeNav } options={{ title: 'Blog Feed', headerShown: false }}/>
          <Tab.Screen name="Routes" component={ RoutesNav } options={{ title: 'Routes', headerShown: false }}/>
          <Tab.Screen name="Extras" component={ ExtrasNav } options={{ title: 'Extras', headerShown: false }}/>
          <Tab.Screen name="Shopping" component={ ShoppingNav } options={{ title: 'Shopping', headerShown: false }}/>
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
