import { Handle, NodeProps,Position, NodeResizer} from 'reactflow';
import { useCallback, useState,useEffect ,useRef} from 'react';
import useStore from '../store';


// const handleStyle = { left: 15 };

// import useStore, { NodeData } from '..//pages/FFFlow/store';

function TextUpdaterNode({id, data,isConnectable,selected }) {

  const { updateNodeData,updateNodeColor,isAnyNodeSelected} = useStore(state => ({
    updateNodeData: state.updateNodeData,
    updateNodeColor: state.updateNodeColor,
    isAnyNodeSelected: state.isAnyNodeSelected,
 
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



  useEffect(() => { 
    setTimeout(()=>{
      document.querySelector('.userRestoreInput').innerHTML="<p>喔喔</p><p>是喔恩恩恩<br></p><p><br></p>哈姆可愛<p><br></p><p>哈哈哈</p><p><br></p>"
      console.log(document.querySelector('.userRestoreInput').innerHTML)

    }
      , 0)
  }, []); 
  
  // ✨const [minHeight, setMinHeight] = useState(100);
  // ✨const containerRef = useRef(null); // 引用最外层容器


  // ✨useEffect(() => {
  //   const resizeObserver = new ResizeObserver(entries => {
  //     for (let entry of entries) {
  //       const { height } = entry.contentRect;
  //       setMinHeight(height); // 更新 minHeight 以匹配容器高度
  //     }
  //   });

  //   if (containerRef.current) {
  //     resizeObserver.observe(containerRef.current); // 监听最外层容器的大小变化
  //   }

  //   return () => resizeObserver.disconnect(); // 清理工作
  // }, []);

  return (
    <>
        <NodeResizer
          handleStyle={{width:'15px',height:'15px',backgroundColor:'red'}}
          lineStyle={{borderWidth: '5px', borderStyle: 'dashed', borderColor: '#FF00FF	',
            animation: 'blink 1s linear infinite', }}
            isVisible={selected}
            minHeight={100}
            minWidth={100}

            />
 
    <div 
    // className="text-updater-node border border-gray-300 p-2 rounded"
    // 出bug再把text-updater-node ，我現在不知道他是做啥用的
    className=" "
    style={{ 

      backgroundColor: data.backgroundColor || '#FF00FF', // 使用data中的背景颜色，如果没有则使用默认颜色
      border: '1px solid gray',
      overflow:'hidden',
      // height:'fit-content',
      height:'100%',
    }}
    >  

  

          {/* 
                  <div style={{ height: '100%',
                  // paddingBottom:'55px '
                  display:'flex',
                  flexDirection:'column',
                  gap:'3px'
                  }}>  */}

          {/* <label htmlFor="text" className="block text-gray-700 text-sm">Text:</label> */}

          {/* <input className=" p-1 rounded"></input>
           */}
          {/* <textarea id="text" name="text" placeholder={data.placeholder}
          value={data.inpupu}
          // onChange={onChange}
          onChange={onInpupu}
          style={{ 
            resize:'none',
          // width: '100%',  
          height:'100%',}} 
          className="nodrag p-1 rounded" /> */}
         
        
        <button    
            className="adjustButton"
          style={{ 
            fontSize:'33px',
            width: '500px',
          position:'absolute',
          top:'-60px',
          left: '50%', // 將元素左邊緣對齊父元素的中心
          transform: 'translateX(-50%)', // 然後向左移動自身寬度的50%，以實現完全居中
          display: data.isSelected ? 'block' : 'none'
          // display: isAnyNodeSelected ? 'block' : 'none'
        }}>
      點我 點我
      <input
          value="#ffffff"
          // 到時候要改回來不然都白色，但改回來會有警告，要再處理
          // value={data.color}

          //  如果沒給這個value會報錯，color input一定要有value
          type="color"

          defaultValue={data.color}
          onChange={onSelectColor}
          // className="nodrag"
        />
        
        </button>
      {/* </div> */}

        <blockquote contentEditable="true"
        suppressContentEditableWarning
            style={{color:'red',
            fontSize:'27px',
            margin:'20px',
            // ,backgroundColor:  'pink',
          }}
            className='nodrag userRestoreInput' >
            <p>Edit this content to add your own quote</p>
    
        </blockquote>




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


    </>
  );
}

export default TextUpdaterNode;
