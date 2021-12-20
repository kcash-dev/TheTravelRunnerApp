import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Maps from '../components/Maps';
import tailwind from 'tailwind-rn';

const RouteDetailsScreen = ({ route }) => {
    const { data } = route.params;

    console.log(data)

    return (
        <View style={ tailwind(`flex-1`) }>
            <View style={ tailwind(`h-1/2`) }>
                <Maps origin={ data.origin } />
            </View>
        </View>
    )
}

export default RouteDetailsScreen

const styles = StyleSheet.create({})
