import React, { useRef, useState, useEffect } from 'react'
import { Dimensions, StyleSheet, Text, View, FlatList, SafeAreaView, Animated, Pressable } from 'react-native'
import tailwind from 'tailwind-rn';
import { useSelector } from 'react-redux' 

//Components
import ShoppingProduct from '../components/ShoppingProduct';
import CartProduct from '../components/CartProduct';

const PRODUCTS = [
    {
        id: 100,
        name: 'ReactProX Headset',
        price: 350,
        image: 'https://i.imgur.com/SMURkYK.jpg',
        description: 'A headset combines a headphone with microphone. Headsets are made with either a single-earpiece (mono) or a double-earpiece (mono to both ears or stereo).'
    },
    {
        id: 101,
        name: 'FastLane Toy Car',
        price: 600,
        image: 'https://i.imgur.com/SMURkYK.jpg',
        description: 'A model car, or toy car, is a miniature representation of an automobile. Other miniature motor vehicles, such as trucks, buses, or even ATVs, etc. are often included in this general category.'
    },
    {
        id: 102,
        name: 'SweetHome Cupcake',
        price: 2,
        image: 'https://i.imgur.com/SMURkYK.jpg',
        description: 'A cupcake (also British English: fairy cake; Hiberno-English: bun; Australian English: fairy cake or patty cake[1]) is a small cake designed to serve one person.'
    }
];

const ShoppingScreen = () => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [ isShowing, setIsShowing ] = useState(false)
    const [ cartTotal, setCartTotal ] = useState(0)
    const animation = useRef(new Animated.Value(650)).current;
    const cart = useSelector(state => state.cart)

    console.log(cart, "CART")

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

    const getCartTotal = () => {
        let total = 0
        for (let i = 0; i < cart.length; i++) {
            total = total + cart[i].item.price
        }
        setCartTotal(total)
    }

    useEffect(() => {
        getCartTotal()
    }, [ cart ])

    console.log(cartTotal)
    
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Text style={ tailwind(`my-2 font-bold text-2xl text-center`) }>Shopping</Text>
            <FlatList 
                data={ PRODUCTS }
                renderItem={({item}) => (
                    <ShoppingProduct item={ item }/>
                )}
                contentContainerStyle={ tailwind(`py-8 mx-8`) }
                showsVerticalScrollIndicator='false'
            />
            <Pressable 
                style={({ pressed }) => [
                    { opacity: pressed ? 0.7 : 1 },
                    tailwind(`w-full bg-green-900 h-12 absolute bottom-0 justify-center rounded-t-md`)
                ]}
                onPress={ () => showShoppingScreen() }
            >
                <Text style={ tailwind(`text-white text-opacity-100 text-center font-bold`) }>Shopping Cart Total: $ { cartTotal }</Text>
                <View style={ tailwind(`h-7 w-7 bg-white rounded-full justify-center items-center absolute right-2`) }>
                    <Text style={ tailwind(`font-bold text-lg`) }>{ cart.length }</Text>
                </View>
            </Pressable>
            <Animated.View
                style={[ 
                    tailwind(`absolute bg-white items-center`), 
                    { height: windowHeight, width: windowWidth, zIndex: 1, transform: [{ translateY: animation }] } 
                ]}
            >
                <Pressable 
                    style={({ pressed }) => [
                        { opacity: pressed ? 0.7 : 1 },
                        tailwind(`w-full bg-green-900 h-12 justify-center rounded-b-md`)
                    ]}
                    onPress={ () => hideShoppingScreen() }
                >
                    <Text style={ tailwind(`text-white text-opacity-100 text-center font-bold`) }>Shopping Cart</Text>
                    <View style={ tailwind(`h-7 w-7 bg-white rounded-full justify-center items-center absolute right-2`) }>
                        <Text style={ tailwind(`font-bold text-lg`) }>{ cart.length }</Text>
                    </View>
                </Pressable>
                { cart.length > 0 ?
                    <View>
                        <FlatList 
                            data={ cart }
                            contentContainerStyle={ tailwind(`mt-2 bg-white`) }
                            renderItem={({item}) => (
                                <CartProduct item={ item.item } />
                            )}
                            keyExtractor={(item) => item.item.name}
                        />
                        <View>
                            
                        </View>
                    </View>
                    :
                    <Text style={ tailwind(`text-center`) }>There's nothing here</Text>
                }
            </Animated.View>
        </SafeAreaView>
    )
}

export default ShoppingScreen

const styles = StyleSheet.create({})
