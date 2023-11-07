import React, { useState , useEffect} from "react"
import Link from "next/link"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../../config"

// import "nes.css/css/nes.min.css";

import Form from "./Form"
import List from "../../components/List"

function Accounting() {
  const [transactionsArr, setTransactionsArr] = useState([])
  const [localUuid, setLocalUuid] = useState(null)
  // 兩個組件共通的就只有這個列表，所以把這個放在父元件
  const [systemMessage, setSystemMessage] = useState("")


  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (authUser) => {
    if (authUser) {
      console.log("有登入")

      const localUUID = localStorage.getItem("userUUID")
      if (localUUID) {
        console.log(localUUID)
        console.log('抓到資料')
      }
    } else {
      console.log("沒登入")
    }
  })
  return () => unsubscribe()
}, [])

  return (
    <div>
      <p className="text-blue-500 bg-blue-100 rounded-lg p-2 mb-3  text-2xl flex items-center justify-center">
        開始記帳</p>

      <Form transactionsArr={transactionsArr}
        setTransactionsArr={setTransactionsArr}
        systemMessage={systemMessage} 
        setSystemMessage={setSystemMessage}
        />

      <List transactionsArr={transactionsArr}
        setTransactionsArr={setTransactionsArr}
        systemMessage={systemMessage} 
        setSystemMessage={setSystemMessage}/>

      <div className="p-8 flex items-center flex items-center justify-center">
          <button className="text-white p-2 rounded bg-blue-500 hover:bg-blue-600 ">
            <Link href="/">返回首頁</Link>
          </button>
      </div>

    </div>
  )
}

export default Accounting
