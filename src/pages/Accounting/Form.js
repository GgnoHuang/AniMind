
import React, { useState, useEffect } from "react"

import { db } from "../../config"
import { getDatabase, ref, set ,get} from "firebase/database"
import { auth } from "../../config" 
import { onAuthStateChanged } from "firebase/auth"

function Form({ transactionsArr, setTransactionsArr,systemMessage, setSystemMessage }) {
  const [type, setType] = useState("expense")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  // const [systemMessage, setSystemMessage] = useState("")

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // setUserAuth(authUser)
        console.log("有登入")
  
        const localUUID = localStorage.getItem("userUUID")
        if (localUUID) {
          // const parsedData = JSON.parse(localUUID)
          // setLocalUuid(localUUID)
          console.log(localUUID)
          console.log('抓到資料')
        }
      } else {
        // setUserAuth(null)
        console.log("沒登入")
      }
    })
    return () => unsubscribe()
  }, [])

  const saveDataToDatabase = (data,transactionId) => {
          // const databaseRef = ref(db, "transactions");
          const localUUID = localStorage.getItem("userUUID")
          if (localUUID) {
            const databaseRef = ref(db, `users/${localUUID}/transactions/${transactionId}`);

            set(databaseRef, data)
            .then(() => {
              console.log("成功存到資料庫");
            })
            .catch((error) => {
              console.error("儲存發生錯誤：", error);
            });
          }else{
            console.log('沒抓到localstorage的會員id')
          }
        
  };


  const handleAmountChange = (event) => {
    setAmount(event.target.value)
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  }

  const handleAddTransaction = () => {
    if (description && amount) {
      if (isNaN(amount)) {
        setSystemMessage("金額僅能輸入數字")
        return
      }
      const newAmount =
        type === "income" ? parseFloat(amount) : -parseFloat(amount)

      const newTransaction = {
        type,
        amount: newAmount,
        description,
        id: crypto.randomUUID(),
      }

      // ✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨
      saveDataToDatabase(newTransaction,newTransaction.id);
      // ✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨

      setTransactionsArr([...transactionsArr, newTransaction])
      console.log(newTransaction)

      setSystemMessage("新增成功！")
      setAmount("")
      setDescription("")
    } else {
      setSystemMessage("欄位請勿空白")
    }
  }

  return (
    <div>
      <div
        className="rounded-lg p-2   flex items-center justify-center">
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="expense">支出</option>
          <option value="income">收入</option>
        </select>
        <input
          type="text"
          placeholder="項目"
          value={description}
          onChange={handleDescriptionChange}/>

        <input
          type="text"
          placeholder="金額"
          value={amount}
          onChange={handleAmountChange}/>

        <button
          onClick={handleAddTransaction}
          className="text-white p-1 rounded bg-blue-500 hover:bg-blue-600"
        >新增</button>
        
      </div>

      {systemMessage && (
        
        <h4 className=" text-red-500 font-bold mb-3  flex  justify-center">
          {systemMessage}
        </h4>
      )}
    </div>
  )
}

export default Form
