import { useCallback } from 'react';

import { Handle, NodeProps,Position, NodeResizer} from 'reactflow';

export default function CustomNode({ data,selected,isConnectable }) {
  return (
    <div 
    style={{ 
      // width: '100%',
    //  height: '100%' ,
     width: '100px',
     height: '100px', 
    backgroundColor:'white'
    }}
    // className="px-4 py-2 shadow-md rounded-md
    // bg-white border-2 border-stone-400"
    
    >
      <div className="flex">
        {/* <div className="rounded-full w-12 h-12 flex justify-center items-center bg-gray-100">
          {data.emoji}
        </div> */}
        {/* <div className="ml-2">
          <div className="text-lg font-bold">{data.name}</div>
          <div className="text-gray-500">{data.job}</div>
        </div> */}
        {/* <img src={data.imgsrc}/> */}

        <NodeResizer
          handleStyle={{width:'10px',height:'10px',backgroundColor:'red'}}
          lineStyle={{borderWidth: '5px', borderStyle: 'dashed', borderColor: '#FF00FF	',
            animation: 'blink 1s linear infinite',}}
            isVisible={selected} 
            minWidth={100}
            minHeight={100} 
            />

      </div>

      <Handle
        type="target"
        position={Position.Top}
        className=" !bg-teal-400"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-teal-400"
      />
    </div>
  );
}