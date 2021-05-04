import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { Icon } from "react-native-elements";

import * as firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUser,
  selectUserDetails,
  setDbID,
  setUserDetails,
} from "../features/userSlice";
import { db } from "../firebase";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingVertical: 20,
    marginBottom: 0,
  },
});

function Chat({ route, navigation }) {
  const user = useSelector(selectUser);
  const [inputMessage, setInputMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const { from_id, from_name, to_id, to_name, type } = route.params;
  const [doc_id, setDoc_id] = useState(null);
  const scrollViewRef = useRef();

  const [listOfCoaches, setListOfCoaches] = useState([]);
  const [warningMessage, setWarningMessage] = useState("");
  let messagesLength = allMessages.length;
  let checkLinking = listOfCoaches?.includes(to_id);

  console.log({
    from_id,
    listOfCoaches,
    to_id,
    messagesLength,
    checkLinking,
    doc_id,
  });

  useEffect(() => {
    db.collection("chat")
      .where("from_id", "==", from_id)
      .where("to_id", "==", to_id)
      .get()
      .then((snap) => {
        console.log("7");
        if (!snap.empty) {
          // work with documents
          db.collection("chat")
            .where("from_id", "==", from_id)
            .where("to_id", "==", to_id)
            .get()
            .then(function (querySnapshot) {
              console.log("8");
              querySnapshot.forEach(function (doc) {
                setDoc_id(doc.id);
              });
            })
            .catch(function (error) {
              console.log("Error getting documents: ", error);
            });
        } else {
          // Create some documents
          db.collection("chat").add({ from_id: from_id, to_id: to_id });
          // db.collection("chat")
          //   .collection("messages")
          //   .add({ from_id: from_id, from_name: from_name });
        }
      });

    if (doc_id) {
      const data = [];

      db.collection("chat")
        .doc(doc_id)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .get()
        .then((snapshot) => {
          console.log("9");
          snapshot.docs.forEach((item) => {
            let currentID = item.id;
            let appObj = { ...item.data(), ["id"]: currentID };
            data.push(appObj);
          });
          setAllMessages(data);
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
    }

    db.collection("athletes")
      .doc(from_id)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          setListOfCoaches(doc.data().listOfCoaches);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }, [doc_id, from_id, to_id]);

  const sendMessage = (e) => {
    e.preventDefault();

    if (type === "coach") {
      setAllMessages([
        ...allMessages,
        {
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          message: inputMessage,
          from_id: to_id,
          from_name: to_name,
        },
      ]);
      db.collection("chat")
        .doc(doc_id)
        .collection("messages")
        .add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          message: inputMessage,
          from_id: to_id,
          from_name: to_name,
        })
        .catch((e) => console.log(e));
    } else if (type === "athlete") {
      if (listOfCoaches.includes(to_id)) {
        console.log("Coach is linked!");
        setAllMessages([
          ...allMessages,
          {
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: inputMessage,
            from_id: from_id,
            from_name: from_name,
          },
        ]);

        db.collection("chat")
          .doc(doc_id)
          .collection("messages")
          .add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: inputMessage,
            from_id: from_id,
            from_name: from_name,
          })
          .catch((e) => console.log(e));
      } else {
        if (messagesLength < 2) {
          console.log("Message length is less than 2");
          setAllMessages([
            ...allMessages,
            {
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              message: inputMessage,
              from_id: from_id,
              from_name: from_name,
            },
          ]);
          db.collection("chat")
            .doc(doc_id)
            .collection("messages")
            .add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              message: inputMessage,
              from_id: from_id,
              from_name: from_name,
            })
            .catch((e) => console.log(e));
        } else {
          console.log("Warning");
          setWarningMessage(
            "Cannot send more than two messages since you are not linked with this coach"
          );
        }
      }
    }

    setInputMessage("");
  };

  return (
    <View style={styles.container}>
      <View>
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#333",
              padding: 5,
            }}
          >
            <TouchableOpacity
              onPress={() =>
                type === "coach"
                  ? navigation.navigate("CoachHomeScreen")
                  : navigation.navigate("Coaches")
              }
              style={{ marginHorizontal: 10 }}
            >
              <Icon name="chevron-left" type="font-awesome-5" color="white" />
            </TouchableOpacity>
            <Image
              source={{ uri: "dsf" }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 100,
                backgroundColor: "white",
                margin: 10,
              }}
            />
            {type === "coach" ? (
              <Text style={{ color: "white", fontSize: 20 }}>{from_name}</Text>
            ) : (
              <Text style={{ color: "white", fontSize: 20 }}>{to_name}</Text>
            )}
          </View>
        </View>
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
        >
          <View style={{ marginBottom: 140, marginTop: 50 }}>
            {allMessages?.map((msg) => (
              <View>
                {type === "coach" ? (
                  <Text
                    style={
                      msg.from_id === to_id
                        ? {
                            display: "flex",
                            alignItems: "center",
                            position: "relative",
                            justifyContent: "space-between",
                            backgroundColor: "#51A0D5",
                            margin: 15,
                            paddingHorizontal: 15,
                            paddingVertical: 5,
                            borderRadius: 15,
                            alignSelf: "flex-end",
                          }
                        : {
                            display: "flex",
                            alignItems: "center",
                            position: "relative",
                            justifyContent: "space-between",
                            backgroundColor: "#f3f3f5",
                            margin: 15,
                            borderRadius: 15,
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            alignSelf: "flex-start",
                          }
                    }
                  >
                    {msg.message}
                  </Text>
                ) : (
                  <Text
                    style={
                      msg.from_id === from_id
                        ? {
                            display: "flex",
                            alignItems: "center",
                            position: "relative",
                            justifyContent: "space-between",
                            backgroundColor: "#51A0D5",
                            margin: 15,
                            paddingHorizontal: 15,
                            paddingVertical: 5,
                            borderRadius: 15,
                            alignSelf: "flex-end",
                          }
                        : {
                            display: "flex",
                            alignItems: "center",
                            position: "relative",
                            justifyContent: "space-between",
                            backgroundColor: "#f3f3f5",
                            margin: 15,
                            borderRadius: 15,
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            alignSelf: "flex-start",
                          }
                    }
                  >
                    {msg.message}
                  </Text>
                )}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      {warningMessage ? (
        <Text style={{ color: "yellow" }}>{warningMessage}</Text>
      ) : null}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: 350,
          zIndex: 1,
          backgroundColor: "black",
        }}
      >
        <TextInput
          style={{
            borderRadius: 30,
            borderWidth: 1,
            borderColor: "white",
            color: "white",
            flex: 1,
            width: 300,
            paddingVertical: 8,
            paddingHorizontal: 15,
            margin: 20,
          }}
          placeholder="Type your message ..."
          placeholderTextColor="white"
          value={inputMessage}
          onChangeText={setInputMessage}
        />
        <Button
          title="Send"
          style={{ paddingHorizontal: 10 }}
          onPress={(e) => sendMessage(e)}
        />
      </View>
    </View>
  );
}

export default Chat;
