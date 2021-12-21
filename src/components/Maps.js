import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import MapView, { Marker, Polyline } from 'react-native-maps';
import tailwind from 'tailwind-rn';
import MapViewDirections from 'react-native-maps-directions';

//API
import { googleMapsConfig } from '../../config/keys';

const Maps = ({ origin, update, json }) => {
    const [ tracks, setTracks ] = useState()
    const [ jsonData, setJsonData ] = useState()

        function forceUpdate() {
            update()
        }

        const routeTracks = []
        const trackData = () => {
            jsonData[0].features.forEach((item) => {
                const latLng =
                {
                    longitude: item.geometry.coordinates[0],
                    latitude: item.geometry.coordinates[1]
                }
                routeTracks.push(latLng)
            })
            setTracks(routeTracks)
        }
        
        function checkJson() {
            const newJson = []
            json.forEach(item => {
                if(item.length === 3) {
                    const newItem = item.splice(0, 1)
                    newJson.push({
                        latitude: newItem[1],
                        longitude: newItem[0]
                    })
                } else {
                    newJson.push({
                        latitude: item[1],
                        longitude: item[0]
                    })
                }
            })
            setJsonData(newJson)
        }
        
        useEffect(() => {
            checkJson()
            forceUpdate()
            trackData()
        }, [])
        
        const end = routeTracks.length + 1

        console.log(jsonData)

    return (
        <SafeAreaView style={{ flex: 1 }}>
            { tracks ?
                <MapView
                    style={ tailwind(`flex-1`) }
                    mapType='terrain'
                    initialRegion={{
                        latitude: origin.latitude,
                        longitude: origin.longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.015,
                    }}
                >
                    <Polyline
                        coordinates={ tracks }
                        strokeColor="#003b36"
                        strokeWidth={6}
                        zIndex={1}
                    />
                    <Marker 
                        coordinate={ tracks[0] }
                        title="Start" 
                    />
                    <Marker 
                        coordinate={ tracks[end] }
                        title="End" 
                    />
                </MapView>
                :
                null  
            }

        </SafeAreaView>
    )
}

export default Maps

const styles = StyleSheet.create({})
