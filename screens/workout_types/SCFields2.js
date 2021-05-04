import React from 'react';
import {Text, StyleSheet, View, FlatList, Button, TouchableOpacity, TextInput} from 'react-native';

const SCFields2 = () => {
    return (
    <View style={styles.TextInputContainer}>



        <View style={styles.FieldRow}>
            <Text style = {styles.TextStyle}>Choose Exercise (dropdown)</Text>
            <TextInput placeholder = "Sets" style={styles.TextInputStyle} />
            <TextInput placeholder = "Reps" style={styles.TextInputStyle} />
        </View>  

        <Button title = 'Submit' onPress = {()=> (props.navigation.navigate('SCFields2'))} />

        
    </View>
    )
};

const styles = StyleSheet.create({
    TextInputStyle: {
        borderWidth : 2, borderColor: 'black', width: 90, textAlign: 'center',
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

export default SCFields2;