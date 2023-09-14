// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvg2QXfpLor7FK4im-RHaARTpNnEQKK-Y",
  authDomain: "react-food-db-57662.firebaseapp.com",
  projectId: "react-food-db-57662",
  storageBucket: "react-food-db-57662.appspot.com",
  messagingSenderId: "990912501849",
  appId: "1:990912501849:web:b7e98baceba4be58ec3948"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireStoreDB = getFirestore(app);

export default fireStoreDB;