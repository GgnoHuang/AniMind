import { initializeApp } from "firebase/app"
import { getDatabase, ref, onValue } from "firebase/database"
import { getAuth } from "firebase/auth"

// 重要

const firebaseConfig = {
  apiKey: "AIzaSyCRrpQrM7HR3FBbBsPl9aHuAz5y6gWAPpk",
  authDomain: "jyun-hong.firebaseapp.com",
  projectId: "jyun-hong",
  storageBucket: "jyun-hong.appspot.com",
  messagingSenderId: "309813851050",
  appId: "1:309813851050:web:4914d480b47cd856bcb1d3",
  measurementId: "G-S7K726K759",

  databaseURL:
    "https://jyun-hong-default-rtdb.asia-southeast1.firebasedatabase.app/",
  // 重要
}
console.log(12425)
const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
const auth = getAuth()


export { db, auth }
