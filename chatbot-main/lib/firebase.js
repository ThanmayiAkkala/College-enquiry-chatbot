import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB0Du1rXA7ZPpel-uFWrJpkcllVo_hry7c",
  authDomain: "cec1-3f282.firebaseapp.com",
  databaseURL: "https://cec1-3f282-default-rtdb.firebaseio.com",
  projectId: "cec1-3f282",
  storageBucket: "cec1-3f282.appspot.com",
  messagingSenderId: "75025864324",
  appId: "1:75025864324:web:e02c1533d0a886228b14d1",
  measurementId: "G-WJ9GEMDTG8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
