import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button,
  Image,
  Alert,
  Dimensions
} from "react-native";
import { SocialIcon } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 

import { db, auth } from "../firebase";
import { selectUser, login, selectUserType } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";

import RadioGroup, { Radio } from "react-native-radio-input";
import DatePicker from "react-native-datepicker";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import * as firebase from "firebase";

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    paddingTop: 50,

  },
  registerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  registerNavigationButtons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  registerContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  imageContainer: {
    flexDirection: "row",
    marginVertical: 20,
  },
  image: {
    margin: 10,
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: "white",
  },
  registerContentTextInput: {
    height: 45,
          width: ScreenWidth - 16,
          marginTop: 15,
          paddingLeft : ScreenWidth/(ScreenWidth*0.08),
          marginBottom: 8,
          justifyContent: "center",
          color:'white',
          alignItems: "center",
          borderRadius: 10,
          backgroundColor: "#141313",
          borderWidth: 1,
          borderColor: "white",
  },
  registerContentTextInputFocus: {

    height: 45,
    paddingLeft : ScreenWidth/(ScreenWidth*0.08),
          width: ScreenWidth - 16,
          marginTop: 15,
          marginBottom: 8,
          color:'white',
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          backgroundColor: "#141313",
          borderWidth: 1,
          borderColor: "white",
  },
  registerInputLabel: {
    position: "absolute",
    top: 10,
    left: 30,
    backgroundColor: "black",
    paddingHorizontal: 8,
    zIndex: 1,
    color: "white",
  },
});



function Screen6({ navigation }) {
  const [name, setName] = useState("");
  const [nameFocus, setNameFocus] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneFocus, setPhoneFocus] = useState(false);
  const [address, setAddress] = useState("");
  const [addressFocus, setAddressFocus] = useState(false);
  const [email, setEmail] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [gender, setGender] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [dob, setDob] = useState(null);

  const [areaOfExpertise, setAreaOfExpertise] = useState(null);
  const [coachingExperience, setCoachingExperience] = useState(null);
  const [modeOfTraining, setModeOfTraining] = useState(null);
  const [about, setAbout] = useState(null);

  const user = useSelector(selectUser);
  const userType = useSelector(selectUserType);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user !== null) {
      if (userType === "coach") {
        navigation.navigate("sportsSelection");
      } else {
        navigation.navigate("Screen8");
      }
    }
  }, [user]);

  const getChecked = (value) => {
    // value = our checked value

    setGender(value);
  };

  const handleTrainingMode = (value) => {
    // value = our checked value
    setModeOfTraining(value);
  };

  const getImageFromCamera = async () => {
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
    const cameraRollPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    if (
      cameraPermission.status === "granted" &&
      cameraRollPermission.status === "granted"
    ) {
      let capturedImage = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (!capturedImage.cancelled) {
        setImageUrl(capturedImage.uri);
      }
    }
  };

  const getImageFromGallery = async () => {
    const cameraRollPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    if (cameraRollPermission.status === "granted") {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setImageUrl(result.uri);
      }
    }
  };

  const uploadImage = async (uri, imageName) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const childPath = `images/${email}`;

    const task = firebase.storage().ref().child(childPath).put(blob);

    const taskProgress = (snapshot) => {
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        if (userType === "athlete") {
          registerAthlete(snapshot);
        }
        if (userType === "coach") {
          registerCoach(snapshot);
        }
      });
    };

    const taskError = (snapshot) => {
      console.log(snapshot);
    };

    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };

  // const processImage = async (imageUri) => {
  //   let processedImage = await ImageManipulator.manipulate(
  //     imageUri,
  //     [{ resize: { width: 400 } }],
  //     { format: "png" }
  //   );
  //   console.log(processedImage);
  //   setImageUrl(processedImage.uri);
  // };

  const registerAthlete = async (snapshot) => {
    if (password === confirmPassword) {
      console.log("password matched");

      await auth
        .createUserWithEmailAndPassword(email, password)
        .then((auth) => {
          console.log("mail id created");
          navigation.navigate("Screen8");
          dispatch(login(auth.user.email));
          db.collection("athletes").add({
            name: name,
            phone: phone,
            email: email,
            gender: gender,
            dob: dob,
            address: address,
            listOfCoaches: [],
            imageUrl: snapshot,
          });
        })
        .catch((e) => setErrMessage(e.message));
    } else {
      setErrMessage("Password doesnt match, please try again");
    }
  };

  const registerCoach = async (snapshot) => {
    if (password === confirmPassword) {
      console.log("password matched");

      auth
        .createUserWithEmailAndPassword(email, password)
        .then((auth) => {
          console.log("mail id created");

          db.collection("coach").add({
            name: name,
            phone: phone,
            email: email,
            gender: gender,
            dob: dob,
            address: address,
            areaOfExpertise: areaOfExpertise,
            coachingExperience: coachingExperience,
            modeOfTraining: modeOfTraining,
            about: about,
            imageUrl: snapshot,
            sports: [],
          });
          navigation.navigate("sportsSelection");
          dispatch(login(auth.user.email));
          dispatch(setUserDetails(auth.user));
        })
        .catch((e) => setErrMessage(e.message));
    } else {
      setErrMessage("Password doesnt match, please try again");
    }
  };

  const registerUser = async () => {
    if (imageUrl) {
      uploadImage(imageUrl, name);
    } else {
      if (userType === "athlete") {
        if (password === confirmPassword) {
          console.log("password matched");

          await auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
              console.log("mail id created");
              navigation.navigate("Screen8");
              dispatch(login(auth.user.email));
              db.collection("athletes").add({
                name: name,
                phone: phone,
                email: email,
                gender: gender,
                dob: dob,
                address: address,
                listOfCoaches: [],
                imageUrl: null,
              });
            })
            .catch((e) => setErrMessage(e.message));
        } else {
          setErrMessage("Password doesnt match, please try again");
        }
      }
      if (userType === "coach") {
        if (password === confirmPassword) {
          console.log("password matched");

          auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
              console.log("mail id created");

              db.collection("coach").add({
                name: name,
                phone: phone,
                email: email,
                gender: gender,
                dob: dob,
                address: address,
                areaOfExpertise: areaOfExpertise,
                coachingExperience: coachingExperience,
                modeOfTraining: modeOfTraining,
                about: about,
                imageUrl: null,
                sports: [],
                listOfAthletes: [],
              });
              navigation.navigate("sportsSelection");
              dispatch(login(auth.user.email));
              dispatch(setUserDetails(auth.user));
            })
            .catch((e) => setErrMessage(e.message));
        } else {
          setErrMessage("Password doesnt match, please try again");
        }
      }
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            marginLeft: 16,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate("Screen5")}
            style={{
              height: 28,
              width: 100,
              backgroundColor: "#141313",
              padding: 5,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "white",

              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 13,
              }}
            >
              Log In
            </Text>
          </TouchableOpacity>

          <LinearGradient
            colors={["#3895CE", "#004872"]}
            start={[0, 0]}
            end={[1, 0]}
            style={{
              height: 28,
              width: 100,
              borderRadius: 8,
              marginLeft: 12,
            }}
            onPress={() => navigation.navigate("Screen5")}
          >
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => navigation.navigate("Screen6")}
              style={{
                height: 28,
                width: 100,
                backgroundColor: "steelblue",
                padding: 5,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 13,
                  fontFamily: "SF-Pro-Text-regular",
                }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 13,
          }}
        >
          <Text
            style={{
              fontSize: 25,
              fontFamily: "SF-Pro-Display-thin",
              color: "white",
            }}
          >
            Welcome to
          </Text>
          <Text
            style={{
              fontSize: 25,
              fontFamily: "SF-Pro-Display-medium",
              color: "white",
            }}
          >
            Training Essence
          </Text>
          <Text
            style={{
              fontSize: 25,
              fontFamily: "SF-Pro-Text-regular",
              color: "white",
              marginTop: 10,
            }}
          >
            Sign Up
          </Text>
        </View>

        <View style={styles.registerContainer}>
          <View style={styles.registerContent}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: imageUrl }} style={styles.image} />
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  marginLeft: 20,
                }}
              >
                <TouchableOpacity style={{ marginVertical: 15 }}
                  onPress={getImageFromCamera}>
                <AntDesign name="camera" size={24} color="white" />
                </TouchableOpacity>
                
                <TouchableOpacity onPress={getImageFromGallery} >
                <FontAwesome name="photo" size={24} color="white" />
                </TouchableOpacity>

              </View>
            </View>
            <View >
              {nameFocus ? (
                <Text style={styles.registerInputLabel}>Name</Text>
              ) : null}
              <TextInput
                style={
                  nameFocus
                    ? styles.registerContentTextInputFocus
                    : styles.registerContentTextInput
                }
                placeholder={`${nameFocus ? "" : "Name"}`}
                placeholderTextColor="white"
                onFocus={() => {
                  setNameFocus(true);
                  setPhoneFocus(false);
                  setAddressFocus(false);
                  setEmailFocus(false);
                  setPasswordFocus(false);
                  setConfirmPasswordFocus(false);
                }}
                value={name}
                onChangeText={setName}
              />
            </View>
            <View style = {{width: ScreenWidth - 16}}>
              <Text
                style={{
                  color: "white",
                  marginTop: 10,
                  marginLeft: 5,
                  marginBottom: -10,
                }}
              >
                Gender
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 0,
                }}
              >
                <RadioGroup
                  getChecked={getChecked}
                  RadioGroupStyle={{
                    flexDirection: "row",
                    marginTop: 15,
                    marginBottom: 15,
                  }}
                  RadioStyle={{
                    border: "1px solid lightgrey",
                    color: "white",
                    width: 125,
                    padding: 5,
                  }}
                  labelStyle={{ color: "white" }}
                  IconStyle={{
                    color: "steelblue",
                    borderColor: "steelblue",
                    fontSize: 8,
                  }}
                  coreStyle={{ color: "steelblue", fontSize: 10 }}
                >
                  <Radio iconName={"lens"} label={"Male"} value={"male"} />
                  <Radio iconName={"lens"} label={"Female"} value={"female"} />
                </RadioGroup>
              </View>
            </View>

            <View>
              {phoneFocus ? (
                <Text style={styles.registerInputLabel}>Phone</Text>
              ) : null}
              <TextInput
                style={
                  phoneFocus
                    ? styles.registerContentTextInputFocus
                    : styles.registerContentTextInput
                }
                placeholder={`${phoneFocus ? "" : "Phone"}`}
                placeholderTextColor="white"
                onFocus={() => {
                  setNameFocus(false);
                  setPhoneFocus(true);
                  setAddressFocus(false);
                  setEmailFocus(false);
                  setPasswordFocus(false);
                  setConfirmPasswordFocus(false);
                }}
                value={phone}
                onChangeText={setPhone}
              />
            </View>
            <View>
              <DatePicker
                style={{ width: ScreenWidth - 16, marginVertical: 10 }}
                date={dob}
                mode="date"
                placeholder="Select Date of Birth"
                format="DD-MM-YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: "absolute",
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 36,
                    borderRadius: 5,
                    backgroundColor: "#000000",
                    color: "white",
                  },
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {
                  setDob(date);
                }}
              />
            </View>
            <View>
              {addressFocus ? (
                <Text style={styles.registerInputLabel}>
                  Address (optional)
                </Text>
              ) : null}
              <TextInput
                style={
                  addressFocus
                    ? styles.registerContentTextInputFocus
                    : styles.registerContentTextInput
                }
                placeholder={`${addressFocus ? "" : "Address "}`}
                placeholderTextColor="white"
                onFocus={() => {
                  setNameFocus(false);
                  setPhoneFocus(false);
                  setAddressFocus(true);
                  setEmailFocus(false);
                  setPasswordFocus(false);
                  setConfirmPasswordFocus(false);
                }}
                value={address}
                onChangeText={setAddress}
              />
            </View>
            <View>
              {emailFocus ? (
                <Text style={styles.registerInputLabel}>Email</Text>
              ) : null}
              <TextInput
                style={
                  emailFocus
                    ? styles.registerContentTextInputFocus
                    : styles.registerContentTextInput
                }
                placeholder={`${emailFocus ? "" : "Email"}`}
                placeholderTextColor="white"
                autoCapitalize="none"
                onFocus={() => {
                  setNameFocus(false);
                  setPhoneFocus(false);
                  setAddressFocus(false);
                  setEmailFocus(true);
                  setPasswordFocus(false);
                  setConfirmPasswordFocus(false);
                }}
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View>
              {passwordFocus ? (
                <Text style={styles.registerInputLabel}>Password</Text>
              ) : null}
              <TextInput
                style={
                  passwordFocus
                    ? styles.registerContentTextInputFocus
                    : styles.registerContentTextInput
                }
                placeholder={`${passwordFocus ? "" : "Password"}`}
                placeholderTextColor="white"
                secureTextEntry
                onFocus={() => {
                  setNameFocus(false);
                  setPhoneFocus(false);
                  setAddressFocus(false);
                  setEmailFocus(false);
                  setPasswordFocus(true);
                  setConfirmPasswordFocus(false);
                }}
                autoCompleteType="off"
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <View>
              {confirmPasswordFocus ? (
                <Text style={styles.registerInputLabel}>Confirm Password</Text>
              ) : null}
              <TextInput
                style={
                  confirmPasswordFocus
                    ? styles.registerContentTextInputFocus
                    : styles.registerContentTextInput
                }
                placeholder={`${
                  confirmPasswordFocus ? "" : "Confirm Password"
                }`}
                placeholderTextColor="white"
                secureTextEntry
                onFocus={() => {
                  setNameFocus(false);
                  setPhoneFocus(false);
                  setAddressFocus(false);
                  setEmailFocus(false);
                  setPasswordFocus(false);
                  setConfirmPasswordFocus(true);
                }}
                autoCompleteType="off"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>
            {userType === "coach" && (
              <View>
                <View>
                  <Text style={{ color: "white" }}>Area of Expertise</Text>
                  <TextInput
                    style={styles.registerContentTextInput}
                    value={areaOfExpertise}
                    onChangeText={setAreaOfExpertise}
                  />
                </View>

                <View>
                  <Text style={{ color: "white" }}>Coaching Experience</Text>
                  <TextInput
                    style={styles.registerContentTextInput}
                    value={coachingExperience}
                    onChangeText={setCoachingExperience}
                  />
                </View>

                <View>
                  <Text
                    style={{
                      color: "white",
                      marginTop: 10,
                      marginLeft: 5,
                      marginBottom: -10,
                    }}
                  >
                    Mode of Training
                  </Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 0,
                    }}
                  >
                    <RadioGroup
                      getChecked={handleTrainingMode}
                      RadioGroupStyle={{
                        flexDirection: "row",
                        marginTop: 15,
                        marginBottom: 15,
                      }}
                      RadioStyle={{
                        border: "1px solid lightgrey",
                        color: "white",
                        width: 85,
                        padding: 5,
                      }}
                      labelStyle={{ color: "white" }}
                      IconStyle={{
                        color: "steelblue",
                        borderColor: "steelblue",
                        fontSize: 8,
                      }}
                      coreStyle={{ color: "steelblue", fontSize: 10 }}
                    >
                      <Radio
                        iconName={"lens"}
                        label={"Online"}
                        value={"online"}
                      />
                      <Radio
                        iconName={"lens"}
                        label={"Offline"}
                        value={"offline"}
                      />
                      <Radio iconName={"lens"} label={"Both"} value={"both"} />
                    </RadioGroup>
                  </View>
                </View>
                <View>
                  <Text style={{ color: "white" }}>About Yourself</Text>
                  <TextInput
                    style={styles.registerContentTextInput}
                    value={about}
                    onChangeText={setAbout}
                  />
                </View>
              </View>
            )}
            <View>
              <Text style={{ color: "white" }}>
                {errMessage ? errMessage : null}
              </Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity
          style={{
            height: 52,
          width: ScreenWidth - 16,
          marginTop: 15,
          marginBottom: 8,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          backgroundColor: "#141313",
          borderWidth: 1,
          borderColor: "white",
          }}
          onPress={registerUser}
        >
          <View>
            <Text
              style={{
                color: "#E2E2E2",
                fontFamily: "SF-Pro-Display-regular",
                fontSize: 20,
              }}
            >
              Register
            </Text>
          </View>
        </TouchableOpacity>

        

        <TouchableOpacity
        style={{
          height: 52,
          width: ScreenWidth - 16,
          marginTop: 15,
          marginBottom: 8,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          backgroundColor: "#141313",
          borderWidth: 1,
          borderColor: "white",
        }}
        //onPress={loginUser}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: 26,
              height: 26,
            }}
            source={require("../assets/googleIcon.png")}
          />
          <Text
            style={{
              color: "white",
              fontSize: 20,
              textAlign: "center",
              marginLeft: 15,
            }}
          >
            Sign In with Google{" "}
          </Text>
          {/* <Icon
              style={{ marginLeft: "50%" }}
              name="chevron-right"
              type="font-awesome-5"
              color="white"
            /> */}
        </View>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default Screen6;
