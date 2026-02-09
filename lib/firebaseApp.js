// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtP5C8C2EfnZ3LiR_3pbsDG2mZMIpC7CM",
  authDomain: "final-milestone-dc40e.firebaseapp.com",
  projectId: "final-milestone-dc40e",
  storageBucket: "final-milestone-dc40e.firebasestorage.app",
  messagingSenderId: "1015291290103",
  appId: "1:1015291290103:web:71ede38de8b77c91218ef2",
  measurementId: "G-0YR83N568X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const authFeature=getAuth(app)
export const database=getFirestore(app)
export const googleProvider=new GoogleAuthProvider(app)

