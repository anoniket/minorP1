import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAv3LTpscin4UyTzAbuCTZL8a4EpTdjOjM",
  authDomain: "minorp1.firebaseapp.com",
  projectId: "minorp1",
  storageBucket: "minorp1.appspot.com",
  messagingSenderId: "190008554338",
  appId: "1:190008554338:web:e8fd2ef8e3e31526b8723b",
  measurementId: "G-TQ3DQYH4GN",
});


const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
