import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";

import { Icon } from "react-native-elements";

import { db } from "../firebase";
import * as firebase from "firebase";

import { useDispatch, useSelector } from "react-redux";
import { setDbID, selectDbId, selectUser } from "../features/userSlice";

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

function AddCoach({ navigation }) {
  const [assigningId, setAssigningId] = useState(null);
  const user = useSelector(selectUser);
  const userId = useSelector(selectDbId);
  // UserID = EvEuBZQ82kXkJHe6gqTx
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    db.collection("athletes")
      .where("email", "==", user)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log("3");
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
  }, [user]);

  const submitDetails = () => {
    db.collection("athletes")
      .doc(userDetails.id)
      .update({
        listOfCoaches: firebase.firestore.FieldValue.arrayUnion(assigningId),
      })
      .then((res) => console.log(res))
      .catch((e) => console.log(e));

    db.collection("coach")
      .doc(assigningId)
      .update({
        listOfAthletes: firebase.firestore.FieldValue.arrayUnion(
          userDetails.id
        ),
      })
      .then((res) => console.log(res))
      .catch((e) => console.log(e));

    db.collection("athletes")
      .doc(userDetails.id)
      .update({
        due_amount: { [assigningId]: 0 },
      });

    navigation.navigate("Coaches");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Coaches")}
        style={{
          position: "absolute",
          left: 25,
          top: 30,
          backgroundColor: "black",
        }}
      >
        <Icon name="chevron-left" type="font-awesome-5" color="white" />
      </TouchableOpacity>
      <View style={{ marginLeft: 30, marginVertical: 40 }}>
        <Text style={{ color: "white", marginBottom: 10 }}>
          Enter the Coach ID
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            width: 200,
            borderColor: "white",
            color: "white",
            borderRadius: 5,
            paddingVertical: 5,
            paddingHorizontal: 10,
          }}
          placeholderTextColor="white"
          value={assigningId}
          onChangeText={setAssigningId}
        />
      </View>
      <Button title="Request" onPress={submitDetails} />
    </View>
  );
}

export default AddCoach;
