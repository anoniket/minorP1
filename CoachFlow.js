import React from "react";
import { View, Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Icon } from "react-native-elements";

import Screen1 from "./screens/Screen1";
import Screen2 from "./screens/Screen2";
import Screen3 from "./screens/Screen3";
import Screen4 from "./screens/Screen4";
import Screen6 from "./screens/Screen6";
import Screen7 from "./screens/Screen7";
import Screen8 from "./screens/Screen8";
import Screen9 from "./screens/Screen9";

import Home from "./screens/Home";
import AddCoach from "./screens/AddCoach";
import ShowProfile from "./screens/ShowProfile";
import Chat from "./screens/Chat";
import SearchCoaches from "./screens/SearchCoaches";
import SearchCategory from "./screens/SearchCategory";
import Workout from "./screens/Workout";
import Settings from "./screens/Settings";
import Coaches from "./screens/Coaches";

import CycleFields from "./screens/workout_types/CycleFields";
import DietFields from "./screens/workout_types/DietFields";
import RunFields from "./screens/workout_types/RunFields";
import SCFields from "./screens/workout_types/SCFields";
import SCFields2 from "./screens/workout_types/SCFields2";
import SwimFields from "./screens/workout_types/SwimFields";

import GraphGen from "./screens/GraphGen";
import WorkoutCompletion from "./screens/WorkoutCompletion";

import AthleteWorkoutList from "./screens/AthleteWorkoutList";
import ViewAthleteWorkout from "./screens/ViewAthleteWorkout";
import AddAthleteWorkout from "./screens/AddAthleteWorkout";

import MedicalCheck from "./screens/MedicalCheck";
import MedicalCheck1 from "./screens/MedicalCheck1";
import MedicalCheck2 from "./screens/MedicalCheck2";

import sportsSelection from "./screens/coach/sportsSelection";
import CoachHomeScreen from "./screens/coach/CoachHomeScreen";
import showProfile from "./screens/coach/showProfile";
import AddWorkout from "./screens/coach/AddWorkout";
import WorkoutList from "./screens/coach/WorkoutList";
import Admin from "./screens/coach/Admin";
import ViewWorkout from "./screens/coach/ViewWorkout";
import Accounts from "./screens/coach/Accounts";
import AccountsHomeScreen from "./screens/coach/AccountsHomeScreen";


import BugReport from "./screens/BugReport";

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const HomeNavigator = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="CoachHomeScreen">
        <Stack.Screen
          name="CoachHomeScreen"
          component={CoachHomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ShowProfile"
          component={ShowProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MediaNavigator = () => {
  return (
    <NavigationContainer independent={true}>
      <View style={{ backgroundColor: "black", minHeight: 700 }}>
        <Text style={{ color: "white", textAlign: "center", fontSize: 22 }}>
          Media Screen
        </Text>
      </View>
    </NavigationContainer>
  );
};

const WorkoutNavigator = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="WorkoutList">
        <Stack.Screen
          name="WorkoutList"
          component={WorkoutList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ViewWorkout"
          component={ViewWorkout}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddWorkout"
          component={AddWorkout}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CycleFields"
          component={CycleFields}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DietFields"
          component={DietFields}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RunFields"
          component={RunFields}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SCFields"
          component={SCFields}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SCFields2"
          component={SCFields2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SwimFields"
          component={SwimFields}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="GraphGen"
          component={GraphGen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WorkoutCompletion"
          component={WorkoutCompletion}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const AdminNavigator = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Admin">
        <Stack.Screen
          name="Admin"
          component={Admin}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="showProfile"
          component={showProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AccountsHomeScreen"
          component={AccountsHomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Accounts"
          component={Accounts}
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
        {/* <Stack.Screen
          name="PushNotifications"
          component={PushNotifications}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name="BugReport"
          component={BugReport}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MainNavigator = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Media") {
            iconName = "video";
          } else if (route.name === "Workout") {
            iconName = "dumbbell";
          } else if (route.name === "Admin") {
            iconName = "user";
          }

          // You can return any component that you like here!
          return <Icon name={iconName} type="font-awesome-5" color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
        style: {
          backgroundColor: "black",
          paddingTop: 5,
        },
      }}
    >
      <Tabs.Screen name="Home" component={HomeNavigator} />

      <Tabs.Screen name="Media" component={MediaNavigator} />
      <Tabs.Screen name="Workout" component={WorkoutNavigator} />
      <Tabs.Screen name="Admin" component={AdminNavigator} />
    </Tabs.Navigator>
  );
};

function CoachFlow() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    >
      <MainNavigator />
    </View>
  );
}

export default CoachFlow;
