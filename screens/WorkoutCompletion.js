import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
  TextInput,
  Button,
  TouchableHighlight,
} from "react-native";
import { db } from "../firebase";

import { LinearGradient } from "expo-linear-gradient";

import DatePicker from "react-native-datepicker";
import { Picker } from "@react-native-picker/picker";

import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

import { Icon } from "react-native-elements";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 0,
    paddingTop: 20,
    minHeight: 600,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "black",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

const WorkoutCompletion = ({ route, navigation }) => {
  const { workoutName, data, zone, squares, userType } = route.params;
  const [assignDate, setAssignDate] = useState(null);
  const [athlete, setAthlete] = useState(null);
  const [coach, setCoach] = useState(null);
  const [type, setType] = useState(null);

  const [athleteDetails, setAthleteDetails] = useState([]);

  const [listOfAthletes, setListOfAthletes] = useState([]);
  const [selectedAthleteId, setSelectedAthleteId] = useState(
    "Select the Athlete"
  );

  console.log({
    workoutName,
    athlete,
    type,
    data,
    zone,
    squares,
    userType,
    listOfAthletes,
  });

  useEffect(() => {
    if (userType === "coach") {
      const data = [];
      db.collection("athletes")
        .get()
        .then((snapshot) => {
          console.log("2");
          snapshot.docs.forEach((item) => {
            let currentID = item.id;
            let appObj = { ...item.data(), ["id"]: currentID };
            data.push(appObj);
          });
          setAthleteDetails(data);
        });
    }
  }, [athlete]);

  useEffect(() => {
    if (userType === "coach") {
      const data = [];
      athleteDetails?.map((item, idx) => {
        athlete?.data.listOfAthletes.map((athlete) => {
          if (athlete === item.id) {
            let appObj = { ...item };
            data.push(appObj);
          }
        });
        setListOfAthletes(data);
      });
    }
  }, [athleteDetails]);

  useEffect(() => {
    if (route.params?.athlete) {
      setAthlete(route.params?.athlete);
    }
  }, [route.params?.athlete]);

  useEffect(() => {
    if (route.params?.type) {
      setType(route.params?.type);
    }
  }, [route.params?.type]);

  const submitDetails = () => {
    if (userType === "athlete") {
      if (type === "Run") {
        db.collection("workouts")
          .doc()
          .set({
            assignedBy_id: athlete.id,
            assignedTo_id: athlete.id,
            workoutName,
            assignDate,
            type: "Run",
            duration: data.duration,
            distance: data.distance,
            avgPace: data.avgPace,
            calories: data.calories,
            elevation: data.elevation,
            tss: data.tss,
            If: data.If,
            runningTime: data.runningTime,
            avgPace1: data.avgPace1,
            maxPace: data.maxPace,
            minHeartRate: data.minHeartRate,
            avgHeartRate: data.avgHeartRate,
            maxHeartRate: data.maxHeartRate,
          })
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
      } else if (type === "Swim") {
        db.collection("workouts")
          .doc()
          .set({
            assignedBy_id: athlete.id,
            assignedTo_id: athlete.id,
            workoutName,
            assignDate,
            type: "Swim",
            duration: data.duration,
            distance: data.distance,
            avgPace: data.avgPace,
            calories: data.calories,
            tss: data.tss,
            If: data.If,
            swimmingTime: data.swimmingTime,
            minHeartRate: data.minHeartRate,
            avgHeartRate: data.avgHeartRate,
            maxHeartRate: data.maxHeartRate,
          })
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
      } else if (type === "Bike") {
        db.collection("workouts")
          .doc()
          .set({
            assignedBy_id: athlete.id,
            assignedTo_id: athlete.id,
            workoutName,
            assignDate,
            type: "Bike",
            duration: data.duration,
            distance: data.distance,
            avgPace: data.avgPace,
            calories: data.calories,
            elevation: data.elevation,
            tss: data.tss,
            If: data.If,
            cyclingTime: data.cyclingTime,
            avgPower: data.avgPower,
            maxPower: data.maxPower,
            minHeartRate: data.minHeartRate,
            avgHeartRate: data.avgHeartRate,
            maxHeartRate: data.maxHeartRate,
          })
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
      } else if (type === "Triathlon") {
        db.collection("workouts")
          .doc()
          .set({
            assignedBy_id: athlete.id,
            assignedTo_id: athlete.id,
            workoutName,
            assignDate,

            type: "Triathlon",
          })
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
      } else if (type === "S&C") {
        db.collection("workouts")
          .doc()
          .set({
            assignedBy_id: athlete.id,
            assignedTo_id: athlete.id,
            workoutName,
            assignDate,

            type: "S&C",
          })
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
      } else {
        db.collection("workouts")
          .doc()
          .set({
            assignedBy_id: athlete.id,
            assignedTo_id: athlete.id,
            workoutName,
            assignDate,
          })
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
      }
    } else {
      if (type === "Run") {
        db.collection("workouts")
          .doc()
          .set({
            assignedBy_id: athlete.id,
            assignedTo_id: selectedAthleteId,
            workoutName,
            assignDate,
            type: "Run",
            duration: data.duration,
            distance: data.distance,
            avgPace: data.avgPace,
            calories: data.calories,
            elevation: data.elevation,
            tss: data.tss,
            If: data.If,
            runningTime: data.runningTime,
            avgPace1: data.avgPace1,
            maxPace: data.maxPace,
            minHeartRate: data.minHeartRate,
            avgHeartRate: data.avgHeartRate,
            maxHeartRate: data.maxHeartRate,
          })
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
      } else if (type === "Swim") {
        db.collection("workouts")
          .doc()
          .set({
            assignedBy_id: athlete.id,
            assignedTo_id: selectedAthleteId,
            workoutName,
            assignDate,
            type: "Swim",
            duration: data.duration,
            distance: data.distance,
            avgPace: data.avgPace,
            calories: data.calories,
            tss: data.tss,
            If: data.If,
            swimmingTime: data.swimmingTime,
            minHeartRate: data.minHeartRate,
            avgHeartRate: data.avgHeartRate,
            maxHeartRate: data.maxHeartRate,
          })
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
      } else if (type === "Bike") {
        db.collection("workouts")
          .doc()
          .set({
            assignedBy_id: athlete.id,
            assignedTo_id: selectedAthleteId,
            workoutName,
            assignDate,
            type: "Bike",
            duration: data.duration,
            distance: data.distance,
            avgPace: data.avgPace,
            calories: data.calories,
            elevation: data.elevation,
            tss: data.tss,
            If: data.If,
            cyclingTime: data.cyclingTime,
            avgPower: data.avgPower,
            maxPower: data.maxPower,
            minHeartRate: data.minHeartRate,
            avgHeartRate: data.avgHeartRate,
            maxHeartRate: data.maxHeartRate,
          })
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
      } else if (type === "Triathlon") {
        db.collection("workouts")
          .doc()
          .set({
            assignedBy_id: athlete.id,
            assignedTo_id: selectedAthleteId,
            workoutName,
            assignDate,

            type: "Triathlon",
          })
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
      } else if (type === "S&C") {
        db.collection("workouts")
          .doc()
          .set({
            assignedBy_id: athlete.id,
            assignedTo_id: selectedAthleteId,
            workoutName,
            assignDate,

            type: "S&C",
          })
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
      } else {
        db.collection("workouts")
          .doc()
          .set({
            assignedBy_id: athlete.id,
            assignedTo_id: selectedAthleteId,
            workoutName,
            assignDate,
          })
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
      }
    }

    if (userType === "athlete") {
      navigation.navigate("AthleteWorkoutList");
    } else {
      navigation.navigate("WorkoutList");
    }
  };

  const saveNewDetails = () => {
    if (type === "Run") {
      db.collection("workouts")
        .doc()
        .set({
          assignedBy_id: athlete.id,
          assignedTo_id: "",
          workoutName,
          type: "Run",
          duration: data.duration,
          distance: data.distance,
          avgPace: data.avgPace,
          calories: data.calories,
          elevation: data.elevation,
          tss: data.tss,
          If: data.If,
          runningTime: data.runningTime,
          avgPace1: data.avgPace1,
          maxPace: data.maxPace,
          minHeartRate: data.minHeartRate,
          avgHeartRate: data.avgHeartRate,
          maxHeartRate: data.maxHeartRate,
        })
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
    } else if (type === "Swim") {
      db.collection("workouts")
        .doc()
        .set({
          assignedBy_id: athlete.id,
          assignedTo_id: "",
          workoutName,

          type: "Swim",
          duration: data.duration,
          distance: data.distance,
          avgPace: data.avgPace,
          calories: data.calories,
          tss: data.tss,
          If: data.If,
          swimmingTime: data.swimmingTime,
          minHeartRate: data.minHeartRate,
          avgHeartRate: data.avgHeartRate,
          maxHeartRate: data.maxHeartRate,
        })
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
    } else if (type === "Bike") {
      db.collection("workouts")
        .doc()
        .set({
          assignedBy_id: athlete.id,
          assignedTo_id: "",
          workoutName,
          type: "Bike",
          duration: data.duration,
          distance: data.distance,
          avgPace: data.avgPace,
          calories: data.calories,
          elevation: data.elevation,
          tss: data.tss,
          If: data.If,
          cyclingTime: data.cyclingTime,
          avgPower: data.avgPower,
          maxPower: data.maxPower,
          minHeartRate: data.minHeartRate,
          avgHeartRate: data.avgHeartRate,
          maxHeartRate: data.maxHeartRate,
        })
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
    } else if (type === "Triathlon") {
      db.collection("workouts")
        .doc()
        .set({
          assignedBy_id: athlete.id,
          assignedTo_id: "",
          workoutName,

          type: "Triathlon",
        })
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
    } else if (type === "S&C") {
      db.collection("workouts")
        .doc()
        .set({
          assignedBy_id: athlete.id,
          assignedTo_id: "",
          workoutName,
          assignDate,

          type: "S&C",
        })
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
    } else {
      db.collection("workouts")
        .doc()
        .set({
          assignedBy_id: athlete.id,
          assignedTo_id: "",
          workoutName,
        })
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
    }

    if (userType === "athlete") {
      navigation.navigate("AthleteWorkoutList");
    } else {
      navigation.navigate("WorkoutList");
    }
  };

  const saveDetails = () => {
    if (workout !== null) {
      if (type === "Run") {
        db.collection("workouts")
          .doc(workout.id)
          .update({
            assignedBy_id: athlete.id,
            assignedTo_id: "",
            workoutName,
            type: "Run",
            duration: data.duration,
            distance: data.distance,
            avgPace: data.avgPace,
            calories: data.calories,
            elevation: data.elevation,
            tss: data.tss,
            If: data.If,
            runningTime: data.runningTime,
            avgPace1: data.avgPace1,
            maxPace: data.maxPace,
            minHeartRate: data.minHeartRate,
            avgHeartRate: data.avgHeartRate,
            maxHeartRate: data.maxHeartRate,
          })
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
      } else if (type === "Swim") {
        db.collection("workouts")
          .doc(workout.id)
          .update({
            assignedBy_id: athlete.id,
            assignedTo_id: "",
            workoutName,
            type: "Swim",
            duration: data.duration,
            distance: data.distance,
            avgPace: data.avgPace,
            calories: data.calories,
            tss: data.tss,
            If: data.If,
            swimmingTime: data.swimmingTime,
            minHeartRate: data.minHeartRate,
            avgHeartRate: data.avgHeartRate,
            maxHeartRate: data.maxHeartRate,
          })
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
      } else if (type === "Bike") {
        db.collection("workouts")
          .doc(workout.id)
          .update({
            assignedBy_id: athlete.id,
            assignedTo_id: "",
            workoutName,
            type: "Bike",
            duration: data.duration,
            distance: data.distance,
            avgPace: data.avgPace,
            calories: data.calories,
            elevation: data.elevation,
            tss: data.tss,
            If: data.If,
            cyclingTime: data.cyclingTime,
            avgPower: data.avgPower,
            maxPower: data.maxPower,
            minHeartRate: data.minHeartRate,
            avgHeartRate: data.avgHeartRate,
            maxHeartRate: data.maxHeartRate,
          })
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
      } else if (type === "Triathlon") {
        db.collection("workouts")
          .doc(workout.id)
          .update({
            assignedBy_id: athlete.id,
            assignedTo_id: "",
            workoutName,

            type: "Triathlon",
          })
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
      } else if (type === "S&C") {
        db.collection("workouts")
          .doc()
          .set({
            assignedBy_id: athlete.id,
            assignedTo_id: "",
            workoutName,
            assignDate,

            type: "S&C",
          })
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
      } else {
        db.collection("workouts")
          .doc(workout.id)
          .update({
            assignedBy_id: athlete.id,
            assignedTo_id: "",
            workoutName,
          })
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
      }
    } else {
      if (type === "Run") {
        db.collection("workouts")
          .doc()
          .set({
            assignedBy_id: athlete.id,
            assignedTo_id: "",
            workoutName,

            type: "Run",
            duration: data.duration,
            distance: data.distance,
            avgPace: data.avgPace,
            calories: data.calories,
            elevation: data.elevation,
            tss: data.tss,
            If: data.If,
            runningTime: data.runningTime,
            avgPace1: data.avgPace1,
            maxPace: data.maxPace,
            minHeartRate: data.minHeartRate,
            avgHeartRate: data.avgHeartRate,
            maxHeartRate: data.maxHeartRate,
          })
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
      } else if (type === "Swim") {
        db.collection("workouts")
          .doc()
          .set({
            assignedBy_id: athlete.id,
            assignedTo_id: "",
            workoutName,

            type: "Swim",
            duration: data.duration,
            distance: data.distance,
            avgPace: data.avgPace,
            calories: data.calories,
            tss: data.tss,
            If: data.If,
            swimmingTime: data.swimmingTime,
            minHeartRate: data.minHeartRate,
            avgHeartRate: data.avgHeartRate,
            maxHeartRate: data.maxHeartRate,
          })
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
      } else if (type === "Bike") {
        db.collection("workouts")
          .doc()
          .set({
            assignedBy_id: athlete.id,
            assignedTo_id: "",
            workoutName,

            type: "Bike",
            duration: data.duration,
            distance: data.distance,
            avgPace: data.avgPace,
            calories: data.calories,
            elevation: data.elevation,
            tss: data.tss,
            If: data.If,
            cyclingTime: data.cyclingTime,
            avgPower: data.avgPower,
            maxPower: data.maxPower,
            minHeartRate: data.minHeartRate,
            avgHeartRate: data.avgHeartRate,
            maxHeartRate: data.maxHeartRate,
          })
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
      } else if (type === "Triathlon") {
        db.collection("workouts")
          .doc()
          .set({
            assignedBy_id: athlete.id,
            assignedTo_id: "",
            workoutName,

            type: "Triathlon",
          })
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
      } else if (type === "S&C") {
        db.collection("workouts")
          .doc()
          .set({
            assignedBy_id: athlete.id,
            assignedTo_id: "",
            workoutName,
            assignDate,

            type: "S&C",
          })
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
      } else {
        db.collection("workouts")
          .doc()
          .set({
            assignedBy_id: athlete.id,
            assignedTo_id: "",
            workoutName,
          })
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
      }
    }
    if (userType === "athlete") {
      navigation.navigate("AthleteWorkoutList");
    } else {
      navigation.navigate("WorkoutList");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("GraphGen")}
        style={{
          position: "absolute",
          left: 25,
          top: 30,
          backgroundColor: "black",
        }}
      >
        <Icon name="chevron-left" type="font-awesome-5" color="white" />
      </TouchableOpacity>
      <Text
        style={{
          textAlign: "center",
          color: "white",
          position: "absolute",
          fontSize: 22,
          top: 50,
        }}
      >
        Add a workout
      </Text>

      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {userType === "coach" && (
            <View>
              <Picker
                selectedValue={selectedAthleteId}
                style={{
                  height: 20,
                  width: 200,
                  color: "white",
                  backgroundColor: "steelblue",
                  padding: 15,
                  borderWidth: 1,
                  borderColor: "white",
                }}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedAthleteId(itemValue)
                }
              >
                {listOfAthletes?.map((item, idx) => (
                  <Picker.Item
                    label={item.name}
                    value={item.id}
                    key={item.id}
                  />
                ))}
              </Picker>
            </View>
          )}

          <View style={{ marginVertical: 20 }}>
            <Text
              style={{
                marginBottom: 10,
                marginLeft: 30,
                color: "white",
                fontSize: 18,
              }}
            >
              Enter the date for the workout
            </Text>
            <DatePicker
              style={{ width: 300, marginVertical: 10 }}
              date={assignDate}
              mode="date"
              placeholder="Select Date"
              format="YYYY-MM-DD"
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
                setAssignDate(date);
              }}
            />
          </View>

          <View style={{ width: 350 }}>
            <TouchableOpacity
              activeOpacity={0.6}
              backgroundColor="steelblue"
              style={{
                width: "90%",
                backgroundColor: "steelblue",
                height: 55,
                marginBottom: 0,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 8,
                shadowColor: "#3895CE",
                marginHorizontal: 20,
                marginVertical: 15,
              }}
              onPress={saveDetails}
            >
              <LinearGradient
                colors={["#3895CE", "#004872"]}
                start={[0, 0]}
                end={[1, 0]}
                style={{
                  width: "100%",
                  height: "100%",
                  paddingTop: 10,
                  borderRadius: 8,
                }}
                onPress={saveDetails}
              >
                <View>
                  <Text
                    style={{
                      color: "#E2E2E2",
                      fontSize: 20,
                      fontFamily: "SF-Pro-Display-regular",
                      textAlign: "center",
                    }}
                  >
                    Save
                  </Text>
                </View>
                <Image
                  style={{
                    width: 30,
                    height: 20,
                    position: "absolute",
                    right: 15,
                    marginTop: 15,
                  }}
                  source={require("../assets/doubleleftarrowheads.png")}
                />
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.6}
              backgroundColor="steelblue"
              style={{
                width: "90%",
                backgroundColor: "steelblue",
                height: 55,
                marginBottom: 0,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 8,
                shadowColor: "#3895CE",
                marginHorizontal: 20,
                marginVertical: 15,
              }}
              onPress={saveNewDetails}
            >
              <LinearGradient
                colors={["#3895CE", "#004872"]}
                start={[0, 0]}
                end={[1, 0]}
                style={{
                  width: "100%",
                  height: "100%",
                  paddingTop: 10,
                  borderRadius: 8,
                }}
                onPress={saveNewDetails}
              >
                <View>
                  <Text
                    style={{
                      color: "#E2E2E2",
                      fontSize: 20,
                      fontFamily: "SF-Pro-Display-regular",
                      textAlign: "center",
                    }}
                  >
                    Save as a New Workout
                  </Text>
                </View>
                <Image
                  style={{
                    width: 30,
                    height: 20,
                    position: "absolute",
                    right: 15,
                    marginTop: 15,
                  }}
                  source={require("../assets/doubleleftarrowheads.png")}
                />
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.6}
              backgroundColor="steelblue"
              style={{
                width: "90%",
                backgroundColor: "steelblue",
                height: 55,
                marginBottom: 0,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 8,
                shadowColor: "#3895CE",
                marginHorizontal: 20,
                marginVertical: 15,
              }}
              onPress={submitDetails}
            >
              <LinearGradient
                colors={["#3895CE", "#004872"]}
                start={[0, 0]}
                end={[1, 0]}
                style={{
                  width: "100%",
                  height: "100%",
                  paddingTop: 10,
                  borderRadius: 8,
                }}
                onPress={submitDetails}
              >
                <View>
                  <Text
                    style={{
                      color: "#E2E2E2",
                      fontSize: 20,
                      fontFamily: "SF-Pro-Display-regular",
                      textAlign: "center",
                    }}
                  >
                    Assign
                  </Text>
                </View>
                <Image
                  style={{
                    width: 30,
                    height: 20,
                    position: "absolute",
                    right: 15,
                    marginTop: 15,
                  }}
                  source={require("../assets/doubleleftarrowheads.png")}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default WorkoutCompletion;
