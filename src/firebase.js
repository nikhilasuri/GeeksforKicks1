import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBV8edqfuE1pjvKrBSCpmJSzjXbEgPyu2U",
    authDomain: "geeksforkicks.firebaseapp.com",
    projectId: "geeksforkicks",
    storageBucket: "geeksforkicks.firebasestorage.app",
    messagingSenderId: "279634458041",
    appId: "1:279634458041:web:5bf175cfde8253b781b268",
    measurementId: "G-WC4JWSE0GD"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
