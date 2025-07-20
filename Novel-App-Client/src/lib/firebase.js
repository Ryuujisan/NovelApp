// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHY3YLiPV1oaowUumMdB3_LAiU8SNkT1A",
  authDomain: "novel-app-dc899.firebaseapp.com",
  projectId: "novel-app-dc899",
  storageBucket: "novel-app-dc899.firebasestorage.app",
  messagingSenderId: "269434292077",
  appId: "1:269434292077:web:cb576304e96e9f729b3c64",
  measurementId: "G-S5MDS5VPX1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);