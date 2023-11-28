import React, { useState } from "react"
import { auth } from "../../config"
import { signOut } from "firebase/auth"
import useStore from '../../store';
import styles from "./LogoutBtn.module.css";

function LogoutBtn({setUserAuth,setLocalUserData,
  errMsg,setErrMsg, setSuccessMsg, successMsg
  ,setKeysCount,setBtnsArr
}) {



// 👗👗👗👗👗👗👗👗👗👗👗👗👗👗👗👗👗👗👗
  const { 
  toggleCollage,
  } = useStore(state => ({
    toggleCollage: state.toggleCollage,
}));
const handleToggleFormClick = () => {
};
// 👗👗👗👗👗👗👗👗👗👗👗👗👗👗👗👗👗👗👗

  
  function handleSignout() {
    signOut(auth)
      .then(() => {

        localStorage.clear("userData") // 移除userData
        setUserAuth(null)
        setLocalUserData(null)
        setSuccessMsg(false)
        setErrMsg(false)
        setKeysCount(0)
        setBtnsArr([])



        console.log("登出成功")
        alert("登出成功")
        // window.location.reload()
       
      })
      .catch((error) => {
        console.log("登出發生錯誤")
        console.log(error)
        alert("登出發生錯誤")
      })
  }
  return (
    <div  className={styles.logoutbtnw}>
      {/* <div className=" flex items-center flex items-center justify-center"> */}
        <button 
          onClick={handleSignout}
          className={styles.logoutbtn}
        >
          Logout
        </button>
      {/* </div> */}
    </div>
  )
}

export default LogoutBtn
