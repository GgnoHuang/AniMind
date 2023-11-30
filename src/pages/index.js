import React, { useState, useEffect } from "react"
import Link from "next/link"

import { useRouter } from 'next/router';

import "firebase/auth"
import { auth,db } from "../config"
import { getDatabase, ref, set ,get,remove} from "firebase/database"

import styles from "./index.module.css";

import Image from 'next/image'

import LoginForm from "../components/LoginForm/LoginForm"
import RegisterForm from "../components/RegisterForm/RegisterForm"

import LogoutBtn from "../components/LogoutBtn/LogoutBtn"
import AuthCheck from "../components/AuthCheck"

import HomeNav from "../components/HomeNav/HomeNav"
import { Background } from "reactflow"

import useStore from '../store';



export default function HomePage() {


  // 🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀
  const [isLoading, setIsLoading] = useState(true); // 初始时设置为 true

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


    // 🐳🐳🐳🐳 取得存檔數量 🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳
    const [keysCount, setKeysCount] = useState(0); 
    const [btnsArr, setBtnsArr] = useState([]); 

    // const DataCntArr = [...Array(keysCount)].map((_, index) => `Item ${index + 1}`);
//不要用上面這個用for就好

    const countFFFlowData = async () => {
      // 🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀

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
          console.log('所有資料的key⬇️⬇️⬇️⬇️⬇️⬇️')
          console.log(Object.keys(data))
          console.log('所有資料的key⬆️⬆️⬆️⬆️⬆️⬆️')
          setKeysCount(Object.keys(data).length) 


          const snapshotDataKeys = Object.keys(data);
          const sortedDataKeys = snapshotDataKeys.sort((a, b) => b - a);
          setBtnsArr(sortedDataKeys);


          // setBtnsArr(Object.keys(data));

          return ;
        } else {
          setBtnsArr([]);
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
      if(localStorage.getItem("userUUID")){    
        console.log('有執行countFFFlowData')
        console.log(1)
        countFFFlowData();
        }
    }, [successMsg]);

    useEffect(() => {
      if(btnsArr.length!==0){
        setIsLoading(false);
        console.log('▶️🟨載入完畢')
      }
    }, [btnsArr]);

 

  



  const onSave =() => {
          const localUUID = localStorage.getItem("userUUID")
        if (localUUID) {
            const timestamp = Date.now(); // 获取当前时间的时间戳

              const databaseRef = ref(db, `users/${localUUID}/reactflow/FFFlow/${timestamp}`);
              const flowDataName = ref(db, `users/${localUUID}/reactflow/flowDataName/${timestamp}`);
              Promise.all([
                set(databaseRef, '{"nodes":[],"edges":[],"viewport":{"x":0,"y":0,"zoom":1}}'),
                set(flowDataName, timestamp)
              ])
              .then(() => {
                console.log("---成功存到資料庫---");
                router.push(`/FFFlow/${timestamp}`); // 這裡放你想要跳轉的路徑
              })
              .catch((error) => {
                console.error("儲存發生錯誤：", error);
              });

        }else{
          console.log('沒抓到localstorage的會員id')
        }
}


const onDelete = (timestamp) => {
  const localUUID = localStorage.getItem("userUUID");
  if (localUUID && timestamp) {
    const databaseRef = ref(db, `users/${localUUID}/reactflow/FFFlow/${timestamp}`);

    remove(databaseRef)
      .then(() => {
        console.log("---成功删除---");
        countFFFlowData()
      })
      .catch((error) => {
        console.error("删除发生错误：", error);
      });
  } else {
    console.log('缺少必要的用户ID或时间戳');
  }
};




const reDirect =(query) => {
        const localUUID = localStorage.getItem("userUUID")
      if (localUUID) {
        router.push(`/FFFlow/${query}`);  // 這裡放你想要跳轉的路徑
      }else{
        console.log('沒抓到localstorage的會員id')
      }
    }


  
        return (
          <div className={styles.homepagebody}>
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
    
      
            {userAuth !== null && (
              <div className={styles.savePointContainerwWapper}>
              <div className={styles.savePointContainer}>
                <div className={styles.addbtn}>
                <button className={styles.addbtnn} onClick={onSave}>
                  Add
                </button>
                </div>

      
                {btnsArr.map((savePoint, index) => (
                  <div 
                  onClick={()=>{reDirect(savePoint)}}
                  key={index} className={styles.savePoint}>
                        {new Date(Number(savePoint)).toLocaleString('zh-TW', { 
                            year: 'numeric', month: 'numeric', day: 'numeric'
                        })}
                        <br/>
                        {new Date(Number(savePoint)).toLocaleString('zh-TW', { 
                          hour: 'numeric', minute: 'numeric' 
                        })}
                    <div onClick={
                      
                      (e)=>{
                        e.stopPropagation(); // 阻止事件冒泡
                
                        onDelete(savePoint)
      
                      }} 
                      className={styles.deletebtn}>
                      <img src="/delete.png" />

                      </div>
                  </div>
                ))}
              </div>
              </div>
            )}

            {userAuth == null && (
              <div className={styles.formContainer}>
                <RegisterForm />
                <LoginForm  errMsg={errMsg} setErrMsg={setErrMsg} setSuccessMsg={setSuccessMsg} successMsg={successMsg} />
              </div>
            )}
      
          </div>
        )
}


