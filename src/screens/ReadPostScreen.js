import React, { useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet, Text, View, SafeAreaView, ScrollView, useWindowDimensions } from 'react-native'
import tailwind from 'tailwind-rn'
import RenderHtml, { defaultSystemFonts } from 'react-native-render-html';

//Components
import TopBar from '../components/TopBar';
import AudioPlayer from '../components/AudioPlayer';

//System Fonts HTML Render
const systemFonts = [...defaultSystemFonts ]

const ReadPostScreen = ({ route }) => {
    const { postInfo, audioURL } = route.params
    const [ content, setContent ] = useState({
        html: postInfo.content
    })
    const [ categories, setCategories ] = useState([])
    const [ author, setAuthor ] = useState(postInfo.authors[0].name)
    const [ audio, setAudio] = useState(audioURL)
    const [ showAudioPlayer, setShowAudioPlayer ] = useState(false)
    const [ state, setState ] = useState({
        scrollY: new Animated.Value(0)
    })

    const getCategoriesList = () => {
        const categoriesList = []
        postInfo.categories.forEach(item => {
            categoriesList.push(item.name)
        })
        setCategories(categoriesList)
    }

    const getAudioURL = () => {
        const beginning = content.html.search(/audio controls src/gm)
        if (beginning >= 0) {
            const beginningText = content.html.slice(beginning, beginning + 250)
            const beginningURLIndex = beginningText.search(`"`)
            const endingURLIndex = beginningText.search('>')
            const URL = beginningText.slice(beginningURLIndex + 1, endingURLIndex - 1)
            setShowAudioPlayer(true)
            const URLCheck = URL.substring(0, 3)
            if (URLCheck === 'htt') {
                setShowAudioPlayer(true)
                setAudio(URL)
            } else {
                setShowAudioPlayer(false)
            }
        }
    }

    useEffect(() => {
        getAudioURL()
        getCategoriesList()
    }, [])

    const { width } = useWindowDimensions();
    const nodeList = [ 'audio' ]
    const HEADER_EXPANDED_HEIGHT = 300
    const HEADER_COLLAPSED_HEIGHT = 60

    const headerHeight = state.scrollY.interpolate({
        inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
        outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
        extrapolate: 'clamp'
    })

    return (
        <SafeAreaView style={ tailwind(`flex-1`) }>
            <Animated.View style={{ height: headerHeight }}/>
                {/* <TopBar title={ postInfo.title } author={ author } categories={ categories }/> */}
                <ScrollView 
                    style={ tailwind(`bg-green-900`) }
                    contentContainerStyle={ tailwind(`items-center`) }
                    showsVerticalScrollIndicator={ false }
                    onScroll={Animated.event(
                        [{ nativeEvent: {
                             contentOffset: {
                               y: state.scrollY
                             }
                           }
                        }]
                    )}
                      scrollEventThrottle={16}
                >
                    <View style={[ tailwind(`px-5 bg-white`), styles.contentContainer, styles.shadow ]}>
                        { showAudioPlayer ? 
                            <AudioPlayer source={ audio }/>
                            :
                            null
                        }
                        <RenderHtml
                            source={ content }
                            contentWidth={ width }
                            enableExperimentalMarginCollapsing={ true }
                            systemFonts={ systemFonts }
                            tagsStyles={ tagsStyles }
                            ignoredDomTags={ nodeList }
                        />
                    </View>
                </ScrollView>
        </SafeAreaView>
    )
}

export default ReadPostScreen

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
    },
    contentContainer: {
        width: '95%'
    }
})

const tagsStyles = {
    img: {
        
    }
}