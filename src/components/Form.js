import React, { useState } from "react"

function Form({ transactionsArr, setTransactionsArr }) {
  const [type, setType] = useState("expense")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [systemMessage, setSystemMessage] = useState("")

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
      setTransactionsArr([...transactionsArr, newTransaction])
      console.log(newTransaction)

      setAmount("")
      setDescription("")
    } else {
      setSystemMessage("欄位請勿空白")
    }
  }

  return (
    <div>
      <div
        className="bg-gray-400 rounded-lg p-3  mb-3
       flex items-center justify-center"
      >
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="expense">支出</option>
          <option value="income">收入</option>
        </select>
        <input
          type="text"
          placeholder="項目"
          value={description}
          onChange={handleDescriptionChange}
        />
        <input
          type="text"
          placeholder="金額"
          value={amount}
          onChange={handleAmountChange}
        />
        <button
          onClick={handleAddTransaction}
          class="text-white p-1 rounded bg-blue-500 hover:bg-blue-600"
        >
          新增
        </button>
      </div>

      {systemMessage && (
        <h4 className="my-1.5 text-red-500  mb-3  flex  justify-center">
          {systemMessage}
        </h4>
      )}
    </div>
  )
}

export default Form
