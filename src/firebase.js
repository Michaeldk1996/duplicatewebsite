// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from 'firebase/analytics';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDlBq75FgR2sa20Ap6PHdqzGg58LwNnfdM",
  authDomain: "bspconsult-bcd6e.firebaseapp.com",
  projectId: "bspconsult-bcd6e",
  storageBucket: "bspconsult-bcd6e.appspot.com",
  messagingSenderId: "209328620753",
  appId: "1:209328620753:web:a42e728f0d5cd74101f1f0",
  measurementId: "G-RXQB0FWLHX"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;