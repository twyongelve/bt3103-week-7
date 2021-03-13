import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCKJpm0aFSDbGbwiRCROy74U0GhcDdYqvs",
    authDomain: "bt3103-week-6-87fe5.firebaseapp.com",
    projectId: "bt3103-week-6-87fe5",
    storageBucket: "bt3103-week-6-87fe5.appspot.com",
    messagingSenderId: "540270611749",
    appId: "1:540270611749:web:8dd682ad71242607fb9ecc",
    measurementId: "G-BLL3S4RCR7"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;