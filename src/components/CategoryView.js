import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import tailwind from 'tailwind-rn'
import { useNavigation } from '@react-navigation/native'

const CategoryView = ({ category, subCategory, data }) => {
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

    const navigation = useNavigation();

    console.log(data)

    return (
        <View style={[ tailwind(`flex-row items-center`), { zIndex: 1 } ]}>
            <Pressable 
                style={({ pressed }) => [
                        { opacity: pressed ? 0.5 : 1 }, 
                        tailwind(`items-center justify-center rounded-lg ${color} mr-3`), 
                        styles.shadow 
                ]}
                onPress={() => navigation.navigate('CategoryReader', { categoryName: categoryName, data: data }) }
            >
                <Text 
                    style={ tailwind(`p-4 text-white font-bold text-center`) }
                >
                    { categoryName }
                </Text>
            </Pressable>
            <Pressable 
                style={({ pressed }) => [
                    { opacity: pressed ? 0.5 : .8 }, 
                    tailwind(`items-center justify-center rounded-lg ${subColor}`), 
                    styles.shadow 
                ]}
                onPress={() => navigation.navigate('CategoryReader', { categoryName: subCategoryName, data: data }) }
            >
                <Text 
                    style={ tailwind(`p-4 text-white font-bold text-center`) }
                >
                    { subCategoryName }
                </Text>
            </Pressable>
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
