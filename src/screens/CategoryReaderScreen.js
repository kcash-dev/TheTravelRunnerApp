import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

//Components
import Header from '../components/Header';
import CategoryReader from '../components/CategoryReader';

const CategoryReaderScreen = ({ route }) => {
    const { categoryName, data } = route.params;
    const [ filteredPosts, setFilteredPosts ] = useState()

    const filteredCategories = data.filter(item => {
        return item.categories.find(obj => obj.name === categoryName)
    })

    useEffect(() => {
        setFilteredPosts(filteredCategories)
    }, [])

    return (
        <View>
            <CategoryReader categoryRssFeed={ filteredPosts } categoryName={ categoryName }/>
        </View>
    )
}

export default CategoryReaderScreen

const styles = StyleSheet.create({})
