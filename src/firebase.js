// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBV9pn0boFf7qU7jkUtIpHdrfOQiAhpOY",
  authDomain: "flowboard-80d37.firebaseapp.com",
  projectId: "flowboard-80d37",
  storageBucket: "flowboard-80d37.appspot.com",
  messagingSenderId: "1004589362852",
  appId: "1:1004589362852:web:7308140eb558a01f304031"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const fbFunctions = getFunctions(app);

if (process.env.NODE_ENV === "development") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8082);
  connectFunctionsEmulator(fbFunctions, "localhost", 5001);
}
