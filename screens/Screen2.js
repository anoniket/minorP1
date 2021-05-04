import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
});

function Screen2({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <TouchableOpacity style={{ position: "absolute", top: 25, right: 16 }}>
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

      <Text
        style={{
          fontFamily: "SF-Pro-Display-thin",
          fontSize: 25,
          color: "white",
          marginBottom: 20,
          marginTop: 28,
        }}
      >
        What it does for coaches
      </Text>
      <Image
        style={{ width: "70%", height: "40%", borderRadius: 10 }}
        source={require("../assets/logo.png")}
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
            color: "white",
            marginTop: 10,
            marginBottom: 16,
          }}
        >
          Heading 1
        </Text>
        <View style={{ width: "90%", marginBottom: 20 }}>
          <Text
            style={{
              fontFamily: "SF-Pro-Display-light",
              color: "white",
              fontSize: 18,
              textAlign: "center",
            }}
          >
            Lorem Ipsum has been the industry's standard dummy text
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
            width: "40%",
            height: 10,
            width: 30,
            backgroundColor: "steelblue",
            borderRadius: 100,
            borderColor: "steelblue",
            borderWidth: 0.2,
            marginHorizontal: 3,
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
            marginHorizontal: 3,
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
            marginHorizontal: 3,
          }}
        ></View>
      </View>

      <TouchableOpacity
        style={{ position: "absolute", bottom: 25, right: 10 }}
        onPress={() => navigation.navigate("Screen3")}
      >
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 100,
            backgroundColor: "#E2E2E2",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{ width: 23, height: 11 }}
            source={require("../assets/right-arrow.png")}
          />
        </View>
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
