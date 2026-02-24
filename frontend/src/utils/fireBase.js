
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "googlauthexamnotes.firebaseapp.com",
  projectId: "googlauthexamnotes",
  storageBucket: "googlauthexamnotes.firebasestorage.app",
  messagingSenderId: "72188429129",
  appId: "1:72188429129:web:7fc0d9cfa7e74812305098"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider= new GoogleAuthProvider();

export {auth, provider}