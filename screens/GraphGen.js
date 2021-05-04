import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Icon } from "react-native-elements";

const screenHeight = Dimensions.get("window").height;

import { FontAwesome5, Fontisto } from "@expo/vector-icons";

const GraphGen = ({ route, navigation }) => {
  const { data, workoutName, userType } = route.params;
  const [athlete, setAthlete] = useState(null);
  const [type, setType] = useState(null);
  const [param1, setparam1] = useState("Time (example)");
  const [param2, setparam2] = useState("Heart-rate (example)");

  const [zone, setZone] = useState([
    {
      id: 10241204,
      zoneName: "Warm Up",
      val: 10,
      val2: 10,
      param1: param1,
      param2: param2,
    },
    {
      id: 12542353,
      zoneName: "Main Set",
      val: 10,
      val2: 10,
      param1: param1,
      param2: param2,
    },
  ]);

  const [squares, setSquares] = useState([]);
  const [count_val, setCountVal] = useState(0);

  const screenWidth = Dimensions.get("window").width;

  console.log({ data, workoutName, athlete });

  useEffect(() => {
    if (route.params?.athlete) {
      setAthlete(route.params?.athlete);
    }
  }, [route.params?.athlete]);

  useEffect(() => {
    if (route.params?.type) {
      setType(route.params?.type);
    }
  }, [route.params?.type]);

  var removeByAttr = function (arr, attr, value) {
    var i = arr.length;
    while (i--) {
      if (
        arr[i] &&
        arr[i].hasOwnProperty(attr) &&
        arguments.length > 2 &&
        arr[i][attr] === value
      ) {
        arr.splice(i, 1);
      }
    }
    return arr;
  };

  const addZone = () => {
    id = Math.floor(Math.random() * 99999);
    setZone([
      ...zone,
      {
        id: id,
        zoneName: "Sample",
        val: 10,
        val2: 10,
        param1: param1,
        param2: param2,
      },
    ]);
  };

  const delZone = (req_id) => {
    var new_array = [...zone]; // make a separate copy of the array
    setZone(removeByAttr(new_array, "id", req_id));
    setSquares(normalizeParams(zone, 400, screenWidth));
    console.log(req_id);
  };

  useEffect(() => {
    console.log("read!");
    setSquares(normalizeParams(zone, 300, screenWidth));
  }, [zone]);

  const setZoneName = (zone_name) => {
    setZone([...zone, { zoneName: zone_name }]);
  };

  const normalizeArray = (arr) => {
    var max = Math.max.apply(Math, arr);
    var min = Math.min.apply(Math, arr);

    var norm_arr = [];

    var sum = arr.reduce(function (a, b) {
      return a + b;
    }, 0);
    arr.forEach(function (arrayItem) {
      console.log(arrayItem);
      norm_arr.push(arrayItem / sum);
    });

    return norm_arr;
  };

  // Use this to normalize values before plotting
  const normalizeParams = (objs, def_height, def_width) => {
    let arr1 = [];
    let arr2 = [];
    let fin_objArr = [];

    objs.forEach(function (arrayItem) {
      console.log(arrayItem);
      arr1.push(parseInt(arrayItem.val));
      arr2.push(parseInt(arrayItem.val2));
    });

    let norm_arr_1 = normalizeArray(arr1);
    let norm_arr_2 = normalizeArray(arr2);

    console.log(`Norm array 1 is ${norm_arr_1}`);

    for (var i = 0; i < norm_arr_1.length; i++) {
      let i_obj = {
        val: (norm_arr_1[i] * def_width) / 1.6,
        val2: norm_arr_2[i] * def_height,
        key: Math.floor(Math.random() * 999999),
      };
      fin_objArr.push(i_obj);
    }

    console.log(fin_objArr);

    return fin_objArr;
  };

  console.log(zone);

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* <BarChart
          // style={styles.graphStyle}
          data={data}
          width={screenWidth}
          height={400}
          yAxisLabel=""
          yAxisSuffix={param2}
          chartConfig={chartConfig}
          verticalLabelRotation={70}
          fromZero={true}
        /> */}

<TouchableOpacity
          onPress={() => {
            if (type === "Run") {
              navigation.navigate("RunFields");
            } else if(type === "Swim") {
              navigation.navigate("SwimFields");
            } else if (type==="Bike"){
              navigation.navigate("BikeFields");
            } else {
              console.log("Workout Type Error")
            }
          }}
          style={{
            position: "absolute",
            left: 25,
            top: 20,
            backgroundColor: "black",
            zIndex: 1,
          }}
        >
          <Icon name="chevron-left" type="font-awesome-5" color="white" />
        </TouchableOpacity>
          <View style = {styles.body}>
        <Text style={{ color: "white" }}>Choose parameters</Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ marginLeft: 10, color: "white" }}>Param 1:</Text>
          <TextInput
            style={{
              margin: 12,
              borderColor: "white",
              color: "white",
              borderWidth: 1,
              width: screenWidth / 5,
            }}
            value={param1}
            onChangeText={(new_val) => {
              setparam1(new_val);
            }}
            // always use the following two props
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={{ color: "white" }}>Param 2:</Text>
          <TextInput
            style={{
              margin: 12,
              borderColor: "white",
              color: "white",
              borderWidth: 1,
              width: screenWidth / 5,
            }}
            value={param2}
            onChangeText={(new_val2) => {
              setparam2(new_val2);
            }}
            // always use the following two props
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity
            onPress={() => {
              // Write to db instead of console log
              console.log(param1, param2);
            }}
          >
            <FontAwesome5 name="check-square" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.6}
          backgroundColor="steelblue"
          style={{
            width: "90%",
            backgroundColor: "steelblue",
            height: 55,
            marginBottom: 0,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
            shadowColor: "#3895CE",
            marginHorizontal: 20,
            marginVertical: 15,
          }}
          onPress={() => {
            addZone();
          }}
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
            onPress={() => {
              addZone();
            }}
          >
            <View>
              <Text
                style={{
                  color: "#E2E2E2",
                  fontSize: 20,
                  fontFamily: "SF-Pro-Display-regular",
                  textAlign: "center",
                }}
              >
                Add Zone
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Adding zones - Name and time value */}
        <FlatList
          keyExtractor={(item) => String(item.id)}
          data={zone}
          renderItem={({ item }) => {
            return (
              <View style={styles.row}>
                <View>
                  <Text
                    style={{ justifyContent: "flex-start", color: "white" }}
                  >
                    {item.zoneName}
                  </Text>

                  <View>
                    <Text style={{ color: "white" }}> Name : </Text>
                    <TextInput
                      style={{
                        margin: 12,
                        borderColor: "white",
                        color: "white",
                        borderWidth: 1,
                        width: screenWidth / 5,
                      }}
                      onChangeText={(new_name) => {
                        let new_arr = [...zone];
                        let ind = new_arr
                          .map(function (e) {
                            return e.id;
                          })
                          .indexOf(item.id);
                        console.log(ind);
                        new_arr[ind].zoneName = new_name;
                        setZone(new_arr);
                      }}
                      //   value={item.zoneName}
                      // //   onChangeText={(new_val2) => {
                      // //     setZoneName(new_val2)
                      // //   }}
                      // always use the following two props
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </View>

                  <View>
                    <Text style={{ color: "white" }}> {param1} value : </Text>
                    <TextInput
                      keyboardType={"numeric"}
                      style={{
                        margin: 12,
                        borderColor: "white",
                        color: "white",
                        borderWidth: 1,
                        width: screenWidth / 5,
                      }}
                      onChangeText={(new_val) => {
                        let new_arr = [...zone];
                        let ind = new_arr
                          .map(function (e) {
                            return e.id;
                          })
                          .indexOf(item.id);

                        new_arr[ind].val = new_val;

                        new_val > 0 ? setZone(new_arr) : null;
                        setCountVal(count_val + 1);
                      }}
                    />
                  </View>

                  <View>
                    <Text style={{ color: "white" }}> {param2} value : </Text>
                    <TextInput
                      style={{
                        margin: 12,
                        borderColor: "white",
                        borderWidth: 1,
                        width: screenWidth / 5,
                        color: "white",
                      }}
                      keyboardType={"numeric"}
                      onChangeText={(new_val2) => {
                        let new_arr = [...zone];
                        let ind = new_arr
                          .map(function (e) {
                            return e.id;
                          })
                          .indexOf(item.id);

                        new_arr[ind].val2 = new_val2;
                        new_val2 > 0 ? setZone(new_arr) : null;
                        setCountVal(count_val + 1);
                      }}
                    />
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    delZone(item.id);
                  }}
                >
                  <Fontisto name="trash" size={18} color="white" />
                </TouchableOpacity>
              </View>
            );
          }}
        />
        {/* <Button title = "Generate Workout Graph" onPress = {() =>{
            console.log(count_val)
            setSquares(normalizeParams(zone, 300, screenWidth));
        }}/> */}

        <View style={{ alignItems: "center", marginVertical: 8 }}>
          <FlatList
            keyExtractor={(item) => String(item.key)}
            horizontal
            data={squares}
            renderItem={({ item }) => {
              console.log(`Key is ${item.key}`);
              return (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  <TouchableOpacity>
                    <View
                      style={{
                        width: item.val,
                        height: item.val2,
                        backgroundColor: "steelblue",
                        color: "black",
                        margin: 5,
                      }}
                    ></View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.6}
          backgroundColor="steelblue"
          style={{
            width: "90%",
            backgroundColor: "steelblue",
            height: 55,
            marginBottom: 0,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
            shadowColor: "#3895CE",
            marginHorizontal: 20,
            marginBottom: 50,
            marginTop: 15,
          }}
          onPress={() => {
            navigation.navigate("WorkoutCompletion", {
              workoutName,
              athlete,
              userType,
              type,
              data,
              zone,
              squares,
            });
          }}
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
            onPress={() => {
              navigation.navigate("WorkoutCompletion", {
                workoutName,
                athlete,
                userType,
                type,
                data,
                zone,
                squares,
              });
            }}
          >
            <View>
              <Text
                style={{
                  color: "#E2E2E2",
                  fontSize: 20,
                  fontFamily: "SF-Pro-Display-regular",
                  textAlign: "center",
                }}
              >
                Proceed
              </Text>
            </View>
            <Image
              style={{
                width: 30,
                height: 20,
                position: "absolute",
                right: 15,
                marginTop: 15,
              }}
              source={require("../assets/doubleleftarrowheads.png")}
            />
          </LinearGradient>
        </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    color: "white",
    minHeight: screenHeight,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 50,
    paddingTop: 20,
  },

  body:{
    marginTop : screenHeight*0.1
  },
  input: {
    margin: 15,
    borderColor: "white",
    color: "white",
    borderWidth: 1,
    paddingHorizontal: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: "gray",
    color: "white",
  },
});

export default GraphGen;

// Take Y Axis name - for instance : distance + param2 (two input fields)
// Give an option to add new fields for X labels
// Take string X label (for example - Zone 1) + numeric Y value (for example - 10)
// Update state and display when they click on add
