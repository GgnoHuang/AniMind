import { useState, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../../config"


const AuthCheck = () => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {

        console.log("有登入！")

        const localUUID = localStorage.getItem("userUUID")
        if (localUUID) {
          // console.log('這是UUID:')
          // console.log(localUUID)
        }
      } else {

        console.log("沒登入")
      }
    })
    return () => unsubscribe()
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null; // 此處不返回任何HTML
}

export default AuthCheck
