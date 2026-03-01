
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";




const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "googlauthexamnotes.firebaseapp.com",
  projectId: "googlauthexamnotes",
  storageBucket: "googlauthexamnotes.firebasestorage.app",
  messagingSenderId: "72188429129",
  appId: "1:72188429129:web:78b43d302aab9727305098"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth, provider}