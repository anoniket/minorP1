import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Button,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";

let ScreenHeight = Dimensions.get("window").height;

import { LinearGradient } from "expo-linear-gradient";

import { Icon } from "react-native-elements";

const RunFields = ({ route, navigation }) => {
  const { workoutName, userType } = route.params;
  const [athlete, setAthlete] = useState(null);

  const [duration, setDuration] = useState(null);
  const [distance, setDistance] = useState(null);
  const [avgPace, setAvgPace] = useState(null);
  const [calories, setCalories] = useState(null);
  const [elevation, setElevation] = useState(null);
  const [tss, setTss] = useState(null);
  const [If, setIf] = useState(null);
  const [runningTime, setRunningTime] = useState(null);
  const [avgPace1, setAvgPace1] = useState(null);
  const [maxPace, setMaxPace] = useState(null);
  const [minHeartRate, setMinHeartRate] = useState(null);
  const [avgHeartRate, setAvgHeartRate] = useState(null);
  const [maxHeartRate, setMaxHeartRate] = useState(null);

  console.log({ workoutName, athlete, userType });

  useEffect(() => {
    if (route.params?.athlete) {
      setAthlete(route.params?.athlete);
    }
  }, [route.params?.athlete]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            if (userType === "athlete") {
              navigation.navigate("AddAthleteWorkout");
            } else {
              navigation.navigate("AddWorkout");
            }
          }}
          style={{
            position: "absolute",
            left: 25,
            top: 20,
            backgroundColor: "black",
            zIndex : 1
          }}
        >
          <Icon name="chevron-left" type="font-awesome-5" color="white" />
        </TouchableOpacity>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 24,
            paddingBottom: 40,
            marginTop: 15,
          }}
        >
          Run
        </Text>

        <View style={styles.TextInputContainer}>
          <View style={styles.FieldRow}>
            <Text style={styles.TextStyle}>Duration</Text>
            <TextInput
              value={duration}
              onChangeText={setDuration}
              placeholder="Duration"
              placeholderTextColor="white"
              keyboardType={"numeric"}
              style={styles.TextInputStyle}
            />
          </View>
          <View style={styles.FieldRow}>
            <Text style={styles.TextStyle}>Distance</Text>
            <TextInput
              value={distance}
              onChangeText={setDistance}
              placeholder="Distance"
              placeholderTextColor="white"
              keyboardType={"numeric"}
              style={styles.TextInputStyle}
            />
          </View>
          <View style={styles.FieldRow}>
            <Text style={styles.TextStyle}>Average Pace</Text>
            <TextInput
              value={avgPace}
              onChangeText={setAvgPace}
              placeholder="Average Pace"
              placeholderTextColor="white"
              keyboardType={"numeric"}
              style={styles.TextInputStyle}
            />
          </View>
          <View style={styles.FieldRow}>
            <Text style={styles.TextStyle}>Calories</Text>
            <TextInput
              value={calories}
              onChangeText={setCalories}
              placeholder="Calories"
              placeholderTextColor="white"
              keyboardType={"numeric"}
              style={styles.TextInputStyle}
            />
          </View>
          <View style={styles.FieldRow}>
            <Text style={styles.TextStyle}>Elevation</Text>
            <TextInput
              value={elevation}
              onChangeText={setElevation}
              placeholder="Elevation"
              placeholderTextColor="white"
              keyboardType={"numeric"}
              style={styles.TextInputStyle}
            />
          </View>
          <View style={styles.FieldRow}>
            <Text style={styles.TextStyle}>TSS</Text>
            <TextInput
              value={tss}
              onChangeText={setTss}
              placeholder="TSS"
              placeholderTextColor="white"
              keyboardType={"numeric"}
              style={styles.TextInputStyle}
            />
          </View>
          <View style={styles.FieldRow}>
            <Text style={styles.TextStyle}>IF</Text>
            <TextInput
              value={If}
              onChangeText={setIf}
              placeholder="IF"
              placeholderTextColor="white"
              keyboardType={"numeric"}
              style={styles.TextInputStyle}
            />
          </View>
          <View style={styles.FieldRow}>
            <Text style={styles.TextStyle}>Running Time</Text>
            <TextInput
              value={runningTime}
              onChangeText={setRunningTime}
              keyboardType={"numeric"}
              placeholder="Running Time"
              placeholderTextColor="white"
              style={styles.TextInputStyle}
            />
          </View>

          <View style={styles.FieldRow}>
            <Text style={styles.TextStyle}>Pace</Text>
            <TextInput
              value={avgPace1}
              onChangeText={setAvgPace1}
              placeholder="Avg"
              placeholderTextColor="white"
              keyboardType={"numeric"}
              style={styles.TextInputStyle2}
            />
            <TextInput
              value={maxPace}
              onChangeText={setMaxPace}
              placeholder="Max"
              placeholderTextColor="white"
              keyboardType={"numeric"}
              style={styles.TextInputStyle2}
            />
          </View>

          <View style={styles.FieldRow}>
            <Text style={styles.TextStyle}>Heart Rate</Text>
            <TextInput
              value={minHeartRate}
              onChangeText={setMinHeartRate}
              placeholder="Min"
              placeholderTextColor="white"
              keyboardType={"numeric"}
              style={styles.TextInputStyle2}
            />
            <TextInput
              value={avgHeartRate}
              onChangeText={setAvgHeartRate}
              placeholder="Avg"
              placeholderTextColor="white"
              keyboardType={"numeric"}
              style={styles.TextInputStyle2}
            />
            <TextInput
              value={maxHeartRate}
              onChangeText={setMaxHeartRate}
              placeholder="Max"
              placeholderTextColor="white"
              keyboardType={"numeric"}
              style={styles.TextInputStyle2}
            />
          </View>

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
              position: "absolute",
              bottom: -70,
            }}
            onPress={() => {
              navigation.navigate("GraphGen", {
                workoutName,
                athlete,
                userType,
                type: "Run",
                data: {
                  duration,
                  distance,
                  avgPace,
                  calories,
                  elevation,
                  tss,
                  If,
                  runningTime,
                  avgPace1,
                  maxPace,
                  minHeartRate,
                  avgHeartRate,
                  maxHeartRate,
                },
              });
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
                navigation.navigate("GraphGen", {
                  workoutName,
                  athlete,
                  userType,
                  type: "Run",
                  data: {
                    duration,
                    distance,
                    avgPace,
                    calories,
                    elevation,
                    tss,
                    If,
                    runningTime,
                    avgPace1,
                    maxPace,
                    minHeartRate,
                    avgHeartRate,
                    maxHeartRate,
                  },
                });
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    color: "white",
    minHeight: ScreenHeight,
  },
  TextInputStyle: {
    borderWidth: 1,
    borderColor: "white",
    width: 200,
    textAlign: "center",
    color: "white",
    borderRadius: 8,
  },
  TextInputStyle2: {
    borderWidth: 1,
    borderColor: "white",
    width: 60,
    textAlign: "center",
    color: "white",
    marginRight: 10,
    borderRadius: 8,
  },
  TextStyle: {
    width: 150,
    textAlign: "center",
    color: "white",
  },
  TextInputContainer: {
    justifyContent: "center",
    marginLeft: 15,
  },
  FieldRow: {
    flexDirection: "row",
    marginVertical: 8,
  },
});

export default RunFields;
