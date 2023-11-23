import React, { useState, useEffect } from "react"
import Link from "next/link"

import styles from "./HomeNav.module.css";

import LogoutBtn from "../LogoutBtn"

export default function HomeNav({localUserData,setErrMsg,setSuccessMsg,setUserAuth,setLocalUserData}) {

  return (
    <div>
      <div className={styles.navbody}>
      {/* <img src="/nav.png" className={styles.navpng}/> */}
      {localUserData != null && (
          <div className={styles.nav}>
            <div 
            // className="p-8 flex items-center flex items-center justify-center"
            >
              <p className="text-white p-2 rounded">
                歡迎登入，<span className="text-blue-500">{localUserData.username}</span>！
              </p>
            </div>
              <div className={styles.btnswrapper}>
                <button className="text-white p-2 rounded bg-blue-500 hover:bg-blue-600 ">
                  <Link href="/FFFlow">Flow</Link>
                </button>
                <LogoutBtn  setErrMsg={setErrMsg} setSuccessMsg={setSuccessMsg}  setUserAuth={setUserAuth} setLocalUserData={setLocalUserData}/>
              </div>
          </div>
          )}
      </div>
    </div>
  )
}


