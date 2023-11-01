import { useState, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"

const AuthAndUserData = ({ auth,
  setLocalUserData,setUserAuth
  ,successMsg
}) => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUserAuth(authUser)
        console.log("有登入")

        const savedUserData = localStorage.getItem("userData")
        if (savedUserData) {
          const parsedData = JSON.parse(savedUserData)
          setLocalUserData(parsedData)
          console.log('抓資料')
        }
      } else {
        setUserAuth(null)
        console.log("沒登入")
      }
    })
    return () => unsubscribe()
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successMsg])
// 如果successMsg的值改變了就再執行一次，這樣登入成功就可以馬上setLocalUserData
  return null; // 此處不返回任何HTML
}

export default AuthAndUserData
