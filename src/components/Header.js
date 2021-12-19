import React, { useState } from 'react'
import { Animated, ImageBackground, StyleSheet, View,  useWindowDimensions } from 'react-native'
import tailwind from 'tailwind-rn'

const Header = () => {
    const [ state, setState ] = useState({
        scrollY: new Animated.Value(0)
    })

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
                            <Animated.Image 
                                style={[ tailwind(`mt-5 h-10 w-10 rounded-lg`), { opacity: headerTitleOpacity} ]}
                                source={{ uri: 'https://i.imgur.com/smHitpL.png' }}
                            />
                            <View>
                                <Animated.Text style={[ tailwind(`mt-5 px-10 text-center font-bold text-white text-opacity-100 italic text-2xl`), { opacity: headerTitleOpacity } ]}>The Travel Runner</Animated.Text>
                                <Animated.Text style={[ tailwind(`text-center text-white text-opacity-90 text-xs`), { opacity: headerTitleOpacity} ]}>Where Travel and Trail Running Collide</Animated.Text>
                            </View>
                        </View>
                        <Animated.Text style={[ tailwind(`absolute bottom-20 mb-2 text-4xl font-bold text-white text-opacity-90 italic`), { opacity: heroTitleOpacity} ]}>The Travel Runner</Animated.Text>
                        <Animated.Text style={[ tailwind(`absolute bottom-16 px-2 text-center text-white text-opacity-90`), { opacity: heroTitleOpacity} ]}>Where Travel and Trail Running Collide</Animated.Text>
                        <Animated.Image 
                            style={[ tailwind(`absolute rounded-lg top-6 left-2 h-20 w-20`), { opacity: heroTitleOpacity} ]}
                            source={{ uri: 'https://i.imgur.com/smHitpL.png' }}
                        />
                    </View>
                </ImageBackground>
            </Animated.View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({})
