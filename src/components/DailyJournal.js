import {  ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import tw from "twrnc";

export const DailyJournal = ({ journal, setJournal }) => {
  return (
    <ScrollView>
      <TextInput
        multiline
        numberOfLines={4}
        value={journal}
        onChangeText={setJournal}
        style={tw`border-2 border-gray-300 rounded-md p-1 mt-2 bg-white `}
        contentStyle={tw`text-gray-700`}
      />
    </ScrollView>
  );
};
