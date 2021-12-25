import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

//Components
import Header from '../components/Header';
import CategoryReader from '../components/CategoryReader';

const CategoryReaderScreen = ({ route }) => {
    const { categoryName, data } = route.params;

    console.log(data)

    return (
        <View>
            <Header screenName={ categoryName }/>
            <CategoryReader categoryRssFeed={ data } />
        </View>
    )
}

export default CategoryReaderScreen

const styles = StyleSheet.create({})
