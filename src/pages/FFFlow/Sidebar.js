// ~🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
import React, { useState } from "react"
import { auth } from "../../config"

import { signInWithEmailAndPassword } from "firebase/auth"
import { getDatabase, ref, get } from "firebase/database"
import { db } from "../../config"

export default function Sidebar({  }) {
  // const [errMsg, setErrMsg] = useState(false)
  // const [successMsg, setSuccessMsg] = useState(false)

  return (

      <div className=" self-center flex flex-col gap-2 border-2 border-sky-500 h-fit w-200 absolute z-50 left-3">
        <p className='border-2 border-purple-500 flex justify-center items-center hover:bg-blue-500 p-2 cursor-pointer'>嗨</p>
        <p className='border-2 border-purple-500 flex justify-center items-center hover:bg-blue-500 p-2 cursor-pointer'>嗨</p>
        <p className='border-2 border-purple-500 flex justify-center items-center hover:bg-blue-500 p-2 cursor-pointer'>嗨</p>
        <p className='border-2 border-purple-500 flex justify-center items-center hover:bg-blue-500 p-2 cursor-pointer'>嗨</p>
        <p className='border-2 border-purple-500 flex justify-center items-center hover:bg-blue-500 p-2 cursor-pointer'>嗨</p>
        <p className='border-2 border-purple-500 flex justify-center items-center hover:bg-blue-500 p-2 cursor-pointer'>嗨</p>
        <p className='border-2 border-purple-500 flex justify-center items-center hover:bg-blue-500 p-2 cursor-pointer'>嗨</p>
        <p className='border-2 border-purple-500 flex justify-center items-center hover:bg-blue-500 p-2 cursor-pointer'>嗨</p>
      </div>

  )
}


