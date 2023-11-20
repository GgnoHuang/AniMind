import { initializeApp } from "firebase/app"
import { getDatabase, ref, onValue } from "firebase/database"
import { getAuth } from "firebase/auth"

// import { getStorage } from "firebase/storage";

//🚀🚀🚀🚀storage
import "firebase/compat/storage";
import firebase from "firebase/app";
//🚀🚀🚀🚀storage


const firebaseConfig = {
  apiKey: "AIzaSyCRrpQrM7HR3FBbBsPl9aHuAz5y6gWAPpk",
  authDomain: "jyun-hong.firebaseapp.com",
  projectId: "jyun-hong",
  storageBucket: "jyun-hong.appspot.com",
  messagingSenderId: "309813851050",
  appId: "1:309813851050:web:4914d480b47cd856bcb1d3",
  measurementId: "G-S7K726K759",
  // 🚀
  storageBucket: "jyun-hong.appspot.com",
  // 🚀
  databaseURL:
    "https://jyun-hong-default-rtdb.asia-southeast1.firebasedatabase.app/",
  // 重要
}
console.log('🚀執行config.js')


  // 🚀
import { getStorage } from "firebase/storage";
  // 🚀
const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
const auth = getAuth()

//🚀🚀🚀🚀storage
const storage = getStorage(app);
//🚀🚀🚀🚀storage

export { db, auth, storage }
