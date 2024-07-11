// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBth1CUag_H2GBjIy0mJyMWrgiVxABucYY",
  authDomain: "babble-todo.firebaseapp.com",
  projectId: "babble-todo",
  storageBucket: "babble-todo.appspot.com",
  messagingSenderId: "910909012156",
  appId: "1:910909012156:web:25082f7c44d65cf3fab8b9",
};

// Initialize Firebase
const fire = initializeApp(firebaseConfig);

export default fire;
