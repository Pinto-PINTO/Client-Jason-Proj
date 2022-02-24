import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDuGBBW5hn_AtXxyTIdMIYvklsIzyRI_Nw",
    authDomain: "testjason-90f13.firebaseapp.com",
    projectId: "testjason-90f13",
    storageBucket: "testjason-90f13.appspot.com",
    messagingSenderId: "268850024497",
    appId: "1:268850024497:web:9179a9d2f34eaad9bc4510",
    measurementId: "G-6EE5BSZEBY"
  };


  //Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;

export const db = getFirestore(app);
