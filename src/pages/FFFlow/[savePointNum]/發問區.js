
// function TextUpdaterNode({id, data,isConnectable,selected }) {

//   const { updateNodeData,updateNodeColor,isAnyNodeSelected,selectNode,
//     currenClicktNode,setCurrenClicktNode,setNodes,nodes,hello
//   } = useStore(state => ({
//     updateNodeData: state.updateNodeData,
//     updateNodeColor: state.updateNodeColor,
//     isAnyNodeSelected: state.isAnyNodeSelected,
//     selectNode: state.selectNode,
//     currenClicktNode: state.currenClicktNode,
//     setCurrenClicktNode: state.setCurrenClicktNode,
//     setNodes: state.setNodes,
//     nodes: state.nodes,
//     hello: state.hello,


//   }));


//   const increaseFontSize = () => {
//     const newSize = parseInt(data.fontSize || 22, 10) + 5;
//     updateNodeData(id, { ...data, fontSize: `${newSize}px` });
//   };
//   const increaseFontSizeTen = () => {
//     const newSize = parseInt(data.fontSize || 22, 10) + 10;
//     updateNodeData(id, { ...data, fontSize: `${newSize}px` });
//   };
//   const decreaseFontSize = () => {
//     const newSize = Math.max(parseInt(data.fontSize || 22, 10) - 5, 10); // 防止字體大小小於10
//     updateNodeData(id, { ...data, fontSize: `${newSize}px` });
//   };
//   const decreaseFontSizeTen = () => {
//     const newSize = Math.max(parseInt(data.fontSize || 22, 10) - 10, 10); // 防止字體大小小於10
//     updateNodeData(id, { ...data, fontSize: `${newSize}px` });
//   };

//   const handleBlockQuoteClick = () => {
//     selectNode(id);
//   };

//   const onSelectColor = (event) => {
//     setSelectedColor(event.target.value);
//     updateNodeColor(id, { ...data, backgroundColor: event.target.value });
//   };

//   const onSelectFontColor = (event) => {
//     setSelectedFontColor(event.target.value);
//     updateNodeColor(id, { ...data, fontColor: event.target.value });
//   };

//   const onFontSizeChange = (event) => {
//     setSelectFontSize(`${event.target.value}px`);
//     // setSelectFontSize(`${event.target.value}px`);
//     console.log(`${event.target.value}px`);
//     updateNodeData(id, { ...data, fontSize: `${event.target.value}px` });
//   };

//   const onEditText = (e) => {
//     // console.log('當前輸入：',e.currentTarget.innerHTML);
//     // console.log('當前節點id:',id)
//     updateNodeData(id, { ...data, userMemoContent: e.currentTarget.innerHTML });
//     // setBlockquoteContent( e.currentTarget.innerHTML); 這邊用set打字又開始有問題
//   };

//   const onChangeTextAlign = (align) => {
//     updateNodeData(id, { ...data, textalign: align });
//   };



  

//   return (
//     <>
//         <NodeResizer

//           handleStyle={{
//             width:'15px',height:'15px',
//             backgroundColor:'#7e0fe5',
//             borderRadius:'2px'
//           }}
//           lineStyle={{borderWidth: '2px',  // 設置邊界線寬度
//             borderStyle: 'dashed', // 設置邊界線樣式
//             borderStyle: 'solid', // 設置邊界線樣式
//             animation: 'blink 1.2s ease infinite', // 這會讓邊界線閃爍
//             borderColor: '#00ffccd8',
//           }}

//             isVisible={selected}
//             minWidth={100}
//             minHeight={50}/>

//     <div 
//       onClick={handleDoubleClick}
//     // className="text-updater-node border border-gray-300 p-2 rounded"
//       // 出bug再把text-updater-node ，我現在不知道他是做啥用的
//       className=""
//       style={{ 
//         backgroundColor: data.backgroundColor || '#FF00FF', // 使用data中的背景颜色，如果没有则使用默认颜色
//         border: '1px solid gray',
//         overflow:'hidden',
//         // padding:'10px',
//               // height:'fit-content',
//         height:'100%',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius:'8px',
//       }}>  


//       <div  className={`${styles.copytop} ${styles.copy}`}
//             style={{ display: data.isSelected ? 'flex' : 'none'}}
//             onClick={()=>{ 

// console.log('嗯嗯嗯嗯',hello)

// const newNode = {
//   ...hello, // 复制 node 的所有属性
//   position: { // 创建 position 的一个新副本
//     x: hello.position.x ,
//     y: hello.position.y  -hello.height-50,
//     // + node.height,
//   },
//   id: `duplicate_${Math.random()}` // 指定一个新的唯一 ID
// };
// setNodes([...nodes, newNode])

//             }
            
//             }>
//               <FontAwesomeIcon icon={faCirclePlus} />
//             </div>
//       <div  className={`${styles.copybottom} ${styles.copy}`}
//             style={{ display: data.isSelected ? 'flex' : 'none'}}
//             onClick={()=>{ 
              
              
              
//               console.log('嗯嗯嗯嗯',hello)

//               const newNode = {
//                 ...hello, // 复制 node 的所有属性
//                 position: { // 创建 position 的一个新副本
//                   x: hello.position.x ,
//                   y: hello.position.y  +hello.height+50,
//                   // + node.height,
//                 },
//                 id: `duplicate_${Math.random()}` // 指定一个新的唯一 ID
//               };
//               setNodes([...nodes, newNode])
            
//             }
              
              
//               }>
//               <FontAwesomeIcon icon={faCirclePlus} />
//       </div>

//       <div  className={`${styles.copyright} ${styles.copy}`}
//             style={{ display: data.isSelected ? 'flex' : 'none'}}
//             onClick={()=>{ 
//               console.log('嗯嗯嗯嗯',hello)

//               const newNode = {
//                 ...hello, // 复制 node 的所有属性
//                 position: { // 创建 position 的一个新副本
//                   x: hello.position.x +hello.width+50,
//                   y: hello.position.y ,
//                   // + node.height,
//                 },
//                 id: `duplicate_${Math.random()}` // 指定一个新的唯一 ID
//               };
//               setNodes([...nodes, newNode])
            
            
//             }}>
//               <FontAwesomeIcon icon={faCirclePlus} />
//             </div>
//       <div  className={`${styles.copyleft} ${styles.copy}`}
//             style={{ display: data.isSelected ? 'flex' : 'none'}}
//             onClick={()=>{  
//               console.log('嗯嗯嗯嗯',hello)

//               const newNode = {
//                 ...hello, // 复制 node 的所有属性
//                 position: { // 创建 position 的一个新副本
//                   x: hello.position.x  -hello.width-50,
//                   y: hello.position.y ,
//                   // + node.height,
//                 },
//                 id: `duplicate_${Math.random()}` // 指定一个新的唯一 ID
//               };
//               setNodes([...nodes, newNode])
              
//               }}>
//               <FontAwesomeIcon 
//               icon={faCirclePlus} />
//             </div>

//           {/* <div style={{ height: '100%',
//                   // paddingBottom:'55px '
//                   display:'flex',
//                   flexDirection:'column',
//                   gap:'3px'
//                   }}>  */}
//           {/* <label htmlFor="text" className="block text-gray-700 text-sm">Text:</label> */}
//           {/* <input className=" p-1 rounded"></input>           */}
//           {/* <textarea id="text" name="text" placeholder={data.placeholder}
//             onChange={onInpupu}
//             style={{ 
//               resize:'none', 
//             height:'40px', 
//             width:'240px',}} 
//           className="nodrag p-1 rounded" /> */}

//       <div  className={styles.TetxtoolBar}
//             style={{ display: data.isSelected ? 'flex' : 'none'

//           }}>
//             <div onClick={()=>onChangeTextAlign('left')}
//               className={styles.tetxTools}>
//                   <FontAwesomeIcon icon={faAlignLeft}
//                   className={styles.awesomeNavIconBtnS}/>
//             </div>

//             <div onClick={()=>onChangeTextAlign('center')}
//                   className={styles.tetxTools}>
//                   <FontAwesomeIcon icon={faAlignJustify}
//                   className={styles.awesomeNavIconBtnS}/>
//             </div>

//             <div onClick={()=>onChangeTextAlign('right')}
//                   className={styles.tetxTools}>
//                   <FontAwesomeIcon icon={faAlignRight}
//                   className={styles.awesomeNavIconBtnS}/>
//             </div>
// {/* ============================================================ */}

//             <div onClick={increaseFontSizeTen}
//                   className={styles.tetxToolsBig}>
//                   {/* <FontAwesomeIcon icon={faFont} 
//                     className={styles.Aicon}/>
//                   <FontAwesomeIcon icon={faMinus} 
//                     className={styles.minusIcon}/> */}

//                           <FontAwesomeIcon icon={faFont}
//                     className={
//                       `${styles.Aicon} ${styles.ok}`
//                       } />
//                   <FontAwesomeIcon icon={faPlus}
//                     className={styles.BigPlusIcon} />
//             </div>

//             <div onClick={increaseFontSize} 
//                     className={styles.tetxTools}>   
//                   <FontAwesomeIcon icon={faFont}
//                     className={styles.Aicon} />
//                   <FontAwesomeIcon icon={faPlus}
//                     className={styles.plusIcon} />
//             </div>

//             <div onClick={decreaseFontSize} 
//               className={styles.tetxTools}>   
//                   {/* <FontAwesomeIcon icon={faFont}
//                     className={styles.Aicon} />
//                   <FontAwesomeIcon icon={faPlus}
//                     className={styles.BigminusIcon} /> */}
//                   <FontAwesomeIcon icon={faFont} 
//                     className={styles.Aicon}/>
//                   <FontAwesomeIcon icon={faMinus} 
//                     className={styles.minusIcon}/>
//             </div>

//             <div onClick={decreaseFontSizeTen} className={styles.tetxToolsBig}>  
//                   <FontAwesomeIcon icon={faFont}
//                     className={
//                     `${styles.Aicon} ${styles.ok}`
//                     } />
//                   <FontAwesomeIcon icon={faMinus}
//                     className={styles.BigminusIcon} />
//             </div>

//             <input 
//                 value={selectedColor} type="color"
//                 className='nodeToolColor'
//                 // 這邊value就是input顯示在畫面上的顏色，就是data.backgroundColor
//                 // defaultValue={data.color}
//                   // className="nodrag"
//                 onChange={onSelectColor}/>
//             <input value={selectedFontColor} 
//               // className={styles.nodeToolColor}
//               className='nodeToolColor'
//             type="color" 
//             onChange={onSelectFontColor}/>    
//         </div>






// {/* 
//         <button    
//             className="adjustButton"
//           style={{ 
//           fontSize:'24px',
//           width: '500px',
//           position:'absolute',
//           top:'-80px',
//           left: '50%', // 將元素左邊緣對齊父元素的中心
//           transform: 'translateX(-50%)', // 然後向左移動自身寬度的50%，以實現完全居中
//           display: data.isSelected ? 'block' : 'none'
//           // display: isAnyNodeSelected ? 'block' : 'none'
//         }}>


//           <button onClick={()=>onChangeTextAlign('left')}
//           style={{borderColor:' red',borderWidth:'1px'}}>靠左</button>
//           <button onClick={()=>onChangeTextAlign('center')}
//           style={{borderColor:' red',borderWidth:'1px'}}>靠中</button>
//           <button onClick={()=>onChangeTextAlign('right')}
//           style={{borderColor:' red',borderWidth:'1px'}}>靠右</button>

//           <button onClick={increaseFontSizeTen} style={{ padding:'0px 5px',borderColor:' red',borderWidth:'1px' ,fontSize:'40px'}}>＋</button>
//           <button onClick={increaseFontSize} style={{ padding:'0px 5px',borderColor:' red',borderWidth:'1px' }}>+</button>
//           <button onClick={decreaseFontSize} style={{  padding:'0px 5px',borderColor:' red',borderWidth:'1px' }}>-</button>
//           <button onClick={decreaseFontSizeTen} style={{  padding:'0px 5px',borderColor:' red',borderWidth:'1px'  ,fontSize:'40px'}}>-</button>

//       <input value={selectedColor}
//           // 這邊value就是input顯示在畫面上的顏色，就是data.backgroundColor
//           type="color"
//           // defaultValue={data.color}
//             // className="nodrag"
//           onChange={onSelectColor}/>
//           <input value={selectedFontColor}
//           type="color"
//           onChange={onSelectFontColor}
//         />    </button> */}







//       <blockquote 
//         contentEditable="true"
//         suppressContentEditableWarning
//             style={{pointerEvents: isPointerEventsActive ? 'auto' : 'none',
//             cursor: 'text',
//             color: data.fontColor || 'black',
//             // fontSize: selectFontSize+'px' ,
//             fontSize:data.fontSize||'25px',
//             textAlign: data.textalign ||'center',}}
//           // onClick={handleBlockQuoteClick} 
//           onInput={onEditText} 
//           spellCheck="false"
//           dangerouslySetInnerHTML={{ __html: blockquoteContent }}
//           className='nodrag userRestoreInput' >
//         </blockquote>




//         <Handle
//             position={Position.Top} id="a"  type="target"
//             className={`${styles.handleStyle} ${styles.handleStyleTop} `}
//             isConnectable={isConnectable} />
//         <Handle  position={Position.Left} id="b" type="target"
//             className={`${styles.handleStyle} ${styles.handleStyleLeft} `}
//             isConnectable={isConnectable} />

//         <Handle  position={Position.Bottom} id="c" type="source"
//             className={`${styles.handleStyle} ${styles.handleStyleBottom} `}
//             isConnectable={isConnectable} />

//         <Handle  position={Position.Right} id="d" type="source"
//             className={`${styles.handleStyle} ${styles.handleStyleRight} `}
//             isConnectable={isConnectable} />


//         {/* <Handle position={Position.Left} id="b" 
//             isConnectable={isConnectable} 
//             className={`${styles.handleStyle} ${styles.handleStyleRight} `}
//         /> */}

        

//     </div>
//     </>
//   );
// }

// export default TextUpdaterNode;
