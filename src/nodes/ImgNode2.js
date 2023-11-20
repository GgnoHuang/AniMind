/* eslint-disable react/jsx-no-undef */
import Image from 'next/image'

import { useCallback } from 'react';
import { Handle, NodeProps,Position, NodeResizer,NodeToolbar} from 'reactflow';

export default function CustomNode({ data,selected }) {
  return (
    <div style={{
     height: '100%'
       }}
    // className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400"
    >
      <NodeResizer
        handleStyle={{
          width:'10px',
          height:'10px',
          backgroundColor:'red'
        }}
        lineStyle={{
          borderWidth: '5px',  // 設置邊界線寬度
          borderStyle: 'dashed', // 設置邊界線樣式
          animation: 'blink 1s linear infinite', // 這會讓邊界線閃爍
          borderColor: 'yellow	',
        }}
       isVisible={selected} minWidth={100} minHeight={100} />

        {/* <div className="flex">
          <div className="rounded-full w-12 h-12 flex justify-center items-center bg-gray-100">
            {data.emoji}
          </div>
          <div className="ml-2">
            <div className="text-lg font-bold">{data.name}</div>
            <div className="text-gray-500">{data.job}</div>
          </div>
          <img src='./peng.png'/>
        </div> */}
      {/* <img 
          style={{ 
            width:'100%',
            height:'100%',// 100%才能讓resize填滿
          }}
        // src='./peng.png'/>
        src={data.pokemonpng ? data.pokemonpng : './gg.jpg'} />  */}
     <Image
        src={data.pokemonpng ? data.pokemonpng : '/gg.jpg'}
        width={100}
        height={100}
        alt="Picture"
        style={{
          width: '100%',  
          height: '100%', 
        }} 
      />

      {/* <div 
       style={{ 

        height:'100%'}}
      >
      <svg 
      width="100%" 
      height="100%"
       viewBox="0 0 100 100">
        <polygon points="50,0 100,100 0,100" fill="blue" />
      </svg>

      </div> */}

<NodeToolbar >
        <button>ok</button>

      </NodeToolbar>
      <Handle
        type="target"
        position={Position.Top}
        className=" !bg-teal-400"
        style={{
          width: '18px',  // 调整宽度
          height: '18px', 
        }} 
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className=" !bg-teal-400"
        style={{
        width: '18px',  // 调整宽度
        height: '18px', 
      }} 
      />
    </div>
  );
}