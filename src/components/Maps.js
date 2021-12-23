import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import MapView, { Marker, Polyline } from 'react-native-maps';
import tailwind from 'tailwind-rn';

//API
import { googleMapsConfig } from '../../config/keys';

const Maps = ({ origin, update, json, data }) => {
    const [ tracks, setTracks ] = useState()
    const [ jsonData, setJsonData ] = useState()

    function forceUpdate() {
        update()
    }

    const routeTracks = []
    const trackData = () => {
        json.forEach((item) => {
            const latLng =
            {
                latitude: item.latitude,
                longitude: item.longitude
            }
            routeTracks.push(latLng)
        })
        setTracks(routeTracks)
    }

    useEffect(() => {
        trackData()
        forceUpdate()
    }, [ ])
        
    const end = routeTracks.length + 1

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
