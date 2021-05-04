import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";

import { db } from "../firebase";

import { useDispatch, useSelector } from "react-redux";
import { setDbID, selectDbId, selectUser } from "../features/userSlice";

import { Icon } from "react-native-elements";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 0,
    paddingTop: 20,
  },
});

function Gadgets({ navigation }) {
  const [color, changeColor] = useState([]);

  const user = useSelector(selectUser);
  const userId = useSelector(selectDbId);
  // UserID = EvEuBZQ82kXkJHe6gqTx
  const [userDetails, setUserDetails] = useState(null);
  const dispatch = useDispatch();

  const [sportsList, setSportsList] = useState([
    "GPS",
    "HRM",
    "Run",
    "Pod",
    "Power Meter",
    "Bike Computer",
    "Cadence/Speed Sensor",
    "Swim HRM",
    "Indoor Trainer,Cleats",
    "Treadmill",
  ]);

  useEffect(() => {
    db.collection("athletes")
      .where("email", "==", user)
      .get()
      .then(function (querySnapshot) {
        console.log("13");
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, " => ", doc.data());
          setUserDetails({
            id: doc.id,
            data: doc.data(),
          });
          dispatch(setDbID(doc.id));
          dispatch(
            setUserDetails({
              id: doc.id,
              data: doc.data(),
            })
          );
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }, []);

  const addSport = () => {
    sportsList.forEach(function (gadget, index) {
      if (color.includes(index)) {
        db.collection("athletes")
          .doc("L8qmpoVumSIyGoHyz5Js")
          .collection("gadgets")
          .doc(gadget)
          .set({ gadget });
      }
    });

    navigation.navigate("TrainingLocation");
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
          onPress={() => navigation.navigate("TrainingLocation")}
          style={{ position: "absolute", top: 40, right: 16 }}
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
          <Text
            style={{
              color: "steelblue",
              fontSize: 25,
              fontFamily: "SF-Pro-Display-regular",
              marginTop: 15,
              marginBottom: 5,
            }}
          >
            Select Gadgets
          </Text>

          <View
            style={{
              width: 222,
              height: 53,
              marginTop: 0,
              marginBottom: 16,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                fontFamily: "SF-Pro-Display-regular",
                color: "white",
              }}
            >
              Please select all the gagets that you use
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              marginLeft: 20,
            }}
          >
            {sportsList.map((sport, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => {
                  if (color.includes(idx)) {
                    var array = [...color];
                    var index = array.indexOf(idx);
                    if (index !== -1) {
                      array.splice(index, 1);
                      changeColor(array);
                    }
                  } else {
                    changeColor([...color, idx]);
                  }
                }}
                style={
                  color.includes(idx)
                    ? {
                        opacity: 1,
                        borderColor: "steelblue",
                        borderWidth: 2,
                        marginBottom: 10,
                        marginRight: 10,
                        marginLeft: 5,
                        borderRadius: 10,
                      }
                    : {
                        opacity: 0.66,
                        marginBottom: 10,
                        marginLeft: 5,
                        marginRight: 10,
                      }
                }
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
                      bottom: 10,
                      marginHorizontal: 32,
                      width: "80%",
                      textAlign: "center",
                    }}
                  >
                    {sport}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "steelblue",
              width: 343,
              height: 55,
              marginBottom: 20,
              marginTop: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={addSport}
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

export default Gadgets;
