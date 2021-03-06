import React, { useState, useEffect } from 'react'
import { ActivityIndicator, StyleSheet, Text, View, ScrollView, Image, Pressable, Linking } from 'react-native'
import Maps from '../components/Maps';
import tailwind from 'tailwind-rn';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { setDoc, doc } from 'firebase/firestore'

//Components
import OwnStatusBar from '../components/StatusBar';

function useForceUpdate(data){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

const RouteDetailsScreen = ({ route }) => {
    const { data } = route.params;
    const [ jsonData, setJsonData ] = useState()

    function checkJson(json) {
        const newJson = []
        for (let i = 0; i < json.length; i++) {
            if (json[i].length === 3) {
                const newItem = json[i].slice(0, 2)
                newJson.push({
                    latitude: newItem[1],
                    longitude: newItem[0]
                })
            } else if (json[i].length === 2) {
                newJson.push({
                    latitude: json[i][1],
                    longitude: json[i][0]
                })
            }
        }
        setJsonData(newJson)
    }

    useEffect(() => {
        checkJson(data.jsonData[0].features[0].geometry.coordinates[0])
    }, [])

    const forceUpdate = useForceUpdate();

    return (
        <View style={ tailwind(`flex-1 bg-white`) }>
            <OwnStatusBar backgroundColor="#003b36" />
            <View style={ tailwind(`h-1/2 justify-center`) }>
                { jsonData ?
                    <Maps origin={ data.origin } update={ forceUpdate } json={ jsonData } data={ data }/>
                    :
                    <View style={ tailwind(`flex-1 items-center justify-center`) }>
                        <ActivityIndicator size="large" />
                        <Text>Loading map</Text>
                    </View>
                }
            </View>
            <View style={ tailwind(`h-1/2`) }>
                <View style={ tailwind(`w-full h-20 border-b justify-center`) }>
                    <Text style={ tailwind(`font-bold text-xl pl-3`) }>{ data.name }</Text>
                </View>
                <View style={ tailwind(`flex-row w-full border-b`) }>
                    <View style={ tailwind(`w-1/2 justify-center items-center h-16 flex-row justify-evenly border-r`) }>
                        <Text style={ tailwind(`font-bold text-xl pl-3`) }>{ data.distance } km</Text>
                        <MaterialCommunityIcons name="map-marker-distance" size={30} color="black" style={ tailwind(`px-7`) } />
                    </View>
                    <View style={ tailwind(`w-1/2 justify-center items-center h-16 flex-row justify-evenly`) }>
                        <Text style={ tailwind(`font-bold text-xl pl-3`) }>{ data.elevation } m</Text>
                        <FontAwesome5 name="mountain" size={24} color="black" style={ tailwind(`px-7 pb-3 top-2`) } />
                    </View>
                </View>
                <View style={ tailwind(`items-center h-20 w-full`) } >
                    <Image
                        source={{ uri: data.elevationMap }}
                        style={ tailwind(`h-16 w-full`) }
                    />
                </View>
                <View style={ tailwind(`h-20 items-center`) }>
                    <Pressable
                        style={({ pressed }) => [{
                                opacity: pressed ? 0.5 : 1
                            },
                            tailwind(`bg-green-900 rounded-lg items-center justify-center`),
                            styles.shadow
                        ]}
                        onPress={() => Linking.openURL(data.gpxUrl) }
                    >
                        <Text style={ tailwind(`px-10 py-5 text-white font-bold`) }>Download route</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default RouteDetailsScreen

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
