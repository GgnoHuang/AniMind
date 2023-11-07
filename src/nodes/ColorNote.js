import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

export default function Good({ data,isConnectable }) {
  return (
    <div style={{ padding: '15px' ,backgroundColor:data.memoColor}}  >
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <div  style={{ padding: '5px' }}>
      🌈🌈選取背景顏色🌈🌈 <strong>{data.color}</strong>
      </div>
      <input className="nodrag" type="color" onChange={data.onSelectColor}  />

      <div >
      🌈🌈選取小地圖顏色🌈🌈 <strong>{data.color}</strong>
      </div>
      <input className="nodrag" type="color" onChange={data.onSelectMemoColor}  />
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{ top: 10, background: '#555' }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        style={{ bottom: 10, top: 'auto', background: '#555' }}
        isConnectable={isConnectable}
      />
    </div>
  );
}