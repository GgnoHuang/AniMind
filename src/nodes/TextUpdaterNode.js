import { Handle, NodeProps,Position, NodeResizer} from 'reactflow';
import { useCallback, useState,useEffect } from 'react';
import useStore from '../store';


// const handleStyle = { left: 15 };

// import useStore, { NodeData } from '..//pages/FFFlow/store';

function TextUpdaterNode({id, data,isConnectable,selected }) {

  const { updateNodeData,updateNodeColor} = useStore(state => ({
    updateNodeData: state.updateNodeData,
    updateNodeColor: state.updateNodeColor,
 
  }));



  const onInpupu = (event) => {
    console.log('當前輸入：', event.target.value);
    console.log('data為：',data) 
    updateNodeData(id, { ...data, inpupu: event.target.value });
    // 這裡，...data 展開了現有的 data 對象，
    // 然後 inpupu: event.target.value 直接在新對象中添加或更新 inpupu 屬性。
    // { ...data, inpupu: event.target.value } 這整坨是是newData
    //🔥 最後也會變成一個data
    //🔥 只不過這個data的inpupu屬性變成event.target.value，
    //🔥 或者原先沒有inpupu屬性的話會加上去
  };

  const onSelectColor = (event) => {
    updateNodeColor(id, { ...data, backgroundColor: event.target.value });
  };


  return (
    <div className="text-updater-node border border-gray-300 p-2 rounded"
    style={{ 
      // backgroundColor: data.backgroundColor || 'defaultColor', // 使用data中的背景颜色，如果没有则使用默认颜色
      backgroundColor: data.backgroundColor || '#FF00FF', // 使用data中的背景颜色，如果没有则使用默认颜色
      border: '1px solid gray',
      height:'100%',// 100%才能讓resize填滿
    }}
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
      borderColor: '#FF00FF	',
    }}
       isVisible={selected} minWidth={100} minHeight={100} />

        <div style={{ height: '100%',
        // paddingBottom:'55px '
        display:'flex',
        flexDirection:'column',
        gap:'3px'
        }}> 

          <label htmlFor="text" className="block text-gray-700 text-sm">Text:</label>
          <input className=" p-1 rounded"></input>
          <textarea id="text" name="text" placeholder={data.placeholder}
          value={data.inpupu}
          // onChange={onChange}
          onChange={onInpupu}
          style={{ 
            resize:'none',
          // width: '100%',  
          height:'100%',
        }} 
          className="nodrag p-1 rounded" />



          <input
          value="#ffffff"//  如果沒給這個value會報錯，color input一定要有value
          type="color"
          defaultValue={data.color}
          onChange={onSelectColor}
          // className="nodrag"
        />
      </div>

      <div contentEditable="true"
       className="nodrag"
      style={{ minHeight: '100px', border: '1px solid #ccc', padding: '8px' }}>
  請在此處輸入文本...
</div>


      {/* <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        // style={handleStyle}
        style={{ backgroundColor: 'blue', ...handleStyle }} // 更改背景颜色为蓝色
        isConnectable={isConnectable}
      /> */}
      <Handle type="source" position={Position.Bottom} id="b" 
      style={{ backgroundColor: 'blue' ,
      width: '13px',  // 调整宽度
      height: '13px', 
    }} // 更改背景颜色为蓝色
      isConnectable={isConnectable} />
         <Handle type="target" position={Position.Top} 
        style={{ backgroundColor: 'blue' ,
        width: '13px',  // 调整宽度
        height: '13px', 
      }} 
      isConnectable={isConnectable} />
    </div>
  );
}

export default TextUpdaterNode;
