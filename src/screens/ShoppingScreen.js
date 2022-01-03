import React from 'react'
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native'
import tailwind from 'tailwind-rn';

//Components
import ShoppingProduct from '../components/ShoppingProduct';
import ShoppingCartBar from '../components/ShoppingCartBar'

const PRODUCTS = [
    {
        id: 100,
        name: 'ReactProX Headset',
        price: 350,
        image: 'https://i.imgur.com/SMURkYK.jpg',
        description: 'A headset combines a headphone with microphone. Headsets are made with either a single-earpiece (mono) or a double-earpiece (mono to both ears or stereo).'
    },
    {
        id: 101,
        name: 'FastLane Toy Car',
        price: 600,
        image: 'https://i.imgur.com/SMURkYK.jpg',
        description: 'A model car, or toy car, is a miniature representation of an automobile. Other miniature motor vehicles, such as trucks, buses, or even ATVs, etc. are often included in this general category.'
    },
    {
        id: 102,
        name: 'SweetHome Cupcake',
        price: 2,
        image: 'https://i.imgur.com/SMURkYK.jpg',
        description: 'A cupcake (also British English: fairy cake; Hiberno-English: bun; Australian English: fairy cake or patty cake[1]) is a small cake designed to serve one person.'
    }
];

const ShoppingScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList 
                data={ PRODUCTS }
                renderItem={({item}) => (
                    <ShoppingProduct item={ item }/>
                )}
                contentContainerStyle={ tailwind(`py-8 mx-8`) }
                showsVerticalScrollIndicator='false'
            />
            <ShoppingCartBar />
        </SafeAreaView>
    )
}

export default ShoppingScreen

const styles = StyleSheet.create({})
