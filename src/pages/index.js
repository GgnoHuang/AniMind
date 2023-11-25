import React, { useState, useEffect } from "react"
import Link from "next/link"

import { useRouter } from 'next/router';

import "firebase/auth"
import { auth,db } from "../config"
import { getDatabase, ref, set ,get} from "firebase/database"

import styles from "./index.module.css";

import Image from 'next/image'

// import Login from "../components/Login"
import LoginForm from "../components/LoginForm/LoginForm"
import RegisterForm from "../components/RegisterForm/RegisterForm"
// import Register from "../components/Register"

import LogoutBtn from "../components/LogoutBtn"
import AuthCheck from "../components/AuthCheck"

import HomeNav from "../components/HomeNav/HomeNav"
import { Background } from "reactflow"

import useStore from '../store';





export default function HomePage() {

  
  const { toggleCollageToTrue,} = useStore(state => ({
    toggleCollageToTrue: state.toggleCollageToTrue,
}));
  useEffect(() => {
    const timer = setTimeout(() => {
      toggleCollageToTrue(true)
    }, 10);
  
    return () => clearTimeout(timer); 
  }, []);



  const router = useRouter();



  const [localUserData, setLocalUserData] = useState(null)
  const [userAuth, setUserAuth] = useState(null)
  const [successMsg, setSuccessMsg] = useState(false)
  const [errMsg, setErrMsg] = useState(false)




  // 🎃🎃🎃🎃🎃   存檔   🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃

  // 🎃🎃🎃🎃🎃🎃🎃  存檔  🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃






    // 🐳🐳🐳🐳 取得存檔數量 🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳
    const [keysCount, setKeysCount] = useState(0); 
    const [btnsArr, setBtnsArr] = useState([]); 

    // const DataCntArr = [...Array(keysCount)].map((_, index) => `Item ${index + 1}`);
//不要用上面這個用for就好

    const countFFFlowData = async () => {
      // const databaseRef = ref(db, 'FFFlow');
      const localUUID = localStorage.getItem("userUUID");
      const databaseRef = ref(db, `users/${localUUID}/reactflow/FFFlow/`);
      try {
        const snapshot = await get(databaseRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log('所有資料的key：')
          console.log(Object.keys(data))
          setKeysCount(Object.keys(data).length)
      
          return ;
        } else {
          console.log('FFFlow 路徑底下沒有資料');
          // return 0;
          return;
        }
      } catch (error) {
        console.error("讀取資料發生錯誤", error);
        // return 0;
        return;
      }
    };
    useEffect(() => {
      if(userAuth!==null){    
        countFFFlowData();
        }

    }, [userAuth]);

    useEffect(() => {
      if(userAuth!==null){  
        const newBtnsArr = [];
        for (let i = 0; i < keysCount; i++) {
          newBtnsArr.push(`存檔點 ${i + 1}`);
        }
        setBtnsArr(newBtnsArr);
        console.log('新的btnarr',newBtnsArr)
      }
        // console.log('FFFlow 路徑底下的資料筆數：', keysCount);
    }, [keysCount,userAuth]);
    // 🐳🐳🐳🐳🐳 取得存檔數量 🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳
  



  

  const onSave =() => {
    if (true) {
          const localUUID = localStorage.getItem("userUUID")
        if (localUUID) {
          console.log('onsave喔')
              const databaseRef = ref(db, `users/${localUUID}/reactflow/FFFlow/${keysCount+1}`);
              set(databaseRef,'哈ㄋㄡ')
              .then(() => {
                console.log("成功存到資料庫");


                router.push(`/FFFlow/${keysCount+1}`);  // 這裡放你想要跳轉的路徑

              })
              .catch((error) => {
                console.error("儲存發生錯誤：", error);
              });
        }else{
          console.log('沒抓到localstorage的會員id')
        }
    }else{
      console.log('')
    }
}



  return (
    <div 
    
    className={styles.homepagebody}
    >
      <HomeNav localUserData={localUserData}
        setErrMsg={setErrMsg} 
        setSuccessMsg={setSuccessMsg} 
        setUserAuth={setUserAuth} 
        setLocalUserData={setLocalUserData}
      />

          {/* <img src="/backgood.png"
          className={styles.newnavimg}
          />
          <img src="/backgood.png"
          className={styles.newnavimg2}
          />
       */}

      <AuthCheck auth={auth}
        setLocalUserData={setLocalUserData}
        setUserAuth={setUserAuth}
        successMsg={successMsg}
      />
      {/* {userAuth != null ?  */}
      {userAuth == null && (


          <div className={styles.formContainer}>
            <RegisterForm />
            <LoginForm  errMsg={errMsg} setErrMsg={setErrMsg} setSuccessMsg={setSuccessMsg} successMsg={successMsg} />
        </div>
      )}

    {userAuth !== null && (
        <div className={styles.savePointContainer}>
          <button className={styles.savePoint} onClick={

            onSave
          }
          style={{backgroundColor:'red'}}
          >
            新增
          </button>
          {/* {savePoints.map((savePoint, index) => (
            <div key={index} className={styles.savePoint}>
              {savePoint}
              <button onClick={() => removeSavePoint(index)}>刪除</button>

            </div>
          ))} */}
          {btnsArr.map((savePoint, index) => (
            <div key={index} className={styles.savePoint}>
              {savePoint}
              {/* <button onClick={() => removeSavePoint(index)}>刪除</button> */}

            </div>
          ))}
        </div>

      )}


    </div>
  )
}


