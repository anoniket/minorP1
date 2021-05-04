import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import {useIsFocused } from "@react-navigation/native";

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

import { Icon } from "react-native-elements";

import { useDispatch, useSelector } from "react-redux";
import { logout, selectDbId, selectUser } from "../features/userSlice";

import { db } from "../firebase";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    marginBottom: 0,
    paddingTop: 20,
    height: ScreenHeight - 40,
  },
  coach_card: {
    width: ScreenWidth -16,
    height: 150,
    backgroundColor: "black",
    borderRadius: 12,
    borderWidth : 1,
    borderColor : 'white',
    marginVertical : 15
  },
  coach_cardHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  coach_image: {
    margin: 10,
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: "white",
    marginRight: 20,
  },
  coach_name: {
    fontSize: 18,
    color: "white",
  },
  coach__cardBody: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
});

function Coaches({ route, navigation }) {
  const user = useSelector(selectUser);
  const [userDetails, setUserDetails] = useState(null);
  const [coachDetails, setCoachDetails] = useState(null);
  const [athlete_id, setAthleteId] = useState(null);
  const [type, setType] = useState(null);
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  const isFocused = useIsFocused();
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
        console.log('91')
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
        console.log('10')
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
          if (doc.exists) {
            console.log('11');
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
  }, [user, isFocused]);

  useEffect(() => {
    const data = [];
    coachDetails?.map((item) =>
      userDetails?.data?.listOfCoaches.map((coach) =>
        coach === item.id ? data.push(item) : null
      )
    );
    setData(data);
  }, [userDetails, coachDetails]);

  console.log({ data });

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "white",
          textAlign: "center",
          fontSize: 22,
          marginBottom: 50,
        }}
      >
        Coaches
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate("SearchCoaches")}>
        <View
          style={{
            display: "flex",
            width: ScreenWidth - 80,
            height: 50,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "white" }}>Search for a Coach</Text>
          <Icon name="chevron-right" type="font-awesome-5" color="white" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("SearchCategory")}>
        <View
          style={{
            display: "flex",
            width: ScreenWidth - 80,
            height: 50,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "white" }}>Search for a Coach by Category</Text>
          <Icon name="chevron-right" type="font-awesome-5" color="white" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("AddCoach")}>
        <View
          style={{
            display: "flex",
            width: ScreenWidth - 80,
            height: 50,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "white" }}>Add a Coach by ID</Text>
          <Icon name="chevron-right" type="font-awesome-5" color="white" />
        </View>
      </TouchableOpacity>
      <ScrollView>
      <View style={{ marginTop: 50 }}>
        
          {data?.map((item) => (
            <TouchableHighlight style={styles.coach_card}>
              <View>
                <View style={styles.coach_cardHeader}>
                  <Image source = {{uri : item.imageUrl}} style={styles.coach_image} />
                  <Text style={styles.coach_name}>{item.name}</Text>
                </View>
                <View style={styles.coach__cardBody}>
                  <Button
                    title="message"
                    color="#004872"
                    onPress={() =>
                      navigation.navigate("Chat", {
                        from_id: userDetails.id,
                        from_name: userDetails.data.name,
                        to_id: item.id,
                        to_name: item.name,
                        type: "athlete",
                      })
                    }
                  />
                  <Button
                    title={"Show Profile"}
                    color="#004872"
                    onPress={() =>
                      navigation.navigate("showProfile", {
                        coach_id: item.id,
                        type: "athlete",
                      })
                    }
                  />
                </View>
              </View>
            </TouchableHighlight>
          ))}
        
      </View>
      </ScrollView>
      {/* <View>
        {coachDetails?.map((item) => {
          return (
            <View style={{ margin: 20 }}>
              {userDetails?.data?.listOfCoaches.map((coach) => {
                return (
                  <View>
                    {coach === item.id && (
                      <TouchableHighlight style={styles.coach_card}>
                        <View>
                          <View style={styles.coach_cardHeader}>
                            <Image style={styles.coach_image} />
                            <Text style={styles.coach_name}>{item.name}</Text>
                          </View>
                          <View style={styles.coach__cardBody}>
                            <Button
                              title="message"
                              color="grey"
                              onPress={() =>
                                navigation.navigate("Chat", {
                                  from_id: userDetails.id,
                                  from_name: userDetails.data.name,
                                  to_id: item.id,
                                  to_name: item.name,
                                  type: "athlete",
                                })
                              }
                            />
                            <Button
                              title={"Show Profile"}
                              color="grey"
                              onPress={() =>
                                navigation.navigate("showProfile", {
                                  coach_id: item.id,
                                  type: "athlete",
                                })
                              }
                            />
                          </View>
                        </View>
                      </TouchableHighlight>
                    )}
                  </View>
                );
              })}
            </View>
          );
        })}
      </View> */}
    </View>
  );
}

export default Coaches;
