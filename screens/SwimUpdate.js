import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  View,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";

import { db } from "../firebase";
import * as firebase from "firebase";
import CheckBox from "@react-native-community/checkbox";

import { Icon } from "react-native-elements";

import DatePicker from "react-native-datepicker";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
});

function SwimUpdate({ navigation }) {
  const [longestSwim, setlongestSwim] = useState({
    distance: null,
    time: null,
    date: null,
  });
  const [latestTimeTrial, setLatestTimeTrial] = useState({
    time: null,
    date: null,
  });
  const [avgMileage, setAvgMileage] = useState(null);
  const [experience, setExperience] = useState(null);

  const submitDetails = () => {
    db.collection("athletes")
      .doc("L8qmpoVumSIyGoHyz5Js")
      .collection("sports")
      .doc("Swim")
      .update({
        longestSwim,
        "100m Time Trial": latestTimeTrial,
        avgMileage,
        experience,
      });

    navigation.navigate("TriathlonUpdate");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("BikeUpdate")}
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
          onPress={() => navigation.navigate("TriathlonUpdate")}
          style={{ position: "absolute", top: 20, right: 16 }}
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
            marginTop: 80,
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
              top: -65,
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
              Training
            </Text>
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
              Swim
            </Text>
          </View>

          <View style={{ marginBottom: 40 }}>
            <Text
              style={{ color: "steelblue", marginHorizontal: 20, fontSize: 18 }}
            >
              Longest Swim
            </Text>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", margin: 20 }}>Distance</Text>
              <TextInput
                underlineColorAndroid="white"
                style={{
                  color: "white",
                  padding: 10,
                  width: 50,
                  marginLeft: 20,
                }}
                keyboardType={"numeric"}
                value={longestSwim.distance}
                onChangeText={(newValue) =>
                  setlongestSwim({ ...longestSwim, distance: newValue })
                }
              />
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", margin: 20 }}>Time</Text>
              <TextInput
                underlineColorAndroid="white"
                style={{
                  color: "white",
                  padding: 10,
                  width: 50,
                  marginLeft: 20,
                }}
                keyboardType={"numeric"}
                value={longestSwim.time}
                onChangeText={(newValue) =>
                  setlongestSwim({ ...longestSwim, time: newValue })
                }
              />
            </View>

            <DatePicker
              style={{ width: 250, marginVertical: 10, marginLeft: 15 }}
              date={longestSwim.date}
              mode="date"
              placeholder="Select Date of Birth"
              format="MM-YYYY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: "absolute",
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                  borderRadius: 5,
                  color: "white",
                },
              }}
              onDateChange={(newValue) => {
                setlongestSwim({ ...longestSwim, date: newValue });
              }}
            />
          </View>

          <View style={{ marginBottom: 40 }}>
            <Text
              style={{ color: "steelblue", marginHorizontal: 20, fontSize: 18 }}
            >
              100m Time Trial
            </Text>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", margin: 20 }}>Time</Text>
              <TextInput
                underlineColorAndroid="white"
                style={{
                  color: "white",
                  padding: 10,
                  width: 50,
                  marginLeft: 20,
                }}
                keyboardType={"numeric"}
                value={latestTimeTrial.time}
                onChangeText={(newValue) =>
                  setLatestTimeTrial({ ...latestTimeTrial, time: newValue })
                }
              />
            </View>

            <DatePicker
              style={{ width: 250, marginVertical: 10, marginLeft: 15 }}
              date={latestTimeTrial.date}
              mode="date"
              placeholder="Select Date of Birth"
              format="MM-YYYY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: "absolute",
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                  borderRadius: 5,
                  color: "white",
                },
              }}
              onDateChange={(newValue) => {
                setLatestTimeTrial({ ...latestTimeTrial, date: newValue });
              }}
            />
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 40,
            }}
          >
            <Text style={{ color: "white", margin: 20 }}>
              Average weekly mileage
            </Text>
            <TextInput
              underlineColorAndroid="white"
              style={{
                color: "white",
                padding: 10,
                width: 50,
                marginLeft: 20,
              }}
              keyboardType={"numeric"}
              value={avgMileage}
              onChangeText={setAvgMileage}
            />
          </View>

          <View style={{ marginBottom: 40 }}>
            <Text style={{ color: "white", marginHorizontal: 20 }}>
              Do you have Open Water Swim Experience (Y/N)
            </Text>
            <TextInput
              underlineColorAndroid="white"
              style={{
                color: "white",
                padding: 10,
                width: 100,
                marginLeft: 20,
              }}
              value={experience}
              onChangeText={setExperience}
            />
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "steelblue",
              width: 343,
              height: 55,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={submitDetails}
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
    </ScrollView>
  );
}

export default SwimUpdate;
