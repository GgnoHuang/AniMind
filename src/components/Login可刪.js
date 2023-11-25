// // ~🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
// import React, { useState } from "react"
// import { auth } from "../config"

// import { signInWithEmailAndPassword } from "firebase/auth"
// import { getDatabase, ref, get } from "firebase/database"
// import { db } from "../config"

// function Login({ errMsg, setErrMsg,setSuccessMsg,successMsg }) {
//   // const [errMsg, setErrMsg] = useState(false)
//   // const [successMsg, setSuccessMsg] = useState(false) 
  

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     const email = e.target[0].value
//     const password = e.target[1].value

//     setSuccessMsg(false)
//     setErrMsg(false)
//     try {
//       const loginRes = await signInWithEmailAndPassword(auth, email, password)
//       // console.log(loginRes.user)
//       console.log(loginRes.user.uid)
//       // 登入成功就去抓這個帳號的uid👆 👆 👆

//       // 然後再拿uid去 資料庫抓會員的資料👇 👇 👇
//       const userUUID = loginRes.user.uid
//       const snapshot = await get(ref(db, `users/${userUUID}`))

//       if (snapshot.exists()) {
//         const userData = snapshot.val()
//         console.log("成功從資料庫抓到會員資料，並放入local:", userData)
//         localStorage.setItem("userData", JSON.stringify(userData))
//         localStorage.setItem("userUUID", userUUID)
//         setSuccessMsg(true)

//       // 一登入沒辦法渲染會員資料是正常，因為這裡做的動作只有 localStorage.setItem而已
// // 所以要再setLocalUserData(parsedData)

//       } else {
//         alert("沒抓到會員資料")
//         setErrMsg(true)
//       }
//     } catch (loginErr) {
//       setErrMsg(true)
//       console.log("登入失敗", loginErr)
//     }
//   }

//   return (
//     <div>

//       <div className="p-1 flex items-center flex items-center justify-center">
//         <p className=" text-white p-2 rounded ">登入</p>
//       </div>

//       <form onSubmit={handleSubmit}>


//       <div className="input-container-wrapper">
//         <div className="input-container">

//             <div className="cool-input-div">
//               <input className="cool-input" type="text" placeholder="email"/>
//               <span className="cool-bottom cool-span"></span>
//               <span className="cool-right cool-span"></span>
//               <span className="cool-top cool-span"></span>
//               <span className="cool-left cool-span"></span>
//             </div>
//             <div className="cool-input-div">
//               <input className="cool-input" type="password" placeholder="密碼至少包含6個字"/>
//               <span className="cool-bottom cool-span"></span>
//               <span className="cool-right cool-span"></span>
//               <span className="cool-top cool-span"></span>
//               <span className="cool-left cool-span"></span>
//             </div>
//             <div className="p-3 flex items-center flex items-center justify-center">
//             <button className=" text-white p-1 rounded bg-blue-500 hover:bg-blue-600 ">登入</button>
//             </div>

//         </div>
//       </div>

//         {/* <button className="nes-btn">登入</button> */}
//         {errMsg && <p>登入失敗</p>}
//         {successMsg && <p>登入成功</p>}
//       </form>
//     </div>
//   )
// }

// export default Login
