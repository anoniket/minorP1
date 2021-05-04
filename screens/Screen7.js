import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  BackHandler,
  Alert,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { Icon } from "react-native-elements";

import { useDispatch, useSelector } from "react-redux";
import { setUserType } from "../features/userSlice";
import { db, auth } from "../firebase";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: 40,
  },
});

function Screen7({ navigation }) {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Screen4")}
        style={{
          position: "absolute",
          left: 25,
          top: 30,
        }}
      >
        <Icon name="chevron-left" type="font-awesome-5" color="white" />
      </TouchableOpacity>
      <View
        style={{
          justifyContent: "center",
          alignItems: "flex-start",
          marginLeft: 70,
          marginTop: 20,
        }}
      >
        <View style={{ width: "69%", marginTop: "15%" }}>
          <Text
            style={{
              fontSize: 25,
              color: "white",
              fontWeight: "400",
              marginBottom: "5%",
            }}
          >
            Welcome
          </Text>

          <Text
            style={{
              fontSize: 20,
              color: "white",
            }}
          >
            Please select the option that applies to you
          </Text>
        </View>
      </View>
      <View style={{ alignItems: "center", marginTop: "20%" }}>
        <TouchableOpacity
          activeOpacity={0.6}
          backgroundColor="steelblue"
          style={{
            width: "90%",
            backgroundColor: "steelblue",
            height: 55,
            marginBottom: 70,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
            shadowColor: "#3895CE",
          }}
          onPress={() => {
            navigation.navigate("Screen5");
            dispatch(setUserType("athlete"));
          }}
        >
          <LinearGradient
            colors={["#3895CE", "#004872"]}
            start={[0, 0]}
            end={[1, 0]}
            style={{
              width: "100%",
              height: "100%",
              paddingTop: 10,
              borderRadius: 8,
            }}
            onPress={() => {
              navigation.navigate("Screen5");
              dispatch(setUserType("athlete"));
            }}
          >
            <View>
              <Text
                style={{
                  color: "#E2E2E2",
                  fontSize: 20,
                  fontFamily: "SF-Pro-Display-regular",
                  textAlign: "center",
                }}
              >
                Athelete{" "}
              </Text>
              {/* <Icon
              style={{ marginLeft: "50%" }}
              name="chevron-right"
              type="font-awesome-5"
              color="white"
            /> */}
            </View>
            <Image
              style={{
                width: 30,
                height: 20,
                position: "absolute",
                right: 15,
                marginTop: 15,
              }}
              source={require("../assets/doubleleftarrowheads.png")}
            />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.6}
          style={{
            width: "90%",
            backgroundColor: "steelblue",
            height: 55,
            marginBottom: 70,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
          }}
          onPress={() => {
            navigation.navigate("Screen5");
            dispatch(setUserType("coach"));
          }}
        >
          <LinearGradient
            colors={["#3895CE", "#004872"]}
            start={[0, 0]}
            end={[1, 0]}
            style={{
              width: "100%",
              height: "100%",
              paddingTop: 10,
              borderRadius: 8,
            }}
            onPress={() => {
              navigation.navigate("Screen5");
              dispatch(setUserType("coach"));
            }}
          >
            <View>
              <Text
                style={{
                  color: "#E2E2E2",
                  fontSize: 20,
                  fontFamily: "SF-Pro-Display-regular",
                  textAlign: "center",
                }}
              >
                Coach{" "}
              </Text>
            </View>
            <Image
              style={{
                width: 30,
                height: 20,
                position: "absolute",
                right: 15,
                marginTop: 15,
              }}
              source={require("../assets/doubleleftarrowheads.png")}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Screen7;
