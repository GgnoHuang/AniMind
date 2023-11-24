import React, { useState, useEffect } from "react"
import Link from "next/link"

import styles from "./HomeNav.module.css";

import LogoutBtn from "../LogoutBtn"

export default function HomeNav({localUserData,setErrMsg,setSuccessMsg,setUserAuth,setLocalUserData}) {

  return (
    <div >
      <div className={styles.navbody}>
      {/* <img src="/nav.png" className={styles.navpng}/> */}
      {localUserData != null && (
          <div className={styles.nav}>
         
              <p className="text-white p-2 rounded"
                 style={{zIndex:'1999'}}
                 >
                logo！
              </p>

   
              <div className={styles.btnswrapper}
                style={{zIndex:'1999'}}>
  <p className="text-white p-2 rounded"
                 style={{zIndex:'1999'}}>
                歡迎登入，<span 
                
                style={{zIndex:'1999'}}
                className="text-blue-500">{localUserData.username}</span>！
              </p>

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


