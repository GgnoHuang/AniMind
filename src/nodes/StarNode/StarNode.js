import styles from './StarNode.module.css';
import Image from 'next/image'
import React, { useEffect, useState, useRef } from 'react';
import { Handle, NodeProps,Position,

// 🥎🥎🥎🥎🥎🥎🥎🥎🥎🥎旋轉  
  useUpdateNodeInternals,
// 🥎🥎🥎🥎🥎🥎🥎🥎🥎🥎旋轉

  NodeResizer,NodeToolbar} from 'reactflow';

  // 🥎🥎🥎🥎🥎🥎🥎🥎🥎🥎旋轉// 🥎🥎🥎🥎🥎🥎🥎🥎🥎🥎旋轉
  import { drag } from 'd3-drag';
  import { select } from 'd3-selection';
// 🥎🥎🥎🥎🥎🥎🥎🥎🥎🥎旋轉// 🥎🥎🥎🥎🥎🥎🥎🥎🥎🥎旋轉



export default function CustomNode({ data,selected }) {

  // 🥎🥎🥎🥎🥎🥎🥎🥎🥎🥎旋轉
// 🥎🥎🥎🥎🥎🥎🥎🥎🥎🥎旋轉
  const rotateControlRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();
  const [rotation, setRotation] = useState(0);
  // const [resizable, setResizable] = useState(!!data.resizable);
  // const [rotatable, setRotatable] = useState(!!data.rotatable);

  useEffect(() => {
    if (!rotateControlRef.current) {
      return;
    }

    const selection = select(rotateControlRef.current);
    const dragHandler = drag().on('drag', (evt) => {
      const dx = evt.x - 100;
      const dy = evt.y - 100;
      const rad = Math.atan2(dx, dy);
      const deg = rad * (180 / Math.PI);
      setRotation(180 - deg);
      // updateNodeInternals(id);
    });

    selection.call(dragHandler);
  }, [
    
    // id,
    
    updateNodeInternals]);
// 🥎🥎🥎🥎🥎🥎🥎🥎🥎🥎旋轉
// 🥎🥎🥎🥎🥎🥎🥎🥎🥎🥎旋轉




  
  return (
    <div style={{
// 🥎🥎🥎🥎🥎🥎🥎🥎🥎🥎旋轉
      transform: `rotate(${rotation}deg)`,
// 🥎🥎🥎🥎🥎🥎🥎🥎🥎🥎旋轉

    
      height: '100%',
      width:'100%'
      }}
      className='node'

    // className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400"
    >
    <div ref={rotateControlRef} style={{display: 'block'}} className='nodrag rotateHandle'/>

      <NodeResizer
        handleStyle={{
          width:'10px',
          height:'10px',
          backgroundColor:'red'
        }}
        lineStyle={{
          borderWidth: '2px',  // 設置邊界線寬度
          borderStyle: 'dashed', // 設置邊界線樣式
          animation: 'blink 1s linear infinite', // 這會讓邊界線閃爍
          borderColor: 'yellow	',
        }}
      isVisible={selected} minWidth={100} minHeight={100} />


<div

  class={styles.starMask}
>哈哈哈哈哈哈哈







<blockquote 
        contentEditable="true"
        suppressContentEditableWarning
            style={{
            // pointerEvents: isPointerEventsActive ? 'auto' : 'none',

            // color: data.fontColor || 'black',

            // fontSize:data.fontSize||'25px',
            // textAlign: data.textalign ||'center',

          }}
          // onClick={handleBlockQuoteClick} 
          // onInput={onEditText}
          spellCheck="false"
          // dangerouslySetInnerHTML={{ __html: blockquoteContent }}
          className='nodrag userRestoreInput' >
    
        </blockquote>
</div>





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
        <button>

        </button>

      </NodeToolbar>
      {/* <Handle
        type="target"
        position={Position.Top}
        className=" !bg-teal-400"
        style={{
          width: '18px',  // 调整宽度
          height: '18px', 
        }} 
      /> */}
      {/* <Handle
        type="source"
        position={Position.Bottom}
        className=" !bg-teal-400"
        style={{
        width: '18px',  // 调整宽度
        height: '18px', 
      }} 
      /> */}
    </div>
  );
}