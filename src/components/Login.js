import React, { useState } from "react"
import { auth } from "../config"

import { signInWithEmailAndPassword } from "firebase/auth"
import { getDatabase, ref, get } from "firebase/database"
import { db } from "../config"

function Login({ getUserData }) {
  const [errMsg, setErrMsg] = useState(false)
  const [successMsg, setSuccessMsg] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const email = e.target[0].value
    const password = e.target[1].value

    setSuccessMsg(false)
    setErrMsg(false)
    try {
      const loginRes = await signInWithEmailAndPassword(auth, email, password)
      console.log(loginRes.user)
      console.log(loginRes.user.uid)
      // 登入成功就去抓這個帳號的uid👆 👆 👆

      // 然後再拿uid去 資料庫抓會員的資料👇 👇 👇
      const userid = loginRes.user.uid
      const snapshot = await get(ref(db, `users/${userid}`))

      if (snapshot.exists()) {
        // 快照存在，用户数据可用
        const userData = snapshot.val()
        console.log("成功抓到會員資料:", userData)
        getUserData(userData)

        setSuccessMsg(true)
      } else {
        alert("沒抓到會員資料")
        setErrMsg(true)
      }
    } catch (loginErr) {
      setErrMsg(true)
      console.log("登入失敗", loginErr)
    }
  }

  return (
    <div>
      <h1>登入會員</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="email" />
        <input type="text" placeholder="密碼至少包含6个字符" />
        <button>登入</button>
        {errMsg && <p>登入失敗</p>}
        {successMsg && <p>登入成功</p>}
      </form>
    </div>
  )
}

export default Login
