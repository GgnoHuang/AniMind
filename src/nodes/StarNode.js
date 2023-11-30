/* eslint-disable react/jsx-no-undef */
import styles from './ImgNode2.module.css';
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

  useEffect(() => {
    if (!rotateControlRef.current) {return;    }

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
  }, [updateNodeInternals]);
// 🥎🥎🥎🥎🥎🥎🥎🥎🥎🥎旋轉
// 🥎🥎🥎🥎🥎🥎🥎🥎🥎🥎旋轉




  
  return (
    <div style={{
// 🥎🥎🥎🥎🥎🥎🥎🥎🥎🥎旋轉
      transform: `rotate(${rotation}deg)`,
// 🥎🥎🥎🥎🥎🥎🥎🥎🥎🥎旋轉
height: '100%'
}}className='node'>
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

<div class={styles.starMask}></div>






<NodeToolbar >
        <button>

        </button>

      </NodeToolbar>


    </div>
  );
}