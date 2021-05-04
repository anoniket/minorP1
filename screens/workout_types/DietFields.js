import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Button,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
} from "react-native";

import { Picker } from "@react-native-picker/picker";

let ScreenHeight = Dimensions.get("window").height;

import { Icon } from "react-native-elements";

const DietFields = ({ route, navigation }) => {
  const { workoutName, userType } = route.params;
  const [athlete, setAthlete] = useState(null);

  const [meal, setMeal] = useState(null);
  const [mealDetails, setMealDetails] = useState(null);

  useEffect(() => {
    if (route.params?.athlete) {
      setAthlete(route.params?.athlete);
    }
  }, [route.params?.athlete]);

  return (
    <View style={styles.TextInputContainer}>
      <View style={styles.FieldRow}>
        <Picker
          selectedValue={meal}
          style={{
            height: 20,
            width: 200,
            color: "white",
            backgroundColor: "steelblue",
            padding: 15,
            borderWidth: 1,
            borderColor: "white",
          }}
          onValueChange={(itemValue, itemIndex) => setMeal(itemValue)}
        >
          <Picker.Item label={"Choose Meal"} value={""} />
          <Picker.Item label="Breakfast" value="Breakfast" />
          <Picker.Item label="Lunch" value="Lunch" />
          <Picker.Item label="Dinner" value="Dinner" />
          <Picker.Item label="Pre Workout" value="Pre Workout" />
          <Picker.Item label="Post Workout" value="Post Workout" />
          <Picker.Item label="Snack" value="Snack" />
        </Picker>
        <TextInput
          value={mealDetails}
          onChangeText={setMealDetails}
          placeholder="Enter Meal details"
          style={styles.TextInputStyle}
        />
      </View>

      <Button
        title="Submit"
        onPress={() => {
          navigation.navigate("GraphGen", {
            workoutName,
            athlete,
            userType,
            type: "Diet",
            data: {
              meal,
              mealDetails,
            },
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  TextInputStyle: {
    borderWidth: 2,
    borderColor: "black",
    width: 180,
    height: 180,
    textAlign: "center",
  },
  TextInputStyle2: {
    borderWidth: 2,
    borderColor: "black",
    width: 60,
    textAlign: "center",
  },
  TextStyle: {
    width: 100,
    textAlign: "center",
  },
  TextInputContainer: {
    justifyContent: "center",
  },
  FieldRow: {
    flexDirection: "row",
  },
});

export default DietFields;
