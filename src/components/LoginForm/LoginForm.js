import React, { useState,useEffect } from "react"
import { auth,db,signInWithGoogle } from "../../config"
import useStore from '../../store';
import { signInWithEmailAndPassword } from "firebase/auth"
import { getDatabase, ref, get } from "firebase/database"

import styles from "./LoginForm.module.css";
import Image from 'next/image';


function Login({ }) {
  // 👗zustand
  const { showRegisterForm,toggleForm,
    showCollage,toggleCollage,
    errMsg,setErrMsg,successMsg,setSuccessMsg,
  } = useStore(state => ({
    toggleForm: state.toggleForm,
    showRegisterForm: state.showRegisterForm,
    showCollage: state.showCollage,
    toggleCollage: state.toggleCollage,
    errMsg: state.errMsg,
    setErrMsg: state.setErrMsg,
    setSuccessMsg: state.setSuccessMsg,
    successMsg: state.successMsg,
}));
const handleToggleFormClick = () => {
  toggleForm();
  toggleCollage();
};
// 👗zustand



  const handleSubmit = async (e) => {
    e.preventDefault()

    const email = e.target[0].value
    const password = e.target[1].value

    setSuccessMsg(false)
    setErrMsg(false)
    try {
      const loginRes = await signInWithEmailAndPassword(auth, email, password)
      // console.log(loginRes.user)
      // console.log(loginRes.user.uid)
      // 登入成功就去抓這個帳號的uid👆 👆 👆

      // 然後再拿uid去 資料庫抓會員的資料👇 👇 👇
      const userUUID = loginRes.user.uid
      const snapshot = await get(ref(db, `users/${userUUID}`))

      if (snapshot.exists()) {
        const userData = snapshot.val()
        // console.log("成功從資料庫抓到會員資料，並放入local:", userData)
        localStorage.setItem("userData", JSON.stringify(userData))
        // console.log(JSON.stringify(userData))
        localStorage.setItem("userUUID", userUUID)
        setSuccessMsg(true)
      // 一登入沒辦法渲染會員資料是正常，因為這裡做的動作只有 localStorage.setItem而已
// 所以要再setLocalUserData(parsedData)
      } else {
        alert("沒抓到會員資料")
        setErrMsg(true)
      }
    } catch (loginErr) {
      setErrMsg(true)
      // console.log("登入失敗", loginErr)
    }
  }

  const handleGoogleLogin=async()=>{
    setSuccessMsg(false)
    setErrMsg(false)
    try{
      await signInWithGoogle();
      // console.log("登入成功");
      setSuccessMsg(true)
    
    }catch (error){
      setErrMsg(true)
      // console.log("登入失敗", error);
    }

  }





  return (
    <div className={showRegisterForm ? styles.visibleFormwrapper : styles.hiddenFormwrapper}>
      {/* <div className="p-1 flex items-center flex items-center justify-center">
        <p className=" text-white p-2 rounded ">登入</p>
      </div> */}

      <form onSubmit={handleSubmit}>
        
        <div className="input-container-wrapper">
          <div className="input-container">

            <div className={styles.inputcontainer}>
            <img src="/lets.webp" 
            // className={styles.letsstart}
            className={showCollage ? styles.letsstart : styles.hiddenletsstart}
            />
              <div className={styles.signintext}>
                Log In 
              </div>


            <div className={styles.mailinput}>
              <div className="cool-input-div">
              <input 
                autoComplete="Email"
              defaultValue="test@test.com"  className="cool-input" type="text" placeholder="Email"/>
              <span className="cool-bottom cool-span"></span>
              <span className="cool-right cool-span"></span>
              <span className="cool-top cool-span"></span>
              <span className="cool-left cool-span"></span>
            </div>
          </div>

          <div className={styles.passwordinput}>      
              <div className="cool-input-div">
                <input  
                
                defaultValue="123456" 
                autoComplete="current-password"
                className="cool-input" type="password" placeholder="Password: 6+ chars."/>
                <span className="cool-bottom cool-span"></span>
                <span className="cool-right cool-span"></span>
                <span className="cool-top cool-span"></span>
                <span className="cool-left cool-span"></span>
              </div>
          </div>

            <div className=" flex items-center flex items-center justify-center">
              <button className={styles.registerbtn}>
              Sign in</button>
            </div>
            <p  
            onClick={handleToggleFormClick}
            className={styles.alreadyhaveaccount}>Not a member yet? Sign up</p>
            <p className={styles.or}>
or 
</p>

            <div className=" flex items-center flex items-center justify-center">
              <button type="button" className={styles.registerbtn} 
              // onClick={signInWithGoogle}
              onClick={handleGoogleLogin}
              >
  <img src="/google.webp" 
            style={{ height:'17px',width:'17px',marginRight:'7px'}}
            />
              Continue with Google</button>
            </div>

          </div>
        </div>
      </div>

        {/* <button className="nes-btn">登入</button> */}
        {errMsg && <p>登入失敗</p>}
        {successMsg && <p>登入成功</p>}
      </form>
    </div>

  )
}

export default Login
