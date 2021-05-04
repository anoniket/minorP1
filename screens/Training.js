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

import { Icon } from "react-native-elements";

import CheckBox from "@react-native-community/checkbox";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
});

function Training({ navigation }) {
  const [experience, setExperience] = useState(null);
  const [selected, setSelected] = useState([]);
  const [days, setDays] = useState([
    { day: "Monday", hrs: null },
    { day: "Tuesday", hrs: null },
    { day: "Wednesday", hrs: null },
    { day: "Thursday", hrs: null },
    { day: "Friday", hrs: null },
    { day: "Saturday", hrs: null },
    { day: "Sunday", hrs: null },
  ]);

  const isItemChecked = (abilityName) => {
    return selected.indexOf(abilityName) > -1;
  };

  const handleCheckBoxChange = (evt, abilityName) => {
    if (isItemChecked(abilityName)) {
      setSelected(selected.filter((i) => i !== abilityName));
    } else {
      setSelected([...selected, abilityName]);
    }
  };

  const handleHrs = (idx, newValue) => {
    setDays(
      days.map((item, index) =>
        index === idx ? { ...item, hrs: newValue } : item
      )
    );
  };

  const submitDetails = () => {
    db.collection("athletes")
      .doc("L8qmpoVumSIyGoHyz5Js")
      .collection("Training")
      .doc("training")
      .set({
        experience,
        days,
      })
      .then(() => navigation.navigate("RaceUpdate"))
      .catch((e) => console.log(e));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Settings")}
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
          onPress={() => navigation.navigate("RaceUpdate")}
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
              Medical History
            </Text>
          </View>

          <View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 50,
              }}
            >
              <Text style={{ color: "white", marginRight: 10 }}>
                Number of years you have been training?
              </Text>
              <TextInput
                placeholder="Enter Your Mobile Number"
                underlineColorAndroid="white"
                style={{ color: "white", padding: 10, width: 40 }}
                keyboardType={"numeric"}
                value={experience}
                onChangeText={setExperience}
              />
              <Text style={{ color: "white", marginLeft: 10 }}>Yrs</Text>
            </View>

            <View>
              <Text
                style={{ color: "white", marginRight: 10, marginBottom: 10 }}
              >
                Days and approximate duration you can devote?{" "}
              </Text>
              <Text
                style={{ color: "white", marginRight: 10, marginBottom: 30 }}
              >
                Select the checkbox for rest day
              </Text>
              {days.map((item, idx) => (
                <View
                  key={idx}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    margin: 20,
                  }}
                >
                  <CheckBox
                    style={{
                      margin: 0,
                      padding: 0,
                      color: "white",
                      backgroundColor: "white",
                    }}
                    key={idx}
                    disabled={false}
                    value={isItemChecked(item.day)}
                    onValueChange={(evt) => handleCheckBoxChange(evt, item.day)}
                  />
                  <Text style={{ color: "white", marginLeft: 15, width: 70 }}>
                    {item.day}
                  </Text>
                  {isItemChecked(item.day) === false && (
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <TextInput
                        placeholder="Enter Your Mobile Number"
                        underlineColorAndroid="white"
                        style={{
                          color: "white",
                          padding: 10,
                          width: 50,
                          marginLeft: 20,
                        }}
                        keyboardType={"numeric"}
                        value={item.hrs}
                        onChangeText={(newValue) => handleHrs(idx, newValue)}
                      />
                      <Text style={{ color: "white", marginLeft: 10 }}>
                        Hrs
                      </Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
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

export default Training;
