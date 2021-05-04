import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
  Modal,
  TextInput,
  BackHandler,
  WebView,
  Platform,
  Dimensions,
} from "react-native";
let ScreenHeight = Dimensions.get("window").height;

import DatePicker from "react-native-datepicker";
import { Picker } from "@react-native-picker/picker";

import { WeekCalendar } from "react-native-calendars";

import { useDispatch, useSelector } from "react-redux";
import { logout, selectDbId, selectUser } from "../features/userSlice";

import { auth, db } from "../firebase";
import { useFocusEffect } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 0,
    paddingTop: 20,
    height: ScreenHeight - 40,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 50,
    padding: 50,
  },
});

function Workout({ route, navigation }) {
  const [workouts, setWorkouts] = useState([]);
  const [requestDate, setRequestDate] = useState(null);
  const user = useSelector(selectUser);
  const userId = useSelector(selectDbId);
  // UserID = EvEuBZQ82kXkJHe6gqTx
  const [userDetails, setUserDetails] = useState(null);
  const [chats, setChats] = useState([]);
  const [coachDetails, setCoachDetails] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [assignDate, setAssignDate] = useState(null);
  const [workoutName, setWorkoutName] = useState(null);
  const [workoutType, setWorkoutType] = useState("Select the workout type");
  const [runTime, setRunTime] = useState(null);
  const [bikeTime, setBikeTime] = useState(null);
  const [swimTime, setSwimTime] = useState(null);
  const [triathlonTime, setTriathlonTime] = useState(null);

  const [athlete_id, setAthleteId] = useState(null);
  const [type, setType] = useState(null);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  useEffect(() => {
    if (route.params?.athlete_id) {
      setAthleteId(route.params.athlete_id);
    }
  }, [route.params?.athlete_id]);

  useEffect(() => {
    if (route.params?.type) {
      setType(route.params.type);
    }
  }, [route.params?.type]);

  useEffect(() => {
    db.collection("athletes")
      .where("email", "==", user)
      .get()
      .then(function (querySnapshot) {
        console.log('26');
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, " => ", doc.data());
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
    db.collection("coach")
      .get()
      .then((snapshot) => {
        console.log('27');
        snapshot.docs.forEach((item) => {
          let currentID = item.id;
          let appObj = { ...item.data(), ["id"]: currentID };
          data.push(appObj);
        });
        setCoachDetails(data);
      });

    if (athlete_id) {
      db.collection("athletes")
        .doc(athlete_id)
        .get()
        .then(function (doc) {
          console.log('28');
          if (doc.exists) {
            console.log("Document data:", doc.data());
            setUserDetails({ id: doc.id, data: doc.data() });
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    }
  }, [user]);

  useEffect(() => {
    const getWorkouts = async () => {
      await db
        .collection("workouts")
        .where("assignDate", "==", requestDate.dateString)
        .where("assignedTo_id", "==", userDetails.id)
        .onSnapshot((snapshot) => {
          setWorkouts(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        })
        .catch((e) => console.log(e));
    };
    getWorkouts();
    return () => {
      getWorkouts();
    };
  }, [requestDate]);

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
            keyboardType={"numeric"}
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
            keyboardType={"numeric"}
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
            keyboardType={"numeric"}
            value={triathlonTime}
            onChangeText={setTriathlonTime}
          />
        </View>
      );
    } else return null;
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {type !== "coach" && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("AthleteWorkoutList", {
                athlete: userDetails,
              })
            }
            style={{ position: "absolute", top: 20, right: 16 }}
          >
            <Text
              style={{
                fontFamily: "SF-Pro-Display-regular",
                fontSize: 40,
                color: "white",
              }}
            >
              +
            </Text>
          </TouchableOpacity>
        )}

        <View
          style={{
            position: "absolute",
            alignSelf: "stretch",
            maxHeight: 100,
            top: 80,
          }}
        >
          <WeekCalendar
            // style={{
            //   borderWidth: 1,
            //   borderColor: "gray",
            // }}
            firstDay={1}
            current={new Date()}
            onDayPress={(day) => {
              setRequestDate(day);
            }}
          />
        </View>

        <View style={{ marginTop: 150 }}>
          <ScrollView>
            {workouts?.map((item) => (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  flexWrap: "wrap",
                  marginLeft: 20,
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    opacity: 1,
                    borderColor: "steelblue",
                    borderWidth: 2,
                    marginBottom: 10,
                    marginRight: 10,
                    marginLeft: 5,
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    navigation.navigate("ViewWorkout", {
                      athlete: userDetails,
                      workout: item,
                      type: "athlete",
                    });
                  }}
                >
                  <View
                    style={{
                      width: 150,
                      height: 130,
                      backgroundColor: "#333",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                      borderRadius: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 20,
                        fontFamily: "SF-Pro-Display-regular",
                        position: "absolute",
                        bottom: 50,
                        marginHorizontal: 32,
                        width: "80%",
                        textAlign: "center",
                      }}
                    >
                      {item?.data?.workoutName}
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 20,
                        fontFamily: "SF-Pro-Display-regular",
                        position: "absolute",
                        bottom: 10,
                        marginHorizontal: 32,
                        width: "80%",
                        textAlign: "center",
                      }}
                    >
                      {item?.data?.assignDate}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}

export default Workout;
