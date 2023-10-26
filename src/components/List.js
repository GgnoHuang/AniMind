import React, { useState } from "react"

function List({ transactionsArr, setTransactionsArr }) {
  const calculateTotal = () => {
    return transactionsArr.reduce((total, transaction) => {
      return total + transaction.amount
    }, 0)
  }
  function deleteItem(id) {
    console.log(id)
    // 點下去那個項目的id
    setTransactionsArr((currentTodosArr) =>
      currentTodosArr.filter((todoItem) => todoItem.id !== id)
    )
  }

  return (
    <div>
      <h5 className="bg-blue-200 rounded-lg p-2 text-gray-700 font-bold text-1xl flex  justify-center">
        記錄
      </h5>
      <ul>
        {transactionsArr.map((transaction) => (
          <li key={transaction.id} class="my-1.5">
            <button
              onClick={() => deleteItem(transaction.id)}
              class="text-white p-1 rounded bg-blue-500 hover:bg-blue-600"
            >
              ✕
            </button>
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
      <h5
        className="bg-blue-200 rounded-lg p-2 
          text-gray-700
        font-bold text-1xl flex  justify-center
        "
      >
        你的錢包: {calculateTotal()}元
      </h5>
    </div>
  )
}

export default List
