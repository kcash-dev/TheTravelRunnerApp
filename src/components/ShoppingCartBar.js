import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View, Pressable, Animated, Dimensions } from 'react-native'
import tailwind from 'tailwind-rn';
import { useSelector } from 'react-redux' 

const ShoppingCartBar = () => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [ isShowing, setIsShowing ] = useState(false)
    const animation = useRef(new Animated.Value(650)).current;
    const cart = useSelector(state => state.cart)

    const showShoppingScreen = () => {
        setIsShowing(true)
        Animated.timing(animation, {
            toValue: 20,
            duration: 600,
            useNativeDriver: true
        }).start()
    }

    const hideShoppingScreen = () => {
        setIsShowing(false)
        Animated.timing(animation, {
            toValue: 650,
            duration: 600,
            useNativeDriver: true
        }).start()
    }

    return (
        <View style={{ flex: 1 }}>
            <Pressable 
                style={({ pressed }) => [
                    { opacity: pressed ? 0.7 : 1 },
                    tailwind(`w-full bg-green-900 h-12 absolute bottom-0 justify-center`)
                ]}
                onPress={ () => showShoppingScreen() }
            >
                <Text style={ tailwind(`text-white text-opacity-100 text-center font-bold`) }>Shopping Cart Total: $0.00</Text>
            </Pressable>
            <Animated.View
                style={[ 
                    tailwind(`absolute bg-white justify-center items-center`), 
                    { height: windowHeight, width: windowWidth, zIndex: 1, transform: [{ translateY: animation }] } 
                ]}
            >
                <Pressable 
                    style={({ pressed }) => [
                        { opacity: pressed ? 0.7 : 1 },
                        tailwind(`w-full bg-green-900 h-12 absolute top-0 justify-center`)
                    ]}
                    onPress={ () => hideShoppingScreen() }
                >
                    <Text style={ tailwind(`text-white text-opacity-100 text-center font-bold`) }>Shopping Cart Total: $0.00</Text>
                </Pressable>
                { cart.length > 0 ?
                    <FlatList 
                        data={ cart }
                        renderItem={({item}) => (
                            <CartProduct item={ item } />
                        )}
                    />
                    :
                    <Text>There's nothing here</Text>
                }
            </Animated.View>
        </View>
    )
}

export default ShoppingCartBar

const styles = StyleSheet.create({})
