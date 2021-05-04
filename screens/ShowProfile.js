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
  Dimensions
} from "react-native";
let ScreenWidth = Dimensions.get("window").width;

import { Icon } from 'react-native-elements'


import * as firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  selectShowData,
  selectUser,
  selectUserDetails,
  setDbID,
  setUserDetails,
} from "../features/userSlice";
import { db } from "../firebase";

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

function ShowProfile({ route, navigation }) {
  const user = useSelector(selectUser);
  const [userData, setUserData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState(userData?.data?.name);
  const [gender, setGender] = useState(userData?.data?.gender);
  const [dob, setDob] = useState(userData?.data?.dob);
  const [email, setEmail] = useState(userData?.data?.email);
  const [address, setAddress] = useState(userData?.data?.address);
  const [phone, setPhone] = useState(userData?.data?.phone);
  const dispatch = useDispatch();

  const [athlete_id, setAthleteId] = useState(null);
  const [type, setType] = useState(null);


  useEffect(() => {
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
        console.log('23');
        querySnapshot.forEach(function (doc) {
          setUserData({
            id: doc.id,
            data: doc.data(),
          });
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });

    if (athlete_id) {
      db.collection("athletes")
        .doc(athlete_id)
        .get()
        .then(function (doc) {
          console.log('24');
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
  }, [user, athlete_id]);

  useEffect(()=>{
    if(name === undefined){
      setName(userData?.data?.name);
    }
    if(gender === undefined){
      setGender(userData?.data?.gender);
    }
    if(dob === undefined){
      setDob(userData?.data?.dob);
    }
    if(email === undefined){
      setEmail(userData?.data?.email);
    }
    if(address === undefined){
      setAddress(userData?.data?.address);
    }
    if(phone === undefined){
      setPhone(userData?.data?.phone);
    }
  },[editable])

  const saveDetails = () => {
    if(name === undefined){
      setName(userData?.data?.name);
    }
    if(gender === undefined){
      setGender(userData?.data?.gender);
    }
    if(dob === undefined){
      setDob(userData?.data?.dob);
    }
    if(email === undefined){
      setEmail(userData?.data?.email);
    }
    if(address === undefined){
      setAddress(userData?.data?.address);
    }
    if(phone === undefined){
      setPhone(userData?.data?.phone);
    }

    console.log("Updated details:")
    console.log(name, gender, dob, email, address, phone)
    console.log("==============================")

    db.collection("athletes")
      .doc(userData.id)
      .update({
        name,
        email,
        gender,
        address,
        dob,
        phone,
      })
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
    setEditable(false)
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => type==="coach" ? navigation.navigate("CoachHomeScreen") : navigation.navigate("Settings")}
          style={{ position: "absolute", left: 25, top: 30,backgroundColor:"black" }}
        >
          <Icon
            name='chevron-left'
            type='font-awesome-5'
            color="white"
          />
        </TouchableOpacity>

        

     
     <View style={{width:80,position:"absolute",top:27,right:0}}>
          {type !== "coach" && 
             (
                <TouchableOpacity
         onPress={() => setEditable(true)}
        >
          <Icon
            name='edit'
            type='font-awesome-5'
            color="#eee"
          />
        </TouchableOpacity>
           
          ) }
        </View>
      
        
        <View>
          <View style={styles.imageContainer}>
            <Image style={styles.profileImage} />

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
                        paddingVertical:10,
                        fontSize:20,
                        textAlign:"center",
                        width:ScreenWidth
                      }
                    : {
                        borderWidth: 0,
                        width: 200,
                        borderColor: "white",
                        color: "white",
                        borderRadius: 5,
                        display: "flex",
                        alignSelf: "center",
                        fontSize:20,
                        textAlign:"center",
                        paddingVertical:10,
                        width:ScreenWidth
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

        <View style={{marginLeft:-50}}>
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
            <Text style={styles.profileLabels}>Date of Birth : </Text>

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
              defaultValue={userData?.data?.dob}
              value={dob}
              onChangeText={setDob}
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
            <Text style={styles.profileLabels}>Address :</Text>

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
              defaultValue={userData?.data?.address}
              value={address}
              onChangeText={setAddress}
            />
          </View>
          <View style={{ display: "flex", alignItems: "center" }}>
            <Text style={styles.profileLabels}>Phone :</Text>

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
              defaultValue={userData?.data?.phone}
              editable={editable}
              value={phone}
              onChangeText={setPhone}
            />
          </View>
        </View>

        </View>
       
      </View>

     

          {editable ? (
          <Button
            title="Save Changes"
            style={{ marginBottom: 0,marginTop:50 }}
            onPress={saveDetails}
          />
        ): null}

      
    </ScrollView>
  );
}

export default ShowProfile;
