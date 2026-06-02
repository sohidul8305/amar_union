import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCUGhZlL4WctC2gO1yv4_zvk8JBnIq-9tg",
  authDomain: "amar-union.firebaseapp.com",
  projectId: "amar-union",
  storageBucket: "amar-union.firebasestorage.app",
  messagingSenderId: "207218710882",
  appId: "1:207218710882:web:5974aef822917fb540743b",
  measurementId: "G-HDHV06JWK6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); 
export const signupStorage = getStorage(app);