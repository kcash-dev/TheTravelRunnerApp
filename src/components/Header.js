import React, { useState, useEffect } from 'react'
import { Animated, ImageBackground, StyleSheet, View,  useWindowDimensions, FlatList, Text, Pressable } from 'react-native'
import tailwind from 'tailwind-rn'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Header = ({ data, routeName, screenName, subtitle, image, backButton }) => {
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
        <View style={ tailwind(`w-full`) }>
            <Pressable
                style={({ pressed }) => [{
                    opacity: pressed ? 0.5 : 1
                },
                tailwind(`w-full items-center justify-center h-36 pb-1`)
                ]}
                onPress={() => navigation.navigate(routeName, { data: item })}
            >
                <ImageBackground
                    source={{ uri: item.image }}
                    style={ tailwind(`w-full h-full justify-center items-center`) }
                    resizeMode='cover'
                >
                    { item.distance ?
                        <View style={ tailwind(`bg-black bg-opacity-60 w-2/3 justify-center items-center rounded-lg`) }>
                            <Text style={ tailwind(`text-center text-white text-xl font-bold`) }>{ item.name }</Text>
                            <View style={ tailwind(`flex-row items-center justify-between w-full`) }>
                                <Text style={ tailwind(`text-center text-white text-sm px-7`) }>{ item.distance } kilometers</Text>
                                <MaterialCommunityIcons name="map-marker-distance" size={16} color="white" style={ tailwind(`px-7`) } />
                            </View>
                            <View style={ tailwind(`flex-row items-center justify-between w-full`) }>
                                <Text style={ tailwind(`text-center text-white text-sm px-7 pb-3`) }>{ item.elevation } meters</Text>
                                <FontAwesome5 name="mountain" size={12} color="white" style={ tailwind(`px-7 pb-3`) } />
                            </View>
                        </View> 
                        :
                        <Text style={ tailwind(`bg-black text-white w-2/3 text-center text-xl font-bold bg-opacity-60`) }>{ item.name }</Text>
                    }
                </ImageBackground>
            </Pressable>
        </View>
    )

    return (
        <View>
            <View style={ tailwind(`bg-black bg-opacity-50`) }>
                <Animated.View style={[ tailwind(`rounded-lg`), { height: headerHeight, width: width }, styles.shadow ]}>
                    <ImageBackground
                        source={{ uri: image }}
                        style={{ width: width, height: '100%' }}
                        resizeMode="cover"
                    >
                        <View style={ tailwind(`flex-1 bg-black bg-opacity-40 items-center w-full`) }>
                            <View style={ tailwind(`flex-row justify-evenly items-center`) }>
                                <View>
                                    <Animated.Text 
                                        style={[ tailwind(`mt-5 px-10 text-center font-bold text-white text-opacity-100 italic text-2xl`), { opacity: headerTitleOpacity } ]}>
                                            { screenName }
                                    </Animated.Text>
                                    { subtitle ?
                                        <Animated.Text 
                                            style={[ tailwind(`text-center text-white text-opacity-90 text-xs`), { opacity: headerTitleOpacity} ]}>
                                                { subtitle }
                                        </Animated.Text>
                                        :
                                        null
                                    }
                                </View>
                            </View>
                            <Animated.Text 
                                style={[ tailwind(`absolute bottom-20 mb-2 text-4xl font-bold text-white text-opacity-90 italic`), { opacity: heroTitleOpacity} ]}>
                                    { screenName }
                            </Animated.Text>
                            { subtitle ? 
                                <Animated.Text 
                                    style={[ tailwind(`absolute bottom-16 px-2 text-center text-white text-opacity-90`), { opacity: heroTitleOpacity} ]}>
                                        { subtitle }
                                </Animated.Text>
                                :
                                null
                            }
                        </View>
                    </ImageBackground>
                </Animated.View>
            </View>
            { backButton ? 
                <Pressable 
                    style={({ pressed }) => [{
                            opacity: pressed ? 0.5 : 1
                        },
                        tailwind(`w-full h-10 bg-green-900 items-center justify-center`)
                    ]}
                    onPress={() => navigation.pop()}
                >
                    <Text style={ tailwind(`text-center text-white font-bold`) }>Go Back</Text>
                </Pressable>
                :
                null
            }
            <FlatList
                data={ data }
                renderItem={ renderItem }
                keyExtractor={item => item.name }
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

export default Header

const styles = StyleSheet.create({})
