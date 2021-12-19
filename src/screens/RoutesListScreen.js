import React, { useState } from 'react'
import { Animated, ImageBackground, StyleSheet, View,  useWindowDimensions, FlatList, Text, Pressable } from 'react-native'
import tailwind from 'tailwind-rn'
import { useNavigation } from '@react-navigation/native'

const DATA = {
    countries: [
        {
            name: 'USA',
            places: [
                {
                    name: 'Maryland',
                    image: 'https://i.imgur.com/w83FfLb.jpg',
                    routes: [
                        {
                            name: 'Bacon Ridge Natural Area',
                            image: 'https://i.imgur.com/15cUHCo.jpg',
                            cityState: 'Annapolis, Maryland',
                            routes: [
                                {
                                    distance: '14.5',
                                    elevation: '',
                                    gpxUrl: 'https://drive.google.com/file/d/1gjOQuqtd_xuktTRwOqvp2Yn428hjsfT2/view?usp=sharing',
                                    image: 'https://i.imgur.com/1gWORG2.png'
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'Ohio',
                    image: 'https://i.imgur.com/uiD7ZbW.jpg',
                    routes: [
                        {
                            name: 'Bark Camp State Park',
                            gpxUrl: '',
                            image: 'https://i.imgur.com/8jFou5f.jpg',
                            cityState: 'Belmont, Ohio',
                            routes: [

                            ]
                        }
                    ]
                },
                {
                    name: 'Colorado',
                    image: 'https://i.imgur.com/AphUqNv.jpg',
                    routes: [
                        {
                            name: 'Staunton State Park',
                            image: 'https://i.imgur.com/J0V6ux5.jpg',
                            cityState: 'Pine, Colorado',
                            routes: [

                            ]
                        }
                    ]
                },
                {
                    name: 'Nevada',
                    image: 'https://i.imgur.com/q0Tv7NL.jpg',
                    routes: [
                        {
                            name: 'Valley of Fire',
                            image: 'https://i.imgur.com/VGETVH9.jpg',
                            cityState: 'Las Vegas, Nevada',
                            routes: [

                            ]
                        },
                        {
                            name: 'Red Rock Canyon National Park',
                            image: 'https://i.imgur.com/URjvJbf.jpg',
                            cityState: 'Las Vegas, Nevada',
                            routes: [

                            ]
                        },
                        {
                            name: 'Hoover Dam',
                            image: 'https://i.imgur.com/dqWc8AX.jpg',
                            cityState: 'Las Vegas, Nevada',
                            routes: [

                            ]
                        }
                    ]
                }
            ],
            image: 'https://i.imgur.com/tMxIWTo.jpg'
        },
        {
            name: 'Thailand',
            places: [
                {
                    name: "Phuket",
                    image: 'https://i.imgur.com/1rXUs6g.jpg',
                    routes: [
                        {
                            name: 'Thalang',
                            image: 'https://i.imgur.com/d1SyPhN.jpg',
                            routes: [

                            ]
                        },
                        {
                            name: 'Kathu',
                            image: 'https://i.imgur.com/oJifjMf.jpg',
                            routes: [

                            ]
                        },
                        {
                            name: 'Patong',
                            image: 'https://i.imgur.com/nhWF7gy.jpg',
                            routes: [

                            ]
                        },
                        {
                            name: 'Chalong',
                            image: 'https://i.imgur.com/aHPddFw.jpg',
                            routes: [

                            ]
                        },
                        {
                            name: 'Nai Harn',
                            image: 'https://i.imgur.com/T4AyJHe.jpg',
                            routes: [

                            ]
                        }
                    ]
                },
                {
                    name: 'Chiang Mai',
                    image: 'https://i.imgur.com/kepjBLR.jpg',
                    routes: [
                        {
                            name: 'Buddhas Footprint',
                            image: ''
                        }
                    ]
                }
            ],
            image: 'https://i.imgur.com/DL7c59N.jpg'
        }
    ]
}

const RoutesListScreen = () => {
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
            onPress={() => navigation.navigate('CountryRoutes', { data: item })}
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
                    source={{ uri: 'https://i.imgur.com/4P4sInU.jpg' }}
                    style={{ width: width, height: '100%' }}
                    resizeMode="cover"
                >
                    <View style={ tailwind(`flex-1 bg-black bg-opacity-40 items-center w-full`) }>
                        <View style={ tailwind(`flex-row justify-evenly items-center`) }>
                            <View>
                                <Animated.Text style={[ tailwind(`mt-5 px-10 text-center font-bold text-white text-opacity-100 italic text-2xl`), { opacity: headerTitleOpacity } ]}>Routes</Animated.Text>
                                <Animated.Text style={[ tailwind(`text-center text-white text-opacity-90 text-xs`), { opacity: headerTitleOpacity} ]}>In need of a trail? I have something for you.</Animated.Text>
                            </View>
                        </View>
                        <Animated.Text style={[ tailwind(`absolute bottom-20 mb-2 text-4xl font-bold text-white text-opacity-90 italic`), { opacity: heroTitleOpacity} ]}>Routes</Animated.Text>
                        <Animated.Text style={[ tailwind(`absolute bottom-16 px-2 text-center text-white text-opacity-90`), { opacity: heroTitleOpacity} ]}>In need of a trail? I have something for you.</Animated.Text>
                    </View>
                </ImageBackground>
            </Animated.View>
            <FlatList
                data={ DATA.countries }
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

export default RoutesListScreen

const styles = StyleSheet.create({})
