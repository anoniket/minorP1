import React from 'react';
import {Text, StyleSheet, View, FlatList, Button, TouchableOpacity, TextInput} from 'react-native';

const TriFields = () => {
    return (
    <View style={styles.TextInputContainer}>

        <Text>Run</Text>

        <View style={styles.FieldRow}>
            <Text style = {styles.TextStyle}>Duration</Text>
            <TextInput placeholder = "Duration" style={styles.TextInputStyle} />
        </View>  
        <View style={styles.FieldRow}>
            <Text style = {styles.TextStyle}>Distance</Text>
            <TextInput placeholder = "Distance" style={styles.TextInputStyle} />
        </View>  
        <View style={styles.FieldRow}>
            <Text style = {styles.TextStyle}>Average Pace</Text>
            <TextInput placeholder = "Average Pace" style={styles.TextInputStyle} />
        </View>  
        <View style={styles.FieldRow}>
            <Text style = {styles.TextStyle}>Calories</Text>
            <TextInput placeholder = "Calories" style={styles.TextInputStyle} />
        </View>  
        <View style={styles.FieldRow}>
            <Text style = {styles.TextStyle}>TSS</Text>
            <TextInput placeholder = "TSS" style={styles.TextInputStyle} />
        </View>  
        <View style={styles.FieldRow}>
            <Text style = {styles.TextStyle}>IF</Text>
            <TextInput placeholder = "IF" style={styles.TextInputStyle} />
        </View>  
        <View style={styles.FieldRow}>
            <Text style = {styles.TextStyle}>Running Time</Text>
            <TextInput placeholder = "Time" style={styles.TextInputStyle} />
        </View>  


        <View style={styles.FieldRow}>
            <Text style = {styles.TextStyle}>Pace</Text>
            <TextInput placeholder = "Avg" style={styles.TextInputStyle2} />
            <TextInput placeholder = "Max" style={styles.TextInputStyle2} />
        </View> 

        <View style={styles.FieldRow}>
            <Text style = {styles.TextStyle}>Heart Rate</Text>
            <TextInput placeholder = "Min" style={styles.TextInputStyle2} />
            <TextInput placeholder = "Avg" style={styles.TextInputStyle2} />
            <TextInput placeholder = "Max" style={styles.TextInputStyle2} />
        </View>

        <Text>Swim</Text>

        <View style={styles.FieldRow}>
            <Text style = {styles.TextStyle}>Duration</Text>
            <TextInput placeholder = "Duration" style={styles.TextInputStyle} />
        </View>  
        <View style={styles.FieldRow}>
            <Text style = {styles.TextStyle}>Distance</Text>
            <TextInput placeholder = "Distance" style={styles.TextInputStyle} />
        </View>  
        <View style={styles.FieldRow}>
            <Text style = {styles.TextStyle}>Average Pace</Text>
            <TextInput placeholder = "Average Pace" style={styles.TextInputStyle} />
        </View>  
        <View style={styles.FieldRow}>
            <Text style = {styles.TextStyle}>Calories</Text>
            <TextInput placeholder = "Calories" style={styles.TextInputStyle} />
        </View>  
        <View style={styles.FieldRow}>
            <Text style = {styles.TextStyle}>TSS</Text>
            <TextInput placeholder = "TSS" style={styles.TextInputStyle} />
        </View>  
        <View style={styles.FieldRow}>
            <Text style = {styles.TextStyle}>IF</Text>
            <TextInput placeholder = "IF" style={styles.TextInputStyle} />
        </View>  
        <View style={styles.FieldRow}>
            <Text style = {styles.TextStyle}>Running Time</Text>
            <TextInput placeholder = "Time" style={styles.TextInputStyle} />
        </View>  


        <View style={styles.FieldRow}>
            <Text style = {styles.TextStyle}>Pace</Text>
            <TextInput placeholder = "Avg" style={styles.TextInputStyle2} />
            <TextInput placeholder = "Max" style={styles.TextInputStyle2} />
        </View> 

        <View style={styles.FieldRow}>
            <Text style = {styles.TextStyle}>Heart Rate</Text>
            <TextInput placeholder = "Min" style={styles.TextInputStyle2} />
            <TextInput placeholder = "Avg" style={styles.TextInputStyle2} />
            <TextInput placeholder = "Max" style={styles.TextInputStyle2} />
        </View> 

        <Text>Cycle</Text>

        <View style={styles.FieldRow}>
            <Text style = {styles.TextStyle}>Duration</Text>
            <TextInput placeholder = "Duration" style={styles.TextInputStyle} />
        </View>  
        <View style={styles.FieldRow}>
            <Text style = {styles.TextStyle}>Distance</Text>
            <TextInput placeholder = "Distance" style={styles.TextInputStyle} />
        </View>  
        <View style={styles.FieldRow}>
            <Text style = {styles.TextStyle}>Average Pace</Text>
            <TextInput placeholder = "Average Pace" style={styles.TextInputStyle} />
        </View>  
        <View style={styles.FieldRow}>
            <Text style = {styles.TextStyle}>Calories</Text>
            <TextInput placeholder = "Calories" style={styles.TextInputStyle} />
        </View>  
        <View style={styles.FieldRow}>
            <Text style = {styles.TextStyle}>TSS</Text>
            <TextInput placeholder = "TSS" style={styles.TextInputStyle} />
        </View>  
        <View style={styles.FieldRow}>
            <Text style = {styles.TextStyle}>IF</Text>
            <TextInput placeholder = "IF" style={styles.TextInputStyle} />
        </View>  
        <View style={styles.FieldRow}>
            <Text style = {styles.TextStyle}>Running Time</Text>
            <TextInput placeholder = "Time" style={styles.TextInputStyle} />
        </View>  


        <View style={styles.FieldRow}>
            <Text style = {styles.TextStyle}>Pace</Text>
            <TextInput placeholder = "Avg" style={styles.TextInputStyle2} />
            <TextInput placeholder = "Max" style={styles.TextInputStyle2} />
        </View> 

        <View style={styles.FieldRow}>
            <Text style = {styles.TextStyle}>Heart Rate</Text>
            <TextInput placeholder = "Min" style={styles.TextInputStyle2} />
            <TextInput placeholder = "Avg" style={styles.TextInputStyle2} />
            <TextInput placeholder = "Max" style={styles.TextInputStyle2} />
        </View> 

        <Button title = 'Submit' onPress = {() => {console.log('Submitted run Fields');}}/>
    </View>
    )
};

const styles = StyleSheet.create({
    TextInputStyle: {
        borderWidth : 2, borderColor: 'black', width: 180, textAlign: 'center',
    },
    TextInputStyle2: {
        borderWidth : 2, borderColor: 'black', width: 60, textAlign: 'center',
    },
    TextStyle: {
        width: 100, textAlign: 'center',
    },
    TextInputContainer: {
        justifyContent: 'center',
    },
    FieldRow: {
        flexDirection: 'row',
    },

});

export default TriFields;