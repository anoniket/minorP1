import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

import { Icon } from "react-native-elements";

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

const Settings = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "white",
          textAlign: "center",
          fontSize: 22,
          marginBottom: 50,
        }}
      >
        Settings
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate("ShowProfile")}>
        <View
          style={{
            display: "flex",
            width: ScreenWidth - 80,
            height: 50,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Your Profile</Text>
          <Icon name="chevron-right" type="font-awesome-5" color="white" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("")}>
        <View
          style={{
            display: "flex",
            width: ScreenWidth - 80,
            height: 50,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Link Strava</Text>
          <Icon name="chevron-right" type="font-awesome-5" color="white" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("MedicalCheck")}>
        <View
          style={{
            display: "flex",
            width: ScreenWidth - 80,
            height: 50,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Medical History</Text>
          <Icon name="chevron-right" type="font-awesome-5" color="white" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Training")}>
        <View
          style={{
            display: "flex",
            width: ScreenWidth - 80,
            height: 50,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Training</Text>
          <Icon name="chevron-right" type="font-awesome-5" color="white" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Gadgets")}>
        <View
          style={{
            display: "flex",
            width: ScreenWidth - 80,
            height: 50,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>
            Gadgets and Equipments
          </Text>
          <Icon name="chevron-right" type="font-awesome-5" color="white" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("BugReport", { userType: "athlete" })}>
        <View
          style={{
            display: "flex",
            width: ScreenWidth - 80,
            height: 50,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Bug Report</Text>
          <Icon name="chevron-right" type="font-awesome-5" color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;
