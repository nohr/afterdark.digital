import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyBnqc3JrCowRVEO1PgKCizHp89pqYGsguA",
    authDomain: "afterdark-digital.firebaseapp.com",
    projectId: "afterdark-digital",
    storageBucket: "afterdark-digital.appspot.com",
    messagingSenderId: "511862499661",
    appId: "1:511862499661:web:04ae6d79d97959b8d42f04",
    measurementId: "G-J44LSPHSR9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);