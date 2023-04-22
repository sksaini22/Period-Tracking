import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import Rating from './Rating';
import { Button } from 'react-native-paper';

const Flow = ({setFlow,flow}) => {

    
  return (
    <View style={tw`bg-sky-100 my-2 shadow py-3 px-2 rounded-md flex-row justify-between`}>
      <Text style={tw`text-sky-800 text-lg`}>Flow</Text>
      <Rating rating={flow} setRating={setFlow}  name='arrow-all' />
    </View>
  )
}

export default Flow