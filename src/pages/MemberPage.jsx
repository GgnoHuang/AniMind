import React, { useState, useEffect } from "react"
import Link from "next/link"

import "firebase/auth"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../config"
// 有import { auth } 就不用import getAuth()

import Login from "@/components/Login"
import Register from "@/components/Register"

// const auth = getAuth()

function MemberPage() {
  const [userAuth, setUserAuth] = useState(null)

  const [userData, setUserData] = useState(null)
  function getUserData(userData) {
    setUserData(userData)
  } // 父組件要拿子組件的資料就要靠傳遞function給子組件

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUserAuth(authUser)
        console.log("有登入")
        console.log(authUser)
      } else {
        setUserAuth(null)
        console.log("沒登入")
      }
    })

    // 組件卸載時取消
    return () => unsubscribe()
  }, [])

  function handleSignout() {
    signOut(auth)
      .then(() => {
        console.log("登出成功")
        alert("登出成功")
      })
      .catch((error) => {
        console.log("登出發生錯誤")
        alert("登出發生錯誤")
      })
  }

  return (
    <div>
      {/* {userAuth && userData != null ? ( */}
      {userAuth != null ? (
        <div>
          {userData !== null && (
            <div>
              <h1>歡迎光臨{userData.username}！</h1>
              <h1>你帳號{userData.email}！</h1>
            </div>
          )}

          <div className="p-8 flex items-center flex items-center justify-center">
            <button
              onClick={handleSignout}
              className="text-white p-2 rounded bg-blue-500 hover:bg-blue-600 "
            >
              登出
            </button>
          </div>
        </div>
      ) : (
        <div>
          <Register />
          <br />
          <Login getUserData={getUserData} />
        </div>
      )}

      <div
        className="p-8 flex items-center
        flex items-center justify-center"
      >
        <button className="text-white p-2 rounded bg-blue-500 hover:bg-blue-600 ">
          <Link href="/">返回首頁</Link>
        </button>
      </div>
    </div>
  )
}

export default MemberPage
