import React from 'react'
import { StyleSheet, View } from 'react-native'
import tailwind from 'tailwind-rn';
import Header from '../components/Header';

const CountryRoutesScreen = ({ route }) => {
    const { data } = route.params;
    return (
        <View style={ tailwind(`flex-1`) }>
            <Header screenName={ data.name } image={ data.image } data={ data.places } routeName={ 'StateRoutes' } backButton={ true } />
        </View>
    )
}

export default CountryRoutesScreen

const styles = StyleSheet.create({})
