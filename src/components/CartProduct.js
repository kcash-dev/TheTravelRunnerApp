import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View, Image, Pressable, Animated } from 'react-native'
import tailwind from 'tailwind-rn'
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CartProduct = ({ item }) => {
    const [ quantity, setQuantity ] = useState(1)
    const [ deleteShown, setDeleteShown ] = useState(false)
    const [ itemTotal, setItemTotal ] = useState(quantity * item.price)
    const show = useRef(new Animated.Value(0)).current;
    const translation = useRef(new Animated.Value(50)).current;

    const flipAnimation = useRef(new Animated.Value(0)).current;

    let flipRotation = 0;
    flipAnimation.addListener(({value}) => flipRotation = value);

    const flipToFrontStyle = {
        transform: [
            { rotateY: flipAnimation.interpolate({
                inputRange: [0, 180],
                outputRange: ["0deg", "180deg"]
            })}
        ]
    }

    const flipToBackStyle = {
        transform: [
            { rotateY: flipAnimation.interpolate({
                inputRange: [0, 180],
                outputRange: ["180deg", "360deg"]
            })}
        ]
    }

    const flipToFront = () => {
        Animated.timing(flipAnimation, {
            toValue: 180,
            duration: 300,
            useNativeDriver: true
        }).start()
    }

    const flipToBack = () => {
        Animated.timing(flipAnimation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
        }).start()
    }

    const showOptions = () => {
        setDeleteShown(true)
        Animated.timing(translation, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true
        }).start()
        Animated.timing(show, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true
        }).start();
    }
    const hideOptions = () => {
        setDeleteShown(false)
        Animated.timing(translation, {
            toValue: 50,
            duration: 400,
            useNativeDriver: true
        }).start()
        Animated.timing(show, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true
        }).start()
    }

    return (
        <View style={ tailwind(`justify-center items-center`) }>
            <Pressable 
                style={({ pressed }) => [
                    { 
                        opacity: pressed ? 0.7 : 1,
                    },
                    tailwind(`w-11/12 h-32 rounded-lg my-2 bg-white`)
                ]}
                onLongPress={() => !!flipRotation ? flipToBack() : flipToFront() }
            >
                <Animated.View style={[ { ...flipToBackStyle }, tailwind(`flex-row h-32 w-full bg-white rounded-lg absolute`), styles.shadow ]}>
                    <Pressable 
                        style={({pressed}) => [
                            { 
                                opacity: pressed ? 0.7 : 1,
                                height: '100%'
                            },
                            tailwind(`bg-red-600 justify-center w-1/2 items-center rounded-lg`) 
                        ]}
                        
                    >
                        <AntDesign name="delete" size={24} color="white" />
                    </Pressable>
                    <Pressable 
                        style={({pressed}) => [
                            { 
                                opacity: pressed ? 0.7 : 1,
                                height: '100%'
                            },
                            tailwind(`bg-green-600 w-1/2 justify-center items-center rounded-lg`) 
                        ]}
                    >
                        <AntDesign name="check" size={24} color="white" />
                    </Pressable>
                </Animated.View>
                <Animated.View style={[ tailwind(`w-full h-full flex-row justify-between rounded-lg items-center bg-white`), { backfaceVisibility: 'hidden', ...flipToFrontStyle }, styles.shadow ]}>
                    <View style={ tailwind(`w-3/12 bg-green-900 h-full rounded-lg`) }>
                        <Image
                            source={{ uri: item.image }}
                            style={ tailwind(`h-full w-full`) }
                            resizeMode='cover'
                        />
                    </View>
                    <View style={ tailwind(`w-6/12 h-full`) }>
                        <View style={ tailwind(`h-1/2`) }>
                            <Text style={ tailwind(`font-bold`) }>{ item.name }</Text>
                            <View style={ tailwind(`flex-row items-center justify-start`) }>
                                <Text style={ tailwind(`text-xs font-bold`) }>
                                    <Text style={ tailwind(`font-bold text-gray-400`) }>
                                        Color:
                                    </Text> 
                                    Black
                                </Text>
                                <Text style={ tailwind(`text-xs font-bold pl-3`) }>
                                    <Text style={ tailwind(`font-bold text-gray-400`) }>
                                        Size:
                                    </Text> 
                                    L
                                </Text>
                            </View>
                        </View>
                        <View style={ tailwind(`h-1/2`) }>
                            <View style={ tailwind(`flex-row justify-evenly mt-5`) }>
                                <Pressable 
                                    style={({pressed}) => [ { opacity: pressed ? 0.7 : 1 }, 
                                        tailwind(`h-8 w-8 rounded-full bg-white justify-center items-center`), 
                                        styles.shadow 
                                    ]}
                                    onPress={() => setQuantity(quantity - 1)}
                                >
                                    <AntDesign name="minus" size={22} color="black" />
                                </Pressable>
                                <Text style={ tailwind(`font-bold text-lg`) }>{ quantity }</Text>
                                <Pressable 
                                    style={({pressed}) => [ { opacity: pressed ? 0.7 : 1 }, 
                                        tailwind(`h-8 w-8 rounded-full bg-white justify-center items-center`), 
                                        styles.shadow 
                                    ]}
                                    onPress={() => setQuantity(quantity + 1)}
                                >
                                    <AntDesign name="plus" size={22} color="black" />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                    <View style={ tailwind(`w-3/12 h-full`) }>
                        <View style={ tailwind(`h-1/2`) }>
                            <Pressable
                                style={({pressed}) => [
                                    { opacity: pressed ? 0.7 : 1 },
                                    tailwind(`absolute top-1 right-1`)
                                ]}
                            >
                                <MaterialCommunityIcons name="menu-down-outline" size={24} color="black" />
                            </Pressable>
                        </View>
                        <View style={ tailwind(`h-1/2 w-full mt-8`) }>
                            <Text style={ tailwind(`text-center font-bold text-lg`) }>${ quantity * item.price }</Text>
                        </View>
                    </View>
                </Animated.View>
            </Pressable>
        </View>
    )
}

export default CartProduct

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
