import React, { useState } from "react"
import { auth } from "../config" // 请确保正确导入您的 Firebase 相关模块

import { createUserWithEmailAndPassword, signOut } from "firebase/auth"
import { db } from "../config"
import { getDatabase, ref, set } from "firebase/database"

function Register() {
  set(ref(db, "okkkkk/" + 555555), {
    username: "哈囉測試",
    email: "哈囉測試",
  })

  const [err, setErr] = useState(false)
  const [success, setSuccess] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    const username = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value

    setSuccess(false)
    setErr(false)
    try {
      const firebaseRES = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      console.log(firebaseRES.user)
      if (firebaseRES.user) {
        // const db = getDatabase()
        // const userRef = ref(db, `users/${firebaseRES.user.uid}`);
        console.log(firebaseRES.user.uid)
        set(ref(db, `users/${firebaseRES.user.uid}`), {
          username: username,
          email: email,
          password: password,
        })

        signOut(auth) // 不寫這個的話會自動登入
        alert("註冊成功，請進行登入")
        setSuccess(true)
      }
    } catch (err) {
      setErr(true)
      alert("註冊失敗")
    }
  }

  return (
    <div>
      <h1>註冊會員</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="用戶名" />
        <input type="email" placeholder="email" />
        <input type="text" placeholder="密碼至少包含6个字符" />
        <button>sign up</button>
        {err && <p>註冊失敗</p>}
        {success && <p>註冊成功</p>}
      </form>
    </div>
  )
}

export default Register
