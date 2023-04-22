import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import Rating from './Rating';

const Cramps = ({ setCramps,cramps }) => {

    
    return (
        <View style={tw`bg-sky-100 my-2 shadow py-3 px-2 rounded-md flex-row justify-between`}>
            <Text style={tw`text-sky-800 text-lg`}>Cramps</Text>
            <Rating rating={cramps} setRating={setCramps} name='ethereum' />
        </View>
    )
}

export default Cramps;
