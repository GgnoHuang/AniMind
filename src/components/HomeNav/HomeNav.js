import React, { useState, useEffect } from "react"
import Link from "next/link"

import styles from "./HomeNav.module.css";

import LogoutBtn from "../LogoutBtn/LogoutBtn"

export default function HomeNav({localUserData,
  setErrMsg,setSuccessMsg,
  setUserAuth,setLocalUserData
  ,setKeysCount
  ,setBtnsArr
}) {

  return (
    <div >
      <div className={styles.navbody}>
      {/* <img src="/nav.png" className={styles.navpng}/> */}

          <div className={styles.nav}>
              <p className="text-white p-2 rounded"
                style={{zIndex:'1999'}}>
                LOGO
              </p>
              {localUserData != null && (
              <div className={styles.btnswrapper}
                style={{zIndex:'1999'}}>
                <p className={styles.welcome}
                  style={{zIndex:'1999'}}>
                  Welcome！<span 
                  style={{zIndex:'1999'}}
                  className={styles.usernametext}>{localUserData.username}</span>
                </p>

                <LogoutBtn  setErrMsg={setErrMsg} setSuccessMsg={setSuccessMsg} 
                  setUserAuth={setUserAuth}
                  setLocalUserData={setLocalUserData}
                  setKeysCount={setKeysCount}
                  setBtnsArr={setBtnsArr}
                  />
              </div>)}
          </div>
      </div>
    </div>
  )
}


