import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Animated, useWindowDimensions, ImageBackground } from 'react-native'
import * as rssParser from 'react-native-rss-parser';

//Components
import TopBar from '../components/TopBar'
import RSSReader from '../components/RSSReader';
import tailwind from 'tailwind-rn';

const HomeScreen = () => {
    const [ rssFeed, setRssFeed ] = useState(null)
    
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

    return (
        <View style={ tailwind('flex-1') }>
            <RSSReader rssFeed={ rssFeed } />
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
