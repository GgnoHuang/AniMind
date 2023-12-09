
/* eslint-disable react/jsx-no-undef */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
faCirclePlus
} from '@fortawesome/free-solid-svg-icons';

import styles from './ImgNode.module.css';
import useStore from '../../store';
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










export default function CustomNode({ id, data,selected,isConnectable }) {

  // 🥎🥎🥎🥎🥎🥎🥎🥎🥎🥎旋轉
// 🥎🥎🥎🥎🥎🥎🥎🥎🥎🥎旋轉
  const rotateControlRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();
  const [rotation, setRotation] = useState(0);

  const { updateNodeData,updateNodeColor,setNodes,nodes,edges,setEdges,
    cloneNode} = useStore(state => ({
      updateNodeData: state.updateNodeData,
      updateNodeColor: state.updateNodeColor,
      setNodes: state.setNodes,
      nodes: state.nodes,
      cloneNode: state.cloneNode,
      edges: state.edges,
      setEdges: state.setEdges,
  }));

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


      height: '100%'
      }}
      className='node'

    // className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400"
    >
    <div ref={rotateControlRef} style={{display: 'block'}} className='nodrag rotateHandle'/>
    <div>
          {/* {data?.label} */}
          {/* <div>
            <label>
              <input
                type="checkbox"
                checked={resizable}
                onChange={(evt) => setResizable(evt.target.checked)}
              />
              resizable
            </label>
          </div> */}
          {/* <div>
            <label>
              <input
                type="checkbox"
                checked={rotatable}
                onChange={(evt) => setRotatable(evt.target.checked)}
              />
              rotatable
            </label>
          </div> */}
        </div>







{/* 😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈 */}
{/* 😈😈😈😈😈😈😈😈  C O P Y 功 能   😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈 */}
{/* 😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈 */}
<div  className={`${styles.copytop} ${styles.copy}`}
            style={{ display: data.isSelected ? 'flex' : 'none'}}
            onClick={()=>{ 
              const newNode = {
                  ...cloneNode, // 复制 node 的所有属性
                  position: { // 创建 position 的一个新副本
                    x: cloneNode.position.x ,
                    y: cloneNode.position.y  -cloneNode.height-50,
                    // + node.height,
                  },
                  selected: null,
                  data:{isSelected:null,        

                  },
                  id: `duplicate_${Math.random()}` // 指定一个新的唯一 ID
                };
                const newEdge = {
                  id: `edge_${cloneNode.id}_${newNode.id}`,

                  source: newNode.id,
                  target: cloneNode.id,
                  sourceHandle:'c',
                  targetHandle:'a',
                  animated: true, 
                  selectable: true, 
                  arrowHeadType: 'arrow', 
                  style: { strokeWidth: 3,stroke: '#00ffccab' }, 
                };
              
                  setNodes([...nodes, newNode]);
                  setEdges([...edges, newEdge]);
              }
            }>
              <FontAwesomeIcon icon={faCirclePlus} />
            </div>
      <div  className={`${styles.copybottom} ${styles.copy}`}
            style={{ display: data.isSelected ? 'flex' : 'none'}}
            onClick={()=>{ 
                const newNode = {
                  ...cloneNode, // 复制 node 的所有属性
                  position: { // 创建 position 的一个新副本
                    x: cloneNode.position.x ,
                    y: cloneNode.position.y  +cloneNode.height+50,
                  },
                  selected: null,
                  data:{isSelected:null,        

                  },
                  id: `duplicate_${Math.random()}` // 指定一个新的唯一 ID
                };
                const newEdge = {
                  id: `edge_${cloneNode.id}_${newNode.id}`,
                  source: cloneNode.id,
                  target: newNode.id,
                  sourceHandle:'c',
                  targetHandle:'a',


                  animated: true, 
                  selectable: true, 
                  arrowHeadType: 'arrow', 
                  style: { strokeWidth: 3,stroke: '#00ffccab' }, 
                };
         
                setNodes([...nodes, newNode]);
                setEdges([...edges, newEdge]);
            }
      }>
              <FontAwesomeIcon icon={faCirclePlus} />
      </div>

      <div  className={`${styles.copyright} ${styles.copy}`}
            style={{ display: data.isSelected ? 'flex' : 'none'}}
            onClick={()=>{ 
              const newNode = {
                ...cloneNode, // 复制 node 的所有属性
                position: { // 创建 position 的一个新副本
                  x: cloneNode.position.x +cloneNode.width+50,
                  y: cloneNode.position.y ,
                },
                selected: null,
                data:{isSelected:null,        
                  
                },
                id: `duplicate_${Math.random()}` // 指定一个新的唯一 ID
              };
              const newEdge = {
                id: `edge_${cloneNode.id}_${newNode.id}`,
                source: cloneNode.id,
                target: newNode.id,
                sourceHandle:'d',
                targetHandle:'b',
                animated: true, 
                selectable: true, 
                arrowHeadType: 'arrow', 
                style: { strokeWidth: 3,stroke: '#00ffccab' }, 
              };
   
              setNodes([...nodes, newNode])
              setEdges([...edges, newEdge]);
            }}>
              <FontAwesomeIcon icon={faCirclePlus} />
            </div>
      <div  className={`${styles.copyleft} ${styles.copy}`}
            style={{ display: data.isSelected ? 'flex' : 'none'}}
            onClick={()=>{  
              const newNode = {
                ...cloneNode, // 复制 node 的所有属性
                position: { // 创建 position 的一个新副本
                  x: cloneNode.position.x  -cloneNode.width-50,
                  y: cloneNode.position.y ,
                  // + node.height,
                },
                selected: null,
                data:{isSelected:null,        
                },
                id: `duplicate_${Math.random()}` // 指定一个新的唯一 ID
              };
              const newEdge = {
                id: `edge_${cloneNode.id}_${newNode.id}`,
                target: cloneNode.id,
                source: newNode.id,
                sourceHandle:'d',
                targetHandle:'b',
                animated: true, 
                selectable: true, 
                arrowHeadType: 'arrow', 
                style: { strokeWidth: 3,stroke: '#00ffccab' }, 
              };
        
              setNodes([...nodes, newNode])
              setEdges([...edges, newEdge]);
              
              }}>
              <FontAwesomeIcon 
              icon={faCirclePlus} />
            </div>
{/* 😈😈😈😈😈😈😈😈  C O P Y 功 能   😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈 */}
{/* 😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈 */}


























      <NodeResizer
             handleStyle={{
              width:'15px',height:'15px',
              backgroundColor:'#7e0fe5',
              borderRadius:'2px'
            }}
            lineStyle={{borderWidth: '2px',  // 設置邊界線寬度
              borderStyle: 'dashed', // 設置邊界線樣式
              borderStyle: 'solid', // 設置邊界線樣式
              animation: 'blink 1.2s ease infinite', // 這會讓邊界線閃爍
              borderColor: '#00ffccd8',
            }}
      isVisible={selected} minWidth={100} minHeight={100} />


    <img
        // src={data.pokemonpng ? data.pokemonpng : '/gg.jpg'}
        src={data.pokemonpng}
        // src={"https://firebasestorage.googleapis.com/v0/b/jyun-hong.appspot.com/o/images%2Fpngegg%20(4).png?alt=media&token=990a3947-fdd0-483a-8d86-e8f661d63bf5        "}
// crossOrigin='​anonymous​'
        width={100}
        height={100}
        alt="Picture"
        style={{  width: '100%',  height: '100%', }} 
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
      <Handle
            position={Position.Top} id="a"  type="target"
            className={`${styles.handleStyle} ${styles.handleStyleTop} `}
            isConnectable={isConnectable} />
        <Handle  position={Position.Left} id="b" type="target"
            className={`${styles.handleStyle} ${styles.handleStyleLeft} `}
            isConnectable={isConnectable} />

        <Handle  position={Position.Bottom} id="c" type="source"
            className={`${styles.handleStyle} ${styles.handleStyleBottom} `}
            isConnectable={isConnectable} />

        <Handle  position={Position.Right} id="d" type="source"
            className={`${styles.handleStyle} ${styles.handleStyleRight} `}
            isConnectable={isConnectable} />


    </div>
  );
}