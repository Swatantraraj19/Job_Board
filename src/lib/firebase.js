// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBaV8Zvlm58_F-BYqMmtXpdiq-hrhkOpEA",
  authDomain: "jobboard-a573e.firebaseapp.com",
  projectId: "jobboard-a573e",
  storageBucket: "jobboard-a573e.firebasestorage.app",
  messagingSenderId: "801292383302",
  appId: "1:801292383302:web:4253f71477a50f85564647",
  measurementId: "G-K4N6YNVR77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication and Database
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
