import { initializeApp } from "firebase/app"
import { getDatabase, ref,get,set } from "firebase/database"
import { getAuth } from "firebase/auth"

// google登入
// google登入
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    // 處理結果，例如獲取用戶信息
    const user = result.user;
    // console.log('Logged in user:', user);

// 🥎🥎🥎🥎🥎🥎🥎🥎🥎🥎🥎🥎🥎🥎🥎🥎🥎🥎🥎
    const userRef = ref(db, `users/${user.uid}`);
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
      console.log('首次登入')
      // 如果是新用戶，將資料保存到數據庫
      set(userRef, {
        username: user.displayName, // 從 Google資料獲取用戶名
        email: user.email, // 從 Google資料獲取電子郵件
      });
    }else if(snapshot.exists()){
      const userData = snapshot.val()
      localStorage.setItem("userData", JSON.stringify(userData))

    }
    localStorage.setItem("userUUID", user.uid)
// 🥎🥎🥎🥎🥎🥎🥎🥎🥎🥎🥎🥎🥎🥎🥎🥎🥎🥎🥎

  } catch (error) {
    console.error('Error during sign in with Google:', error);
  }
};
// google登入
// google登入


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
  storageBucket: "jyun-hong.appspot.com",
  databaseURL:
    "https://jyun-hong-default-rtdb.asia-southeast1.firebasedatabase.app/",
  // 重要
}
// console.log('🚀執行config.js')


  // 🚀storage
import { getStorage } from "firebase/storage";
  // 🚀storage
  
const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
const auth = getAuth()

//🚀🚀🚀🚀storage
const storage = getStorage(app);
//🚀🚀🚀🚀storage

export { db, auth, storage }

// google登入
export { signInWithGoogle }
// google登入