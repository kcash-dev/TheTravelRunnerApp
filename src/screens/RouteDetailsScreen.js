import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const RouteDetailsScreen = ({ route }) => {
    const { data } = route.params;
    return (
        <View>
            <Text>This is the route details screen</Text>
        </View>
    )
}

export default RouteDetailsScreen

const styles = StyleSheet.create({})
