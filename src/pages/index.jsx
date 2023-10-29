import Link from "next/link"
import React, { useState } from "react"

import { db } from "../config"
import { initializeApp } from "firebase/app"
import { getDatabase, ref, set } from "firebase/database"

function Home() {
  // set(ref(db, "money"), [23434, 25634, 23574])

  set(ref(db, "okkkkk/" + 123), {
    username: "狂",
    email: "狂",
    // email: email,
    // profile_picture: imageUrl
  })
  set(ref(db, "okkkkk/" + 345), {
    username: "爽",
    email: "好喔",
    // email: email,
    // profile_picture: imageUrl
  })

  return (
    <div className="p-8 border-red-500 h-full ">
      {/* <h4 className="bg-blue-200 rounded-lg p-2">歡迎使用記帳功能！</h4> */}

      <p className="text-blue-800 bg-blue-200 rounded-lg p-3 mb-3 font-bold text-2xl flex items-center justify-center">
        歡迎使用記帳功能
      </p>

      <div className="p-8 flex items-center flex items-center justify-center">
        <button className="text-white p-2 rounded bg-blue-500 hover:bg-blue-600 ">
          <Link href="/Accounting">以訪客身份使用(記帳將不會保存)</Link>
        </button>
      </div>
      {/* 
      <div className="p-8 flex items-center flex items-center justify-center">
        <button className="text-white p-2 rounded bg-blue-500 hover:bg-blue-600 ">
          <Link href="/Register">註冊會員</Link>
        </button>
      </div> */}

      <div className="p-8 flex items-center flex items-center justify-center">
        <button className="text-white p-2 rounded bg-blue-500 hover:bg-blue-600 ">
          <Link href="/MemberPage">登入/註冊</Link>
        </button>
      </div>
    </div>
  )
}

export default Home
