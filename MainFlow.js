import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { logout, selectDbId, selectUser } from "./features/userSlice";

import { auth, db } from "./firebase";

import Screen1 from "./screens/Screen1";
import Screen2 from "./screens/Screen2";
import Screen3 from "./screens/Screen3";
import Screen4 from "./screens/Screen4";
import Screen5 from "./screens/Screen5";
import Screen6 from "./screens/Screen6";
import Screen7 from "./screens/Screen7";
import Screen8 from "./screens/Screen8";
import Screen9 from "./screens/Screen9";

import MedicalCheck from "./screens/MedicalCheck";
import MedicalCheck1 from "./screens/MedicalCheck1";
import MedicalCheck2 from "./screens/MedicalCheck2";
import Training from "./screens/Training";
import RaceUpdate from "./screens/RaceUpdate";
import BikeUpdate from "./screens/BikeUpdate";
import SwimUpdate from "./screens/SwimUpdate";
import TriathlonUpdate from "./screens/TriathlonUpdate";
import Gadgets from "./screens/Gadgets";
import TrainingLocation from "./screens/TrainingLocation";
import Equipments from "./screens/Equipments";

import AthleteFlow from "./AthleteFlow";
import CoachFlow from "./CoachFlow";

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Screen7">
        <Stack.Screen
          name="Screen1"
          component={Screen1}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Screen2"
          component={Screen2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Screen3"
          component={Screen3}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Screen4"
          component={Screen4}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Screen5"
          component={Screen5}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AthleteFlow"
          component={AthleteFlow}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CoachFlow"
          component={CoachFlow}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Screen6"
          component={Screen6}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Screen7"
          component={Screen7}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Screen8"
          component={Screen8}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Screen9"
          component={Screen9}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MedicalCheck"
          component={MedicalCheck}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MedicalCheck1"
          component={MedicalCheck1}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MedicalCheck2"
          component={MedicalCheck2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Training"
          component={Training}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RaceUpdate"
          component={RaceUpdate}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BikeUpdate"
          component={BikeUpdate}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SwimUpdate"
          component={SwimUpdate}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TriathlonUpdate"
          component={TriathlonUpdate}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Gadgets"
          component={Gadgets}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TrainingLocation"
          component={TrainingLocation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Equipments"
          component={Equipments}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function MainFlow() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        paddingTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,
      }}
    >
      <MainNavigator />
    </View>
  );
}

export default MainFlow;
