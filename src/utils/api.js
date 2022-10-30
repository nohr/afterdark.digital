import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore/lite'

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBnqc3JrCowRVEO1PgKCizHp89pqYGsguA",
    authDomain: "afterdark-digital.firebaseapp.com",
    projectId: "afterdark-digital",
    storageBucket: "afterdark-digital.appspot.com",
    messagingSenderId: "511862499661",
    appId: "1:511862499661:web:04ae6d79d97959b8d42f04",
    measurementId: "G-J44LSPHSR9"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, provider);

export const storage = getStorage(app);
export const db = getFirestore();