import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { Button, Snackbar } from "react-native-paper";

const Temperature = ({temperature,setTemperature}) => {



  return (
    <View>
      <Text>Temperature</Text>
      <TextInput
        placeholder="Enter temperature"
        keyboardType="numeric"
        value={temperature}
        onChangeText={setTemperature}
      />
    </View>
  );
};

export default Temperature;