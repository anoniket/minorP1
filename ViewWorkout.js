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
} from "react-native";
import { db } from "../../firebase";

import { LinearGradient } from "expo-linear-gradient";

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
  backButton: {
    position: "absolute",
    left: 25,
    top: 45,
  },
  backButtonImage: {
    width: 20,
    height: 20,
  },
  header: {
    textAlign: "center",
    color: "white",
    position: "absolute",
    fontSize: 22,
    top: 50,
  },
  deleteButton: {
    position: "absolute",
    right: 25,
    top: 45,
  },
  deleteButtonText: {
    color: "white",
  },
  body: {
    marginVertical: 40,
  },
  workout_name: {
    color: "white",
    marginBottom: 10,
    fontSize: 20,
  },
  workout_typeView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  workout_typeLabel: {
    color: "white",
    marginBottom: 10,
    marginRight: 15,
  },
});

function ViewWorkout({ route, navigation }) {
  //const { workout } = route.params;
  const [coach, setCoach] = useState(null);
  const [type, setType] = useState(null);
  const [workout, setWorkout] = useState(null);

  console.log({ workout });

  useEffect(() => {
    if (route.params?.athlete) {
      setCoach(route.params.athlete);
    }
  }, [route.params?.athlete]);

  useEffect(() => {
    if (route.params?.workout) {
      setWorkout(route.params.workout);
    }
  }, [route.params?.workout]);

  useEffect(() => {
    if (route.params?.type) {
      setType(route.params.type);
    }
  }, [route.params?.type]);

  const deleteWorkout = () => {
    db.collection("workouts")
      .doc(workout.id)
      .delete()
      .then((res) => {
        console.log(res);
        navigation.navigate("WorkoutList");
      })
      .catch((e) => console.log(e));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("WorkoutList")}
        style={{
          position: "absolute",
          left: 25,
          top: 30,
          backgroundColor: "black",
        }}
      >
        <Icon name="chevron-left" type="font-awesome-5" color="white" />
      </TouchableOpacity>

      <Text style={styles.header}>Workout View</Text>

      {coach?.id === workout?.assignedBy_id ? (
        <TouchableOpacity
          onPress={() => deleteWorkout()}
          style={styles.deleteButton}
        >
          {/* <Image
            style={{ width: 20, height: 20 }}
            source={require("../../assets/back.png")}
          /> */}
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      ) : null}

      <View style={styles.body}>
        <Text style={styles.workout_name}>{workout?.workoutName}</Text>
      </View>

      <View>
        {workout?.type === "Run" && (
          <View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ color: "white", minWidth: 250, fontSize: 19 }}>
                Duration
              </Text>
              <Text style={{ color: "white" }}>{workout?.duration}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ color: "white", minWidth: 250, fontSize: 19 }}>
                Distance
              </Text>
              <Text style={{ color: "white" }}>{workout.distance}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ color: "white", minWidth: 250, fontSize: 19 }}>
                Average Pace
              </Text>
              <Text style={{ color: "white" }}>{workout.avgPace}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ color: "white", minWidth: 250, fontSize: 19 }}>
                Calories
              </Text>
              <Text style={{ color: "white" }}>{workout.calories}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ color: "white", minWidth: 250, fontSize: 19 }}>
                Elevation
              </Text>
              <Text style={{ color: "white" }}>{workout.elevation}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ color: "white", minWidth: 250, fontSize: 19 }}>
                TSS
              </Text>
              <Text style={{ color: "white" }}>{workout.tss}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ color: "white", minWidth: 250, fontSize: 19 }}>
                IF
              </Text>
              <Text style={{ color: "white" }}>{workout.If}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ color: "white", minWidth: 250, fontSize: 19 }}>
                Running Time
              </Text>
              <Text style={{ color: "white" }}>{workout.runningTime}</Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ color: "white", minWidth: 250, fontSize: 19 }}>
                Average Pace
              </Text>
              <Text style={{ color: "white" }}>{workout.avgPace1}</Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ color: "white", minWidth: 250, fontSize: 19 }}>
                Maximum Pace
              </Text>
              <Text style={{ color: "white" }}>{workout.maxPace}</Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ color: "white", minWidth: 250, fontSize: 19 }}>
                Minimum Heart Rate
              </Text>
              <Text style={{ color: "white" }}>{workout.minHeartRate}</Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ color: "white", minWidth: 250, fontSize: 19 }}>
                Average Heart Rate
              </Text>
              <Text style={{ color: "white" }}>{workout.avgHeartRate}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ color: "white", minWidth: 250, fontSize: 19 }}>
                Maximum Heart Rate
              </Text>
              <Text style={{ color: "white" }}>{workout.maxHeartRate}</Text>
            </View>
          </View>
        )}
        {workout?.type === "Swim" && (
          <View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ color: "white", minWidth: 250, fontSize: 19 }}>
                Duration
              </Text>
              <Text style={{ color: "white" }}>{workout?.duration}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ color: "white", minWidth: 250, fontSize: 19 }}>
                Distance
              </Text>
              <Text style={{ color: "white" }}>{workout.distance}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ color: "white", minWidth: 250, fontSize: 19 }}>
                Average Pace
              </Text>
              <Text style={{ color: "white" }}>{workout.avgPace}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ color: "white", minWidth: 250, fontSize: 19 }}>
                Calories
              </Text>
              <Text style={{ color: "white" }}>{workout.calories}</Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ color: "white", minWidth: 250, fontSize: 19 }}>
                TSS
              </Text>
              <Text style={{ color: "white" }}>{workout.tss}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ color: "white", minWidth: 250, fontSize: 19 }}>
                IF
              </Text>
              <Text style={{ color: "white" }}>{workout.If}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ color: "white", minWidth: 250, fontSize: 19 }}>
                Swimming Time
              </Text>
              <Text style={{ color: "white" }}>{workout.swimmingTime}</Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ color: "white", minWidth: 250, fontSize: 19 }}>
                Minimum Heart Rate
              </Text>
              <Text style={{ color: "white" }}>{workout.minHeartRate}</Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ color: "white", minWidth: 250, fontSize: 19 }}>
                Average Heart Rate
              </Text>
              <Text style={{ color: "white" }}>{workout.avgHeartRate}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ color: "white", minWidth: 250, fontSize: 19 }}>
                Maximum Heart Rate
              </Text>
              <Text style={{ color: "white" }}>{workout.maxHeartRate}</Text>
            </View>
          </View>
        )}
        {workout?.type === "Bike" && (
          <View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ color: "white", minWidth: 250, fontSize: 19 }}>
                Duration
              </Text>
              <Text style={{ color: "white" }}>{workout?.duration}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ color: "white", minWidth: 250, fontSize: 19 }}>
                Distance
              </Text>
              <Text style={{ color: "white" }}>{workout.distance}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ color: "white", minWidth: 250, fontSize: 19 }}>
                Average Pace
              </Text>
              <Text style={{ color: "white" }}>{workout.avgPace}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ color: "white", minWidth: 250, fontSize: 19 }}>
                Calories
              </Text>
              <Text style={{ color: "white" }}>{workout.calories}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ color: "white", minWidth: 250, fontSize: 19 }}>
                Elevation
              </Text>
              <Text style={{ color: "white" }}>{workout.elevation}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ color: "white", minWidth: 250, fontSize: 19 }}>
                TSS
              </Text>
              <Text style={{ color: "white" }}>{workout.tss}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ color: "white", minWidth: 250, fontSize: 19 }}>
                IF
              </Text>
              <Text style={{ color: "white" }}>{workout.If}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ color: "white", minWidth: 250, fontSize: 19 }}>
                Cycling Time
              </Text>
              <Text style={{ color: "white" }}>{workout.cyclingTime}</Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ color: "white", minWidth: 250, fontSize: 19 }}>
                Average Pace
              </Text>
              <Text style={{ color: "white" }}>{workout.avgPace1}</Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ color: "white", minWidth: 250, fontSize: 19 }}>
                Maximum Pace
              </Text>
              <Text style={{ color: "white" }}>{workout.maxPace}</Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ color: "white", minWidth: 250, fontSize: 19 }}>
                Minimum Heart Rate
              </Text>
              <Text style={{ color: "white" }}>{workout.minHeartRate}</Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ color: "white", minWidth: 250, fontSize: 19 }}>
                Average Heart Rate
              </Text>
              <Text style={{ color: "white" }}>{workout.avgHeartRate}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ color: "white", minWidth: 250, fontSize: 19 }}>
                Maximum Heart Rate
              </Text>
              <Text style={{ color: "white" }}>{workout.maxHeartRate}</Text>
            </View>
          </View>
        )}
      </View>

      {coach?.id === workout?.assignedBy_id ? (
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
          onPress={() =>
            navigation.navigate("AddWorkout", {
              athlete: coach,
              workout: workout,
              type: type,
            })
          }
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
            onPress={() =>
              navigation.navigate("AddWorkout", {
                athlete: coach,
                workout: workout,
                type: type,
              })
            }
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
                Modify Workout
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
      ) : null}
    </View>
  );
}

export default ViewWorkout;
