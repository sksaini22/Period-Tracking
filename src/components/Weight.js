import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { Button, Snackbar } from "react-native-paper";

const Weight = ({weight,setWeight}) => {

  return (
    <View>
      <Text>Weight</Text>
      <TextInput
        placeholder="Enter weight"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />
    </View>
  );
};

export default Weight;
