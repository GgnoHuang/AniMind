import React, { useState, useEffect } from "react"
import Link from "next/link"

import "firebase/auth"
import { auth } from "../config"
import styles from "./index.module.css";

import Image from 'next/image'

// import Login from "../components/Login"
import LoginForm from "../components/LoginForm/LoginForm"
import RegisterForm from "../components/RegisterForm/RegisterForm"
// import Register from "../components/Register"

import LogoutBtn from "../components/LogoutBtn"
import AuthCheck from "../components/AuthCheck"

import HomeNav from "../components/HomeNav/HomeNav"

export default function HomePage() {
  const [localUserData, setLocalUserData] = useState(null)
  const [userAuth, setUserAuth] = useState(null)
  const [successMsg, setSuccessMsg] = useState(false)
  const [errMsg, setErrMsg] = useState(false)



  useEffect(() => {
    // 假设某些异步操作，例如数据加载
    setTimeout(()=>{
      console.log('加載完畢')

    },300)
  
  }, []);
 


  return (
    <div 
    
    className={styles.homepagebody}
    >
      <HomeNav localUserData={localUserData}
        setErrMsg={setErrMsg} 
        setSuccessMsg={setSuccessMsg} 
        setUserAuth={setUserAuth} 
        setLocalUserData={setLocalUserData}
      />
      <div
          className={styles.newnav}
          >
      </div>
      <img src="/backgood.png"
       className={styles.newnavimg}
      />
      <img src="/backgood.png"
       className={styles.newnavimg2}
      />
      


      <AuthCheck auth={auth}
        setLocalUserData={setLocalUserData}
        setUserAuth={setUserAuth}
        successMsg={successMsg}
      />
      {/* {userAuth != null ?  */}
      {userAuth == null && (

        <div className={styles.loginRegisterFormWrapper}>
          <div className={styles.formContainer}>
            <RegisterForm />
            <br />
            <LoginForm  errMsg={errMsg} setErrMsg={setErrMsg} setSuccessMsg={setSuccessMsg} successMsg={successMsg} />
            <br />
          </div>
        </div>
      )}

{/* 
      {userAuth != null ? 

      (<div>
        </div>) 

      : (<div>
          <Register />
          <br />
          <Login  errMsg={errMsg} setErrMsg={setErrMsg} setSuccessMsg={setSuccessMsg} successMsg={successMsg} />
          <br />
        </div>
      )} */}




{/* 
      <div className="p-3 flex items-center flex items-center justify-center">
        <Link className=" text-white p-2 rounded bg-blue-500 hover:bg-blue-600 " href="/">返回首頁</Link>
      </div> */}

    

    </div>
  )
}


