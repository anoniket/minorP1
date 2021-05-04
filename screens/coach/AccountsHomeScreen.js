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
  BackHandler,
  Button,
  Share,
  Dimensions,
} from "react-native";
import { auth, db } from "../../firebase";

import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

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
    minHeight: 600,
  },
});

function AccountsHomeScreen({ navigation }) {
  const [userDetails, setUserDetails] = useState(null);
  const [athleteDetails, setAthleteDetails] = useState([]);
  const [data, setData] = useState([]);
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  useEffect(() => {
    db.collection("coach")
      .where("email", "==", user)
      .get()
      .then(function (querySnapshot) {
        console.log('31');
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
        console.log('32');
        snapshot.docs.forEach((item) => {
          let currentID = item.id;
          let appObj = { ...item.data(), ["id"]: currentID };
          data.push(appObj);
        });
        setAthleteDetails(data);
      });
  }, [user]);

  useEffect(() => {
    const data = [];
    athleteDetails?.map((item) =>
      userDetails?.data?.listOfAthletes.map((athlete) =>
        athlete === item.id ? data.push(item) : null
      )
    );
    setData(data);
  }, [userDetails, athleteDetails]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Admin")}
        style={{ position: "absolute", left: 25, top: 30, zIndex: 1 }}
      >
        <Icon name="chevron-left" type="font-awesome-5" color="white" />
      </TouchableOpacity>
      <Text
        style={{
          color: "white",
          fontSize: 22,
          marginBottom: 50,
          textAlign: "center",
        }}
      >
        Accounts
      </Text>
      <ScrollView>
        <View>
          {data?.map((item) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Accounts", {
                  coach: userDetails,
                  athlete: item,
                })
              }
            >
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
                <Text style={{ color: "white" }}>{item.name}</Text>
                <Icon
                  name="chevron-right"
                  type="font-awesome-5"
                  color="white"
                />
              </View>
            </TouchableOpacity>

            // <View
            //   style={{
            //     display: "flex",
            //     flexDirection: "row",
            //     alignItems: "center",

            //     marginVertical:10
            //   }}
            // >
            //  <Text style={{color:"white",marginRight:20,width:100}}>{item.name}</Text>

            //   <Button
            //     title="View"
            //     style={{
            //       color: "white",
            //       borderColor: "white",
            //       backgroundColor: "#E2E2E2",
            //     }}

            //   />
            // </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default AccountsHomeScreen;
