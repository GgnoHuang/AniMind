// ~🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
import React, {useRef, useState,useEffect } from "react"

import ReactFlow, { ReactFlowProvider,Panel } from 'reactflow';
import useStore from '../store';

export default function Sidebar({onRestore, saveStation,setSaveStation }) {

  const { nodes, howManyNodes } = useStore(state => ({
    nodes: state.nodes,
    howManyNodes: state.howManyNodes,
  }));


  const handleSaveStationChange = (newSaveStation) => {
    setSaveStation(newSaveStation);
  };

  // 如果onRestore也是一個非同步，要怎麼確保他可以在setSaveStation之後才執行
  useEffect(() => {
    // 每當 saveStation 更新後，調用 onRestore
    onRestore();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveStation]); // 依賴列表包含 saveStation 和 onRestore



  return (
  <>


<Panel>

    <div 
      style={{ 
            position:'relative',

          }} >
      {[1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
        <p key={number}
          className='border-4 border-purple-200 flex justify-center items-center hover:border-sky-500 p-2 cursor-pointer'
          onClick={() =>
            
            { handleSaveStationChange(number)}}
          style={{ 
            backgroundColor: saveStation === number ? '#BE77FF' : 'white',
            transition: 'background-color 0.3s ease'}}>
              {number}
        </p>
      ))}
    </div>
  
      </Panel>
  </>
  )
}


