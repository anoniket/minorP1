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
  const [notSelected, setNotSelected] = useState([]);
  const [ladiesCheckbox, setLadiesCheckbox] = useState(false);
  const [ladiesNotSelected, setLadiesNotSelected] = useState(false);

  const checkboxValues = [
    "Are you suffering from a heart condition (heart attack,angina,irregular beat,hole in the heart,etc)?",
    "Do you feel pain in the chest when performing physical activity?",
    "Do you suffer from high or low Blood pressure?",
    "Are you taking any medications to control your blood pressure or heart condition?",
    "Do you have Back/join problem that could be made worse through physical activity?",
    "Do you knowingly suffer from Diabetes?",
    "Do you suffer from respiratory illness (asthma,bronchitis,emphysema) of shortness of breath with mild exertion?",
    "Are you under medical treatment for any illness?",
  ];

  const isItemChecked = (abilityName) => {
    return selected.indexOf(abilityName) > -1;
  };

  const isItemNotChecked = (abilityName) => {
    return notSelected.indexOf(abilityName) > -1;
  };

  const handleCheckBoxNotChange = (evt, abilityName) => {
    if (isItemNotChecked(abilityName)) {
      setNotSelected(notSelected.filter((i) => i !== abilityName));
    } else {
      setNotSelected([...notSelected, abilityName]);
    }
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
        })
        .then(() => navigation.navigate("Settings"))
        .catch((e) => console.log(e));
    });
    if (ladiesCheckbox) {
      db.collection("athletes")
        .doc("L8qmpoVumSIyGoHyz5Js")
        .collection("Medical")
        .doc("medical")
        .update({
          [Pregnant]: true,
        });
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("MedicalCheck1")}
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
                flexWrap: "wrap",
              }}
            >
              {checkboxValues.map((disease, idx) => (
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginVertical: 20,
                  }}
                  key={idx}
                >
                  <Text style={{ color: "white", marginLeft: 10 }}>
                    {disease}
                  </Text>
                  <View
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
                      value={isItemChecked(disease)}
                      onValueChange={(evt) =>
                        handleCheckBoxChange(evt, disease)
                      }
                    />
                    <Text
                      style={{
                        color: "white",
                        marginLeft: 10,
                        marginRight: 50,
                      }}
                    >
                      Yes
                    </Text>

                    <CheckBox
                      style={{
                        margin: 0,
                        padding: 0,
                        color: "white",
                        backgroundColor: "white",
                      }}
                      key={idx}
                      disabled={false}
                      value={isItemNotChecked(disease)}
                      onValueChange={(evt) =>
                        handleCheckBoxNotChange(evt, disease)
                      }
                    />
                    <Text style={{ color: "white", marginLeft: 10 }}>No</Text>
                  </View>
                </View>
              ))}

              <Text style={{ color: "white", marginLeft: 10 }}>
                For Ladies only
              </Text>
              <Text style={{ color: "white", marginLeft: 10 }}>
                Are you pregnant (or have you had a child in last 3 months)?
              </Text>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 20,
                  marginLeft: 30,
                }}
              >
                <CheckBox
                  style={{
                    margin: 0,
                    padding: 0,
                    color: "white",
                    backgroundColor: "white",
                  }}
                  disabled={false}
                  value={ladiesCheckbox}
                  onValueChange={(newValue) => setLadiesCheckbox(newValue)}
                />
                <Text
                  style={{ color: "white", marginLeft: 10, marginRight: 40 }}
                >
                  Yes
                </Text>
                <CheckBox
                  style={{
                    margin: 0,
                    padding: 0,
                    color: "white",
                    backgroundColor: "white",
                  }}
                  disabled={false}
                  value={ladiesNotSelected}
                  onValueChange={(newValue) => setLadiesNotSelected(newValue)}
                />
                <Text style={{ color: "white", marginLeft: 10 }}>No</Text>
              </View>
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
