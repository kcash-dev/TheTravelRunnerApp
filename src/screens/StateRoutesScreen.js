import React from 'react'
import { StyleSheet, View } from 'react-native'
import tailwind from 'tailwind-rn';
import Header from '../components/Header';

const StateRoutesScreen = ({ route }) => {
    const { data } = route.params;

    return (
        <View style={ tailwind(`flex-1`) }>
            <Header screenName={ data.name } image={ data.image } data={ data.routes } routeName={ 'RoutesScreen' } backButton={ true } />
        </View>
    )
}

export default StateRoutesScreen

const styles = StyleSheet.create({})
