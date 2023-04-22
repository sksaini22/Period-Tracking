import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PeriodTracker from "../screens/PeriodTracker";
import {  List } from 'react-native-paper';
import tw from "twrnc";


const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="PeriodTracker"
        component={PeriodTracker}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <List.Icon icon="home" size={size} color={tw.color("sky-700")} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
