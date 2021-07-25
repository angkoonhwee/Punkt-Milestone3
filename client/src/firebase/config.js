import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "punkt-ff838.firebaseapp.com",
  projectId: "punkt-ff838",
  storageBucket: "punkt-ff838.appspot.com",
  messagingSenderId: "682064925956",
  appId: "1:682064925956:web:8dd66b8470d56cd8736c51",
  measurementId: "G-EG956YJGP3",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Initialize services
const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };
