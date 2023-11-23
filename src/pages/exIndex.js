import Link from "next/link"
import React, { useState, useEffect } from "react"
import { auth } from "../config"
import { onAuthStateChanged } from "firebase/auth"

import LogoutBtn from "../components/LogoutBtn"

import AuthCheck from "../components/AuthCheck"

function Home() {
  const [userAuth, setUserAuth] = useState(null)
  const [localUserData, setLocalUserData] = useState(null)
  const [successMsg, setSuccessMsg] = useState(false)
  const [errMsg, setErrMsg] = useState(false)


  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (authUser) => {
  //     if (authUser) {
  //       setUserAuth(authUser)
  //       console.log("有登入")
  //       console.log(authUser)
  //     } else {
  //       setUserAuth(null)
  //       console.log("沒登入")
  //     }
  //   })

  //   return () => unsubscribe()
  // }, [])

  return (
    <div className="p-8 border-red-500 h-full ">
           <AuthCheck auth={auth}
        setLocalUserData={setLocalUserData}
        setUserAuth={setUserAuth}
        successMsg={successMsg}
      />
      {/* <h4 className="bg-blue-200 rounded-lg p-2">歡迎使用記帳功能！</h4> */}
      <p className="text-blue-500 bg-blue-100 rounded-lg p-2 mb-3 text-2xl flex items-center justify-center">
     {userAuth != null && (
               <span>{localUserData.username}，</span>
          )}
        歡迎
      </p>

      <div className="p-8 flex items-center flex items-center justify-center">
          <button className="text-white p-2 rounded bg-blue-500 hover:bg-blue-600 ">
          <Link href="/Pro">測試</Link>
        </button>
      </div>
      <div className="p-8 flex items-center flex items-center justify-center">
          <button className="text-white p-2 rounded bg-blue-500 hover:bg-blue-600 ">
          <Link href="/Collaborative">Collaborative</Link>
        </button>
      </div>

 

      <div className="p-8 flex items-center flex items-center justify-center">
          <button className="text-white p-2 rounded bg-blue-500 hover:bg-blue-600 ">
          <Link href="/FFFlow">Flow</Link>
        </button>
      </div>


      {userAuth != null ? (
        <div>
          <LogoutBtn  setErrMsg={setErrMsg} setSuccessMsg={setSuccessMsg}  setUserAuth={setUserAuth} setLocalUserData={setLocalUserData}/>
        </div>
      ) : (
        <div className=" flex items-center flex items-center justify-center">
          <button className="text-white p-2 rounded bg-blue-500 hover:bg-blue-600 ">
            <Link href="/MemberPage">登入/註冊</Link>
          </button>
          {/* <Link className="nes-btn" href="/MemberPage">登入/註冊</Link> */}

        </div>
      )}
    </div>
  )
}

export default Home

