import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpQyd8fMrZQGS7FXINL3pBVpUiGXrr7Rk",
  authDomain: "chat-application-1508f.firebaseapp.com",
  projectId: "chat-application-1508f",
  storageBucket: "chat-application-1508f.appspot.com",
  messagingSenderId: "109109415781",
  appId: "1:109109415781:web:d3f625d7e6397856085b8c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
