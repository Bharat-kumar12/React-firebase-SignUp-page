// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeac5nXwd6qHwlM8j8cazjqkeC1mpjDQs",
  authDomain: "reactbootstrap-d29a0.firebaseapp.com",
  projectId: "reactbootstrap-d29a0",
  storageBucket: "reactbootstrap-d29a0.firebasestorage.app",
  messagingSenderId: "824152082065",
  appId: "1:824152082065:web:9bc09f493dace4332ae130",
  measurementId: "G-R891MDVZTT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);
const db = getFirestore(app);

export { app, analytics, auth, database, db };