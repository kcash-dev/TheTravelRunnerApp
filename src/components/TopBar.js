import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import tailwind from 'tailwind-rn'

const TopBar = () => {
    return (
        <View style={[ tailwind(`h-20 bg-green-900 items-center justify-center`), styles.shadow ]}>
            <Image 
                source={{ uri: 'https://i.imgur.com/smHitpL.png' }}
                style={ tailwind(`h-16 w-16`) }
            />
        </View>
    )
}

export default TopBar

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        
        elevation: 15,
    }
})
