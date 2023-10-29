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
// const getRecommendationListRef = ref(db,'recommendationList')
// onValue(getRecommendationListRef,snapshot =>{
//   const data = snapshot.val()
//   console.log(data)

export { db, auth }
// 為啥要export auth？
// 不是可以直接import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"

// DATABASE_NAME . REGION .firebasedatabase.app （適用於所有其他位置的資料庫）

// const app = initializeApp(firebaseConfig)
// const db = getDatabase(app)

// function writeUserData(userId, name, email, imageUrl) {
//   set(ref(db, 'users/' + userId), {
//     username: name,
//     email: email,
//     profile_picture: imageUrl
//   });
// }
