// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpqc5uGzfeKJu6VUpTwNe2yTA2wrbuOr4",
  authDomain: "signup-login-page-df490.firebaseapp.com",
  projectId: "signup-login-page-df490",
  storageBucket: "signup-login-page-df490.appspot.com",
  messagingSenderId: "852069194561",
  appId: "1:852069194561:web:324d6be2ab459f10619fc0",
  measurementId: "G-HE8YWGEM5G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);