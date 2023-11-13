// ~🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
import React, { useState,useEffect } from "react"


export default function Sidebar({onRestore, saveStation,setSaveStation }) {
  // const [errMsg, setErrMsg] = useState(false)
  // const [successMsg, setSuccessMsg] = useState(false)




  const handleSaveStationChange = (newSaveStation) => {
    setSaveStation(newSaveStation);
  };

  // 如果onRestore也是一個非同步，要怎麼確保他可以在setSaveStation之後才執行
  useEffect(() => {
    // 每當 saveStation 更新後，調用 onRestore
    onRestore();
  }, [saveStation]); // 依賴列表包含 saveStation 和 onRestore



  return (
  <>
    <div className="self-center flex flex-col gap-2 border-2 border-sky-500 h-fit w-200 absolute z-50 left-3">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
        <p key={number}
          className='border-4 border-purple-200 flex justify-center items-center hover:border-sky-500 p-4 cursor-pointer'
          onClick={() => handleSaveStationChange(number)}


          style={{ 
            backgroundColor: saveStation === number ? '#BE77FF' : 'white',
            transition: 'background-color 0.3s ease'

          }}
        >
          存檔{number}
        </p>
      ))}
    </div>
    
    <div>
<blockquote contentEditable="true">
  <p>Edit this content to add your own quote</p>
</blockquote>

<cite contentEditable="true" 
// onClick={(e) => e.stopPropagation()}
>
  -- Write your own name here
  </cite>
    </div>

    <h1>{saveStation}</h1>
  </>
  )
}


