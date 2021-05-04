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
import { db } from "../../firebase";

import { LinearGradient } from "expo-linear-gradient";

import DatePicker from "react-native-datepicker";
import { Picker } from "@react-native-picker/picker";

import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

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

const AddWorkout = ({ route, navigation }) => {
  const { workout } = route.params;
  const [assignDate, setAssignDate] = useState(workout?.assignDate);
  const [workoutName, setWorkoutName] = useState(workout?.workoutName);
  const [workoutType, setWorkoutType] = useState("Select the workout type");
  const [runTime, setRunTime] = useState(workout?.runTime);
  const [bikeTime, setBikeTime] = useState(workout?.bikeTime);
  const [swimTime, setSwimTime] = useState(workout?.swimTime);
  const [triathlonTime, setTriathlonTime] = useState(workout?.triathlonTime);
  const [showModal, setShowModal] = useState(false);

  const [athlete, setAthlete] = useState(null);
  const [coach, setCoach] = useState(null);
  const [type, setType] = useState(null);

  console.log({ athlete, type });

  const [userDetails, setUserDetails] = useState(null);
  const [athleteDetails, setAthleteDetails] = useState([]);
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const [listOfAthletes, setListOfAthletes] = useState([]);
  const [selectedAthleteId, setSelectedAthleteId] = useState(
    "Select the Athlete"
  );

  useEffect(() => {
    db.collection("coach")
      .where("email", "==", user)
      .get()
      .then(function (querySnapshot) {
        console.log("1");
        querySnapshot.forEach(function (doc) {
          setUserDetails({
            id: doc.id,
            data: doc.data(),
          });
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });

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
  }, [user]);

  useEffect(() => {
    if (userDetails) {
      const data = [];

      userDetails?.data?.listOfAthletes?.map((athlete) => {
        athleteDetails?.map((item, idx) => {
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

  const toggleModal = () => {
    setShowModal(true);
  };

  const HandleWorkoutTypes = () => {
    if (workoutType === "Run") {
      return (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", margin: 15, marginBottom: 20 }}>
            Run Time
          </Text>
          <TextInput
            underlineColorAndroid="white"
            style={{
              color: "white",
              padding: 10,
              width: 50,
              marginLeft: 20,
            }}
            keyboardType="number-pad"
            value={runTime}
            onChangeText={setRunTime}
          />
        </View>
      );
    } else if (workoutType === "Swim") {
      return (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", margin: 15, marginBottom: 20 }}>
            Swim Time
          </Text>
          <TextInput
            underlineColorAndroid="white"
            style={{
              color: "white",
              padding: 10,
              width: 50,
              marginLeft: 20,
            }}
            keyboardType="numeric"
            value={swimTime}
            onChangeText={setSwimTime}
          />
        </View>
      );
    } else if (workoutType === "Bike") {
      return (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", margin: 15, marginBottom: 20 }}>
            Bike Time
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
            value={bikeTime}
            onChangeText={setBikeTime}
          />
        </View>
      );
    } else if (workoutType === "Triathlon") {
      return (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", margin: 15, marginBottom: 20 }}>
            Triathlon Time
          </Text>
          <TextInput
            underlineColorAndroid="white"
            style={{
              color: "white",
              padding: 10,
              width: 50,
              marginLeft: 20,
            }}
            keyboardType="numeric"
            value={triathlonTime}
            onChangeText={setTriathlonTime}
          />
        </View>
      );
    } else return null;
  };

  console.log({ userDetails });

  const submitDetails = () => {
    if (workoutType === "Run") {
      db.collection("workouts")
        .doc()
        .set({
          assignedBy_id: userDetails.id,
          assignedTo_id: selectedAthleteId,
          workoutName,
          assignDate,
          runTime,
          type: "Run",
        })
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
    } else if (workoutType === "Swim") {
      db.collection("workouts")
        .doc()
        .set({
          assignedBy_id: userDetails.id,
          assignedTo_id: selectedAthleteId,
          workoutName,
          assignDate,
          swimTime,
          type: "Swim",
        })
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
    } else if (workoutType === "Bike") {
      db.collection("workouts")
        .doc()
        .set({
          assignedBy_id: userDetails.id,
          assignedTo_id: selectedAthleteId,
          workoutName,
          assignDate,
          bikeTime,
          type: "Bike",
        })
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
    } else if (workoutType === "Triathlon") {
      db.collection("workouts")
        .doc()
        .set({
          assignedBy_id: userDetails.id,
          assignedTo_id: selectedAthleteId,
          workoutName,
          assignDate,
          triathlonTime,
          type: "Triathlon",
        })
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
    } else {
      db.collection("workouts")
        .doc()
        .set({
          assignedBy_id: userDetails.id,
          assignedTo_id: selectedAthleteId,
          workoutName,
          assignDate,
        })
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
    }
    navigation.navigate("WorkoutList");
  };

  const saveNewDetails = () => {
    if (workoutType === "Run") {
      db.collection("workouts")
        .doc()
        .set({
          assignedBy_id: athlete.id,
          assignedTo_id: "",
          workoutName,
          runTime,
          type: "Run",
        })
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
    } else if (workoutType === "Swim") {
      db.collection("workouts")
        .doc()
        .set({
          assignedBy_id: athlete.id,
          assignedTo_id: "",
          workoutName,
          swimTime,
          type: "Swim",
        })
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
    } else if (workoutType === "Bike") {
      db.collection("workouts")
        .doc()
        .set({
          assignedBy_id: athlete.id,
          assignedTo_id: "",
          workoutName,
          bikeTime,
          type: "Bike",
        })
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
    } else if (workoutType === "Triathlon") {
      db.collection("workouts")
        .doc()
        .set({
          assignedBy_id: athlete.id,
          assignedTo_id: "",
          workoutName,
          triathlonTime,
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

    navigation.navigate("WorkoutList");
  };

  const saveDetails = () => {
    if (workout !== null) {
      if (workoutType === "Run") {
        db.collection("workouts")
          .doc(workout.id)
          .update({
            assignedBy_id: athlete.id,
            assignedTo_id: "",
            workoutName,
            runTime,
            type: "Run",
          })
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
      } else if (workoutType === "Swim") {
        db.collection("workouts")
          .doc(workout.id)
          .update({
            assignedBy_id: athlete.id,
            assignedTo_id: "",
            workoutName,
            swimTime,
            type: "Swim",
          })
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
      } else if (workoutType === "Bike") {
        db.collection("workouts")
          .doc(workout.id)
          .update({
            assignedBy_id: athlete.id,
            assignedTo_id: "",
            workoutName,
            bikeTime,
            type: "Bike",
          })
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
      } else if (workoutType === "Triathlon") {
        db.collection("workouts")
          .doc(workout.id)
          .update({
            assignedBy_id: athlete.id,
            assignedTo_id: "",
            workoutName,
            triathlonTime,
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
      if (workoutType === "Run") {
        db.collection("workouts")
          .doc()
          .set({
            assignedBy_id: athlete.id,
            assignedTo_id: "",
            workoutName,
            runTime,
            type: "Run",
          })
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
      } else if (workoutType === "Swim") {
        db.collection("workouts")
          .doc()
          .set({
            assignedBy_id: athlete.id,
            assignedTo_id: "",
            workoutName,
            swimTime,
            type: "Swim",
          })
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
      } else if (workoutType === "Bike") {
        db.collection("workouts")
          .doc()
          .set({
            assignedBy_id: athlete.id,
            assignedTo_id: "",
            workoutName,
            bikeTime,
            type: "Bike",
          })
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
      } else if (workoutType === "Triathlon") {
        db.collection("workouts")
          .doc()
          .set({
            assignedBy_id: athlete.id,
            assignedTo_id: "",
            workoutName,
            triathlonTime,
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
    navigation.navigate("WorkoutList");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("ViewWorkout")}
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
      <View style={{ marginLeft: 30, marginVertical: 40 }}>
        <Text style={{ color: "white", marginBottom: 10, fontSize: 18 }}>
          Enter the name of the workout
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            width: 250,
            borderColor: "white",
            color: "white",
            borderRadius: 5,
            paddingVertical: 5,
            paddingHorizontal: 10,
            height: 55,
          }}
          placeholderTextColor="white"
          value={workoutName}
          onChangeText={setWorkoutName}
        />
      </View>
      <View style={{ marginLeft: 30, marginVertical: 15 }}>
        <LinearGradient
          colors={["#3895CE", "#004872"]}
          start={[0, 0]}
          end={[1, 0]}
          style={{
            width: 250,
            height: 55,
            paddingTop: 10,
            borderRadius: 8,
            marginBottom: 70,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
            shadowColor: "#3895CE",
            color: "white",
          }}
        >
          <Picker
            selectedValue={workoutType}
            style={{
              width: 250,
              background: "transparent",
              height: 55,
              color: "white",
              marginTop: -10,
            }}
            onValueChange={(itemValue) => setWorkoutType(itemValue)}
          >
            <Picker.Item label="Select workout type" value="" />
            <Picker.Item label="Run" value="Run" />
            <Picker.Item label="Swim" value="Swim" />
            <Picker.Item label="Bike" value="Bike" />
          </Picker>
        </LinearGradient>
      </View>

      <TouchableOpacity
        activeOpacity={0.6}
        backgroundColor="steelblue"
        style={{
          width: "90%",
          backgroundColor: "steelblue",
          height: 55,
          marginBottom: 70,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 8,
          shadowColor: "#3895CE",
          marginHorizontal: 20,
          position: "absolute",
          bottom: -50,
        }}
        onPress={() => {
          if (workoutType === "Run") {
            navigation.navigate("RunFields", {
              workoutName,
              athlete: userDetails,
              userType: "coach",
            });
          } else if (workoutType === "Swim") {
            navigation.navigate("SwimFields", {
              workoutName,
              athlete: userDetails,
              userType: "coach",
            });
          } else if (workoutType === "Bike") {
            navigation.navigate("CycleFields", {
              workoutName,
              athlete: userDetails,
              userType: "coach",
            });
          } else if (workoutType === "Triathlon") {
            navigation.navigate("TriFields", {
              workoutName,
              athlete: userDetails,
              userType: "coach",
            });
          }
        }}
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
          onPress={() => {
            if (workoutType === "Run") {
              navigation.navigate("RunFields", {
                workoutName,
                athlete: userDetails,
                userType: "coach",
              });
            } else if (workoutType === "Swim") {
              navigation.navigate("SwimFields", {
                workoutName,
                athlete: userDetails,
                userType: "coach",
              });
            } else if (workoutType === "Bike") {
              navigation.navigate("CycleFields", {
                workoutName,
                athlete: userDetails,
                userType: "coach",
              });
            } else if (workoutType === "Triathlon") {
              navigation.navigate("TriFields", {
                workoutName,
                athlete: userDetails,
                userType: "coach",
              });
            }
          }}
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
              Proceed
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
            source={require("../../assets/doubleleftarrowheads.png")}
          />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default AddWorkout;
