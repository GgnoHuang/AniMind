// ~🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
import React, {useRef, useState,useEffect } from "react"

import ReactFlow, { ReactFlowProvider,Panel } from 'reactflow';
import useStore from '../../store';

export default function Sidebar({onRestore, saveStation,setSaveStation }) {
  // const [errMsg, setErrMsg] = useState(false)
  // const [successMsg, setSuccessMsg] = useState(false)
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
    <div className="self-center flex flex-col gap-2 border-2 border-sky-500 h-fit w-200 absolute z-50 left-3">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
        <p key={number}
          className='border-4 border-purple-200 flex justify-center items-center hover:border-sky-500 p-2 cursor-pointer'
          onClick={() =>
            
            {
              // reactFlowInstance.current.fitView(options);
              handleSaveStationChange(number)
            }}
          style={{ 
            backgroundColor: saveStation === number ? '#BE77FF' : 'white',
            transition: 'background-color 0.3s ease'}}>
              存檔{number}
        </p>
      ))}
    </div>
    
    <div>

    </div>
{/* ~~~~~~~~~~~~ */}

{/* <Panel>
<h3>數量: {howManyNodes}個</h3>

      <div className='flex flex-col'>

      {nodes.map(node => (
        <button key={node.id} 
        style={{borderColor:'red',borderWidth:'3px'}} >
          {node.data.label}節點
        </button>
      ))}
      </div>
      </Panel> */}

    {/* <h1 className="w-64">{saveStation}</h1> */}
  </>
  )
}


