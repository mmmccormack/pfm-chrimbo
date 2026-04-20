// Import the functions you need from the SDKs you need
  
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, get, set, push, update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
  
// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyBaiNnTMf4JysBjtF8VTSSdMuUjp_rHDds",
  authDomain: "pfm-chrimbo.firebaseapp.com",
  databaseURL: "https://pfm-chrimbo-default-rtdb.firebaseio.com",
  projectId: "pfm-chrimbo",
  storageBucket: "pfm-chrimbo.firebasestorage.app",
  messagingSenderId: "810861904010",
  appId: "1:810861904010:web:17b7f8b6ac24ec8b7fad73"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dbRef = ref(database);

export { app, database, dbRef, push, update, get };