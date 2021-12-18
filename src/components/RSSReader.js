import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View, Pressable, Image } from 'react-native'
import tailwind from 'tailwind-rn'
import { useNavigation } from '@react-navigation/native'

//Components
import CategoryView from './CategoryView'

const RSSReader = ({ rssFeed }) => {
    const [ rssData, setRssData ] = useState()
    
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
        console.log(item.image, "ITEM IMAGE")
        const title = item.title;
        const author = item.authors[0].name
        let description;
        let publishDate;
        let primaryCategory;
        let secondaryCategory;
        let audioURL;
        
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
        }

        function getAudio() {
            const beginning = item.content.search('<audio controls src')
            const beginningText = item.content.slice(beginning, 250)
            const beginningURLIndex = beginningText.search(`"`)
            const endingURLIndex = beginningText.search('>')
            const URL = beginningText.slice(beginningURLIndex + 1, endingURLIndex - 1)
            audioURL = URL
        }

        return (
            <View 
                style={ tailwind(`h-96 w-full justify-center border`) }
            >
                <View>
                    <CategoryView 
                        category={ primaryCategory } 
                        subCategory={ secondaryCategory }
                    />
                </View>
                <Image 
                    source={ item.image }
                    style={ tailwind(`h-20 w-20`) }
                />
                <View style={ tailwind(`px-3`) }>
                    <Text style={ tailwind(`font-bold text-lg`) }>{ title }</Text>
                    <Text style={ tailwind(`italic`) }>{ publishDate }</Text>
                    <Text style={ tailwind(`italic py-3`) }>{ author }</Text>
                    <Text>{ description }</Text>
                    <Pressable
                        style={({ pressed }) => [{
                            opacity: pressed ? 0.5 : 1
                        },
                        tailwind(`w-20 border h-8 bg-green-900 justify-center items-center rounded-lg mt-5`),
                        styles.shadow
                        ]}
                        onPress={ () => navigation.navigate('ReadPost', { postInfo: item, audioURL: audioURL }) }
                    >
                        <Text style={ tailwind(`text-white`) }>Read More</Text>
                    </Pressable>
                </View>
            </View>
        )
    }

    return (
        <View>
           { rssData ?
                <FlatList 
                    data={ rssData }
                    renderItem={renderFeed}
                    keyExtractor={item => item.title}
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
