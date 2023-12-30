import React, { useState,useEffect } from "react"
 // 👗👗👗👗👗👗zustand
import useStore from '../../store';
 // 👗👗👗👗👗👗zustand

import { createUserWithEmailAndPassword, signOut } from "firebase/auth"

// import { db,auth } from "../../config"
import { auth,db,signInWithGoogle } from "../../config"

import { getDatabase, ref, set ,get} from "firebase/database"
// import { auth } from "../../config" 

import styles from "./RegisterForm.module.css";

function Register() {



  // 👗👗👗👗👗👗👗👗👗👗👗zustand👗👗👗👗👗👗👗👗👗👗
  const { showRegisterForm,toggleForm
    ,showCollage,toggleCollage,
    errMsg,setErrMsg,successMsg,setSuccessMsg,

  } = useStore(state => ({
      toggleForm: state.toggleForm,
      showRegisterForm: state.showRegisterForm,
      showCollage: state.showCollage,
      toggleCollage: state.toggleCollage,
      errMsg: state.errMsg,
      setErrMsg: state.setErrMsg,
      setSuccessMsg: state.setSuccessMsg,
      successMsg: state.successMsg,
 }));

//  useEffect(() => {
//   const timer = setTimeout(() => {
//       toggleCollage();
//   }, 100);

//   return () => clearTimeout(timer); 
// }, []);


 const handleToggleFormClick = () => {
  toggleForm();
  toggleCollage();
};


 // 👗👗👗👗👗👗👗👗👗zustand👗👗👗👗👗👗👗👗👗👗👗👗


  const [err, setErr] = useState(false)
  const [success, setSuccess] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    const username = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value

    setSuccess(false)
    setErr(false)
    try {
      const firebaseRES = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      // console.log(firebaseRES.user)
      if (firebaseRES.user) {
        // console.log(firebaseRES.user.uid)
        set(ref(db, `users/${firebaseRES.user.uid}`), {
          username: username,
          email: email,
          password: password,
        })

        signOut(auth) // 不寫這個的話會自動登入
        alert("註冊成功，請進行登入")
        setSuccess(true)
      }
    } catch (err) {
      setErr(true)
      alert("註冊失敗")
    }
  }


  const handleGoogleLogin=async()=>{
    setSuccessMsg(false)
    setErrMsg(false)
    try{
      await signInWithGoogle();
      console.log("登入成功");
      setSuccessMsg(true)
    
    }catch (error){
      setErrMsg(true)
      console.log("登入失敗", error);
    }

  }



  return (
    // <div className={showRegisterForm ? 'visible' : 'hidden'}>

    // <div className={styles.formwrapper}>

    <div className={showRegisterForm ? styles.hiddenFormwrapper : styles.visibleFormwrapper}>



    

      <form onSubmit={handleSubmit}>
      <div className="input-container-wrapper">
        <div className="input-container">
        <div className={styles.inputcontainer}>
          
        <img src="/smallflowerr.webp" 
            // className={styles.letsstart}
            className={showCollage ? styles.hiddenletsstart : styles.letsstart}
            />


            <div className={styles.signintext}>
                Sign up
            </div>

          <div className={styles.nameinput}>
            <div className="cool-input-div">
              <input 
              autoComplete="username"
              className="cool-input" type="text" placeholder="Username"/>
              <span className="cool-bottom cool-span"></span>
              <span className="cool-right cool-span"></span>
              <span className="cool-top cool-span"></span>
              <span className="cool-left cool-span"></span>
            </div>
          </div>

            <div className={styles.mailinput}>
              <div className="cool-input-div">
              <input
                              autoComplete="Email"

              className="cool-input" type="text" placeholder="Email"/>
              <span className="cool-bottom cool-span"></span>
              <span className="cool-right cool-span"></span>
              <span className="cool-top cool-span"></span>
              <span className="cool-left cool-span"></span>
            </div>
          </div>

          <div className={styles.passwordinput}>      
              <div className="cool-input-div">
                <input
                                autoComplete="current-password"
                className="cool-input" type="password" placeholder="Password: 6+ chars."/>
                <span className="cool-bottom cool-span"></span>
                <span className="cool-right cool-span"></span>
                <span className="cool-top cool-span"></span>
                <span className="cool-left cool-span"></span>
              </div>
          </div>

            <div className=" flex items-center flex items-center justify-center">
              <button className={styles.registerbtn}>
              Register</button>
            </div>
            <p 
                      onClick={handleToggleFormClick}
            className={styles.alreadyhaveaccount}>Already have an account?</p>
            <p className={styles.or}>
or 
</p>

            <div className=" flex items-center flex items-center justify-center">
              <button type="button" className={styles.registerbtn} 
              onClick={handleGoogleLogin}
              >
                  <img src="/google.webp" 
            style={{ height:'17px',width:'17px',marginRight:'7px'}}
            />
              Continue with Google</button>
            </div>

          </div>
        </div>
      </div>
        {err && <p>註冊失敗</p>}
        {success && <p>註冊成功</p>}
      </form>
    </div>
    // </div>
  )
}

export default Register
