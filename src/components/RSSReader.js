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
        const fixedDescription = item.description.replace(/<[^>]*>?/gm, '')
        const finalDescription = fixedDescription.replace(/&#8217;/g, `'`).slice(0, 200) + '...'
        const finalDatePublished = item.published.slice(0, 16)
        const categories = item.categories
        const category = categories.filter(item => {
            const catName = item.name.toLowerCase()
            return catName === 'travel' || 
            catName === 'running'
        })
        const subCategory = categories.filter(item => {
            const catName = item.name.toLowerCase()
            return catName === 'trail running' || 
            catName === 'opinion' || 
            catName === 'places to visit' ||
            catName === 'tips'
        })

        console.log(categories)

        return (
            <View 
                style={ tailwind(`h-96 w-full justify-center border`) }
            >
                <View>
                    <CategoryView category={ category } subCategory={ subCategory }/>
                </View>
                <Image 
                    source={ item.image }
                    style={ tailwind(`h-20 w-20`) }
                />
                <View style={ tailwind(`px-3`) }>
                    <Text style={ tailwind(`font-bold text-lg`) }>{ item.title }</Text>
                    <Text style={ tailwind(`italic`) }>{ finalDatePublished }</Text>
                    <Text style={ tailwind(`italic py-3`) }>{ item.authors[0].name }</Text>
                    <Text>{ finalDescription }</Text>
                    <Pressable
                        style={({ pressed }) => [{
                            opacity: pressed ? 0.5 : 1
                        },
                        tailwind(`w-20 border h-8 bg-green-900 justify-center items-center rounded-lg mt-5`),
                        styles.shadow
                        ]}
                        onPress={ () => navigation.navigate('ReadPost', { postInfo: item }) }
                    >
                        <Text style={ tailwind(`text-white`) }>Read More</Text>
                    </Pressable>
                </View>
            </View>
        )
    }

    return (
        <View>
            <FlatList 
                data={ rssData }
                renderItem={renderFeed}
                keyExtractor={item => item.title}
            />
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
