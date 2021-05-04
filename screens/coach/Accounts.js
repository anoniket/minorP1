import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
  TextInput,
  Button,
  Share,
  TouchableHighlight,
} from "react-native";
import { db } from "../../firebase";
import firebase from "firebase";

import { LinearGradient } from "expo-linear-gradient";

import DatePicker from "react-native-datepicker";

import { useDispatch, useSelector } from "react-redux";
import {
  setDbID,
  selectDbId,
  selectUser,
  setcoaches,
  selectShowData,
} from "../../features/userSlice";

import { Icon } from "react-native-elements";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 80,
    paddingTop: 50,
    minHeight: 600,
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
});

function Accounts({ route, navigation }) {
  const [accounts, setAccounts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEditRow, setSelectedEditRow] = useState(null);

  const [name, setName] = useState("");
  const [start_date, setStartDate] = useState(0);
  const [end_date, setEndDate] = useState(null);
  const [total_amount, setTotalAmount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [amount_payed, setAmountPayed] = useState(0);
  const [due, setDue] = useState([]);
  const [total_due, setTotalDue] = useState(0);
  const [added_due, setAddedDue] = useState(0);
  const [delete_id, setDeleteId] = useState(null);

  const { coach, athlete } = route.params;

  // console.log({ due });

  useEffect(() => {
    var data = [];
    db.collection("fees")
      .where("coach_id", "==", coach.id)
      .where("athlete_id", "==", athlete.id)
      .get()

      .then((snapshot) => {
        console.log("29");
        snapshot.docs.forEach((item) => {
          let currentID = item.id;
          let appObj = { ...item.data(), ["id"]: currentID };
          data.push(appObj);
        });
        setAccounts(data);
      })
      .catch((e) => console.log(e));

    db.collection("athletes")
      .doc(athlete.id)
      .get()
      .then((snapshot) => {
        console.log("30");
        if (snapshot.data().due_amount[coach.id]) {
          setDue(snapshot.data().due_amount[coach.id]);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  const getAccounts = () => {
    console.log("get accounts");
    var data = [];
    db.collection("fees")
      .where("coach_id", "==", coach.id)
      .where("athlete_id", "==", athlete.id)
      .get()

      .then((snapshot) => {
        console.log("29");
        snapshot.docs.forEach((item) => {
          let currentID = item.id;
          let appObj = { ...item.data(), ["id"]: currentID };
          data.push(appObj);
        });
        setAccounts(data);
      })
      .catch((e) => console.log(e));

    db.collection("athletes")
      .doc(athlete.id)
      .get()
      .then((snapshot) => {
        console.log("30");
        if (snapshot.data().due_amount[coach.id]) {
          setDue(snapshot.data().due_amount[coach.id]);
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    let amount = 0;
    if (due) {
      due?.map((item) => {
        amount = amount + item;
      });
      setTotalDue(amount);
    } else {
      setTotalDue(0);
    }
  }, [due]);

  const toggleModal = () => {
    setShowModal(true);
  };

  const toggleEditModal = (id) => {
    setShowEditModal(true);
    setSelectedEditRow(id);
  };

  console.log({ due, total_due });

  const deleteRow = (item, idx) => {
    // if (item.id) {
    db.collection("fees")
      .doc(item.id)
      .delete()
      .then((res) => {
        accounts.splice(idx, 1);

        if (due) {
          setTotalDue(total_due - due[idx]);
          due.splice(idx, 1);
        } else {
          setTotalDue(0);
        }

        db.collection("athletes")
          .doc(athlete.id)
          .update({
            due_amount: { [coach.id]: due },
          });

        getAccounts();
      })

      .catch((e) => console.log(e));
    // } else {
    //   db.collection("fees")
    //     .where("coach_id", "==", item.coach_id)
    //     .where("athlete_id", "==", item.athlete_id)

    //     .get()
    //     .then((snapshot) => {
    //       console.log("29");
    //       snapshot.docs.forEach((item) => {
    //         setDeleteId(item.id);

    //         db.collection("fees")
    //           .doc(item.id)
    //           .delete()
    //           .then((res) => {
    //             accounts.splice(idx, 1);

    //             if (due) {
    //               setTotalDue(total_due - due[idx]);
    //               due.splice(idx, 1);
    //             } else {
    //               setTotalDue(0);
    //             }

    //             db.collection("athletes")
    //               .doc(athlete.id)
    //               .update({
    //                 due_amount: { [coach.id]: due },
    //               });

    //             getAccounts();
    //           })

    //           .catch((e) => console.log(e));
    //       });
    //     })
    //     .catch((e) => console.log(e));

    //   console.log({ delete_id });
    // }
  };

  const submitDetails = () => {
    const due_amount = parseInt(amount) - parseInt(amount_payed);
    setDue([...due, due_amount]);

    console.log("after setting due");

    db.collection("fees")
      .doc()
      .set({
        coach_id: coach.id,
        athlete_id: athlete.id,
        start_date: start_date,
        end_date: end_date,
        amount: parseInt(amount, 10),
        total_amount: parseInt(total_due) + parseInt(amount),
        amount_payed: parseInt(amount_payed),
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((res) => {
        console.log(res);

        // db.collection("athletes")
        //   .doc(athlete.id)
        //   .update({
        //     // due_amount[coach.id]: due,
        //     due_amount: firebase.firestore.FieldValue.arrayRemove(id),
        //   });
        if (!due) {
          var item = [due_amount];
          db.collection("athletes")
            .doc(athlete.id)
            .update({
              due_amount: { [coach.id]: item },
            });
        }
        db.collection("athletes")
          .doc(athlete.id)
          .update({
            due_amount: { [coach.id]: due },
          });

        var data = [];
        db.collection("fees")
          .where("coach_id", "==", coach.id)
          .where("athlete_id", "==", athlete.id)
          .get()

          .then((snapshot) => {
            console.log("29");
            snapshot.docs.forEach((item) => {
              let currentID = item.id;
              let appObj = { ...item.data(), ["id"]: currentID };
              data.push(appObj);
            });
            setAccounts(data);
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));

    // setAccounts([
    //   ...accounts,
    //   {
    //     coach_id: coach.id,
    //     athlete_id: athlete.id,
    //     start_date: start_date,
    //     end_date: end_date,
    //     amount: parseInt(amount, 10),
    //     total_amount: parseInt(total_due, 10) + parseInt(amount, 10),
    //     amount_payed: parseInt(amount_payed),
    //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    //   },
    // ]);

    setShowModal(false);
  };

  const saveDetails = (id, idx) => {
    // due[idx]= amount - amount_payed
    db.collection("fees")
      .doc(selectedEditRow)
      .update({
        coach_id: coach.id,
        athlete_id: athlete.id,
        name: name,
        start_date: start_date,
        end_date: end_date,
        amount: parseInt(amount, 10),
        total_amount: parseInt(total_due) + parseInt(amount),
        amount_payed: parseInt(amount_payed),
      })
      .then((res) => console.log(res))
      .catch((e) => console.log(e));

    getAccounts();

    setShowEditModal(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("AccountsHomeScreen")}
        style={{ position: "absolute", left: 25, top: 30, zIndex: 1 }}
      >
        <Icon name="chevron-left" type="font-awesome-5" color="white" />
      </TouchableOpacity>

      <Text
        style={{
          color: "white",
          fontSize: 22,
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Accounts
      </Text>

      <ScrollView>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <Text
            style={{
              color: "white",
              padding: 15,
              maxWidth: 80,
              // backgroundColor: "#004872",
            }}
          >
            Period
          </Text>
          <Text
            style={{
              color: "white",
              padding: 15,
              maxWidth: 100,
              marginLeft: 20,
              // backgroundColor: "#004872",
            }}
          >
            Fee for the period
          </Text>
          <Text
            style={{
              color: "white",
              padding: 15,
              maxWidth: 120,
              marginLeft: -10,
              // backgroundColor: "#004872",
            }}
          >
            Fee + Dues
          </Text>
          <Text
            style={{
              color: "white",
              padding: 15,
              width: 110,
              marginLeft: -5,
              // backgroundColor: "#004872",
            }}
          >
            Amount paid
          </Text>
        </View>
        {accounts?.map((item, idx) => (
          <View key={idx}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 15,
              }}
            >
              <View
                style={{
                  color: "white",
                  borderWidth: 1,
                  borderColor: "lightgrey",
                  padding: 5,
                  width: 100,
                }}
              >
                <Text
                  style={{
                    color: "white",
                  }}
                >
                  {item.start_date}
                </Text>
                <Text
                  style={{
                    color: "white",
                  }}
                >
                  {item.end_date}
                </Text>
              </View>
              <Text
                style={{
                  color: "white",
                  borderWidth: 1,
                  borderColor: "lightgrey",
                  padding: 15,
                  width: 80,
                }}
              >
                {item.amount}
              </Text>
              <Text
                style={{
                  color: "white",
                  borderWidth: 1,
                  borderColor: "lightgrey",
                  padding: 15,
                  width: 90,
                }}
              >
                {item.total_amount}
              </Text>

              <Text
                style={{
                  color: "white",
                  borderWidth: 1,
                  borderColor: "lightgrey",
                  padding: 15,
                  width: 80,
                }}
              >
                {item.amount_payed}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                border: 0,
                marginTop: 5,
                marginBottom: 25,
                width: "90%",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  borderBottomLeftRadius: 12,
                  backgroundColor: "#141313",
                  width: "50%",
                  marginRight: 5,
                  paddingTop: 5,
                  height: 30,
                }}
                onPress={() => toggleEditModal(item.id)}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  Edit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderBottomRightRadius: 12,
                  backgroundColor: "#004872",
                  width: "50%",
                  marginLeft: 5,
                  paddingTop: 5,
                  height: 30,
                }}
                onPress={() => deleteRow(item, idx)}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        activeOpacity={0.6}
        backgroundColor="steelblue"
        style={{
          width: "90%",
          backgroundColor: "steelblue",
          height: 55,
          marginBottom: 0,
          marginTop: 50,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 8,
          shadowColor: "#3895CE",
          marginHorizontal: 20,
          position: "absolute",
          bottom: 15,
        }}
        onPress={toggleModal}
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
          onPress={toggleModal}
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
              New Entry
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>

      {/* <Button
          title="Push Notifications"
          style={{ marginTop: 20 }}
          onPress={() => navigation.navigate("PushNotifications")}
        /> */}

      <Modal animationType="slide" transparent={true} visible={showModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ fontSize: 20, marginBottom: 20 }}>New Entry!</Text>

            <View style={{ marginVertical: 15 }}>
              <Text>Start Date :</Text>
              <DatePicker
                style={{ width: 250, marginVertical: 10 }}
                date={start_date}
                mode="date"
                placeholder="Select Start Date"
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
                    color: "white",
                  },
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {
                  setStartDate(date);
                }}
              />
            </View>

            <View>
              <Text>End Date :</Text>
              <DatePicker
                style={{ width: 250, marginVertical: 10 }}
                date={end_date}
                mode="date"
                placeholder="Select End Date"
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
                    color: "white",
                  },
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {
                  setEndDate(date);
                }}
              />
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text style={{ color: "white" }}>Amount :</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  width: 150,
                  borderRadius: 5,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  marginLeft: 15,
                  color: "white",
                }}
                keyboardType={"numeric"}
                value={amount}
                onChangeText={setAmount}
              />
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text>Amount Paid:</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  width: 150,
                  borderRadius: 5,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  marginLeft: 15,
                  color: "black",
                }}
                keyboardType={"numeric"}
                value={amount_payed}
                onChangeText={setAmountPayed}
              />
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableHighlight
                style={{
                  ...styles.openButton,
                  backgroundColor: "#2196F3",
                  marginRight: 20,
                  marginTop: 15,
                }}
                onPress={() => {
                  setShowModal(!showModal);
                }}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={{
                  ...styles.openButton,
                  backgroundColor: "#2196F3",
                  marginTop: 15,
                }}
                onPress={() => {
                  submitDetails();
                }}
              >
                <Text style={styles.textStyle}>Submit</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={showEditModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ fontSize: 20, marginBottom: 20 }}>Edit Entry!</Text>

            <View style={{ marginVertical: 15 }}>
              <Text>Start Date :</Text>
              <DatePicker
                style={{ width: 250, marginVertical: 10 }}
                date={start_date}
                mode="date"
                placeholder="Select Start Date"
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
                    color: "white",
                  },
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {
                  setStartDate(date);
                }}
              />
            </View>

            <View>
              <Text>End Date :</Text>
              <DatePicker
                style={{ width: 250, marginVertical: 10 }}
                date={end_date}
                mode="date"
                placeholder="Select End Date"
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
                    color: "white",
                  },
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {
                  setEndDate(date);
                }}
              />
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text>Amount :</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  width: 150,
                  borderRadius: 5,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  marginLeft: 15,
                  color: "black",
                }}
                keyboardType={"numeric"}
                value={amount}
                onChangeText={setAmount}
              />
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text>Amount Payed:</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  width: 150,
                  borderRadius: 5,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  marginLeft: 15,
                  color: "black",
                }}
                keyboardType={"numeric"}
                value={amount_payed}
                onChangeText={setAmountPayed}
              />
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableHighlight
                style={{
                  ...styles.openButton,
                  backgroundColor: "#2196F3",
                  marginRight: 20,
                  marginTop: 15,
                }}
                onPress={() => {
                  setShowEditModal(!showEditModal);
                }}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={{
                  ...styles.openButton,
                  backgroundColor: "#2196F3",
                  marginTop: 15,
                }}
                onPress={() => {
                  saveDetails();
                }}
              >
                <Text style={styles.textStyle}>Save</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default Accounts;
