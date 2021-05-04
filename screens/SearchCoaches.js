import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Button,
} from "react-native";

import { Icon } from "react-native-elements";

import { db } from "../firebase";

import { useDispatch, useSelector } from "react-redux";
import { logout, selectDbId, selectUser } from "../features/userSlice";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 0,
    minHeight: 600,
  },
  coach_card: {
    width: 250,
    height: 150,
    backgroundColor: "steelblue",
    borderRadius: 12,
    marginVertical: 15,
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

function SearchCoaches({ navigation }) {
  const [users, setUsers] = useState([]);
  const user = useSelector(selectUser);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    db.collection("athletes")
      .where("email", "==", user)
      .get()
      .then(function (querySnapshot) {
        console.log("14");
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
  }, [user]);

  const fetchUsers = (search) => {
    db.collection("coach")
      .where("name", ">=", search)
      .get()
      .then((snapshot) => {
        let users = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        setUsers(users);
      });
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
      <View style={{ marginTop: 50 }}>
        <TextInput
          style={{
            color: "white",
            borderWidth: 1,
            borderColor: "white",
            width: 250,
            height: 45,
            paddingHorizontal: 15,
            paddingVertical: 5,
            marginVertical: 30,
            borderRadius: 12,
          }}
          placeholderTextColor="white"
          placeholder="Type here..."
          onChangeText={(search) => fetchUsers(search)}
        />
        <FlatList
          numColumns={1}
          horizontal={false}
          data={users}
          renderItem={({ item }) => (
            <TouchableHighlight style={styles.coach_card}>
              <View>
                <View style={styles.coach_cardHeader}>
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.coach_image}
                  />
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
        />
      </View>
    </View>
  );
}

export default SearchCoaches;
