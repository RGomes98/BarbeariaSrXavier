// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { Firestore, getFirestore } from "firebase/firestore";

import firebase from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCILl2M_2Jema6qKs0Ds3ci9d02wrDHzqk",
  authDomain: "barber-shop-679ec.firebaseapp.com",
  projectId: "barber-shop-679ec",
  storageBucket: "barber-shop-679ec.appspot.com",
  messagingSenderId: "895629588501",
  appId: "1:895629588501:web:0cd0f5aba62eaf68f9361c",
  measurementId: "G-2RZ7VTQZWH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const firestore = getFirestore(app);
