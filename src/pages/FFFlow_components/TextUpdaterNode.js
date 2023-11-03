// import { useCallback } from 'react';
// import { Handle, Position } from 'reactflow';

// const handleStyle = { left: 10 };

// function TextUpdaterNode({ data, isConnectable }) {
//   const onChange = useCallback((evt) => {
//     console.log(evt.target.value);
//   }, []);

//   return (
//     <div className="text-updater-node">
//       <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
//       <div>
//         <label htmlFor="text">Text:</label>
//         <input id="text" name="text" onChange={onChange} className="nodrag" />
//       </div>
//       <Handle
//         type="source"
//         position={Position.Bottom}
//         id="a"
//         style={handleStyle}
//         isConnectable={isConnectable}
//       />
//       <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
//     </div>
//   );
// }

// export default TextUpdaterNode;





import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 15 };

function TextUpdaterNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="text-updater-node bg-teal-300 border border-gray-300 p-2 rounded">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      {/* handle接受的參數是啥意思 */}
      <div>
        <label htmlFor="text" className="block text-gray-700 text-sm">Text:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag p-1 rounded" />
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
