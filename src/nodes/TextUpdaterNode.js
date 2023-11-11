import { Handle, NodeProps,Position, } from 'reactflow';
import { useCallback, useState,useEffect } from 'react';

const handleStyle = { left: 15 };

// import useStore, { NodeData } from '..//pages/FFFlow/store';

function TextUpdaterNode({ data,isConnectable }) {


  const onInpupu = (event) => {
    console.log('當前輸入：', event.target.value);
    console.log('data為：',data) 
//     data.setInpupu(event.target.value)
// dfjd;sa

  };

  return (
    <div className="text-updater-node bg-teal-300 border border-gray-300 p-2 rounded">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      {/* handle接受的參數是啥意思 */}
      <div>
        <label htmlFor="text" className="block text-gray-700 text-sm">Text:</label>
        <textarea id="text" name="text" placeholder={data.placeholder}

        // onChange={onChange}
        onChange={onInpupu}
         className="nodrag p-1 rounded" />
      </div>
   
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        // style={handleStyle}
          style={{ backgroundColor: 'blue', ...handleStyle }} // 更改背景颜色为蓝色
        isConnectable={isConnectable}
      />
      <Handle type="source" position={Position.Bottom} id="b" 
      style={{ backgroundColor: 'blue' }} // 更改背景颜色为蓝色

      isConnectable={isConnectable} />
    </div>
  );
}

export default TextUpdaterNode;
