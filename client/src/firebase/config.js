// import * as firebase from "firebase/app";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDu5hOYa0usDRr5TiStVBvFuJcci3sL590",
  authDomain: "firegram-f25bd.firebaseapp.com",
  projectId: "firegram-f25bd",
  storageBucket: "firegram-f25bd.appspot.com",
  messagingSenderId: "630641200459",
  appId: "1:630641200459:web:5f41bd38d505e9322bacce",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize services
const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };
