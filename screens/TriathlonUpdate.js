import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

import { db } from "../firebase";
import * as firebase from "firebase";

import DatePicker from "react-native-datepicker";

import { Icon } from "react-native-elements";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
});

function TriathlonUpdate({ navigation }) {
  const [races, setRaces] = useState([
    { distance: "5k", duration: null, date: null },
    { distance: "10k", duration: null, date: null },
    { distance: "HM", duration: null, date: null },
    { distance: "FM", duration: null, date: null },
  ]);

  const [lastBestRace, setLastBestRace] = useState([
    {
      name: "sprint",
      swimTime: null,
      bikeTime: null,
      runTime: null,
      totalTime: null,
      date: null,
    },
    {
      name: "olympic",
      swimTime: null,
      bikeTime: null,
      runTime: null,
      totalTime: null,
      date: null,
    },
    {
      name: "halfIronman",
      swimTime: null,
      bikeTime: null,
      runTime: null,
      totalTime: null,
      date: null,
    },
    {
      name: "fullIronman",
      swimTime: null,
      bikeTime: null,
      runTime: null,
      totalTime: null,
      date: null,
    },
  ]);

  console.log("====================================");
  console.log({ races, lastBestRace });
  console.log("====================================");

  const handleDurationChange = (idx, newValue) => {
    setRaces(
      races.map((item, index) =>
        index === idx ? { ...item, duration: newValue } : item
      )
    );
  };

  const handleDateChange = (idx, newValue) => {
    setRaces(
      races.map((item, index) =>
        index === idx ? { ...item, date: newValue } : item
      )
    );
  };

  const handleSwimTimeChange = (idx, newValue) => {
    setLastBestRace(
      lastBestRace.map((item, index) =>
        index === idx ? { ...item, swimTime: newValue } : item
      )
    );
  };

  const handleBikeTimeChange = (idx, newValue) => {
    setLastBestRace(
      lastBestRace.map((item, index) =>
        index === idx ? { ...item, bikeTime: newValue } : item
      )
    );
  };

  const handleRunTimeChange = (idx, newValue) => {
    setLastBestRace(
      lastBestRace.map((item, index) =>
        index === idx ? { ...item, runTime: newValue } : item
      )
    );
  };

  const handleTotalTimeChange = (idx, newValue) => {
    setLastBestRace(
      lastBestRace.map((item, index) =>
        index === idx ? { ...item, totalTime: newValue } : item
      )
    );
  };

  const handleBestRaceDateChange = (idx, newValue) => {
    setLastBestRace(
      lastBestRace.map((item, index) =>
        index === idx ? { ...item, date: newValue } : item
      )
    );
  };

  const submitDetails = () => {
    db.collection("athletes")
      .doc("L8qmpoVumSIyGoHyz5Js")
      .collection("sports")
      .doc("Triathlon")
      .update({
        races,
        lastBestRace,
      })
      .then(() => navigation.navigate("Settings"))
      .catch((e) => console.log(e));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("SwimUpdate")}
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
          onPress={() => navigation.navigate("Settings")}
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
              Triathlon
            </Text>
          </View>

          {races.map((race, idx) => (
            <View style={{ marginVertical: 20 }}>
              <Text
                style={{
                  color: "steelblue",
                  marginHorizontal: 20,
                  fontSize: 20,
                }}
              >
                {race.distance}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", margin: 20 }}>Duration</Text>
                <TextInput
                  underlineColorAndroid="white"
                  style={{
                    color: "white",
                    padding: 10,
                    width: 50,
                    marginLeft: 20,
                  }}
                  keyboardType={"numeric"}
                  value={race.duration}
                  onChangeText={(newValue) =>
                    handleDurationChange(idx, newValue)
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
                <DatePicker
                  style={{ width: 250, marginVertical: 10, marginLeft: 15 }}
                  date={race.date}
                  mode="date"
                  placeholder="Select Date"
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
                  onDateChange={(date) => {
                    handleDateChange(idx, date);
                  }}
                />
              </View>
            </View>
          ))}
        </View>

        {lastBestRace?.map((race, idx) => (
          <View key={idx}>
            <Text
              style={{
                color: "white",
                margin: 20,
                fontSize: 20,
                textDecoration: "captitalize",
              }}
            >
              {race.name.toUpperCase()}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", margin: 20 }}>Swim time</Text>
              <TextInput
                underlineColorAndroid="white"
                style={{
                  color: "white",
                  padding: 10,
                  width: 50,
                  marginLeft: 20,
                }}
                keyboardType={"numeric"}
                value={race.swimTime}
                onChangeText={(newValue) => handleSwimTimeChange(idx, newValue)}
              />
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", margin: 20 }}>Bike time</Text>
              <TextInput
                underlineColorAndroid="white"
                style={{
                  color: "white",
                  padding: 10,
                  width: 50,
                  marginLeft: 20,
                }}
                keyboardType={"numeric"}
                value={race.bikeTime}
                onChangeText={(newValue) => handleBikeTimeChange(idx, newValue)}
              />
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", margin: 20 }}>Run time</Text>
              <TextInput
                underlineColorAndroid="white"
                style={{
                  color: "white",
                  padding: 10,
                  width: 50,
                  marginLeft: 20,
                }}
                keyboardType={"numeric"}
                value={race.runTime}
                onChangeText={(newValue) => handleRunTimeChange(idx, newValue)}
              />
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", margin: 20 }}>Total time</Text>
              <TextInput
                underlineColorAndroid="white"
                style={{
                  color: "white",
                  padding: 10,
                  width: 50,
                  marginLeft: 20,
                }}
                keyboardType={"numeric"}
                value={race.totalTime}
                onChangeText={(newValue) =>
                  handleTotalTimeChange(idx, newValue)
                }
              />
            </View>
            <DatePicker
              style={{ width: 250, marginVertical: 10, marginLeft: 15 }}
              date={race.date}
              mode="date"
              placeholder="Select Date"
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
              onDateChange={(date) => {
                handleBestRaceDateChange(idx, date);
              }}
            />
          </View>
        ))}

        <TouchableOpacity
          style={{
            backgroundColor: "steelblue",
            width: 343,
            height: 55,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 50,
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
    </ScrollView>
  );
}

export default TriathlonUpdate;
