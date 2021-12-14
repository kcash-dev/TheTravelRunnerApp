import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import * as rssParser from 'react-native-rss-parser';

//Components
import TopBar from '../components/TopBar'
import RSSReader from '../components/RSSReader';

const HomeScreen = () => {
    const [ rssFeed, setRssFeed ] = useState(null)
    const getArticles = async () => {
        await fetch('https://www.thetravelrunner.com/feed')
            .then((response) => response.text())
            .then((responseData) => rssParser.parse(responseData))
            .then((rss) => {
                setRssFeed(rss), 
                console.log(rss)
            })
            .catch(err => console.err(err))
    }

    useEffect(() => {
        getArticles()
    }, [])

    return (
        <SafeAreaView>
            <TopBar />
            <RSSReader rssFeed={ rssFeed } />
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
