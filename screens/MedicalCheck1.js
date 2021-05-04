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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
});

function MedicalCheck1({ navigation }) {
  const [heartRate, setHeartRate] = useState(null);
  const [bp, setBp] = useState(null);
  const [selected, setSelected] = useState([]);
  const [checkboxValues, setCheckboxValues] = useState([
    "Diabetes",
    "Hepatitis",
    "Pneumonia",
    "High Blood Pressure",
    "Back/join pain",
    "Kidney Infection",
    "Heart Murmur",
    "Infectious Mono",
    "Heart Disease",
    "Head injury",
    "Angina/chest pain",
    "Other specify",
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

  const submitDetails = () => {
    selected.map((item) => {
      db.collection("athletes")
        .doc("L8qmpoVumSIyGoHyz5Js")
        .collection("Medical")
        .doc("medical")
        .update({
          [item]: true,
        });
    });

    db.collection("athletes")
      .doc("L8qmpoVumSIyGoHyz5Js")
      .collection("Medical")
      .doc("medical")
      .update({
        heartRate,
        bp,
      })
      .then(() => navigation.navigate("MedicalCheck2"))
      .catch((e) => console.log(e));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("MedicalCheck")}
          style={{ position: "absolute", left: 25, top: 25 }}
        >
          <View style={{ width: 50, height: 20 }}>
            <Image
              style={{ width: 20, height: 20 }}
              source={require("../assets/back.png")}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Screen16")}
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

          <View style={{ marginVertical: 20, marginHorizontal: 40 }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 20,
              }}
            >
              <Text style={{ color: "white", marginRight: 10 }}>
                Resting Heart Rate :{" "}
              </Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: "white",
                  height: 25,
                  color: "white",
                  paddingHorizontal: 20,
                  width: 150,
                }}
                value={heartRate}
                onChangeText={setHeartRate}
                placeholderTextColor="white"
              />
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 20,
              }}
            >
              <Text style={{ color: "white", marginRight: 10 }}>
                Resting Blood Pressure :{" "}
              </Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: "white",
                  height: 25,
                  color: "white",
                  paddingHorizontal: 20,
                  width: 150,
                }}
                value={bp}
                onChangeText={setBp}
                placeholderTextColor="white"
              />
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 20,
                flexWrap: "wrap",
              }}
            >
              {checkboxValues.map((disease, idx) => (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    margin: 20,
                  }}
                  key={idx}
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
                    value={isItemChecked(disease)}
                    onValueChange={(evt) => handleCheckBoxChange(evt, disease)}
                  />
                  <Text style={{ color: "white", marginLeft: 10 }}>
                    {disease}
                  </Text>
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

export default MedicalCheck1;
