import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, useWindowDimensions } from 'react-native'
import tailwind from 'tailwind-rn'
import RenderHtml, { defaultSystemFonts } from 'react-native-render-html';

//Components
import TopBar from '../components/TopBar';
import AudioPlayer from '../components/AudioPlayer';

//System Fonts HTML Render
const systemFonts = [...defaultSystemFonts ]

const ReadPostScreen = ({ route }) => {
    const { postInfo } = route.params
    const [ content, setContent ] = useState({
        html: postInfo.content
    })
    const [ categories, setCategories ] = useState([])
    const [ author, setAuthor ] = useState(postInfo.authors[0].name)
    const [ audioURL, setAudioURL ] = useState(null)

    const getCategoriesList = () => {
        const categoriesList = []
        postInfo.categories.forEach(item => {
            categoriesList.push(item.name)
        })
        setCategories(categoriesList)
    }

    const getAudioURL = () => {
        const beginning = content.html.search('src')
        const beginningText = content.html.slice(beginning, 250)
        const beginningURLIndex = beginningText.search(`"`)
        const endingURLIndex = beginningText.search('>')
        const URL = beginningText.slice(beginningURLIndex + 1, endingURLIndex - 1)
        setAudioURL(URL)
    }

    useEffect(() => {
        getAudioURL()
        getCategoriesList()
    }, [])

    const { width } = useWindowDimensions();

    console.log(audioURL, "AUDIO")

    return (
        <SafeAreaView style={ tailwind(`flex-1`) }>
            <TopBar title={ postInfo.title } author={ author } categories={ categories }/>
            <ScrollView>
                <View style={ tailwind(`px-5`) }>
                    <AudioPlayer source={ audioURL }/>
                    <RenderHtml
                        source={ content }
                        contentWidth={ width }
                        enableExperimentalMarginCollapsing={true}
                        systemFonts={ systemFonts }
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ReadPostScreen

const styles = StyleSheet.create({})