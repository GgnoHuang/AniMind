




import { Handle, Position } from 'reactflow';
import { useCallback, useState,useEffect } from 'react';


const handleStyle = { left: 15 };

function TextUpdaterNode({ data, isConnectable }) {
  // const onChange = 
  // useCallback((evt) => {
  //   console.log(evt.target.value);
  // }, []);


  

  return (
    <div className="text-updater-node bg-teal-300 border border-gray-300 p-2 rounded">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      {/* handle接受的參數是啥意思 */}
      <div>
        <label htmlFor="text" className="block text-gray-700 text-sm">Text:</label>
        <textarea id="text" name="text" placeholder={data.value}

        // onChange={onChange}
        onChange={data.onInpupu}
         className="nodrag p-1 rounded" />
      </div>
       <div className="text-updater-node bg-teal-300 border border-gray-300 p-2 rounded">
      {/* <img src='../../public/images/gg.jpg' alt="Custom Node" style={{ width: '100%', height: '100%' }} /> */}
      {/* <img src='https://www.travel.taipei/d_upload_ttn/cms/TaipeiMap20150706.jpg?fbclid=IwAR0DClRTdG6V6Fgz0aU1gTB8mmTBKGKJN7jnsDUAMBO8xBqns2sFyBPbZxQ' alt="Custom Node" style={{ width: '100%', height: '100%' }} /> */}
     
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
