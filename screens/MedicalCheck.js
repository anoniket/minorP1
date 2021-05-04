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

import { selectUserData } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";

import { Picker } from "@react-native-picker/picker";
import DatePicker from "react-native-datepicker";

import { Icon } from "react-native-elements";

import { db } from "../firebase";
import * as firebase from "firebase";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
});

function MedicalCheck({ navigation }) {
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [isNormWeight, setIsNormWeight] = useState(null);
  const [bloodGroup, setBloodGroup] = useState("Select your blood group");
  const [fat, setFat] = useState(null);
  const [mass, setMass] = useState(null);
  const [bmr, setBmr] = useState(null);
  const [bloodReport, setBloodReport] = useState(null);
  const [injury, setInjury] = useState({ desc: null, date: null });

  const userDetail = useSelector(selectUserData);

  const getImageFromGallery = async () => {
    const cameraRollPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    if (cameraRollPermission.status === "granted") {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setBloodGroup(result.uri);
      }
    }
  };

  const uploadImage = async () => {
    const response = await fetch(bloodGroup);
    const blob = await response.blob();
    const childPath = `blood_report/${userDetail?.data?.email}`;

    const task = firebase.storage().ref().child(childPath).put(blob);

    const taskProgress = (snapshot) => {
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        db.collection("athletes")
          .doc(userDetail.id)
          .collection("Medical")
          .doc("medical")
          .update({
            height,
            weight,
            isNormWeight,
            bloodGroup,
            bloodReport: snapshot,
            fat,
            mass,
            bmr,
            injury,
          });
      });
    };

    const taskError = (snapshot) => {
      console.log(snapshot);
    };

    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };

  const submitDetails = () => {
    if (bloodReport) {
      uploadImage();
    } else {
      db.collection("athletes")
        .doc(userDetail.id)
        .collection("Medical")
        .doc("medical")
        .update({
          height,
          weight,
          isNormWeight,
          bloodGroup,
          bloodReport: null,
          fat,
          mass,
          bmr,
          injury,
        });
    }

    navigation.navigate("MedicalCheck1");
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
          onPress={() => navigation.navigate("MedicalCheck1")}
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
            marginTop: 90,
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
              top: -75,
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
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <Text
                style={{
                  color: "white",
                  marginRight: 10,
                  fontSize: 17,
                  width: 80,
                }}
              >
                Height :{" "}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: "white",
                    height: 30,
                    color: "white",
                    paddingHorizontal: 20,
                    width: 150,
                  }}
                  value={height}
                  onChangeText={setHeight}
                  keyboardType={"numeric"}
                  placeholderTextColor="white"
                />
                <Text
                  style={{
                    backgroundColor: "#ddd",
                    padding: 5,
                    height: 30,
                    textAlign: "center",
                  }}
                >
                  cms
                </Text>
              </View>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 20,
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <Text
                style={{
                  color: "white",
                  marginRight: 10,
                  fontSize: 17,
                  width: 80,
                }}
              >
                Weight :{" "}
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
                value={weight}
                onChangeText={setWeight}
                keyboardType={"numeric"}
                placeholderTextColor="white"
              />
              <Text
                style={{
                  backgroundColor: "#ddd",
                  padding: 5,
                  height: 25,
                  textAlign: "center",
                }}
              >
                kgs
              </Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 20,
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <Text
                style={{
                  color: "white",
                  marginRight: 10,
                  fontSize: 17,
                  width: 120,
                }}
              >
                Is this your normal weight? :{" "}
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
                value={isNormWeight}
                onChangeText={setIsNormWeight}
                placeholderTextColor="white"
              />
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 20,
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <Text
                style={{
                  color: "white",
                  marginRight: 10,
                  fontSize: 17,
                  width: 120,
                }}
              >
                Blood Group :{" "}
              </Text>
              <Picker
                selectedValue={bloodGroup}
                style={{
                  height: 20,
                  width: 100,
                  color: "white",
                  borderColor: "white",
                  backgroundColor: "steelblue",
                  padding: 10,
                  paddingHorizontal: 25,
                  borderRadius: 12,
                }}
                onValueChange={(itemValue, itemIndex) =>
                  setBloodGroup(itemValue)
                }
              >
                <Picker.Item label="A+" value="A+" />
                <Picker.Item label="A-" value="A-" />
                <Picker.Item label="B+" value="B+" />
                <Picker.Item label="B-" value="B-" />
                <Picker.Item label="AB+" value="AB+" />
                <Picker.Item label="AB-" value="AB-" />
                <Picker.Item label="O+" value="O+" />
                <Picker.Item label="O-" value="O-" />
              </Picker>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 20,
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <Text
                style={{
                  color: "white",
                  marginRight: 10,
                  fontSize: 17,
                  width: 120,
                }}
              >
                Fat% :{" "}
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
                value={fat}
                onChangeText={setFat}
                keyboardType={"numeric"}
                placeholderTextColor="white"
              />
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 20,
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <Text
                style={{
                  color: "white",
                  marginRight: 10,
                  fontSize: 17,
                  width: 120,
                }}
              >
                Muscle mass% :{" "}
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
                value={mass}
                onChangeText={setMass}
                keyboardType={"numeric"}
                placeholderTextColor="white"
              />
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 20,
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <Text
                style={{
                  color: "white",
                  marginRight: 10,
                  fontSize: 17,
                  width: 120,
                }}
              >
                BMR :{" "}
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
                value={bmr}
                onChangeText={setBmr}
                keyboardType={"numeric"}
                placeholderTextColor="white"
              />
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 20,
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <Text style={{ color: "white", marginRight: 10 }}>
                Upload your blood report :{" "}
              </Text>
              <Button title="Pick the image" onPress={getImageFromGallery} />
              <Image source={{ uri: bloodReport }} style={styles.image} />
            </View>

            <View style={{ marginVertical: 15 }}>
              <Text style={{ color: "white", fontSize: 17, width: 120 }}>
                Add Injuries:{" "}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View>
                  <TextInput
                    style={{
                      borderWidth: 1,
                      borderColor: "white",
                      height: 30,
                      color: "white",
                      paddingHorizontal: 20,
                      width: 200,
                      marginLeft: 20,
                      marginVertical: 10,
                    }}
                    placeholder="Answer"
                    placeholderTextColor="white"
                    value={injury.answer}
                    onChangeText={(val) => setInjury({ desc: val })}
                  />

                  <DatePicker
                    style={{ width: 250, marginVertical: 10, color: "white" }}
                    date={injury.date}
                    mode="date"
                    placeholder="Select Date of Birth"
                    format="DD-MM-YYYY"
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
                        backgroundColor: "#ccc",
                      },
                    }}
                    onDateChange={(val) => setInjury({ date: val })}
                  />
                </View>
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

export default MedicalCheck;
