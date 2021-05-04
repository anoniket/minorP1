import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";

function Screen2(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setNext("5");
        }}
        style={{ position: "absolute", top: 28, right: 16 }}
      >
        <Text
          style={{
            fontFamily: "SF-Pro-Display-regular",
            fontSize: 17,
            color: "#707070",
          }}
        >
          Skip
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          fontFamily: "SF-Pro-Display-thin",
          fontSize: 25,
          color: "#707070",
          marginBottom: 20,
          marginTop: 28,
        }}
      >
        Heading 1
      </Text>
      <Image
        style={{ width: 343, height: 276 }}
        source={require("./assets/logo.png")}
      />
      <View
        style={{
          width: 282,
          height: 175,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <Text
          style={{
            fontFamily: "SF-Pro-Display-semibold",
            fontSize: 25,
            color: "#707070",
            marginTop: 32,
            marginBottom: 16,
          }}
        >
          Heading 1
        </Text>
        <View style={{ width: "75%", marginBottom: 20 }}>
          <Text
            style={{
              fontFamily: "SF-Pro-Display-light",
              color: "#707070",
              fontSize: 18,
              textAlign: "center",
            }}
          >
            Ipsum has been the industry's standard dummy text ever since the
            1500s
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: 54,
        }}
      >
        <View
          style={{
            width: "20%",
            height: 10,
            width: 10,
            backgroundColor: "#E2E2E2",
            borderRadius: 100,
            borderColor: "black",
            borderWidth: 0.2,
          }}
        ></View>
        <View
          style={{
            width: "20%",
            height: 10,
            width: 10,
            backgroundColor: "white",
            borderRadius: 100,
            borderColor: "black",
            borderWidth: 0.2,
          }}
        ></View>
        <View
          style={{
            width: "20%",
            height: 10,
            width: 10,
            backgroundColor: "white",
            borderRadius: 100,
            borderColor: "black",
            borderWidth: 0.2,
          }}
        ></View>
      </View>

      <TouchableOpacity
        style={{ position: "absolute", bottom: 40, right: 30 }}
        onPress={props.setNext}
      >
        <Image
          style={{ width: 50, height: 50, borderRadius: 100 }}
          source={require("../assets/logo.png")}
        />
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: "black",
          width: 134,
          height: 5,
          position: "absolute",
          bottom: 9,
        }}
      ></View>
    </View>
  );
}

export default Screen2;
