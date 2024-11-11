import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signOut, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, setDoc, updateDoc, serverTimestamp, arrayUnion, arrayRemove, deleteDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCpqc5uGzfeKJu6VUpTwNe2yTA2wrbuOr4",
  authDomain: "signup-login-page-df490.firebaseapp.com",
  projectId: "signup-login-page-df490",
  storageBucket: "signup-login-page-df490.firebasestorage.app",
  messagingSenderId: "852069194561",
  appId: "1:852069194561:web:324d6be2ab459f10619fc0",
  measurementId: "G-HE8YWGEM5G"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);


export {
  auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signOut, signInWithPopup, GoogleAuthProvider, provider, getFirestore, db, collection, addDoc, getDocs, doc, setDoc, updateDoc, serverTimestamp, arrayUnion, arrayRemove, deleteDoc
}