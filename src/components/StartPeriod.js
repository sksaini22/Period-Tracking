import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";
import { Switch } from "react-native-paper";


const StartPeriod = ({ isPeriod,setIsPeriod }) => {


  return (
    <View
      style={tw`flex-row justify-between px-2 bg-sky-100 rounded-md shadow py-3`}
    >
      <Text style={tw`text-center text-xl font-bold text-sky-700`}>
        Start Period
      </Text>
      <Switch
        value={isPeriod}
        onValueChange={setIsPeriod}
        color={tw.color("sky-700")}
      />
    </View>
  );
};

export default StartPeriod;
