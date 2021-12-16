import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import tailwind from 'tailwind-rn'

const CategoryView = ({ category, subCategory }) => {
    const [ color, setColor ] = useState('')
    const [ subColor, setSubColor ] = useState('')
    const [ categoryName, setCategoryName ] = useState(category[0].name.toLowerCase())
    const [ subCategoryName, setSubCategoryName ] = useState(subCategory[0].name.toLowerCase())
    function changeCategoryColor() {
        if(categoryName === 'running') {
            setColor('green')
        } else if (categoryName === 'travel') {
            setColor('red')
        } else {
            setColor('blue')
        }
    }

    function changeSubCategoryColor() {
        if(subCategoryName === 'trail running') {
            setSubColor('blue')
        } else if (subCategoryName === 'opinion') {
            setSubColor('yellow')
        } else if (subCategoryName === 'places to visit') {
            setSubColor('purple')
        } else {
            setSubColor('indigo')
        }
    }

    useEffect(() => {
        changeCategoryColor()
        changeSubCategoryColor()
    }, [ category ])

    return (
        <View style={ tailwind(`flex-row items-center absolute left-3 top-2`) }>
            <View style={[ tailwind(`w-16 h-12 items-center justify-center rounded-lg bg-${color}-500 opacity-80 mr-3`), styles.shadow ]}>
                <Text style={ tailwind(`text-white font-bold text-center`) }>{ categoryName }</Text>
            </View>
            <View style={[ tailwind(`w-16 h-12 items-center justify-center rounded-lg bg-${subColor}-500 opacity-80`), styles.shadow ]}>
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
