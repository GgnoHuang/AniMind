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


              <p className={styles.logo}
                style={{zIndex:'1999'}}>
                <img src="/oklogo.png" className={styles.logopng}/>
                <span className={styles.logospan}>Organic</span>
              </p>
              {localUserData != null && (
              <div className={styles.btnswrapper}
                style={{zIndex:'1999'}}>

    <div className="p-8 flex items-center flex items-center justify-center">
        <button className="text-white p-2 rounded bg-blue-500 hover:bg-blue-600 ">
        <Link href="/Collaborative">Collaborative</Link>
      </button>
    </div>

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


