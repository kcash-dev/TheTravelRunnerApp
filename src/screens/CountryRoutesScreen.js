import React, { useState } from 'react'
import { StyleSheet, Text, View, useWindowDimensions, ImageBackground, FlatList, Pressable, Animated } from 'react-native'
import tailwind from 'tailwind-rn';
import { useNavigation } from '@react-navigation/native'

const CountryRoutesScreen = ({ route }) => {
    const { data } = route.params;

    const [ state, setState ] = useState({
        scrollY: new Animated.Value(0)
    })

    const navigation = useNavigation();

    const { width } = useWindowDimensions();
    const HEADER_EXPANDED_HEIGHT = 250
    const HEADER_COLLAPSED_HEIGHT = 80
    const headerTitleOpacity = state.scrollY.interpolate({
        inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
        outputRange: [0, 1],
        extrapolate: 'clamp'
    })

    const heroTitleOpacity = state.scrollY.interpolate({
        inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
        outputRange: [1, 0],
        extrapolate: 'clamp'
    })

    const headerHeight = state.scrollY.interpolate({
        inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
        outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
        extrapolate: 'clamp'
    })

    const renderItem = ({ item }) => (
        <Pressable
            style={({ pressed }) => [{
                opacity: pressed ? 0.5 : 1
            },
            tailwind(`w-full items-center justify-center h-36 pb-1`)
            ]}
            onPress={() => navigation.navigate('StateRoutes', { data: item })}
        >
            <ImageBackground
                source={{ uri: item.image }}
                style={ tailwind(`w-full h-full justify-center items-center`) }
                resizeMode='cover'
            >
                <Text style={ tailwind(`bg-black text-white w-2/3 text-center text-xl font-bold bg-opacity-60`) }>{ item.name }</Text>
            </ImageBackground>
        </Pressable>
    )
    
    return (
        <View>
            <Animated.View style={[ tailwind(`rounded-lg`), { height: headerHeight, width: width }, styles.shadow ]}>
                <ImageBackground
                    source={{ uri: data.image }}
                    style={{ width: width, height: '100%' }}
                    resizeMode="cover"
                >
                    <View style={ tailwind(`flex-1 bg-black bg-opacity-40 items-center w-full`) }>
                        <View style={ tailwind(`flex-row justify-evenly items-center`) }>
                            <View>
                                <Animated.Text style={[ tailwind(`mt-5 px-10 text-center font-bold text-white text-opacity-100 italic text-2xl`), { opacity: headerTitleOpacity } ]}>{ data.name } Routes</Animated.Text>
                            </View>
                        </View>
                        <Animated.Text style={[ tailwind(`absolute bottom-20 mb-2 text-4xl font-bold text-white text-opacity-90 italic`), { opacity: heroTitleOpacity} ]}>{ data.name } Routes</Animated.Text>
                    </View>
                </ImageBackground>
            </Animated.View>
            <Pressable
                style={({ pressed }) => [{
                    opacity: pressed ? 0.5 : 1
                },
                tailwind(`w-full h-10 justify-center items-center bg-green-900`)
                ]}
                onPress={() => navigation.pop()}
            >
                <Text style={ tailwind(`text-white font-bold`) }>Go Back</Text>
            </Pressable>
            <FlatList 
                data={ data.places }
                renderItem={ renderItem }
                keyExtractor={item => item.name}
                contentContainerStyle={ tailwind(`h-full`) }
                style={ tailwind(`h-full`)}
                onScroll={Animated.event(
                    [{ nativeEvent: {
                        contentOffset: {
                        y: state.scrollY
                        }
                    }
                    }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            />
        </View>
    )
}

export default CountryRoutesScreen

const styles = StyleSheet.create({})
