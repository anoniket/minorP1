import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
  Dimensions,
  Image,
} from "react-native";

let ScreenWidth = Dimensions.get("window").width;

import { LinearGradient } from "expo-linear-gradient";

import { auth, db } from "../firebase";
import { SocialIcon } from "react-native-elements";

import { selectUser, login, selectUserType } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";

import AthleteFlow from "../AthleteFlow";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    paddingTop: 0,
  },
  loginContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  loginNavigationButtons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  loginContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  loginContentTextInput: {
    height: 45,
    borderColor: "lightgray",
    borderWidth: 1,
    width: ScreenWidth - 20,
    marginVertical: 15,
    padding: 10,
    borderRadius: 5,
    color: "white",
  },
  loginContentTextInputFocus: {
    height: 45,
    borderColor: "lightblue",
    borderWidth: 1,
    width: ScreenWidth - 20,
    marginVertical: 15,
    padding: 10,
    borderRadius: 5,
    color: "white",
  },
  loginInputLabel: {
    position: "absolute",
    top: 0,
    left: 25,
    backgroundColor: "black",
    paddingHorizontal: 8,
    zIndex: 1,
    color: "white",
  },
});

function Screen5({ navigation }) {
  const [email, setEmail] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordFocus, setPasswordFocus] = useState(false);

  const user = useSelector(selectUser);
  const userType = useSelector(selectUserType);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user !== null) {
      if (userType === "coach") {
        navigation.navigate("CoachFlow");
      } else {
        navigation.navigate("AthleteFlow");
      }
    }
  }, [user]);

  const loginUser = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        if (userType === "coach") {
          db.collection("coach")
            .where("email", "==", email)
            .get()
            .then((snap) => {
              console.log("17");
              if (!snap.empty) {
                navigation.navigate("CoachFlow");
                dispatch(login(auth.user.email));
              } else {
                Alert.alert(
                  "Wrong Person",
                  "It seems you are not a coach, go back and please select athlete",
                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                    },
                    { text: "OK", onPress: () => console.log("OK Pressed") },
                  ],
                  { cancelable: false }
                );
              }
            });
        } else {
          db.collection("athletes")
            .where("email", "==", email)
            .get()
            .then((snap) => {
              console.log("18");
              if (!snap.empty) {
                navigation.navigate("AthleteFlow");
                dispatch(login(auth.user.email));
              } else {
                Alert.alert(
                  "Wrong Person",
                  "It seems you are not an athlete, go back and please select coach ",
                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                    },
                    { text: "OK", onPress: () => console.log("OK Pressed") },
                  ],
                  { cancelable: false }
                );
              }
            });
        }
      })
      .catch((e) => alert(e.message));
  };

  return (
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
            backgroundColor: "steelblue",
            padding: 5,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
          }}
        >
          <LinearGradient
            colors={["#3895CE", "#004872"]}
            start={[0, 0]}
            end={[1, 0]}
            style={{
              height: 28,
              width: 100,
              borderRadius: 8,
              paddingTop: 5,
            }}
            onPress={() => navigation.navigate("Screen5")}
          >
            <Text
              style={{
                color: "white",
                fontSize: 13,
                textAlign: "center",
              }}
            >
              Log In
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.navigate("Screen6")}
          style={{
            height: 28,
            width: 100,
            backgroundColor: "#141313",
            padding: 5,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 12,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "white",
            marginLeft: 12,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 13,
            }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 18,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "SF-Pro-Display-thin",
            color: "white",
          }}
        >
          Welcome to
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "SF-Pro-Display-medium",
            color: "white",
          }}
        >
          Training Essence
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "SF-Pro-Text-regular",
            color: "white",
            marginTop: 20,
          }}
        >
          Log In
        </Text>
      </View>

      <View style={styles.loginContent}>
        <View>
          {emailFocus ? (
            <Text style={styles.loginInputLabel}>Email</Text>
          ) : null}
          <TextInput
            style={
              emailFocus
                ? styles.loginContentTextInputFocus
                : styles.loginContentTextInput
            }
            placeholder={`${emailFocus ? "" : "Email"}`}
            placeholderTextColor="white"
            autoCapitalize="none"
            onFocus={() => {
              setEmailFocus(true);
              setPasswordFocus(false);
            }}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View>
          {passwordFocus ? (
            <Text style={styles.loginInputLabel}>Password</Text>
          ) : null}
          <TextInput
            style={
              passwordFocus
                ? styles.loginContentTextInputFocus
                : styles.loginContentTextInput
            }
            placeholder={`${passwordFocus ? "" : "Password"}`}
            placeholderTextColor="white"
            secureTextEntry
            onFocus={() => {
              setEmailFocus(false);
              setPasswordFocus(true);
            }}
            autoCompleteType="off"
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#24a0ed",
          height: 52,
          width: ScreenWidth - 16,
          marginTop: 15,
          marginBottom: 8,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
        }}
        onPress={loginUser}
      >
        <LinearGradient
          colors={["#3895CE", "#004872"]}
          start={[0, 0]}
          end={[1, 0]}
          style={{
            width: "100%",
            height: "100%",
            paddingTop: 10,
            borderRadius: 8,
          }}
          onPress={loginUser}
        >
          <View>
            <Text
              style={{
                color: "#E2E2E2",
                fontFamily: "SF-Pro-Display-regular",
                fontSize: 20,
                textAlign: "center",
              }}
            >
              Log in
            </Text>
          </View>
        </LinearGradient>
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
        onPress={loginUser}
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
            Log In with Google{" "}
          </Text>
          {/* <Icon
              style={{ marginLeft: "50%" }}
              name="chevron-right"
              type="font-awesome-5"
              color="white"
            /> */}
        </View>
      </TouchableOpacity>

      {/* <View
        style={{
          width: "50%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 24,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: "#707070",
            fontFamily: "SF-Pro-Display-thin",
          }}
        >
          New User?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Screen6")}>
          <Text
            style={{
              fontSize: 18,
              color: "#707070",
              fontFamily: "SF-Pro-Display-medium",
            }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

export default Screen5;
