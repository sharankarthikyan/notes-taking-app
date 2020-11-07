import firebase from "firebase";

let firebaseConfig = {
  apiKey: "AIzaSyB2qS8UUbsOhjacV47VjIQVTljAIw_2cZM",
  authDomain: "double-star-411ee.firebaseapp.com",
  databaseURL: "https://double-star-411ee.firebaseio.com",
  projectId: "double-star-411ee",
  storageBucket: "double-star-411ee.appspot.com",
  messagingSenderId: "831235571616",
  appId: "1:831235571616:web:70b0cf840e3efc95ab6ec5",
  measurementId: "G-DCHKHXD5R3",
};

const fire = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default fire;
