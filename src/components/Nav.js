// ~🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
import React, {useRef, useState,useEffect } from "react"

import ReactFlow, { ReactFlowProvider,Panel } from 'reactflow';
import useStore from '../store';

export default function Sidebar({
}) {
  useEffect(() => {

  }, []);



  return (
    <Panel>
      <div style={{heigh:'300px',border:'2px blue solid',display:'flex',backgroundColor:'green',
      justifyContent:"space-between" }} >
          <div  style={{
            heigh:'300px',
            border:'2px blue solid',
            backgroundColor:'green' }} >
              哈
          </div>
          <div  style={{

            border:'2px blue solid',
            backgroundColor:'green',
            display:'flex'
            }} >
              <div>設定</div>
              <div>登出</div>
       
          </div>
      </div>
  
      </Panel>

  )
}


