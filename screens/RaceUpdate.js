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

function RaceUpdate({ navigation }) {
  const [races, setRaces] = useState([
    { distance: "100m", duration: null, date: null },
    { distance: "200m", duration: null, date: null },
    { distance: "400m", duration: null, date: null },
    { distance: "800m", duration: null, date: null },
    { distance: "1500m", duration: null, date: null },
    { distance: "3000m", duration: null, date: null },
    { distance: "5k", duration: null, date: null },
    { distance: "10k", duration: null, date: null },
    { distance: "HM", duration: null, date: null },
    { distance: "FM", duration: null, date: null },
  ]);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [customInput, setCustomInput] = useState({
    distance: null,
    duration: null,
    date: null,
  });
  const [bestRace, setBestRace] = useState({
    distance: null,
    duration: null,
    date: null,
  });
  const [avgMileage, setAvgMileage] = useState(null);

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

  const submitDetails = () => {
    db.collection("athletes")
      .doc("L8qmpoVumSIyGoHyz5Js")
      .collection("sports")
      .doc("Run")
      .update({
        races,
        customInput,
        bestRace,
        avgMileage,
      })
      .then(() => navigation.navigate("BikeUpdate"))
      .catch((e) => console.log(e));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Training")}
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
          onPress={() => navigation.navigate("BikeUpdate")}
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
              Race
            </Text>
          </View>

          <View>
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

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", margin: 20 }}>Custom Entry</Text>
            <CheckBox
              style={{
                margin: 0,
                padding: 0,
                color: "white",
                backgroundColor: "white",
              }}
              disabled={false}
              value={toggleCheckBox}
              onValueChange={(newValue) => setToggleCheckBox(newValue)}
            />
          </View>

          {toggleCheckBox && (
            <View>
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
                  value={customInput.distance}
                  onChangeText={(newValue) =>
                    setCustomInput({ ...customInput, distance: newValue })
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
                  value={customInput.duration}
                  onChangeText={(newValue) =>
                    setCustomInput({ ...customInput, duration: newValue })
                  }
                />
              </View>

              <DatePicker
                style={{ width: 250, marginVertical: 10, marginLeft: 15 }}
                date={customInput.date}
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
                onDateChange={(date) => {
                  setCustomInput({ ...customInput, date: date });
                }}
              />
            </View>
          )}

          <Text style={{ color: "white", margin: 20 }}>Last Best Race</Text>

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
              value={bestRace.distance}
              onChangeText={(newValue) =>
                setBestRace({ ...bestRace, distance: newValue })
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
              value={bestRace.duration}
              onChangeText={(newValue) =>
                setBestRace({ ...bestRace, duration: newValue })
              }
            />
          </View>

          <DatePicker
            style={{ width: 250, marginVertical: 10, marginLeft: 15 }}
            date={bestRace.date}
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
              setBestRace({ ...bestRace, date: date });
            }}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
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

export default RaceUpdate;
