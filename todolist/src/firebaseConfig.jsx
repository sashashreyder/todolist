// Import the necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqNy7lIx0dztA2jC_fZNcw29ULVd_e96Y",
  authDomain: "simple-to-do-list-4b5e9.firebaseapp.com",
  projectId: "simple-to-do-list-4b5e9",
  storageBucket: "simple-to-do-list-4b5e9.appspot.com",
  messagingSenderId: "524531477146",
  appId: "1:524531477146:web:1ddabeb6ac6ff5401b4d23",
  measurementId: "G-SJZX8E6M93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };


