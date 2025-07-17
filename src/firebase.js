import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "laterboard.firebaseapp.com",
  projectId: "laterboard",
  storageBucket: "laterboard.firebasestorage.app",
  messagingSenderId: "498046229031",
  appId: "1:498046229031:web:60492e4ff68dfbcd6a4c02",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
