// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import type { Analytics } from "firebase/analytics";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    "AIzaSyAz5-SSyG6FCUQdKqqCP5hhk21sG8giRqQ",
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    "craft-bihar.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "craft-bihar",
  storageBucket: "craft-bihar.firebasestorage.app",
  messagingSenderId: "360394305926",
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    "1:360394305926:web:4175d6c82989be69507c07",
  measurementId: "G-SHVLTENS86",
};

// Initialize Firebase
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

// Initialize Analytics only on client side
let analytics: Analytics | undefined;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { app, auth, analytics };
