import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { WebView } from 'react-native-webview';

//Components
import ShoeGuideHeader from '../components/ShoeGuideHeader'

const ShoeGuideScreen = () => {


    return (
        <View style={{ flex: 1 }}> 
            <WebView 
                source={{ uri: 'https://www.thetravelrunner.com/ultimate-guide-to-best-trail-running-shoes/' }}
            />
            {/* <ShoeGuideHeader screenName="The Ultimate Trail Shoe Guide" image="https://i.imgur.com/yMP6WAK.jpg" /> */}
        </View>
    )
}

export default ShoeGuideScreen

const styles = StyleSheet.create({})
