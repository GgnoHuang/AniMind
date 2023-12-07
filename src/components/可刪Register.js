// import React, { useState } from "react"


// import { createUserWithEmailAndPassword, signOut } from "firebase/auth"
// import { db } from "../config"
// import { getDatabase, ref, set ,get} from "firebase/database"
// import { auth } from "../config" 

// // import styles from "./RegisterForm.module.css";

// function Register() {
//   const [err, setErr] = useState(false)
//   const [success, setSuccess] = useState(false)
//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     const username = e.target[0].value
//     const email = e.target[1].value
//     const password = e.target[2].value

//     setSuccess(false)
//     setErr(false)
//     try {
//       const firebaseRES = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       )

//       console.log(firebaseRES.user)
//       if (firebaseRES.user) {
//         console.log(firebaseRES.user.uid)
//         set(ref(db, `users/${firebaseRES.user.uid}`), {
//           username: username,
//           email: email,
//           password: password,
//         })

//         signOut(auth) // 不寫這個的話會自動登入
//         alert("註冊成功，請進行登入")
//         setSuccess(true)
//       }
//     } catch (err) {
//       setErr(true)
//       alert("註冊失敗")
//     }
//   }

//   return (
//     <div>
//       <div className="p-2 flex items-center flex items-center justify-center">
//         <p className=" text-white p-2 rounded ">註冊會員</p>

//       </div>

//       <form onSubmit={handleSubmit}>

//       <div className="input-container-wrapper">
//         <div className={styles.inputcontainer}>
          
//           <div className={styles.namecontainer}>
//           <div className="cool-input-div">
//               <input className="cool-input" type="text" placeholder="用戶名"/>
//               <span className="cool-bottom cool-span"></span>
//               <span className="cool-right cool-span"></span>
//               <span className="cool-top cool-span"></span>
//               <span className="cool-left cool-span"></span>
//             </div>
//           </div>


//             <div className={styles.mailcontainer}>
//             <div className="cool-input-div">
//               <input className="cool-input" type="text" placeholder="email"/>
//               <span className="cool-bottom cool-span"></span>
//               <span className="cool-right cool-span"></span>
//               <span className="cool-top cool-span"></span>
//               <span className="cool-left cool-span"></span>
//             </div>
//             </div>

//             <div className={styles.passwordcontainer}>
//             <div className="cool-input-div">
//               <input className="cool-input" type="text" placeholder="密碼至少包含6個字"/>
//               <span className="cool-bottom cool-span"></span>
//               <span className="cool-right cool-span"></span>
//               <span className="cool-top cool-span"></span>
//               <span className="cool-left cool-span"></span>
//             </div>
//             </div>
          


//             <div className="p-3 flex items-center flex items-center justify-center">
//             <button className=" text-white p-1 rounded bg-blue-500 hover:bg-blue-600 ">註冊</button>
//             </div>

//         </div>
//       </div>
//         {err && <p>註冊失敗</p>}
//         {success && <p>註冊成功</p>}
//       </form>
//     </div>
//   )
// }

// export default Register
