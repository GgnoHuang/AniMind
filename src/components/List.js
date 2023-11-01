
import React, { useState, useEffect } from "react"

import { db } from "../config"
import { getDatabase, ref, set ,get,remove} from "firebase/database"

function List({ transactionsArr, setTransactionsArr, setSystemMessage }) {
  const calculateTotal = () => {
    return transactionsArr.reduce((total, transaction) => {
      return total + transaction.amount
    }, 0)
  }

  useEffect(() => {
    const localUUID = localStorage.getItem("userUUID");
    if (localUUID) {
      const databaseRef = ref(db, `users/${localUUID}/transactions`);
      get(databaseRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            console.log( JSON.stringify(data))
            console.log(data)

            console.log( Object.values(data))
            setTransactionsArr( Object.values(data))
          }
        })
        .catch((error) => {
          console.error("抓資料發生錯誤", error);
        });
    } else {
      console.log("未找到用户 ID");
    }
  }, []);


  function deleteItem(transactionId) {
    console.log(transactionId)
    // 點下去那個項目的id
    setTransactionsArr((currentTodosArr) =>
      currentTodosArr.filter((todoItem) => todoItem.id !== transactionId))
       // const databaseRef = ref(db, "transactions");
      const localUUID = localStorage.getItem("userUUID")
      if (localUUID) {
        const databaseRef = ref(db, `users/${localUUID}/transactions/${transactionId}`);
  
        remove(databaseRef)
        .then(() => {
          console.log("成功刪除一筆資料");
          console.log(transactionsArr)
          setSystemMessage("成功刪除一筆資料")

        })
        .catch((error) => {
          console.error("刪除發生錯誤", error);
          setSystemMessage("刪除發生錯誤")
        });
      }else{
        console.log('沒抓到localstorage的會員id')
      }
  }


  return (
    <div>

<p className="bg-blue-100 p-3 text-white-700 font-bold text-sm flex justify-center">
  記錄
</p>

        <ul className="bg-blue-50  text-white-700 font-bold text-1xl flex flex-col items-center">
        {transactionsArr.map((transaction) => (
          <li key={transaction.id} className="my-1.5">
            <button
              onClick={() => deleteItem(transaction.id)}
              className="text-white p-1 rounded bg-blue-500 hover:bg-blue-600"
            >✕</button>
            <span
              style={{
                backgroundColor:
                  transaction.type === "expense" ? "#F05252" : "#10B981",
              }}
              className="rounded-lg p-1"
            >
              {transaction.type === "income" ? "收入" : "支出"}:{" "}
              {Math.abs(transaction.amount)}元
            </span>
            <span className="bg-blue-200 rounded-lg p-1 ">
              項目：{transaction.description}
            </span>
          </li>
        ))}
      </ul>

      <h5 className="bg-blue-100  p-3 text-white-700 font-bold text-1xl flex  justify-center">
        你的錢包:<span className="text-blue-500"> {calculateTotal()}</span>元
      </h5>
    </div>
  )
}

export default List
