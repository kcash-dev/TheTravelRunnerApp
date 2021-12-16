import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import tailwind from 'tailwind-rn'
import HTMLView from 'react-native-htmlview';

//Components
import TopBar from '../components/TopBar';

const ReadPostScreen = ({ route }) => {
    const { postInfo } = route.params
    const [ content, setContent ] = useState(postInfo.content)
    const [ categories, setCategories ] = useState([])
    const [ author, setAuthor ] = useState(postInfo.authors[0].name)

    const getCategoriesList = () => {
        const categoriesList = []
        postInfo.categories.forEach(item => {
            console.log(typeof item.name)
            categoriesList.push(item.name)
        })
        setCategories(categoriesList)
    }

    useEffect(() => {
        getCategoriesList()
    }, [ postInfo ])

    return (
        <SafeAreaView style={ tailwind(`flex-1`) }>
            <TopBar title={ postInfo.title } author={ author } categories={ categories }/>
            <ScrollView>
               <HTMLView 
                    value={ content }
                    stylesheet={ htmlStyles }
                    addLineBreaks={ false }
               />
            </ScrollView>
        </SafeAreaView>
    )
}

export default ReadPostScreen

const styles = StyleSheet.create({})
const fontSize = 16
const htmlStyles = StyleSheet.create({
    a: {
        fontWeight: '300',
        fontSize: fontSize,
        color: 'blue',
        fontStyle: 'italic'
    },
    p: {
        fontSize: fontSize,
        paddingHorizontal: 5
    },
    strong: {
        fontWeight: 'bold',
        fontSize: fontSize
    },
    li: {
        fontSize: fontSize
    },
    h2: {
        fontWeight: 'bold',
        fontSize: 18
    },
    div: {
        margin: 0
    }
})
