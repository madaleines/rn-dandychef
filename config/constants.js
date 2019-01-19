import firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyAr8Q8eS2leTTie6RkhAhtzytc7D14YLVI",
  authDomain: "rn-dandychef.firebaseapp.com",
  databaseURL: "https://rn-dandychef.firebaseio.com",
  projectId: "rn-dandychef",
  storageBucket: "rn-dandychef.appspot.com",
  messagingSenderId: "129100654852"
};

firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const firebaseAuth = firebase.auth;
export const db = firebase.firestore().settings({ timestampsInSnapshots: true });
