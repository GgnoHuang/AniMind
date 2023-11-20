// /* eslint-disable react/jsx-no-undef */
// import Image from 'next/image'

// import { useCallback } from 'react';
// import { Handle, NodeProps,Position,
  
//   useUpdateNodeInternals,

//   NodeResizer,NodeToolbar} from 'reactflow';

//   import { drag } from 'd3-drag';
//   import { select } from 'd3-selection';

// export default function CustomNode({ data,selected }) {
//   return (
//     <div style={{
//       height: '100%'
//       }}
//     // className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400"
//     >
//       <NodeResizer
//         handleStyle={{
//           width:'10px',
//           height:'10px',
//           backgroundColor:'red'
//         }}
//         lineStyle={{
//           borderWidth: '5px',  // 設置邊界線寬度
//           borderStyle: 'dashed', // 設置邊界線樣式
//           animation: 'blink 1s linear infinite', // 這會讓邊界線閃爍
//           borderColor: 'yellow	',
//         }}
//        isVisible={selected} minWidth={100} minHeight={100} />

  

//      <Image
//         // src={data.pokemonpng ? data.pokemonpng : '/gg.jpg'}
//         src={data.pokemonpng }

//         width={100}
//         height={100}
//         alt="Picture"
//         style={{
//           width: '100%',  
//           height: '100%', 
//         }} 
//       />

//       {/* <div 
//        style={{ 

//         height:'100%'}}
//       >
//       <svg 
//       width="100%" 
//       height="100%"
//        viewBox="0 0 100 100">
//         <polygon points="50,0 100,100 0,100" fill="blue" />
//       </svg>

//       </div> */}

// <NodeToolbar >
//         <button>

//         </button>

//       </NodeToolbar>
//       {/* <Handle
//         type="target"
//         position={Position.Top}
//         className=" !bg-teal-400"
//         style={{
//           width: '18px',  // 调整宽度
//           height: '18px', 
//         }} 
//       /> */}
//       {/* <Handle
//         type="source"
//         position={Position.Bottom}
//         className=" !bg-teal-400"
//         style={{
//         width: '18px',  // 调整宽度
//         height: '18px', 
//       }} 
//       /> */}
//     </div>
//   );
// }






// ~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~

// import styles from "./";


/* eslint-disable react/jsx-no-undef */
import Image from 'next/image'
import useStore from '../store';

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


  // 從textupdate那邊先貼過來，要再整理到zustand
  // 從textupdate那邊先貼過來，要再整理到zustand
  // 從textupdate那邊先貼過來，要再整理到zustand
  // 從textupdate那邊先貼過來，要再整理到zustand
    const { updateNodeData,updateNodeColor,isAnyNodeSelected,selectNode} = useStore(state => ({
    updateNodeData: state.updateNodeData,
    updateNodeColor: state.updateNodeColor,
    isAnyNodeSelected: state.isAnyNodeSelected,
    selectNode: state.selectNode,

  }));

  const [blockquoteContent, setBlockquoteContent] = useState(data.userMemoContent || '');

  const [isPointerEventsActive, setIsPointerEventsActive] = useState(false);
  const handleDoubleClick = () => {
    console.log('hi')
    setIsPointerEventsActive(prev => !prev);
  };
  const handleBlockQuoteClick = () => {
    selectNode(id);
  };
  const onEditText = (e) => {
    // console.log('當前輸入：',e.currentTarget.innerHTML);
    // console.log('當前節點id:',id)
    updateNodeData(id, { ...data, userMemoContent: e.currentTarget.innerHTML });
    // setBlockquoteContent( e.currentTarget.innerHTML); 這邊用set打字又開始有問題
  };
  // 從textupdate那邊先貼過來，要再整理到zustand



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


      height: '100%'
      }}
      className='node'

    // className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400"
    >
<NodeToolbar >
        

      </NodeToolbar>

 <div ref={rotateControlRef}  style={{display: 'block'}}
          className='nodrag rotateHandle'
        />

    <div>
          {data?.label}
          <div>
            {/* <label><input/></label> */}
            {/* <input/> */}
          </div>
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
          borderColor: 'yellow	',
        }}
       isVisible={selected} minWidth={100} minHeight={100} />

{/* <blockquote 
        contentEditable="true"
        suppressContentEditableWarning// 不用這會報錯
            style={{
            pointerEvents: isPointerEventsActive ? 'auto' : 'none',
            cursor: 'text',
            color: data.fontColor || 'black',
            fontSize:data.fontSize||'25px',
            textAlign: data.textalign ||'center',
          }}
          onClick={handleBlockQuoteClick} 
          onInput={onEditText}
          spellCheck="false"
          dangerouslySetInnerHTML={{ __html: blockquoteContent }}
          className='nodrag userRestoreInput' >
    
        </blockquote> */}

     <Image
        // src={data.pokemonpng ? data.pokemonpng : '/gg.jpg'}
        src={data.pokemonpng }

        width={100}
        height={100}
        alt="Picture"
        style={{
          width: '100%',  
          height: '100%', 
        }} 
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