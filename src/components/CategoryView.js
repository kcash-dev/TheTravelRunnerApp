import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import tailwind from 'tailwind-rn'

const CategoryView = ({ category, subCategory }) => {
    const [ color, setColor ] = useState('')
    const [ subColor, setSubColor ] = useState('')
    const [ categoryName, setCategoryName ] = useState(category[0].name.toLowerCase())
    const [ subCategoryName, setSubCategoryName ] = useState(subCategory[0].name.toLowerCase())
    function changeCategoryColor(name) {
        if(name === 'running') {
            setColor('bg-green-500')
        } else if (name === 'travel') {
            setColor('bg-red-500')
        } else {
            setColor('bg-blue-500')
        }
    }

    function changeSubCategoryColor(name) {
        if(name === 'trail running') {
            setSubColor('bg-blue-500')
        } else if (name === 'opinion') {
            setSubColor('bg-yellow-500')
        } else if (name === 'places to visit') {
            setSubColor('bg-purple-500')
        } else {
            setSubColor('bg-indigo-500')
        }
    }

    useEffect(() => {
        changeCategoryColor(categoryName)
        changeSubCategoryColor(subCategoryName)
    }, [ category ])

    return (
        <View style={ tailwind(`flex-row items-center absolute left-3 top-2`) }>
            <View style={[ tailwind(`w-16 h-12 items-center justify-center rounded-lg ${color} opacity-80 mr-3`), styles.shadow ]}>
                <Text style={ tailwind(`text-white font-bold text-center`) }>{ categoryName }</Text>
            </View>
            <View style={[ tailwind(`w-16 h-12 items-center justify-center rounded-lg ${subColor} opacity-80`), styles.shadow ]}>
                <Text style={ tailwind(`text-white font-bold text-center`) }>{ subCategoryName }</Text>
            </View>
        </View>
    )
}

export default CategoryView

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
