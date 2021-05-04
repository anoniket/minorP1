import React from "react";
import {
  View,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
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

const Admin = ({ navigation }) => {
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
        Admin
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate("showProfile")}>
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
          <Text style={{ color: "white" }}>Your Profile</Text>
          <Icon name="chevron-right" type="font-awesome-5" color="white" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("AccountsHomeScreen")}
      >
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
          <Text style={{ color: "white" }}>Accounts</Text>
          <Icon name="chevron-right" type="font-awesome-5" color="white" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("BugReport", { userType: "coach" })}>
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
          <Text style={{ color: "white" }}>Bug Report</Text>
          <Icon name="chevron-right" type="font-awesome-5" color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Admin;
