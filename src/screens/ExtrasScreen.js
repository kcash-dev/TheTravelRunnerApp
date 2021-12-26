import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import tailwind from 'tailwind-rn'

//Components
import Selection from '../components/Selection'

const ExtrasScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <View style={ tailwind(`flex-row justify-evenly items-center flex-1`) }>
                <Selection name='Shoe Guide' route="ShoeGuideScreen"/>
                <Selection name='Settings' route="SettingsScreen"/>
            </View>
        </View>
    )
}

export default ExtrasScreen

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
