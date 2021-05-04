import React from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Button,
  TouchableOpacity,
  TextInput,
} from "react-native";

const SCFields = (props) => {
  const [muscleGroup, setMuscleGroup] = useState(null);
  const [equipment, setEquipment] = useState(null);

  return (
    <View style={styles.TextInputContainer}>
      <Picker
        selectedValue={muscleGroup}
        style={{
          height: 20,
          width: 200,
          color: "white",
          backgroundColor: "steelblue",
          padding: 15,
          borderWidth: 1,
          borderColor: "white",
        }}
        onValueChange={(itemValue, itemIndex) => setMuscleGroup(itemValue)}
      >
        <Picker.Item label={"Choose Muscle Group"} value={""} />
        <Picker.Item label="Full Body" value="Full Body" />
        <Picker.Item label="Back" value="Back" />
        <Picker.Item label="Arms" value="Arms" />
        <Picker.Item label="Upper Body" value="Upper Body" />
        <Picker.Item label="Core" value="Core" />
        <Picker.Item label="Lower Body" value="Lower Body" />
        <Picker.Item label="Legs" value="Legs" />
      </Picker>

      <Picker
        selectedValue={equipment}
        style={{
          height: 20,
          width: 200,
          color: "white",
          backgroundColor: "steelblue",
          padding: 15,
          borderWidth: 1,
          borderColor: "white",
        }}
        onValueChange={(itemValue, itemIndex) => setEquipment(itemValue)}
      >
        <Picker.Item label={"Choose Equipment"} value={""} />
        <Picker.Item label="Dumbbell" value="Dumbbell" />
        <Picker.Item label="Barbell" value="Barbell" />
        <Picker.Item label="Kettlebell" value="Kettlebell" />
        <Picker.Item label="Resistance Band" value="Resistance Band" />
        <Picker.Item label="Bodyweight" value="Bodyweight" />
      </Picker>

      <Button
        title="Submit"
        onPress={() => props.navigation.navigate("SCFields2")}
      />

      <View style={styles.FieldRow}>
        <Text style={styles.TextStyle}>Duration</Text>
        <TextInput placeholder="Duration" style={styles.TextInputStyle} />
      </View>
      <View style={styles.FieldRow}>
        <Text style={styles.TextStyle}>Distance</Text>
        <TextInput placeholder="Distance" style={styles.TextInputStyle} />
      </View>
      <View style={styles.FieldRow}>
        <Text style={styles.TextStyle}>Average Pace</Text>
        <TextInput placeholder="Average Pace" style={styles.TextInputStyle} />
      </View>
      <View style={styles.FieldRow}>
        <Text style={styles.TextStyle}>Calories</Text>
        <TextInput placeholder="Calories" style={styles.TextInputStyle} />
      </View>
      <View style={styles.FieldRow}>
        <Text style={styles.TextStyle}>Elevation</Text>
        <TextInput placeholder="Elevation" style={styles.TextInputStyle} />
      </View>
      <View style={styles.FieldRow}>
        <Text style={styles.TextStyle}>TSS</Text>
        <TextInput placeholder="TSS" style={styles.TextInputStyle} />
      </View>
      <View style={styles.FieldRow}>
        <Text style={styles.TextStyle}>IF</Text>
        <TextInput placeholder="IF" style={styles.TextInputStyle} />
      </View>
      <View style={styles.FieldRow}>
        <Text style={styles.TextStyle}>Running Time</Text>
        <TextInput placeholder="Running Time" style={styles.TextInputStyle} />
      </View>

      <View style={styles.FieldRow}>
        <Text style={styles.TextStyle}>Pace</Text>
        <TextInput placeholder="Avg" style={styles.TextInputStyle2} />
        <TextInput placeholder="Max" style={styles.TextInputStyle2} />
      </View>

      <View style={styles.FieldRow}>
        <Text style={styles.TextStyle}>Heart Rate</Text>
        <TextInput placeholder="Min" style={styles.TextInputStyle2} />
        <TextInput placeholder="Avg" style={styles.TextInputStyle2} />
        <TextInput placeholder="Max" style={styles.TextInputStyle2} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  TextInputStyle: {
    borderWidth: 2,
    borderColor: "black",
    width: 180,
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

export default SCFields;
