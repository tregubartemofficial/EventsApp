import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/database";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCvwC97znSCQWZBJQqJgqh7l-63WmtgKY0",
  authDomain: "eventapp-8f0c5.firebaseapp.com",
  projectId: "eventapp-8f0c5",
  storageBucket: "eventapp-8f0c5.appspot.com",
  messagingSenderId: 718592136288,
  appId: "1:718592136288:web:8cb1e411a8830a6f435f05",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
