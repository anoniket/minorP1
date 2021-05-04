import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";

import { Icon } from "react-native-elements";

import { db } from "../firebase";

import { selectUserData } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
});

function Screen9({ navigation }) {
  const [color1, changeColor1] = useState(false);
  const [color2, changeColor2] = useState(false);
  const userDetail = useSelector(selectUserData);

  console.log({ userDetail });

  const handlePress = () => {
    if (color1) {
      db.collection("athletes").doc(userDetail.id).update({
        diet: "true",
      });
    } else {
      db.collection("athletes").doc(userDetail.id).update({
        diet: "false",
      });
    }
    if (color2) {
      db.collection("athletes").doc(userDetail.id).update({
        "S&C": "true",
      });
    } else {
      db.collection("athletes").doc(userDetail.id).update({
        "S&C": "false",
      });
    }
    // navigate("Screen11");
    navigation.navigate("MedicalCheck");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Screen8")}
        style={{
          position: "absolute",
          left: 25,
          top: 30,
          backgroundColor: "black",
        }}
      >
        <Icon name="chevron-left" type="font-awesome-5" color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("MedicalCheck")}
        style={{ position: "absolute", top: 30, right: 16 }}
      >
        <Text
          style={{
            fontFamily: "SF-Pro-Display-regular",
            fontSize: 17,
            color: "white",
          }}
        >
          Skip
        </Text>
      </TouchableOpacity>
      <View
        style={{
          marginTop: 100,
          flexDirection: "row",
          width: "85%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{ height: 8, width: 52, backgroundColor: "#E2E2E2" }}
        ></View>
        <View
          style={{ height: 8, width: 52, backgroundColor: "#707070" }}
        ></View>
        <View
          style={{ height: 8, width: 52, backgroundColor: "#E2E2E2" }}
        ></View>
        <View
          style={{ height: 8, width: 52, backgroundColor: "#E2E2E2" }}
        ></View>
        <View
          style={{ height: 8, width: 52, backgroundColor: "#E2E2E2" }}
        ></View>
      </View>

      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            color: "white",
            fontSize: 17,
            fontFamily: "SF-Pro-Display-semibold",
            position: "absolute",
            top: -95,
          }}
        >
          Setup Profile
        </Text>
        <View style={{ width: 240 }}>
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 25,
              fontFamily: "SF-Pro-Display-medium",
              marginTop: 15,
              marginBottom: 25,
            }}
          >
            Select Supplementary Activites
          </Text>
        </View>

        <View
          style={{
            width: 234,
            height: 53,
            marginTop: 0,
            marginBottom: 16,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              fontFamily: "SF-Pro-Display-regular",
              color: "white",
            }}
          >
            Please select all the supplementary activites that you are
            interested in
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            changeColor1(!color1);
          }}
          style={
            color1
              ? { borderColor: "#d7385e", borderWidth: 2, marginBottom: 10 }
              : { marginBottom: 10 }
          }
        >
          <View
            style={{
              width: 343,
              height: 72,
              backgroundColor: "steelblue",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 25,
                fontFamily: "SF-Pro-Display-regular",
              }}
            >
              Diet
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            changeColor2(!color2);
          }}
          style={
            color2
              ? { borderColor: "#d7385e", borderWidth: 2, marginBottom: 40 }
              : { marginBottom: 40 }
          }
        >
          <View
            style={{
              width: 343,
              height: 72,
              backgroundColor: "steelblue",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 25,
                fontFamily: "SF-Pro-Display-regular",
              }}
            >
              Strength and Conditioning
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "steelblue",
            width: 343,
            height: 55,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={handlePress}
        >
          <View>
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontFamily: "SF-Pro-Display-regular",
              }}
            >
              Proceed
            </Text>
          </View>
          <Image
            style={{ width: 23, height: 11, position: "absolute", right: 15 }}
            source={require("../assets/right.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Screen9;
