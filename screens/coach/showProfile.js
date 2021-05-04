import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
let ScreenWidth = Dimensions.get("window").width;
import { Icon } from "react-native-elements";

import * as firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUser,
  selectUserDetails,
  setDbID,
  setUserDetails,
} from "../../features/userSlice";
import { db } from "../../firebase";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 20,
    marginBottom: 0,
    paddingTop: 20,
  },
  profileLabels: {
    color: "white",
    marginVertical: 20,
    fontSize: 20,
    width: 200,
    fontWeight: "bold",
  },
  profileData: {
    color: "white",
    margin: 20,
    fontSize: 20,
  },
  profileImage: {
    margin: 10,
    width: 120,
    height: 120,
    borderRadius: 100,
    backgroundColor: "white",
    alignSelf: "center",
    marginTop: 50,
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

function showProfile({ route, navigation }) {
  const user = useSelector(selectUser);
  const [userData, setUserData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState(userData?.data?.name);
  const [gender, setGender] = useState(userData?.data?.gender);
  const [email, setEmail] = useState(userData?.data?.email);
  const [areaOfExpertise, setAreaOfExpertise] = useState(
    userData?.data?.areaOfExpertise
  );
  const [coachingExperience, setCoachingExperience] = useState(
    userData?.data?.coachingExperience
  );
  const [modeOfTraining, setModeOfTraining] = useState(
    userData?.data?.modeOfTraining
  );
  const [about, setAbout] = useState(userData?.data?.about);
  const dispatch = useDispatch();

  const [coach_id, setCoachId] = useState(null);
  const [type, setType] = useState(null);

  console.log({ type });

  useEffect(() => {
    if (route.params?.coach_id) {
      setCoachId(route.params.coach_id);
    }
  }, [route.params?.coach_id]);

  useEffect(() => {
    if (route.params?.type) {
      setType(route.params.type);
    }
  }, [route.params?.type]);

  useEffect(() => {
    db.collection("coach")
      .where("email", "==", user)
      .get()
      .then(function (querySnapshot) {
        console.log("37");
        querySnapshot.forEach(function (doc) {
          setUserData({
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

    if (coach_id) {
      db.collection("coach")
        .doc(coach_id)
        .get()
        .then(function (doc) {
          console.log("38");
          if (doc.exists) {
            console.log("Document data:", doc.data());
            setUserData({ id: doc.id, data: doc.data() });
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    }
  }, [user, coach_id]);

  const saveDetails = () => {
    if (name === undefined) {
      setName(userData?.data?.name);
    }
    if (gender === undefined) {
      setGender(userData?.data?.gender);
    }
    if (areaOfExpertise === undefined) {
      setAreaOfExpertise(userData?.data?.areaOfExpertise);
    }
    if (email === undefined) {
      setEmail(userData?.data?.email);
    }
    if (coachingExperience === undefined) {
      setCoachingExperience(userData?.data?.coachingExperience);
    }
    if (modeOfTraining === undefined) {
      setModeOfTraining(userData?.data?.modeOfTraining);
    }
    if (about === undefined) {
      setAbout(userData?.data?.about);
    }
    console.log({
      name,
      gender,
      email,
      areaOfExpertise,
      coachingExperience,
      modeOfTraining,
      about,
    });
    db.collection("coach")
      .doc(userData.id)
      .update({
        name,
        gender,
        email,
        areaOfExpertise,
        coachingExperience,
        modeOfTraining,
        about,
      })
      .then((res) => console.log(res))
      .catch((e) => console.log(e));

    setEditable(false);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            type === "athlete"
              ? navigation.navigate("Coaches")
              : navigation.navigate("Admin")
          }
          style={{
            position: "absolute",
            left: 25,
            top: 30,
            backgroundColor: "black",
          }}
        >
          <Icon name="chevron-left" type="font-awesome-5" color="white" />
        </TouchableOpacity>

        <View style={{ width: 80, position: "absolute", top: 27, right: 0 }}>
          {type !== "athlete" && (
            <TouchableOpacity onPress={() => setEditable(true)}>
              <Icon name="edit" type="font-awesome-5" color="#eee" />
            </TouchableOpacity>
          )}
        </View>

        <View>
          <View style={styles.imageContainer}>
            <Image
              style={styles.profileImage}
              source={{ uri: userData?.data?.imageUrl }}
            />

            <View style={{ display: "flex", alignItems: "center" }}>
              <TextInput
                style={
                  editable
                    ? {
                        borderWidth: 1,
                        width: 200,
                        borderColor: "white",
                        color: "white",
                        borderRadius: 5,
                        display: "flex",
                        alignSelf: "center",
                        paddingVertical: 10,
                        fontSize: 20,
                        textAlign: "center",
                        width: ScreenWidth,
                      }
                    : {
                        borderWidth: 0,
                        width: 200,
                        borderColor: "white",
                        color: "white",
                        borderRadius: 5,
                        display: "flex",
                        alignSelf: "center",
                        fontSize: 20,
                        textAlign: "center",
                        paddingVertical: 10,
                        width: ScreenWidth,
                      }
                }
                placeholderTextColor="white"
                defaultValue={userData?.data?.name}
                editable={editable}
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>

          <View style={{ marginLeft: -50 }}>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Text style={styles.profileLabels}>Gender : </Text>
              <TextInput
                style={
                  editable
                    ? {
                        borderWidth: 1,
                        width: 200,
                        borderColor: "white",
                        color: "white",
                        borderRadius: 5,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                      }
                    : {
                        borderWidth: 0,
                        width: 200,
                        borderColor: "white",
                        color: "white",
                        borderRadius: 5,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                      }
                }
                placeholderTextColor="white"
                editable={editable}
                defaultValue={userData?.data?.gender}
                value={gender}
                onChangeText={setGender}
              />
            </View>

            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Text style={styles.profileLabels}>Email : </Text>
              <TextInput
                style={
                  editable
                    ? {
                        borderWidth: 1,
                        width: 200,
                        borderColor: "white",
                        color: "white",
                        borderRadius: 5,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                      }
                    : {
                        borderWidth: 0,
                        width: 200,
                        borderColor: "white",
                        color: "white",
                        borderRadius: 5,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                      }
                }
                placeholderTextColor="white"
                editable={editable}
                defaultValue={userData?.data?.email}
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={{ display: "flex", alignItems: "center" }}>
              <Text style={styles.profileLabels}>Area of Expertise :</Text>

              <TextInput
                style={
                  editable
                    ? {
                        borderWidth: 1,
                        width: 200,
                        borderColor: "white",
                        color: "white",
                        borderRadius: 5,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                      }
                    : {
                        borderWidth: 0,
                        width: 200,
                        borderColor: "white",
                        color: "white",
                        borderRadius: 5,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                      }
                }
                placeholderTextColor="white"
                editable={editable}
                defaultValue={userData?.data?.areaOfExpertise}
                value={areaOfExpertise}
                onChangeText={setAreaOfExpertise}
              />
            </View>
            <View style={{ display: "flex", alignItems: "center" }}>
              <Text style={styles.profileLabels}>Coaching Experience :</Text>

              <TextInput
                style={
                  editable
                    ? {
                        borderWidth: 1,
                        width: 200,
                        borderColor: "white",
                        color: "white",
                        borderRadius: 5,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                      }
                    : {
                        borderWidth: 0,
                        width: 200,
                        borderColor: "white",
                        color: "white",
                        borderRadius: 5,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                      }
                }
                placeholderTextColor="white"
                defaultValue={userData?.data?.coachingExperience}
                editable={editable}
                value={coachingExperience}
                onChangeText={setCoachingExperience}
              />
            </View>
            <View style={{ display: "flex", alignItems: "center" }}>
              <Text style={styles.profileLabels}>Mode of Training :</Text>
              <TextInput
                style={
                  editable
                    ? {
                        borderWidth: 1,
                        width: 200,
                        borderColor: "white",
                        color: "white",
                        borderRadius: 5,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                      }
                    : {
                        borderWidth: 0,
                        width: 200,
                        borderColor: "white",
                        color: "white",
                        borderRadius: 5,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                      }
                }
                placeholderTextColor="white"
                editable={editable}
                defaultValue={userData?.data?.modeOfTraining}
                value={modeOfTraining}
                onChangeText={setModeOfTraining}
              />
            </View>
            <View style={{ display: "flex", alignItems: "center" }}>
              <Text style={styles.profileLabels}>About yourself :</Text>
              <TextInput
                style={
                  editable
                    ? {
                        borderWidth: 1,
                        width: 200,
                        borderColor: "white",
                        color: "white",
                        borderRadius: 5,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                      }
                    : {
                        borderWidth: 0,
                        width: 200,
                        borderColor: "white",
                        color: "white",
                        borderRadius: 5,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                      }
                }
                placeholderTextColor="white"
                editable={editable}
                defaultValue={userData?.data?.about}
                value={about}
                onChangeText={setAbout}
              />
            </View>
          </View>
        </View>
        {editable ? (
          <Button
            title="Save Changes"
            style={{ marginTop: 20 }}
            onPress={saveDetails}
          />
        ) : null}
      </View>
    </ScrollView>
  );
}

export default showProfile;
