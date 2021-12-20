import React from 'react'
import { StyleSheet, View } from 'react-native'
import tailwind from 'tailwind-rn'

//Components
import Header from '../components/Header'

const DATA = {
    image: 'https://i.imgur.com/mWXzax7.jpg',
    countries: [
        {
            name: 'USA',
            places: [
                {
                    name: 'Maryland',
                    image: 'https://i.imgur.com/w83FfLb.jpg',
                    routes: [
                        {
                            name: 'Bacon Ridge Natural Area',
                            image: 'https://i.imgur.com/15cUHCo.jpg',
                            cityState: 'Annapolis, Maryland',
                            routes: [
                                {
                                    name: 'Rusty Cars',
                                    distance: '14.5',
                                    elevation: '386',
                                    gpxUrl: 'https://drive.google.com/file/d/1gjOQuqtd_xuktTRwOqvp2Yn428hjsfT2/view?usp=sharing',
                                    image: 'https://i.imgur.com/1gWORG2.png',
                                    origin: {
                                        latitude: 39.00686420166008,
                                        longitude: -76.60936078433107,
                                    },
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'Ohio',
                    image: 'https://i.imgur.com/uiD7ZbW.jpg',
                    routes: [
                        {
                            name: 'Bark Camp State Park',
                            gpxUrl: '',
                            image: 'https://i.imgur.com/8jFou5f.jpg',
                            cityState: 'Belmont, Ohio',
                            routes: [
                                {
                                    name: 'Bark Camp',
                                    distance: '21',
                                    elevation: '390',
                                    gpxUrl: '',
                                    image: 'https://i.imgur.com/1gWORG2.png',
                                    origin: {
                                        latitude: 40.04846426455281,
                                        longitude: -81.02846704999774,
                                    },
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'Colorado',
                    image: 'https://i.imgur.com/AphUqNv.jpg',
                    routes: [
                        {
                            name: 'Staunton State Park',
                            image: 'https://i.imgur.com/J0V6ux5.jpg',
                            cityState: 'Pine, Colorado',
                            routes: [

                            ]
                        }
                    ]
                },
                {
                    name: 'Nevada',
                    image: 'https://i.imgur.com/q0Tv7NL.jpg',
                    routes: [
                        {
                            name: 'Valley of Fire',
                            image: 'https://i.imgur.com/VGETVH9.jpg',
                            cityState: 'Las Vegas, Nevada',
                            routes: [

                            ]
                        },
                        {
                            name: 'Red Rock Canyon National Park',
                            image: 'https://i.imgur.com/URjvJbf.jpg',
                            cityState: 'Las Vegas, Nevada',
                            routes: [

                            ]
                        },
                        {
                            name: 'Hoover Dam',
                            image: 'https://i.imgur.com/dqWc8AX.jpg',
                            cityState: 'Las Vegas, Nevada',
                            routes: [

                            ]
                        }
                    ]
                }
            ],
            image: 'https://i.imgur.com/tMxIWTo.jpg'
        },
        {
            name: 'Thailand',
            places: [
                {
                    name: "Phuket",
                    image: 'https://i.imgur.com/1rXUs6g.jpg',
                    routes: [
                        {
                            name: 'Thalang',
                            image: 'https://i.imgur.com/d1SyPhN.jpg',
                            routes: [

                            ]
                        },
                        {
                            name: 'Kathu',
                            image: 'https://i.imgur.com/oJifjMf.jpg',
                            routes: [

                            ]
                        },
                        {
                            name: 'Patong',
                            image: 'https://i.imgur.com/nhWF7gy.jpg',
                            routes: [

                            ]
                        },
                        {
                            name: 'Chalong',
                            image: 'https://i.imgur.com/aHPddFw.jpg',
                            routes: [

                            ]
                        },
                        {
                            name: 'Nai Harn',
                            image: 'https://i.imgur.com/T4AyJHe.jpg',
                            routes: [

                            ]
                        }
                    ]
                },
                {
                    name: 'Chiang Mai',
                    image: 'https://i.imgur.com/kepjBLR.jpg',
                    routes: [
                        {
                            name: 'Buddhas Footprint',
                            image: ''
                        }
                    ]
                }
            ],
            image: 'https://i.imgur.com/DL7c59N.jpg'
        }
    ]
}

const RoutesListScreen = () => {
    return (
        <View style={ tailwind(`flex-1`) }>
            <Header screenName={'Routes'} subtitle={ 'In need of a trail? I have something for you.' } image={ DATA.image } data={ DATA.countries } routeName={ 'CountryRoutes' }/>
        </View>
    )
}

export default RoutesListScreen

const styles = StyleSheet.create({})
