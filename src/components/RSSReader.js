import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View, Pressable, Image, Animated, ImageBackground, useWindowDimensions } from 'react-native'
import tailwind from 'tailwind-rn'
import { useNavigation } from '@react-navigation/native'

//Components
import CategoryView from './CategoryView'

const RSSReader = ({ rssFeed }) => {
    const [ rssData, setRssData ] = useState()
    const [ state, setState ] = useState({
        scrollY: new Animated.Value(0)
    })
    
    function setData() {
        if(rssFeed) {
            setRssData(rssFeed.items)
        }
    }

    const navigation = useNavigation();
    
    useEffect(() => {
        setData()
    }, [ rssFeed ])

    const renderFeed = ({ item }) => {
        const title = item.title;
        const author = item.authors[0].name
        let description;
        let publishDate;
        let primaryCategory;
        let secondaryCategory;
        let audioURL;
        let coverImageURL;
        let postContent = {
            title: item.title,
            links: item.links,
            descriptions: item.description,
            id: item.id,
            published: item.published,
            enclosures: item.enclosures,
            itunes: item.itunes,
            authors: item.authors,
            categories: item.categories,
            content: ''
        }

        fixContent()
        fixDescriptionAndGetDetails(item)

        function fixDescriptionAndGetDetails(item) {
            const fixedDescription = item.description.replace(/<[^>]*>?/gm, '')
            description = fixedDescription.replace(/&#8217;/g, `'`).slice(0, 200) + '...'
            publishDate = item.published.slice(0, 16)
            const categories = item.categories
            primaryCategory = categories.filter(item => {
                const catName = item.name.toLowerCase()
                return catName === 'travel' || 
                catName === 'running'
            })
            secondaryCategory = categories.filter(item => {
                const catName = item.name.toLowerCase()
                return catName === 'trail running' || 
                catName === 'opinion' || 
                catName === 'places to visit' ||
                catName === 'tips'
            })
            getAudio()
            getCoverImage()
        }

        function fixContent() {
            const slicedSection = item.content.slice(0, 300)
            const endingIndex = slicedSection.search('/>')
            const fixedContent = item.content.slice(endingIndex + 2)
            postContent.content = fixedContent
        }

        function getAudio() {
            const beginning = item.content.search('<audio controls src')
            const beginningText = item.content.slice(beginning, 250)
            const beginningURLIndex = beginningText.search(`"`)
            const endingURLIndex = beginningText.search('>')
            const URL = beginningText.slice(beginningURLIndex + 1, endingURLIndex - 1)
            audioURL = URL
        }

        function getCoverImage() {
            const beginning = item.content.slice(0, 200)
            const beginningURLPlace = beginning.search("src=")
            const endingURLPlace = beginning.search("class")
            const imageURL = beginning.slice(beginningURLPlace + 5, endingURLPlace - 2)
            coverImageURL = imageURL
        }

        return (
            <View 
                style={ tailwind(`w-full justify-center border`) }
            >
                <View style={ tailwind(`my-3`) }>
                    <CategoryView 
                        category={ primaryCategory } 
                        subCategory={ secondaryCategory }
                    />
                </View>
                <View style={ tailwind(`px-4 py-14`) }>
                    <View style={ tailwind(`flex-row mb-3`) }>
                        <View style={ tailwind(`w-2/5`) }>
                            <Text style={ tailwind(`italic text-xs`) }>{ publishDate }</Text>
                            <Text style={ tailwind(`font-bold text-xl`) }>{ title }</Text>
                            <Text style={ tailwind(`italic py-1 text-xs`) }>Written By: { author }</Text>
                        </View>
                        <View style={ tailwind(`w-3/5 ml-3`) }>
                            { coverImageURL ? 
                                <Image 
                                    source={{ uri: coverImageURL }}
                                    style={ tailwind(`h-48 w-48 rounded-lg`) }
                                />
                                :
                                null
                            }
                        </View>
                    </View>
                    <View style={[ tailwind(`bg-white rounded-lg p-5`), styles.shadow ]}>
                        <Text>{ description }</Text>
                        <Pressable
                            style={({ pressed }) => [{
                                opacity: pressed ? 0.5 : 1
                            },
                            tailwind(`w-20 border h-8 bg-green-900 justify-center items-center rounded-lg mt-5`),
                            styles.shadow
                            ]}
                            onPress={ () => navigation.navigate('ReadPost', { postInfo: postContent, audioURL: audioURL, image: coverImageURL }) }
                        >
                            <Text style={ tailwind(`text-white`) }>Read More</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        )
    }

    const { width } = useWindowDimensions();
    const HEADER_EXPANDED_HEIGHT = 250
    const HEADER_COLLAPSED_HEIGHT = 80
    const headerTitleOpacity = state.scrollY.interpolate({
        inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
        outputRange: [0, 1],
        extrapolate: 'clamp'
    })

    const heroTitleOpacity = state.scrollY.interpolate({
        inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
        outputRange: [1, 0],
        extrapolate: 'clamp'
    })

    const headerHeight = state.scrollY.interpolate({
        inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
        outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
        extrapolate: 'clamp'
    })

    return (
        <View>
            <Animated.View style={[ tailwind(`rounded-lg`), { height: headerHeight, width: width }, styles.shadow ]}>
                <ImageBackground
                    source={{ uri: 'https://i.imgur.com/4P4sInU.jpg' }}
                    style={{ width: width, height: '100%' }}
                    resizeMode="cover"
                >
                    <View style={ tailwind(`flex-1 bg-black bg-opacity-40 items-center w-full`) }>
                        <View style={ tailwind(`flex-row justify-evenly items-center`) }>
                            <Animated.Image 
                                style={[ tailwind(`mt-5 h-10 w-10 rounded-lg`), { opacity: headerTitleOpacity} ]}
                                source={{ uri: 'https://i.imgur.com/smHitpL.png' }}
                            />
                            <View>
                                <Animated.Text style={[ tailwind(`mt-5 px-10 text-center font-bold text-white text-opacity-100 italic text-2xl`), { opacity: headerTitleOpacity } ]}>The Travel Runner</Animated.Text>
                                <Animated.Text style={[ tailwind(`text-center text-white text-opacity-90 text-xs`), { opacity: headerTitleOpacity} ]}>Where Travel and Trail Running Collide</Animated.Text>
                            </View>
                        </View>
                        <Animated.Text style={[ tailwind(`absolute bottom-20 mb-2 text-4xl font-bold text-white text-opacity-90 italic`), { opacity: heroTitleOpacity} ]}>The Travel Runner</Animated.Text>
                        <Animated.Text style={[ tailwind(`absolute bottom-16 px-2 text-center text-white text-opacity-90`), { opacity: heroTitleOpacity} ]}>Where Travel and Trail Running Collide</Animated.Text>
                        <Animated.Image 
                            style={[ tailwind(`absolute rounded-lg top-6 left-2 h-20 w-20`), { opacity: heroTitleOpacity} ]}
                            source={{ uri: 'https://i.imgur.com/smHitpL.png' }}
                        />
                    </View>
                </ImageBackground>
            </Animated.View>
           { rssData ?
                <FlatList 
                    data={ rssData }
                    renderItem={renderFeed}
                    keyExtractor={item => item.title}
                    onScroll={Animated.event(
                        [{ nativeEvent: {
                             contentOffset: {
                               y: state.scrollY
                             }
                           }
                        }],
                        { useNativeDriver: false }
                    )}
                    scrollEventThrottle={16}
                />
                :
                <View style={ tailwind(`h-full items-center justify-center self-center`) }>
                    <Image 
                        source={{ uri: 'https://i.imgur.com/1dDg289.png' }}
                        style={ tailwind(`h-16 w-16`) }
                    />
                    <Text>Loading...</Text>
                </View>
            }
        </View>
    )
}

export default RSSReader

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
