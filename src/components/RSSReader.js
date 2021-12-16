import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View, Pressable, Image } from 'react-native'
import tailwind from 'tailwind-rn'
import { useNavigation } from '@react-navigation/native'

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
        
        console.log(item)
        

        return (
            <View 
                style={({ pressed }) => [{
                    opacity: pressed ? 0.5 : 1
                },
                tailwind(`h-48 w-full justify-center`)
                ]}
            >
                <Image 
                    source={ item.image }
                    style={ tailwind(`h-20 w-20`) }
                />
                <Text style={ tailwind(`font-bold text-lg`) }>{ item.title }</Text>
                <Text>{ item.published }</Text>
                <Text style={ tailwind(`italic py-3`) }>{ item.authors[0].name }</Text>
                <Text>{ finalDescription }</Text>
                <Pressable
                    style={({ pressed }) => [{
                        opacity: pressed ? 0.5 : 1
                    },
                    tailwind(`w-20 border h-8 bg-green-200 justify-center items-center rounded-lg mt-5`)
                    ]}
                    onPress={ () => navigation.navigate('ReadPost', { postInfo: item }) }
                >
                    <Text>Read More</Text>
                </Pressable>
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

const styles = StyleSheet.create({})
