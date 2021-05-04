import React from "react";
import { View, Button, StyleSheet, Dimensions } from "react-native";
let ScreenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 0,
    paddingTop: 20,
    height: ScreenHeight - 40,
  },
});

const CoachSettings = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Your Profile"
        onPress={() => navigation.navigate("showProfile")}
      />
      
    </View>
  );
};

export default CoachSettings;
