import React, { useState } from "react"
import { auth } from "../config"
import { signOut } from "firebase/auth"
import useStore from '../store';

function LogoutBtn({setUserAuth,setLocalUserData,
  errMsg,setErrMsg, setSuccessMsg, successMsg
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
    <div>
      {/* <div className=" flex items-center flex items-center justify-center"> */}
        <button 
          onClick={handleSignout}
          className=" text-white p-2 rounded bg-blue-500 hover:bg-blue-600 "
        >
          登出
        </button>
      {/* </div> */}
    </div>
  )
}

export default LogoutBtn
