import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0m9iTRS1pZQZ1CM739CoR_Ag9IRL3q6k",
  authDomain: "wandertodo.firebaseapp.com",
  projectId: "wandertodo",
  storageBucket: "wandertodo.appspot.com",
  messagingSenderId: "268520261889",
  appId: "1:268520261889:web:bb4cdd5b1995841b59f300",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
