import React from 'react'
import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import tailwind from 'tailwind-rn'
import { useNavigation } from '@react-navigation/native'

const ShoppingProduct = ({ item }) => {
    const product = item
    const navigation = useNavigation()
    return (
        <View style={ tailwind(`my-2`) }>
            <Pressable
                style={({ pressed }) => [
                    { opacity: pressed ? 0.5 : 1 },
                    tailwind(`justify-center items-center p-8 border rounded-lg bg-white`),
                    styles.shadow
                ]}
                onPress={() => navigation.navigate('ProductInfoScreen', { item: item })}
            >
                <Image 
                    source={{ uri: product.image }}
                    style={ tailwind(`h-24 w-24`) }
                />
                <Text style={ tailwind(`text-lg font-bold`) }>{ product.name }</Text>
                <Text>{ product.description }</Text>
            </Pressable>
        </View>
    )
}

export default ShoppingProduct

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
