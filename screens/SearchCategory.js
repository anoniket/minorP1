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
  ScrollView,
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

function SearchCategory({ navigation }) {
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

  console.log({ users });

  // const Capitalize = (str) => {
  //   return str.charAt(0).toUpperCase() + str.slice(1);
  // };

  const fetchUsers = (search) => {
    db.collection("coach")
      .where("sports", "array-contains", search)
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

      <View style={{ position: "absolute", top: 80 }}>
        <ScrollView horizontal>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => fetchUsers("Run")}
              style={{
                padding: 10,
                backgroundColor: "#ccc",
                borderRadius: 5,
                marginHorizontal: 10,
                minWidth: 80,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Text>Run</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => fetchUsers("Cycle")}
              style={{
                padding: 10,
                backgroundColor: "#ccc",
                borderRadius: 5,
                marginHorizontal: 10,
                minWidth: 80,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Text>Cycle</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => fetchUsers("Bike")}
              style={{
                padding: 10,
                backgroundColor: "#ccc",
                borderRadius: 5,
                marginHorizontal: 10,
                minWidth: 80,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Text>Bike</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => fetchUsers("Swim")}
              style={{
                padding: 10,
                backgroundColor: "#ccc",
                borderRadius: 5,
                marginHorizontal: 10,
                minWidth: 80,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Text>Swim</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => fetchUsers("Triathlon")}
              style={{
                padding: 10,
                backgroundColor: "#ccc",
                borderRadius: 5,
                marginHorizontal: 10,
                minWidth: 80,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Text>Triathlon</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => fetchUsers("Diet")}
              style={{
                padding: 10,
                backgroundColor: "#ccc",
                borderRadius: 5,
                marginHorizontal: 10,
                minWidth: 80,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Text>Diet</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => fetchUsers("Sports Specific S&C")}
              style={{
                padding: 10,
                backgroundColor: "#ccc",
                borderRadius: 5,
                marginHorizontal: 10,
                minWidth: 80,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Text>Sports Specific S&C</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => fetchUsers("Personal Trainer")}
              style={{
                padding: 10,
                backgroundColor: "#ccc",
                borderRadius: 5,
                marginHorizontal: 10,
                minWidth: 80,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Text>Personal Trainer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => fetchUsers("Recover and Injury")}
              style={{
                padding: 10,
                backgroundColor: "#ccc",
                borderRadius: 5,
                marginHorizontal: 10,
                minWidth: 80,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Text>Recover and Injury</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <View style={{ marginTop: 150 }}>
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

export default SearchCategory;
