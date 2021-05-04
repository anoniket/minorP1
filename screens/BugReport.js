import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Icon } from 'react-native-elements';

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

import { db } from "../firebase";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    marginBottom: 0,
    paddingTop: 20,
    height: ScreenHeight - 40,
  },
});

const BugReport = ({ route, navigation }) => {
  const [bug, setBug] = useState("");
  const { userType } = route.params;
  const sendBugReport = () => {
    db.collection("bugs")
      .add({
        bug,
      })
      .then(() => navigation.navigate("Settings"))
      .catch((e) => console.log(e));
  };
  return (
    <View style={styles.container}>

      <TouchableOpacity
        onPress={() =>
          userType === "coach"
            ? navigation.navigate("Admin")
            : navigation.navigate("Settings")
        }
        style={{
          position: "absolute",
          left: 25,
          top: 30,
          backgroundColor: "black",
        }}
      >
        <Icon name="chevron-left" type="font-awesome-5" color="white" />
      </TouchableOpacity>
      <Text
        style={{
          color: "white",
          textAlign: "center",
          fontSize: 22,
          paddingBottom: 60,
        }}
      >
        Bug Report
      </Text>

      <TextInput
        style={{
          borderWidth: 1,
          borderRadius: 12,
          borderColor: "white",
          color: "white",
          paddingHorizontal: 10,
          width: ScreenWidth - 20,
          marginBottom: 10,
        }}
        multiline={true}
        underlineColorAndroid="transparent"
        numberOfLines={10}
        onChangeText={(text) => setBug(text)}
        value={bug}
        // placeholder="List out the bugs here..."
        placeholderTextColor="white"
      />

      <TouchableOpacity
        style={{
          height: 52,
          width: ScreenWidth - 16,
          marginTop: 50,
          marginBottom: 8,
          paddingTop: 10,
          borderRadius: 8,
          backgroundColor: "steelblue",
        }}
        onPress={sendBugReport}
      >
        <Text
          style={{
            color: "white",
            fontSize: 20,
            textAlign: "center",
          }}
        >
          Submit the Report
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BugReport;
