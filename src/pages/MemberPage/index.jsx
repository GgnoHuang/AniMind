import React, { useState, useEffect } from "react"
import Link from "next/link"

import "firebase/auth"
import { auth } from "../../config"
import styles from "./member.module.css";


import Login from "../../components/Login"
import Register from "../../components/Register"
import LogoutBtn from "../../components/LogoutBtn"
import AuthCheck from "../../components/AuthCheck"


function MemberPage() {
  const [localUserData, setLocalUserData] = useState(null)
  const [userAuth, setUserAuth] = useState(null)
  const [successMsg, setSuccessMsg] = useState(false)
  const [errMsg, setErrMsg] = useState(false)

  return (
    <div className={styles.background}>
      <AuthCheck auth={auth}
        setLocalUserData={setLocalUserData}
        setUserAuth={setUserAuth}
        successMsg={successMsg}
      />
      {/* {userAuth != null ?  */}
      {userAuth != null ? 
      (<div>
          {/* <h1>有抓到userAuth</h1> */}
          {localUserData != null && (
            <div className="p-8 flex items-center flex items-center justify-center">
              <p className="text-white p-2 rounded">
                歡迎登入，<span className="text-blue-500">{localUserData.username}</span>！
              </p>
            </div>
          )}
          <br />
          <LogoutBtn  setErrMsg={setErrMsg} setSuccessMsg={setSuccessMsg}  setUserAuth={setUserAuth} setLocalUserData={setLocalUserData}/>
        </div>) 
      : (<div>
          <Register />
          <br />
          <Login  errMsg={errMsg} setErrMsg={setErrMsg} setSuccessMsg={setSuccessMsg} successMsg={successMsg} />
          <br />
        </div>
      )}


      <div className="p-3 flex items-center flex items-center justify-center">
        <Link className=" text-white p-2 rounded bg-blue-500 hover:bg-blue-600 " href="/">返回首頁</Link>
      </div>

      <div className="p-8 flex items-center flex items-center justify-center">
          <button className="text-white p-2 rounded bg-blue-500 hover:bg-blue-600 ">
          <Link href="/FFFlow">Flow</Link>
        </button>
      </div>

    </div>
  )
}

export default MemberPage
