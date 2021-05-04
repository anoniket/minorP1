import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
  TextInput,
  BackHandler,
  Button,
  Share,
  Dimensions,
} from "react-native";
import { auth, db } from "../../firebase";

import { NativeModules } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import {
  setDbID,
  selectDbId,
  selectUser,
  setUserDetails,
  selectShowData,
  logout,
} from "../../features/userSlice";

import { useFocusEffect } from "@react-navigation/native";
import { Icon } from "react-native-elements";

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 0,
    paddingTop: 20,
    minHeight: ScreenHeight,
  },
  athlete_card: {
    width: ScreenWidth/1.2,
    height: 150,
    backgroundColor: "#141313",
    borderWidth : 1,
    borderColor: 'white',
    borderRadius: 12,
    marginVertical: 15,
  },
  athlete_cardHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  athlete_image: {
    margin: 10,
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: "white",
    marginRight: 20,
  },
  athlete_name: {
    fontSize: 18,
    color: "white",
    marginBottom: 5,
  },
  athlete__cardBody: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  share: {
    position: "absolute",
    top: 20,
    right: 70,
  },
});

function CoachHomeScreen({ navigation }) {
  const [userDetails, setUserDetails] = useState(null);
  const [athleteDetails, setAthleteDetails] = useState([]);
  const user = useSelector(selectUser);
  const [data, setData] = useState([]);

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
    db.collection("coach")
      .where("email", "==", user)
      .get()
      .then(function (querySnapshot) {
        console.log("35");
        querySnapshot.forEach(function (doc) {
          setUserDetails({
            id: doc.id,
            data: doc.data(),
          });
          dispatch(setUserDetails({ id: doc.id, data: doc.data() }));
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });

    const data = [];
    db.collection("athletes")
      .get()
      .then((snapshot) => {
        console.log("36");
        snapshot.docs.forEach((item) => {
          let currentID = item.id;
          let appObj = { ...item.data(), ["id"]: currentID };
          data.push(appObj);
        });
        setAthleteDetails(data);
      });
  }, [user]);

  console.log({ athleteDetails, userDetails });

  const shareID = async () => {
    try {
      const result = await Share.share({
        message: `Join using this ID ${userDetails.id}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const data = [];
    athleteDetails?.map((item) =>
      userDetails?.data?.listOfAthletes.map((athlete) =>
        athlete === item.id ? data.push(item) : null
      )
    );
    setData(data);
  }, [userDetails, athleteDetails]);

  const handleLogout = () => {
    auth.signOut();
    dispatch(logout());
    NativeModules.DevSettings.reload();
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>
          Home
        </Text>
        <TouchableOpacity onPress={shareID} style={styles.share}>
          <Icon name="share-alt" type="font-awesome-5" color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLogout}
          style={{ position: "absolute", top: 20, right: 20 }}
        >
          <Icon name="sign-out-alt" type="font-awesome-5" color="white" />
        </TouchableOpacity>

        <View style={{ marginTop: 50 }}>
          {data?.map((item) => (
            <TouchableHighlight style={styles.athlete_card}>
              <View>
                <View style={styles.athlete_cardHeader}>
                  <Image style={styles.athlete_image} />
                  <View>
                    <Text style={styles.athlete_name}>{item.name}</Text>
                   
                  </View>
                </View>
                <View style={styles.athlete__cardBody}>
                  <Button
                    title="message"
                    color="#004872"
                    onPress={() => {
                      navigation.navigate("Chat", {
                        to_id: userDetails.id,
                        to_name: userDetails.data.name,
                        from_id: item.id,
                        from_name: item.name,
                        type: "coach",
                      });
                    }}
                  />
                  <Button
                    title={"Calendar"}
                    color="#004872"
                    onPress={() => {
                      navigation.navigate("Home", {
                        athlete_id: item.id,
                        type: "coach",
                      });
                    }}
                  />
                  <Button
                    title={"Profile"}
                    color="#004872"
                    onPress={() => {
                      navigation.navigate("ShowProfile", {
                        athlete_id: item.id,
                        type: "coach",
                      });
                    }}
                  />
                </View>
              </View>
            </TouchableHighlight>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

export default CoachHomeScreen;
