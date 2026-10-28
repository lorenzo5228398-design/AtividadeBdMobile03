// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBuBA3lvKLyf-r4bTnx76cwYq67IKC2ZE",
  authDomain: "jogoadivinhacao-e6ec6.firebaseapp.com",
  projectId: "jogoadivinhacao-e6ec6",
  storageBucket: "jogoadivinhacao-e6ec6.firebasestorage.app",
  messagingSenderId: "579424778335",
  appId: "1:579424778335:web:ec7a20274a111f645203ea",
  databaseURL: "https://jogoadivinhacao-e6ec6-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);