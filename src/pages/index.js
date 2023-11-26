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
  // 🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀
  console.log(1)
  // 🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀

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
      // 🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀
        console.log(2)
  // 🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀
      // const databaseRef = ref(db, 'FFFlow');
      const localUUID = localStorage.getItem("userUUID");
      const databaseRef = ref(db, `users/${localUUID}/reactflow/FFFlow/`);
      try {
        console.log(3)
        const snapshot = await get(databaseRef);
        if (snapshot.exists()) {
          console.log(4)
          const data = snapshot.val();
          console.log('所有資料的key：')
          console.log(Object.keys(data))
          setKeysCount(Object.keys(data).length) 
          return ;
        } else {

          console.log('FFFlow 路徑底下沒有資料');
          return;
        }
      } catch (error) {
        console.error("讀取資料發生錯誤", error);
        // return 0;
        return;
      }
    };
    useEffect(() => {
      // countFFFlowData();

      if(localStorage.getItem("userUUID")){    
        console.log('有執行countFFFlowData')
        console.log(1)
        countFFFlowData();
        }
    }, [successMsg]);


    // if(userAuth){    
    //   console.log('有執行countFFFlowData')
    //   console.log(1)
    //   countFFFlowData();
    //   }

    useEffect(() => {
      if(localStorage.getItem("userUUID")){    
      // if(userAuth!==null){  
        const newBtnsArr = [];
        for (let i = 0; i < keysCount; i++) {
          newBtnsArr.push(`存檔點 ${i + 1}`);
        }
        setBtnsArr(newBtnsArr);
        console.log('新的btnarr',newBtnsArr)
      }

        // console.log('FFFlow 路徑底下的資料筆數：', keysCount);
    // }, [keysCount,userAuth]);
    }, [keysCount]);
    // 🐳🐳🐳🐳🐳 取得存檔數量 🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳
  



  const onSave =() => {
    if (true) {
          const localUUID = localStorage.getItem("userUUID")
        if (localUUID) {
            const timestamp = Date.now(); // 获取当前时间的时间戳

              const databaseRef = ref(db, `users/${localUUID}/reactflow/FFFlow/${timestamp}`);
              set(databaseRef,'{"nodes":[],"edges":[],"viewport":{"x":0,"y":0,"zoom":1}}')

              .then(() => {
                console.log("成功存到資料庫哈ㄋㄡ");


                router.push(`/FFFlow/${timestamp}`);  // 這裡放你想要跳轉的路徑

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









        <AuthCheck auth={auth}
        setLocalUserData={setLocalUserData}
        setUserAuth={setUserAuth}
        successMsg={successMsg}
      />

      <HomeNav localUserData={localUserData}
        setErrMsg={setErrMsg} 
        setSuccessMsg={setSuccessMsg} 
        setUserAuth={setUserAuth} 
        setLocalUserData={setLocalUserData}
        setKeysCount={setKeysCount}
        setBtnsArr={setBtnsArr}

      />

          {/* <img src="/backgood.png"
          className={styles.newnavimg}
          />
          <img src="/backgood.png"
          className={styles.newnavimg2}
          />
       */}

   
      {/* {userAuth != null ?  */}
      {userAuth == null && (


          <div className={styles.formContainer}>
            <RegisterForm />
            <LoginForm  errMsg={errMsg} setErrMsg={setErrMsg} setSuccessMsg={setSuccessMsg} successMsg={successMsg} />
        </div>
      )}

    {userAuth !== null && (
        <div className={styles.savePointContainer}>
          <button className={styles.savePoint}
            onClick={onSave}
            style={{backgroundColor:'red'}}>
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


