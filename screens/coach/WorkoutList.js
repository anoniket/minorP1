import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Flatlist,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions
} from "react-native";

import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectDbId, selectUser } from "../../features/userSlice";

import { auth, db } from "../../firebase";

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 0,
    
  },
  header: {
    color: "white",
    fontSize: 20,
    marginTop: 20,
    marginBottom: 30,
  },
  body: {
    height:600,
    marginBottom: 20,
  },
  workout_view: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",

    marginTop: 10,
  },
  workout_cardContainer: {
    display: "flex",
    flexDirection: "row",
  },
  workout_image: {
    width: ScreenWidth / 3,
    height: 130,
    backgroundColor: "#333",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  workout_card: {
    opacity: 1,
    borderColor: "white",
    borderWidth: 2,
    marginBottom: 10,
    
    borderRadius: 10,
    width: ScreenWidth - 24
  },
  workout_cardContent: {
    width: ScreenWidth/2,
    height: 130,
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  workout_name: {
    color: "white",
    fontSize: 17,
    fontFamily: "SF-Pro-Display-regular",

    width: "80%",
    textAlign: "center",
  },
  workout_type: {
    color: "#3895CE",
    fontSize: 24,
    fontFamily: "SF-Pro-Display-regular",
    marginTop: 20,

    width: "80%",
    textAlign: "center",
  },
  workout_assignDate: {
    color: "white",
    fontSize: 15,
    fontFamily: "SF-Pro-Display-regular",
    marginTop: 10,

    width: "80%",
    textAlign: "center",
  },
});

function WorkoutList({ route, navigation }) {
  const [workouts, setWorkouts] = useState([]);
  const user = useSelector(selectUser);
  const [userDetails, setUserDetails] = useState(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    db.collection("coach")
      .where("email", "==", user)
      .get()
      .then(function (querySnapshot) {
        console.log("4");
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
  }, [user]);

  useEffect(() => {
    if (userDetails) {
      db.collection("workouts")
        .where("assignedBy_id", "==", userDetails?.id)
        .get()
        .then((snapshot) => {
          console.log("5");
          let workouts = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          setWorkouts(workouts);
        })
        .catch((e) => console.log(e));
    }
  }, [userDetails]);

  useEffect(() => {
    console.log("Workout updated!");
    if (userDetails) {
      db.collection("workouts")
        .where("assignedBy_id", "==", userDetails?.id)
        .get()
        .then((snapshot) => {
          console.log("6");
          let workouts = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          setWorkouts(workouts);
        })
        .catch((e) => console.log(e));
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>List of Workouts</Text>
      <View style={styles.body}>
        <ScrollView>
          <View style={{ marginBottom: 30 }}>
            {workouts?.map((item) => (
              <View style={styles.workout_view} key={item.id}>
                <TouchableOpacity
                  style={styles.workout_card}
                  onPress={() =>
                    navigation.navigate("ViewWorkout", {
                      athlete: userDetails,
                      workout: item,
                      type: "coach",
                    })
                  }
                >
                  <View style={styles.workout_cardContainer}>
                    <Image
                      style={styles.workout_image}
                      source={{
                        uri:
                          (item.type === "Run" &&
                            "https://images.pexels.com/photos/694587/pexels-photo-694587.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260") ||
                          (item.type === "Swim" &&
                            "https://images.pexels.com/photos/1415810/pexels-photo-1415810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") ||
                          (item.type === "Bike" &&
                            "https://images.pexels.com/photos/38296/cycling-bicycle-riding-sport-38296.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") ||
                          (item.type === "Triathlon" &&
                            "https://images.pexels.com/photos/5687488/pexels-photo-5687488.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") ||
                          "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzF8fGZpdG5lc3N8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                      }}
                    />
                    <View style={styles.workout_cardContent}>
                      <Text style={styles.workout_name}>
                        {item.workoutName}
                      </Text>
                      <Text style={styles.workout_type}>
                        {item.type ? item.type : null}
                      </Text>
                      <Text style={styles.workout_assignDate}>
                        {item.assignDate}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>

        <Button
          style={{ position: "absolute", bottom: 0, marginTop: 0 }}
          title="Add Custom Workout"
          onPress={() =>
            navigation.navigate("AddWorkout", {
              coach: userDetails,
              workout: null,
            })
          }
        />

        
      </View>
    </View>
  );
}

export default WorkoutList;
