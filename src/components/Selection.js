import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import tailwind from 'tailwind-rn'
import { useNavigation } from '@react-navigation/native'

const Selection = ({ name, icon, route }) => {
    const navigation = useNavigation()
    return (
        <Pressable 
            style={({ pressed }) => [
                { opacity: pressed ? 0.5 : 1 }, 
                tailwind(`w-36 h-36 border rounded-lg items-center justify-center`), 
                styles.shadow 
            ]}
            onPress={() => navigation.navigate(route)}
        >
            <Text>{ name }</Text>
        </Pressable>
    )
}

export default Selection

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    }
})
