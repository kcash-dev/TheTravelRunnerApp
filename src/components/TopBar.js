import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import tailwind from 'tailwind-rn'

const TopBar = ({ title, author, categories }) => {
    const [ postCategories, setPostCategories ] = useState(null)

    useEffect(() => {
        if(categories) {
            const categoriesList = categories.join(', ')
            setPostCategories(categoriesList)
        }
    }, [ categories ])

    return (
        <View style={[ tailwind(`py-3 bg-green-900 items-center justify-center`), styles.shadow ]}>
           { title ?
            <View style={ tailwind(`pl-1`) }>
                <Text style={ tailwind(`text-white font-bold text-lg flex-wrap`) }>{ title }</Text>
                <Text style={ tailwind(`text-white italic py-2`) }>Written by: { author }</Text>
                <Text style={ tailwind(`text-white text-xs`) }>Categories: { postCategories }</Text>
            </View>
            :
            <View style={ tailwind(`flex-row items-center justify-evenly w-full`) }>
                <Text style={ tailwind(`text-white text-3xl flex-wrap italic font-bold`) }>The Travel Runner</Text>
                <Image 
                    source={{ uri: 'https://i.imgur.com/smHitpL.png' }}
                    style={ tailwind(`h-16 w-16`) }
                />
            </View>
            }
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
