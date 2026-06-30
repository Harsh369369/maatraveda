// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

// Web app's Firebase configuration (loaded by user)
const firebaseConfig = {
    apiKey: "AIzaSyDkIu2csAizjn6SSUvEuhFGFXgdDbnAtgY",
    authDomain: "maatraveda.firebaseapp.com",
    projectId: "maatraveda",
    storageBucket: "maatraveda.firebasestorage.app",
    messagingSenderId: "437610127765",
    appId: "1:437610127765:web:78cd90bbb6eac80330969c",
    measurementId: "G-Q7EPRRPBZZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, analytics, auth, googleProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile };