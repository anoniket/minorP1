import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  TouchableOpacity,
  BackHandler,
  Dimensions,
  Modal,
  TouchableHighlight,
  TextInput,
  Image,
} from "react-native";

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

import { LinearGradient } from "expo-linear-gradient";

import { NativeModules } from "react-native";

import { Icon, Slider } from "react-native-elements";
import { WeekCalendar } from "react-native-calendars";

import { useDispatch, useSelector } from "react-redux";
import {
  setDbID,
  selectDbId,
  selectUser,
  setUserData,
  logout,
} from "../features/userSlice";

import { auth, db } from "../firebase";

import { useFocusEffect } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 0,
    paddingTop: 20,
    minHeight: 600,
    position: "relative",
  },
  headerOptions: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 15,
    right: 16,
  },

  addButtonText: {
    fontFamily: "SF-Pro-Display-regular",
    fontSize: 40,
    color: "white",
  },
  calendarContainer: {
    position: "absolute",
    alignSelf: "stretch",
    maxHeight: 100,
    top: 100,
    zIndex: 1,
    position: "absolute",
    backgroundColor: "black",
  },
  workoutContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginLeft: 20,
    marginTop: 10,
  },
  workoutTouchabaleOpacity: {
    opacity: 1,
    borderColor: "steelblue",
    borderWidth: 2,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 5,
    borderRadius: 10,
  },
  workoutContentView: {
    width: 150,
    height: 130,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    borderRadius: 10,
  },
  workoutName: {
    color: "white",
    fontSize: 20,
    fontFamily: "SF-Pro-Display-regular",
    position: "absolute",
    bottom: 50,
    marginHorizontal: 32,
    width: "80%",
    textAlign: "center",
  },
  workoutDate: {
    color: "white",
    fontSize: 20,
    fontFamily: "SF-Pro-Display-regular",
    position: "absolute",
    bottom: 10,
    marginHorizontal: 32,
    width: "80%",
    textAlign: "center",
  },

  workoutList: {
    marginTop: 10,
    marginBottom: 100,
  },
  cards: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
    marginTop: 50,
  },
  cardTouchabaleOpacity: {
    opacity: 1,
    // borderColor: "steelblue",
    borderWidth: 2,
    marginBottom: 10,
    
    marginTop: 30,
    
    borderRadius: 10,
    height: 150,
    width: ScreenWidth - 50,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    marginLeft : ScreenWidth *0.05
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "black",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: ScreenWidth,
    height: ScreenHeight,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  workout_view: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    
    marginTop: 10,
  },
  workout_cardContainer: {
    display: "flex",
    width: ScreenWidth - 20,
    flexDirection: "row",
  },
  workout_image: {
    width: (ScreenWidth - 20)/3,
    height: 130,
    backgroundColor: "#333",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  workout_card: {
    opacity: 1,
    borderColor: "white",
    borderWidth: 2,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 5,
    borderRadius: 10,
  },
  workout_cardContent: {
    width: (ScreenWidth - 20)/1.5,
    height: 130,
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  workout_name: {
    color: "white",
    fontSize: 17,
    fontFamily: "SF-Pro-Display-regular",
    marginHorizontal: 32,
    width: "80%",
    textAlign: "center",
  },
  workout_type: {
    color: "#3895CE",
    fontSize: 24,
    fontFamily: "SF-Pro-Display-regular",
    fontWeight: 'bold',
    marginTop: 12,
    marginHorizontal: 32,
    width: "80%",
    textAlign: "center",
  },
  workout_assignDate: {
    color: "white",
    fontSize: 15,
    fontFamily: "SF-Pro-Display-regular",
    marginTop: 10,
    marginHorizontal: 32,
    width: "80%",
    textAlign: "center",
  },
});

function Home({ route, navigation }) {
  const [workouts, setWorkouts] = useState([]);
  const [requestDate, setRequestDate] = useState(formatDate());
  const user = useSelector(selectUser);
  const userId = useSelector(selectDbId);
  // UserID = EvEuBZQ82kXkJHe6gqTx
  const [userDetails, setUserDetails] = useState(null);
  const [chats, setChats] = useState([]);
  const [coachDetails, setCoachDetails] = useState(null);

  const [athlete_id, setAthleteId] = useState(null);
  const [type, setType] = useState(null);
  const dispatch = useDispatch();
  const [sleep, setSleep] = useState(5);
  const [diet, setDiet] = useState("");
  const [modal, setModal] = useState(false);
  const [nutrition, setNutrition] = useState("");
  const [nutritionModal, setNutritionModal] = useState(false);
  const [soreness, setSoreness] = useState(0);

  const [workout, setWorkout] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const [dailySubmit, setDailySubmit] = useState(false);

  console.log({ workout });
  const tod_date = new Date()

  function formatDate() {
    var d = new Date(),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

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
    const tod_date = new Date()
    console.log(`Today's date is : ${tod_date}`)
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
        console.log("14");
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, " => ", doc.data());
          setUserDetails({
            id: doc.id,
            data: doc.data(),
          });
          dispatch(
            setUserData({
              id: doc.id,
              data: doc.data(),
            })
          );
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });

    const data = [];
    db.collection("coach")
      .get()
      .then((snapshot) => {
        console.log("15");
        snapshot.docs.forEach((item) => {
          let currentID = item.id;
          let appObj = { ...item.data(), ["id"]: currentID };
          data.push(appObj);
        });
        setCoachDetails(data);
      });

    setSuccessMessage("");
  }, [user]);

  useEffect(() => {
    if (athlete_id) {
      db.collection("athletes")
        .doc(athlete_id)
        .get()
        .then(function (doc) {
          console.log("16");
          if (doc.exists) {
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
  }, [athlete_id]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", (e) => {
      // Prevent default behavior
      e.preventDefault();

      alert("Default behavior prevented");
      navigation.popToTop();
      console.log("Tab Pressed");
      // Do something manually
      // ...
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (userDetails) {
      db
        .collection("workouts")
        .where("assignDate", "==", requestDate)
        .where("assignedTo_id", "==", userDetails.id)
        .onSnapshot((snapshot) => {
          setWorkouts(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        })
       
      }
   
  }, [requestDate]);

  useEffect(() => {
    if (userDetails) {
      db
        .collection("workouts")
        .where("assignDate", "==", requestDate)
        .where("assignedTo_id", "==", userDetails.id)
        .onSnapshot((snapshot) => {
          setWorkouts(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        })

        db.collection("sleep")
        .where('date', '==', requestDate)
        .where('id', '==', userDetails.id)
        .get()
        .then(snap => {
          if(!snap.empty){
            setDailySubmit(true)
          }
  
          else{
            setDailySubmit(false)
          }
        })
      }
       
      }, [userDetails]);

  useEffect(() => {
    if (userDetails) {
      db.collection("sleep")
        .where("date", "==", requestDate)
        .where("id", "==", userDetails.id)
        .get()
        .then((snapshot) => {
          snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            console.log({ data, id });
            setNutrition(data?.nutrition);
            setSleep(data?.sleep);
            setSoreness(data?.soreness);
          });
        })
        .catch((e) => console.log(e));
    }
  }, [requestDate]);

  useEffect(() => {
    console.log('inf loop?')
    if (userDetails) {
      db.collection("sleep")
        .where("date", "==", requestDate)
        .where("id", "==", userDetails.id)
        .get()
        .then((snapshot) => {
          snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            console.log({ data, id });
            setNutrition(data?.nutrition);
            setSleep(data?.sleep);
            setSoreness(data?.soreness);
          });
        })
        .catch((e) => console.log(e));
    }
  }, [userDetails]);

  const handleLogout = () => {
    auth.signOut();
    dispatch(logout());
    NativeModules.DevSettings.reload();
  };

  const toggleModal = (item) => {
    setWorkout(item);
    setModal(true);
  };

  const saveDetails = () => {
    db.collection("sleep")
      .where("date", "==", requestDate)
      .where("id", "==", userDetails.id)
      .get()
      .then((snap) => {
        var doc_id;
        snap.docs.forEach((item) => {
          doc_id = item.id;
        });

        if (!snap.empty) {
          // work with documents

          db.collection("sleep")
            .doc(doc_id)
            .update({
              id: userDetails.id,
              sleep: sleep,
              soreness: soreness,
              nutrition: nutrition,
              date: requestDate,
            })
            .then(() => setSuccessMessage("Current day!"))
            .catch(function (error) {
              console.log("Error getting documents: ", error);
            });
        } else {
          // Create some documents
          db.collection("sleep")
            .add({
              id: userDetails.id,
              sleep: sleep,
              soreness: soreness,
              nutrition: nutrition,
              date: requestDate,
            })
            .then(() => setSuccessMessage("Successfully added!"))
            .catch(function (error) {
              console.log("Error getting documents: ", error);
            });
        }
      });


  };


  //Do something like this to fix dates

  // useEffect(() => {
  //   const tod_date = new Date()
  //   const req_date = new Date(requestDate)
  //   console.log(`Request date is ${requestDate} and current date is ${tod_date} and ${req_date.getDate() === tod_date.getDate()}`)

  //   if (req_date.getDate() === tod_date.getDate()){
  //     setDailySubmit(false)
  //   }
  // }, []);

  const check_date = (re_date) => {
    const tod_date = new Date()
    const req_date = new Date(re_date)
    console.log(`Request date is ${requestDate} and current date is ${formatDate(tod_date)} and ${req_date.getDate() === tod_date.getDate()}`)

    if (req_date.getDate() === tod_date.getDate()){
      return true;
    }

    else {
      return false;
    }
  }

  const check_if_date_higher = (re_date) => {
    const tod_date = new Date()
    const req_date2 = new Date(re_date)
   
    if(re_date > formatDate(tod_date.getDate())){
      
      console.log(`Request date is greater that current date`)
      return true;
    }

    else {
      console.log(`Request date is lesser`)
      return false;
    }
  }
  
  // Checking if the request date and diet details have already been obtained
  useEffect(() => {
    if(userDetails){
    db.collection("sleep")
      .where('date', '==', requestDate)
      .where('id', '==', userDetails.id)
      .get()
      .then(snap => {
        if(!snap.empty){
          setDailySubmit(true)
        }

        else{
          setDailySubmit(false)
        }
      })
    }
  },[requestDate])

  let col = "green";

  return (
    <View style={styles.container}>
      {type === "coach" && (
        <TouchableOpacity
          onPress={() => navigation.navigate("CoachHomeScreen")}
          style={{
            position: "absolute",
            left: 25,
            top: 30,
          }}
        >
          <Icon name="chevron-left" type="font-awesome-5" color="white" />
        </TouchableOpacity>
      )}
      <Text
        style={{
          color: "white",
          textAlign: "center",
          fontSize: 22,
          paddingBottom: 60,
        }}
      >
        Home
      </Text>

      {type !== "coach" && (
        <View style={styles.headerOptions}>
          {/* <TouchableOpacity
            onPress={() => navigation.navigate("AthleteWorkoutList")}
            style={{ marginRight: 25, marginTop: -10 }}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity> */}

          <TouchableOpacity onPress={handleLogout}>
            <Icon name="sign-out-alt" type="font-awesome-5" color="white" />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.calendarContainer}>
        <WeekCalendar
          // style={{
          //   backgroundColor: "black",
          //   borderRadius: 100,
          //   marked: true,
          //   dotColor: "red",
          //   color: "white",
          // }}
          firstDay={1}
          current={new Date()}
          onDayPress={(day) => setRequestDate(day.dateString)}
          markingType={"custom"}
          markedDates={{
            [requestDate]: {
              customStyles: {
                container: {
                  backgroundColor: 'black',
                  borderWidth : 2,
                  borderColor : '#004872'
                },
                text: {
                  color: "white",
                  fontWeight: "bold",
                },
              },
            },
          }}
          theme={{
            calendarBackground: "black",
            textSectionTitleColor: "white",
            dayTextColor: "white",
            todayTextColor: "steelblue",
            selectedDayTextColor: "red",
            monthTextColor: "white",
            selectedDayBackgroundColor: "#333248",
            selectedDotColor: "#ffffff",
          }}
          // theme={{
          //   backgroundColor: "#ffffff",
          //   calendarBackground: "#ffffff",
          //   textSectionTitleColor: "#b6c1cd",
          //   textSectionTitleDisabledColor: "#d9e1e8",
          //   selectedDayBackgroundColor: "#00adf5",
          //   selectedDayTextColor: "#ffffff",
          //   todayTextColor: "#00adf5",
          //   dayTextColor: "#2d4150",
          //   textDisabledColor: "#d9e1e8",
          //   dotColor: "#00adf5",
          //   selectedDotColor: "#ffffff",
          //   arrowColor: "orange",
          //   disabledArrowColor: "#d9e1e8",
          //   monthTextColor: "blue",
          //   indicatorColor: "blue",
          //   textDayFontFamily: "monospace",
          //   textMonthFontFamily: "monospace",
          //   textDayHeaderFontFamily: "monospace",
          //   textDayFontWeight: "300",
          //   textMonthFontWeight: "bold",
          //   textDayHeaderFontWeight: "300",
          //   textDayFontSize: 16,
          //   textMonthFontSize: 16,
          //   textDayHeaderFontSize: 16,
          // }}
        />
      </View>
      
      
      <ScrollView>
        <View>
        {dailySubmit || !check_date(requestDate)?null:<View>
          <View
            style={{
              flex: 1,
              width: ScreenWidth - 50,
              alignItems: "stretch",
              justifyContent: "center",
              position: "relative",
              marginTop: 120,
              marginLeft: 30,
            }}
          >
            
            <Text style={{ color: "white", fontSize: 17, marginBottom: 7 }}>Sleep - {sleep} hrs</Text>
            <Slider
              value={sleep}
              onValueChange={(value) => setSleep(value)}
              maximumValue={24}
              minimumValue={0}
              step={1}
              disabled={type === "coach" ? true : false}
              trackStyle={{ height: 5, backgroundColor: "transparent" }}
              thumbStyle={{
                height: 20,
                width: 20,
                backgroundColor: "transparent",
              }}
              thumbProps={{
                children: (
                  <Icon
                    name="moon-o"
                    type="font-awesome"
                    size={15}
                    reverse
                    containerStyle={{ bottom: 15, right: 20, borderWidth: 1, borderColor: 'white' }}
                    color="black"
                  />
                ),
              }}
            />
            
          </View>

          <View
            style={{
              flex: 1,
              width: ScreenWidth - 50,
              alignItems: "stretch",
              justifyContent: "center",
              position: "relative",
              marginTop: 20,
              marginLeft: 30,
            }}
          >
            <Text style={{ color: "white", fontSize: 17, marginBottom:7 }}>Pain and Soreness</Text>
            <Slider
              value={soreness}
              onValueChange={(value) => setSoreness(value)}
              maximumValue={100}
              minimumValue={0}
              step={10}
              disabled={type === "coach" ? true : false}
              trackStyle={{ height: 5, backgroundColor: "transparent" }}
              thumbStyle={{
                height: 20,
                width: 20,
                backgroundColor: "transparent",
              }}
              thumbProps={{
                children: (
                  <Icon
                    name="bolt"
                    type="font-awesome"
                    size={15}
                    reverse
                    containerStyle={{ bottom: 15, right: 20, borderWidth: 1, borderColor: 'white' }}
                    color="black"
                  />
                ),
              }}
            />
            <Text
              style={{
                color: "white",
                position: "absolute",
                top: 15,
                right: 10,
              }}
            >
              {soreness}%
            </Text>
          </View>

          <View style={styles.cardTouchabaleOpacity}>
            <Text style={{ color: "white", fontSize: 17, marginBottom: 10 }}>
              Diet and Nutrition
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderRadius: 12,
                borderColor: "white",
                color: "white",
                paddingHorizontal: 10,
                width: ScreenWidth - 50,
                marginBottom: 10,
                
              }}
              editable={type === "coach" ? false : true}
              defaultValue={nutrition}
              multiline={true}
              underlineColorAndroid="transparent"
              numberOfLines={4}
              onChangeText={(text) => setNutrition(text)}
              value={nutrition}
              placeholderTextColor="white"
            />
          </View>
          {successMessage !== null ? (
            <Text
              style={{
                color: "lightgreen",
                marginTop: -20,
                marginBottom: 10,
                textAlign: "center",
              }}
            >
              {successMessage}
            </Text>
          ) : null}
          {type !== "coach" && (
            <TouchableOpacity
              style={{
                backgroundColor: "#24a0ed",
                height: 52,
                width: ScreenWidth - 16,
                marginBottom: 8,
                marginLeft : 8,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
              onPress={() => {saveDetails(); setDailySubmit(true)}}
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
                onPress={saveDetails}
              >
                <View>
                  <Text
                    style={{
                      color: "#E2E2E2",
                      fontFamily: "SF-Pro-Display-regular",
                      fontSize: 20,
                      textAlign: "center",
                      width: ScreenWidth - 16
                    }}
                  >
                    Submit
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          )}
          </View>}


        </View>
        <Text style = {{color: 'white', marginTop: ScreenHeight/14, fontSize: 16, borderTopWidth: 1, borderColor:'white', paddingTop: 30, fontWeight : 'bold'}}> This Day's Workouts </Text>
        <View style={styles.workoutList}>
          {workouts?.map((item) => (
            <View style={styles.workout_view} key={item.id}>
              <TouchableOpacity
                style={styles.workout_card}
                onPress={() => toggleModal(item)}
              >
                <View style={styles.workout_cardContainer}>
                  <Image
                    style={styles.workout_image}
                    source={{
                      uri:
                        (item.data?.type === "Run" &&
                          "https://images.pexels.com/photos/694587/pexels-photo-694587.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260") ||
                        (item.data?.type === "Swim" &&
                          "https://images.pexels.com/photos/1415810/pexels-photo-1415810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") ||
                        (item.data?.type === "Bike" &&
                          "https://images.pexels.com/photos/38296/cycling-bicycle-riding-sport-38296.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") ||
                        (item.data?.type === "Triathlon" &&
                          "https://images.pexels.com/photos/5687488/pexels-photo-5687488.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") ||
                        "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzF8fGZpdG5lc3N8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                    }}
                  />
                  <View style={styles.workout_cardContent}>
                    <Text style={styles.workout_name}>
                      {item.data?.workoutName}
                    </Text>
                    <Text style={styles.workout_type}>
                      {item.data?.type ? item.data?.type : null}
                    </Text>
                    <Text style={styles.workout_assignDate}>
                      {item.data?.assignDate}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* If submitted or not that day */}

        {(dailySubmit || !check_date(requestDate)) && !check_if_date_higher(requestDate)?<View>
          <View
            style={{
              flex: 1,
              width: ScreenWidth - 50,
              alignItems: "stretch",
              justifyContent: "center",
              position: "relative",

              marginLeft: 30,
            }}
          >
            <Text style={{ color: "white", fontSize: 17, marginBottom: 7 }}>Request Date</Text>
            <Text style={{ color: "white", fontSize: 17, marginBottom: 7 }}>Sleep - {sleep} hrs</Text>
            <Slider
              value={sleep}
              onValueChange={(value) => setSleep(value)}
              maximumValue={24}
              minimumValue={0}
              step={1}
              disabled={type === "coach" ? true : true}
              trackStyle={{ height: 5, backgroundColor: "transparent" }}
              thumbStyle={{
                height: 20,
                width: 20,
                backgroundColor: "transparent",
              }}
              thumbProps={{
                children: (
                  <Icon
                    name="moon-o"
                    type="font-awesome"
                    size={15}
                    reverse
                    containerStyle={{ bottom: 15, right: 20, borderWidth: 1, borderColor: 'white' }}
                    color="black"
                  />
                ),
              }}
            />
            
          </View>

          <View
            style={{
              flex: 1,
              width: ScreenWidth - 50,
              alignItems: "stretch",
              justifyContent: "center",
              position: "relative",
              marginTop: 20,
              marginLeft: 30,
            }}
          >
            <Text style={{ color: "white", fontSize: 17, marginBottom:7 }}>Pain and Soreness</Text>
            <Slider
              value={soreness}
              onValueChange={(value) => setSoreness(value)}
              maximumValue={100}
              minimumValue={0}
              step={10}
              disabled={type === "coach" ? true : true}
              trackStyle={{ height: 5, backgroundColor: "transparent" }}
              thumbStyle={{
                height: 20,
                width: 20,
                backgroundColor: "transparent",
              }}
              thumbProps={{
                children: (
                  <Icon
                    name="bolt"
                    type="font-awesome"
                    size={15}
                    reverse
                    containerStyle={{ bottom: 15, right: 20, borderWidth: 1, borderColor: 'white' }}
                    color="black"
                  />
                ),
              }}
            />
            <Text
              style={{
                color: "white",
                position: "absolute",
                top: 15,
                right: 10,
              }}
            >
              {soreness}%
            </Text>
          </View>

          <View style={styles.cardTouchabaleOpacity}>
            <Text style={{ color: "white", fontSize: 17, marginBottom: 10 }}>
              Diet and Nutrition : {nutrition}
            </Text>
            
          </View>
          
          </View>:null}
      </ScrollView>
      
      <Modal animationType="slide" transparent={true} visible={modal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.body}>
              <Text style={{ color: "white", marginBottom: 20, fontSize: 25 }}>
                {workout?.data.workoutName}
              </Text>
            </View>

            <View>
              {workout?.data.type === "Run" && (
                <View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 5,
                    }}
                  >
                    <Text
                      style={{ color: "white", minWidth: 250, fontSize: 19 }}
                    >
                      Duration
                    </Text>
                    <Text style={{ color: "white" }}>
                      {workout?.data.duration}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 5,
                    }}
                  >
                    <Text
                      style={{ color: "white", minWidth: 250, fontSize: 19 }}
                    >
                      Distance
                    </Text>
                    <Text style={{ color: "white" }}>
                      {workout?.data.distance}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 5,
                    }}
                  >
                    <Text
                      style={{ color: "white", minWidth: 250, fontSize: 19 }}
                    >
                      Average Pace
                    </Text>
                    <Text style={{ color: "white" }}>
                      {workout?.data.avgPace}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 5,
                    }}
                  >
                    <Text
                      style={{ color: "white", minWidth: 250, fontSize: 19 }}
                    >
                      Calories
                    </Text>
                    <Text style={{ color: "white" }}>
                      {workout?.data.calories}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 5,
                    }}
                  >
                    <Text
                      style={{ color: "white", minWidth: 250, fontSize: 19 }}
                    >
                      Elevation
                    </Text>
                    <Text style={{ color: "white" }}>
                      {workout?.data.elevation}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 5,
                    }}
                  >
                    <Text
                      style={{ color: "white", minWidth: 250, fontSize: 19 }}
                    >
                      TSS
                    </Text>
                    <Text style={{ color: "white" }}>{workout?.data.tss}</Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 5,
                    }}
                  >
                    <Text
                      style={{ color: "white", minWidth: 250, fontSize: 19 }}
                    >
                      IF
                    </Text>
                    <Text style={{ color: "white" }}>{workout?.data.If}</Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 5,
                    }}
                  >
                    <Text
                      style={{ color: "white", minWidth: 250, fontSize: 19 }}
                    >
                      Running Time
                    </Text>
                    <Text style={{ color: "white" }}>
                      {workout?.data.runningTime}
                    </Text>
                  </View>

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 5,
                    }}
                  >
                    <Text
                      style={{ color: "white", minWidth: 250, fontSize: 19 }}
                    >
                      Average Pace
                    </Text>
                    <Text style={{ color: "white" }}>
                      {workout?.data.avgPace1}
                    </Text>
                  </View>

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 5,
                    }}
                  >
                    <Text
                      style={{ color: "white", minWidth: 250, fontSize: 19 }}
                    >
                      Maximum Pace
                    </Text>
                    <Text style={{ color: "white" }}>
                      {workout?.data.maxPace}
                    </Text>
                  </View>

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 5,
                    }}
                  >
                    <Text
                      style={{ color: "white", minWidth: 250, fontSize: 19 }}
                    >
                      Minimum Heart Rate
                    </Text>
                    <Text style={{ color: "white" }}>
                      {workout?.data.minHeartRate}
                    </Text>
                  </View>

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 5,
                    }}
                  >
                    <Text
                      style={{ color: "white", minWidth: 250, fontSize: 19 }}
                    >
                      Average Heart Rate
                    </Text>
                    <Text style={{ color: "white" }}>
                      {workout?.data.avgHeartRate}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 5,
                    }}
                  >
                    <Text
                      style={{ color: "white", minWidth: 250, fontSize: 19 }}
                    >
                      Maximum Heart Rate
                    </Text>
                    <Text style={{ color: "white" }}>
                      {workout?.data.maxHeartRate}
                    </Text>
                  </View>
                </View>
              )}
              {workout?.data.type === "Swim" && (
                <View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 5,
                    }}
                  >
                    <Text
                      style={{ color: "white", minWidth: 250, fontSize: 19 }}
                    >
                      Duration
                    </Text>
                    <Text style={{ color: "white" }}>
                      {workout?.data.duration}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 5,
                    }}
                  >
                    <Text
                      style={{ color: "white", minWidth: 250, fontSize: 19 }}
                    >
                      Distance
                    </Text>
                    <Text style={{ color: "white" }}>
                      {workout?.data.distance}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 5,
                    }}
                  >
                    <Text
                      style={{ color: "white", minWidth: 250, fontSize: 19 }}
                    >
                      Average Pace
                    </Text>
                    <Text style={{ color: "white" }}>
                      {workout?.data.avgPace}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 5,
                    }}
                  >
                    <Text
                      style={{ color: "white", minWidth: 250, fontSize: 19 }}
                    >
                      Calories
                    </Text>
                    <Text style={{ color: "white" }}>
                      {workout?.data.calories}
                    </Text>
                  </View>

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 5,
                    }}
                  >
                    <Text
                      style={{ color: "white", minWidth: 250, fontSize: 19 }}
                    >
                      TSS
                    </Text>
                    <Text style={{ color: "white" }}>{workout?.data.tss}</Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 5,
                    }}
                  >
                    <Text
                      style={{ color: "white", minWidth: 250, fontSize: 19 }}
                    >
                      IF
                    </Text>
                    <Text style={{ color: "white" }}>{workout?.data.If}</Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 5,
                    }}
                  >
                    <Text
                      style={{ color: "white", minWidth: 250, fontSize: 19 }}
                    >
                      Swimming Time
                    </Text>
                    <Text style={{ color: "white" }}>
                      {workout?.data.swimmingTime}
                    </Text>
                  </View>

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 5,
                    }}
                  >
                    <Text
                      style={{ color: "white", minWidth: 250, fontSize: 19 }}
                    >
                      Minimum Heart Rate
                    </Text>
                    <Text style={{ color: "white" }}>
                      {workout?.data.minHeartRate}
                    </Text>
                  </View>

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 5,
                    }}
                  >
                    <Text
                      style={{ color: "white", minWidth: 250, fontSize: 19 }}
                    >
                      Average Heart Rate
                    </Text>
                    <Text style={{ color: "white" }}>
                      {workout?.data.avgHeartRate}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 5,
                    }}
                  >
                    <Text
                      style={{ color: "white", minWidth: 250, fontSize: 19 }}
                    >
                      Maximum Heart Rate
                    </Text>
                    <Text style={{ color: "white" }}>
                      {workout?.data.maxHeartRate}
                    </Text>
                  </View>
                </View>
              )}
              {workout?.data.type === "Bike" && (
                <View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 5,
                    }}
                  >
                    <Text
                      style={{ color: "white", minWidth: 250, fontSize: 19 }}
                    >
                      Duration
                    </Text>
                    <Text style={{ color: "white" }}>
                      {workout?.data.duration}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 5,
                    }}
                  >
                    <Text
                      style={{ color: "white", minWidth: 250, fontSize: 19 }}
                    >
                      Distance
                    </Text>
                    <Text style={{ color: "white" }}>
                      {workout?.data.distance}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 5,
                    }}
                  >
                    <Text
                      style={{ color: "white", minWidth: 250, fontSize: 19 }}
                    >
                      Average Pace
                    </Text>
                    <Text style={{ color: "white" }}>
                      {workout?.data.avgPace}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 5,
                    }}
                  >
                    <Text
                      style={{ color: "white", minWidth: 250, fontSize: 19 }}
                    >
                      Calories
                    </Text>
                    <Text style={{ color: "white" }}>
                      {workout?.data.calories}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 5,
                    }}
                  >
                    <Text
                      style={{ color: "white", minWidth: 250, fontSize: 19 }}
                    >
                      Elevation
                    </Text>
                    <Text style={{ color: "white" }}>
                      {workout?.data.elevation}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 5,
                    }}
                  >
                    <Text
                      style={{ color: "white", minWidth: 250, fontSize: 19 }}
                    >
                      TSS
                    </Text>
                    <Text style={{ color: "white" }}>{workout?.data.tss}</Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 5,
                    }}
                  >
                    <Text
                      style={{ color: "white", minWidth: 250, fontSize: 19 }}
                    >
                      IF
                    </Text>
                    <Text style={{ color: "white" }}>{workout?.data.If}</Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 5,
                    }}
                  >
                    <Text
                      style={{ color: "white", minWidth: 250, fontSize: 19 }}
                    >
                      Cycling Time
                    </Text>
                    <Text style={{ color: "white" }}>
                      {workout?.data.cyclingTime}
                    </Text>
                  </View>

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 5,
                    }}
                  >
                    <Text
                      style={{ color: "white", minWidth: 250, fontSize: 19 }}
                    >
                      Average Pace
                    </Text>
                    <Text style={{ color: "white" }}>
                      {workout?.data.avgPace1}
                    </Text>
                  </View>

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 5,
                    }}
                  >
                    <Text
                      style={{ color: "white", minWidth: 250, fontSize: 19 }}
                    >
                      Maximum Pace
                    </Text>
                    <Text style={{ color: "white" }}>
                      {workout?.data.maxPace}
                    </Text>
                  </View>

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 5,
                    }}
                  >
                    <Text
                      style={{ color: "white", minWidth: 250, fontSize: 19 }}
                    >
                      Minimum Heart Rate
                    </Text>
                    <Text style={{ color: "white" }}>
                      {workout?.data.minHeartRate}
                    </Text>
                  </View>

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 5,
                    }}
                  >
                    <Text
                      style={{ color: "white", minWidth: 250, fontSize: 19 }}
                    >
                      Average Heart Rate
                    </Text>
                    <Text style={{ color: "white" }}>
                      {workout?.data.avgHeartRate}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 5,
                    }}
                  >
                    <Text
                      style={{ color: "white", minWidth: 250, fontSize: 19 }}
                    >
                      Maximum Heart Rate
                    </Text>
                    <Text style={{ color: "white" }}>
                      {workout?.data.maxHeartRate}
                    </Text>
                  </View>
                </View>
              )}
            </View>

            <TouchableOpacity
              style={{
                height: 52,
                width: ScreenWidth - 16,
                marginTop: 50,
                marginBottom: 8,
                paddingTop: 10,
                borderRadius: 8,
                backgroundColor: "steelblue",
              }}
              onPress={() => setModal(false)}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  textAlign: "center",
                }}
              >
                CLOSE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default Home;
