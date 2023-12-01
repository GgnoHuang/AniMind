import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faAlignRight,
  faAlignJustify,
  faAlignLeft,
  faFont,faMinus,faPlus
} from '@fortawesome/free-solid-svg-icons';




import useStore from '../../store';

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



export default function StarNode({id, data,isConnectable,selected }) {

  const [selectedColor, setSelectedColor] = useState(data.backgroundColor||'#ffffff'); // 默认颜色

  const [selectedFontColor, setSelectedFontColor] = useState(data.fontColor ||'#ffffff'); // 默认颜色
  const [selectFontSize, setSelectFontSize] = useState(data.fontSize ||'25px');
  const [isPointerEventsActive, setIsPointerEventsActive] = useState(false);

  const handleDoubleClick = () => {
    console.log('node js 執行setIsPointerEventsActive(prev => !prev)')
    setIsPointerEventsActive(prev => !prev);
  };
  const { updateNodeData,updateNodeColor,
    // isAnyNodeSelected,selectNode
  } = useStore(state => ({
    updateNodeData: state.updateNodeData,
    updateNodeColor: state.updateNodeColor,
    // isAnyNodeSelected: state.isAnyNodeSelected,
    // selectNode: state.selectNode,

  }));

  const [blockquoteContent, setBlockquoteContent] = useState(data.userMemoContent || '點擊');

  const increaseFontSize = () => {
    const newSize = parseInt(data.fontSize || 22, 10) + 5;
    updateNodeData(id, { ...data, fontSize: `${newSize}px` });
  };
  const increaseFontSizeTen = () => {
    const newSize = parseInt(data.fontSize || 22, 10) + 10;
    updateNodeData(id, { ...data, fontSize: `${newSize}px` });
  };
  const decreaseFontSize = () => {
    const newSize = Math.max(parseInt(data.fontSize || 22, 10) - 5, 10); // 防止字體大小小於10
    updateNodeData(id, { ...data, fontSize: `${newSize}px` });
  };
  const decreaseFontSizeTen = () => {
    const newSize = Math.max(parseInt(data.fontSize || 22, 10) - 10, 10); // 防止字體大小小於10
    updateNodeData(id, { ...data, fontSize: `${newSize}px` });
  };

  // const handleBlockQuoteClick = () => {
  //   selectNode(id);
  // };

  const onSelectColor = (event) => {
    setSelectedColor(event.target.value);
    updateNodeColor(id, { ...data, backgroundColor: event.target.value });
  };

  const onSelectFontColor = (event) => {
    setSelectedFontColor(event.target.value);
    updateNodeColor(id, { ...data, fontColor: event.target.value });
  };

  const onFontSizeChange = (event) => {
    setSelectFontSize(`${event.target.value}px`);
    // setSelectFontSize(`${event.target.value}px`);
    console.log(`${event.target.value}px`);
    updateNodeData(id, { ...data, fontSize: `${event.target.value}px` });
  };

  const onEditText = (e) => {
    // console.log('當前輸入：',e.currentTarget.innerHTML);
    // console.log('當前節點id:',id)
    updateNodeData(id, { ...data, userMemoContent: e.currentTarget.innerHTML });
    // setBlockquoteContent( e.currentTarget.innerHTML); 這邊用set打字又開始有問題
  };

  const onChangeTextAlign = (align) => {
    updateNodeData(id, { ...data, textalign: align });
  };




















  // 🥎🥎🥎🥎🥎🥎🥎🥎🥎🥎旋轉
// 🥎🥎🥎🥎🥎🥎🥎🥎🥎🥎旋轉
  const rotateControlRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();
  const [rotation, setRotation] = useState(0);

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
    
    updateNodeInternals]);
// 🥎🥎🥎🥎🥎🥎🥎🥎🥎🥎旋轉
// 🥎🥎🥎🥎🥎🥎🥎🥎🥎🥎旋轉




  
  return (
    <div style={{
// 🥎🥎🥎🥎🥎🥎🥎🥎🥎🥎旋轉
      transform: `rotate(${rotation}deg)`,
// 🥎🥎🥎🥎🥎🥎🥎🥎🥎🥎旋轉
      height: '100%',

      }}
      // className='node'
      >
          <NodeResizer handleStyle={{
          width:'10px',height:'10px',
          backgroundColor:'red',
            borderRadius:'2px'
        }}
        lineStyle={{borderWidth: '2px',  // 設置邊界線寬度
          borderStyle: 'dashed', // 設置邊界線樣式
          borderStyle: 'solid', // 設置邊界線樣式
          // borderStyle: 'dotted', // 設置邊界線樣式

          animation: 'blink 1.2s ease infinite', // 這會讓邊界線閃爍
          borderColor: 'white	',
        }}
      isVisible={selected} minWidth={100} minHeight={100} />
      <div ref={rotateControlRef} style={{display: 'block'}} className='nodrag rotateHandle'/>


      <NodeToolbar >

      {/* <div    
            className="adjustButton"
          style={{ fontSize:'24px',
          width: '500px',position:'absolute',top:'-80px',
          left: '50%', // 將元素左邊緣對齊父元素的中心
          transform: 'translateX(-50%)', // 然後向左移動自身寬度的50%，以實現完全居中
          display: data.isSelected ? 'block' : 'none'
          // display: isAnyNodeSelected ? 'block' : 'none'
        }}>

          <button onClick={()=>onChangeTextAlign('left')}
          style={{borderColor:' red',borderWidth:'1px'}}>靠左</button>
          <button onClick={()=>onChangeTextAlign('center')}
          style={{borderColor:' red',borderWidth:'1px'}}>靠中</button>
          <button onClick={()=>onChangeTextAlign('right')}
          style={{borderColor:' red',borderWidth:'1px'}}>靠右</button>

          <button onClick={increaseFontSizeTen} style={{ padding:'0px 5px',borderColor:' red',borderWidth:'1px' ,fontSize:'40px'}}>＋</button>
          <button onClick={increaseFontSize} style={{ padding:'0px 5px',borderColor:' red',borderWidth:'1px' }}>+</button>
          <button onClick={decreaseFontSize} style={{  padding:'0px 5px',borderColor:' red',borderWidth:'1px' }}>-</button>
          <button onClick={decreaseFontSizeTen} style={{  padding:'0px 5px',borderColor:' red',borderWidth:'1px'  ,fontSize:'40px'}}>-</button>

      <input value={selectedColor}
          // 這邊value就是input顯示在畫面上的顏色，就是data.backgroundColor
          type="color"
          // defaultValue={data.color}
            // className="nodrag"
          onChange={onSelectColor}/>
          <input value={selectedFontColor}
          type="color"
          onChange={onSelectFontColor}
        />    </div> */}

      </NodeToolbar>
      <div    
            // className="adjustButton"
            className={styles.TetxtoolBar}

          style={{ 

          display: data.isSelected ? 'flex' : 'none'
          // display: isAnyNodeSelected ? 'block' : 'none'
        }}>

          <button onClick={()=>onChangeTextAlign('left')}
            className={styles.tetxTools}>
                <FontAwesomeIcon icon={faAlignLeft}
                className={styles.awesomeNavIconBtnS}/>
          </button>

          <button onClick={()=>onChangeTextAlign('center')}
                className={styles.tetxTools}>
                <FontAwesomeIcon icon={faAlignJustify}
                className={styles.awesomeNavIconBtnS}/>
          </button>

          <button onClick={()=>onChangeTextAlign('right')}
                className={styles.tetxTools}>
                <FontAwesomeIcon icon={faAlignRight}
                className={styles.awesomeNavIconBtnS}/>
          </button>
{/* ============================================================ */}

          <button onClick={increaseFontSizeTen}
                className={styles.tetxToolsBig}>
                {/* <FontAwesomeIcon icon={faFont} 
                  className={styles.Aicon}/>
                <FontAwesomeIcon icon={faMinus} 
                  className={styles.minusIcon}/> */}

                        <FontAwesomeIcon icon={faFont}
                  className={
                    `${styles.Aicon} ${styles.ok}`
                    } />
                <FontAwesomeIcon icon={faPlus}
                  className={styles.BigPlusIcon} />
                  
          </button>

          <button onClick={increaseFontSize} 
                  className={styles.tetxTools}>   
                <FontAwesomeIcon icon={faFont}
                  className={styles.Aicon} />
                <FontAwesomeIcon icon={faPlus}
                  className={styles.plusIcon} />
          </button>

          <button onClick={decreaseFontSize} 
            className={styles.tetxTools}>   
                {/* <FontAwesomeIcon icon={faFont}
                  className={styles.Aicon} />
                <FontAwesomeIcon icon={faPlus}
                  className={styles.BigminusIcon} /> */}
                <FontAwesomeIcon icon={faFont} 
                  className={styles.Aicon}/>
                <FontAwesomeIcon icon={faMinus} 
                  className={styles.minusIcon}/>
          </button>




          <button onClick={decreaseFontSizeTen}
                className={styles.tetxToolsBig}>  
                        <FontAwesomeIcon icon={faFont}
                  className={
                  `${styles.Aicon} ${styles.ok}`
                  } />
                <FontAwesomeIcon icon={faMinus}
                  className={styles.BigminusIcon} />
          
          </button>

          <input value={selectedColor}
          // 這邊value就是input顯示在畫面上的顏色，就是data.backgroundColor
          type="color"
          // defaultValue={data.color}
            // className="nodrag"
          onChange={onSelectColor}/>
          <input value={selectedFontColor}
          type="color"
          onChange={onSelectFontColor}
        />    </div>


      <div 
      
      onClick={handleDoubleClick}
        className={styles.starMask}
        style={{ 
          padding:'30px', // 🟪 🟪 🟪 🟪 🟪 🟪 🟪 🟪 🟪 🟪 🟪 🟪 🟪 🟪
        // backgroundColor: data.backgroundColor || '#FF00FF', 

        backgroundColor: data.backgroundColor ||  '#ffffff', // 使用data中的背景颜色，如果没有则使用默认颜色
        border: '2px solid gray',
        overflow:'hidden',
        // padding:'10px',
              // height:'fit-content',


      }}>
        


 




<blockquote 
        contentEditable="true"
        suppressContentEditableWarning
            style={{
            pointerEvents: isPointerEventsActive ? 'auto' : 'none',
            cursor: 'text',
            color: data.fontColor || 'black',

            fontSize:data.fontSize||'25px',
            textAlign: data.textalign ||'center',

          }}
          onInput={onEditText}
          spellCheck="false"
          dangerouslySetInnerHTML={{ __html: blockquoteContent }}
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