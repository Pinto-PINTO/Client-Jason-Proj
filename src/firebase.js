import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-7lXpcQyh0YBjVmMV37G7lHbZLAaqHrU",
  authDomain: "kz-database-cba84.firebaseapp.com",
  projectId: "kz-database-cba84",
  storageBucket: "kz-database-cba84.appspot.com",
  messagingSenderId: "407373064125",
  appId: "1:407373064125:web:f1bcc6e562f2b518ce54d4",
  measurementId: "G-T4838MDXYV"
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;

export const db = getFirestore(app);
