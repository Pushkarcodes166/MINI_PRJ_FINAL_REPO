// Firebase configuration and initialization
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCKKB8X8lPYThftGNM5BdZ3do8PkxpAVhM",
  authDomain: "student-career-guidance-b720e.firebaseapp.com",
  projectId: "student-career-guidance-b720e",
  storageBucket: "student-career-guidance-b720e.appspot.com",
  messagingSenderId: "1064168387067",
  appId: "1:1064168387067:web:41708f1380deb97aeb9b5e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);