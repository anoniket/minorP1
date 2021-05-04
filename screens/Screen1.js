import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";

import { selectUser, login, logout } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    color: "white",
  },
});

function Screen1({ navigation }) {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      navigation.navigate("Screen7");
    }
  }, []);
  return (
    <View
      style={styles.container}
      onPress={() => navigation.navigate("Screen2")}
    >
      <View>
        <Image
          style={{
            width: 206,
            height: 206,
            borderRadius: 100,
          }}
          source={require("../assets/logo.png")}
        />
      </View>

      <Text
        style={{
          fontFamily: "Roboto-Black",
          color: "white",
          fontSize: 20,
          marginVertical: 25,
        }}
      >
        Coach
        <Text
          style={{
            fontFamily: "HelveticaNeuBold",
            color: "white",
            fontSize: 20,
          }}
        >
          Deck
        </Text>
      </Text>
      <View
        style={{
          backgroundColor: "black",
          width: 134,
          height: 5,
          position: "absolute",
          bottom: 9,
        }}
      ></View>
      <Button title="Next" onPress={() => navigation.navigate("Screen2")} />
    </View>
  );
}

export default Screen1;
