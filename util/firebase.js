// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDc7SOe0R-ME3CVvQThqLlwRgIqXGVEBSo",
  authDomain: "sanitrack-chat.firebaseapp.com",
  projectId: "sanitrack-chat",
  storageBucket: "sanitrack-chat.appspot.com",
  messagingSenderId: "462225352403",
  appId: "1:462225352403:web:6fc00016106b57c94c1626"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export default db;