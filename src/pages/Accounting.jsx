import React, { useState } from "react"
import Link from "next/link"

import Form from "../components/Form"
import List from "../components/List"

function Accounting() {
  const [transactionsArr, setTransactionsArr] = useState([])
  // 兩個組件共通的就只有這個列表，所以把這個放在父元件

  return (
    <div>
      <p className="text-blue-800 bg-blue-200 rounded-lg p-3 mb-3 font-bold text-2xl flex items-center justify-center">
        開始記帳
      </p>

      <Form
        transactionsArr={transactionsArr}
        setTransactionsArr={setTransactionsArr}
      />

      <List
        transactionsArr={transactionsArr}
        setTransactionsArr={setTransactionsArr}
      />
      <div
        className="p-8 flex items-center
        flex items-center justify-center"
      >
        <button className="text-white p-2 rounded bg-blue-500 hover:bg-blue-600 ">
          <Link href="/">返回首頁</Link>
        </button>
      </div>
    </div>
  )
}

export default Accounting
