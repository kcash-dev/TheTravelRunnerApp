import React from 'react'
import { StyleSheet, View } from 'react-native'
import tailwind from 'tailwind-rn';

//Components
import Header from '../components/Header';

const RoutesScreen = ({ route }) => {
    const { data } = route.params;

    return (
        <View style={ tailwind(`flex-1`) }>
            <Header screen={ data.name } image={ data.image } data={ data.routes } routeName={ 'RouteDetails' } backButton={ true } />
        </View>
    )
}

export default RoutesScreen

const styles = StyleSheet.create({})
