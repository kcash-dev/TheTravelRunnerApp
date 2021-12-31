import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import tailwind from 'tailwind-rn'

const ShoppingCartBar = () => {
    return (
        <Pressable 
            style={({ pressed }) => [
                { opacity: pressed ? 0.5 : 1 },
                tailwind(`w-full bg-green-900 h-12 absolute bottom-0 justify-center`)
            ]}
        >
            <Text style={ tailwind(`text-white text-center font-bold`) }>Shopping Cart Total: $0.00</Text>
        </Pressable>
    )
}

export default ShoppingCartBar

const styles = StyleSheet.create({})
