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
    backgroundColor: "white",
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

const CoachWorkoutCompletion = ({ route, navigation }) => {
  const { workoutName, data, zone, squares } = route.params;
  const [assignDate, setAssignDate] = useState(null);
  const [athlete, setAthlete] = useState(null);
  const [coach, setCoach] = useState(null);
  const [type, setType] = useState(null);

  const [athleteDetails, setAthleteDetails] = useState([]);

  const [listOfAthletes, setListOfAthletes] = useState([]);
  const [selectedAthleteId, setSelectedAthleteId] = useState(
    "Select the Athlete"
  );

  console.log({ workoutName, athlete, type, data, zone, squares });

  useEffect(() => {
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
  }, [athlete]);

  useEffect(() => {
    if (athlete) {
      const data = [];
      athleteDetails?.map((item, idx) => {
        athlete?.listOfAthletes.map((athlete) => {
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
    if (type === "Run") {
      db.collection("workouts")
        .doc()
        .set({
          assignedBy_id: athlete.id,
          assignedTo_id: athlete.id,
          workoutName,
          assignDate,
          type: "Run",
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
    navigation.navigate("AthleteWorkoutList");
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

    navigation.navigate("AthleteWorkoutList");
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
    navigation.navigate("AthleteWorkoutList");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("ViewAthleteWorkout")}
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
          {type === "athlete" ? null : (
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
                {listOfAthletes.map((item, idx) => (
                  <Picker.Item
                    label={item.name}
                    value={item.id}
                    key={item.id}
                  />
                ))}
              </Picker>
            </View>
          )}

          <View style={{ marginLeft: 30, marginVertical: 20 }}>
            <Text style={{ marginBottom: 10, marginLeft: 30 }}>
              Enter the date for the workout
            </Text>
            <DatePicker
              style={{ width: 250, marginVertical: 10, marginLeft: 15 }}
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
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Button
          style={{ marginHorizontal: 20 }}
          color="steelblue"
          title="Save"
          onPress={saveDetails}
        />
        <Button
          style={{ marginHorizontal: 20 }}
          color="steelblue"
          title="Save as New Workout"
          onPress={saveNewDetails}
        />
        <Button
          style={{ marginHorizontal: 20 }}
          color="steelblue"
          title="Apply"
          onPress={submitDetails}
        />
      </View>
    </View>
  );
};

export default CoachWorkoutCompletion;
