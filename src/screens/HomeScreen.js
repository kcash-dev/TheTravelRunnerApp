import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Animated, useWindowDimensions, ImageBackground } from 'react-native'
import * as rssParser from 'react-native-rss-parser';

//Components
import TopBar from '../components/TopBar'
import RSSReader from '../components/RSSReader';
import tailwind from 'tailwind-rn';

const HomeScreen = () => {
    const [ rssFeed, setRssFeed ] = useState(null)
    const [ state, setState ] = useState({
        scrollY: new Animated.Value(0)
    })
    const getArticles = async () => {
        await fetch('https://www.thetravelrunner.com/feed/')
            .then((response) => response.text())
            .then((responseData) => rssParser.parse(responseData))
            .then((rss) => {
                setRssFeed(rss)
            })
            .catch(err => console.err(err))
    }

    useEffect(() => {
        getArticles()
    }, [])

    const { width } = useWindowDimensions();
    const HEADER_EXPANDED_HEIGHT = 130
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
        <SafeAreaView style={ tailwind('flex-1') }>
            {/* <TopBar /> */}
            {/* <Animated.View style={[ tailwind(`rounded-lg`), { height: headerHeight, width: width }, styles.shadow ]}>
                <ImageBackground
                    source={{ uri: 'https://i.imgur.com/4P4sInU.jpg' }}
                    style={{ width: width, height: '100%' }}
                    resizeMode="cover"
                >
                    <View style={ tailwind(`flex-1 bg-black bg-opacity-40 items-center`) }>
                        <Animated.Text style={[ tailwind(`mt-7 text-center font-bold text-white text-opacity-100 italic`), { opacity: headerTitleOpacity } ]}>The Travel Runner</Animated.Text>
                        <Animated.Text style={[ tailwind(`absolute bottom-20 mb-2 text-4xl font-bold text-white text-opacity-90 italic`), { opacity: heroTitleOpacity} ]}>The Travel Runner</Animated.Text>
                        <Animated.Text style={[ tailwind(`absolute bottom-16 px-2 text-center text-white text-opacity-90`), { opacity: heroTitleOpacity} ]}>Where Travel and Trail Running Collide</Animated.Text>
                        <Animated.Image 
                            style={[ tailwind(`absolute top-2 left-2 h-10 w-10`), { opacity: heroTitleOpacity} ]}
                            source={{ uri: 'https://i.imgur.com/smHitpL.png' }}
                        >

                        </Animated.Image>
                    </View>
                </ImageBackground>
            </Animated.View> */}
            <RSSReader rssFeed={ rssFeed } />
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
