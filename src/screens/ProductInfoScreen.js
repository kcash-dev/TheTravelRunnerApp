import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import tailwind from 'tailwind-rn';
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../store/taskAction';

//Components
import ShoppingCartBar from '../components/ShoppingCartBar';

const ProductInfoScreen = ({ route }) => {
    const { item } = route.params;
    const [ isItemInCart, setIsItemInCart ] = useState(true)

    const dispatch = useDispatch()
    const addItemToCart = (item) => dispatch(addItem(item))

    return (
        <View
            style={ tailwind(`justify-center items-center bg-white flex-1`) }
        >
                <Image 
                    source={{ uri: item.image }}
                    style={ tailwind(`h-64 w-64`) }
                />
                <Text style={ tailwind(`text-3xl font-bold`) }>{ item.name }</Text>
                <Text>{ item.description }</Text>
                <Pressable
                    style={({ pressed }) => [
                        { opacity: pressed ? 0.5 : 1 },
                        tailwind(`px-12 py-4 bg-green-900 rounded-lg mt-10`),
                        styles.shadow
                    ]}
                    onPress={() => addItemToCart(item)}
                >
                    <Text style={ tailwind(`text-white font-bold text-center`) }>Add to Cart</Text>
                </Pressable>
                { isItemInCart ?
                    <ShoppingCartBar />
                    :
                    null
                }
        </View>
    )
}

export default ProductInfoScreen

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
