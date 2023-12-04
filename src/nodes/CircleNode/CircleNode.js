import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faAlignRight,
  faAlignJustify,
  faAlignLeft,
  faFont,faMinus,faPlus
} from '@fortawesome/free-solid-svg-icons';


import { Handle, NodeProps,Position, NodeResizer} from 'reactflow';
import { useCallback, useState,useEffect ,useRef} from 'react';
import useStore from '../../store';

import styles from './CircleNode.module.css';

// const handleStyle = { left: 15 };

// import useStore, { NodeData } from '..//pages/FFFlow/store';

function TextUpdaterNode({id, data,isConnectable,selected }) {
  const [selectedColor, setSelectedColor] = useState(data.backgroundColor||'#ffffff'); // 默认颜色
  // data.backgroundColor||'#ffffff'
  // 這個||很重要，這樣重新整理連input上面那個圖也可以顯示成我們背景顏色
  const [selectedFontColor, setSelectedFontColor] = useState(data.fontColor ||'#ffffff'); // 默认颜色
  const [selectFontSize, setSelectFontSize] = useState(data.fontSize ||'25px');
  // const [minSize, setMinSize] = useState({ minWidth: 100, minHeight: 100 });

  const [isPointerEventsActive, setIsPointerEventsActive] = useState(false);

  const handleDoubleClick = () => {
    console.log('hi')
    setIsPointerEventsActive(prev => !prev);
  };

  const { updateNodeData,updateNodeColor,isAnyNodeSelected,selectNode} = useStore(state => ({
    updateNodeData: state.updateNodeData,
    updateNodeColor: state.updateNodeColor,
    isAnyNodeSelected: state.isAnyNodeSelected,
    selectNode: state.selectNode,

  }));

  const [blockquoteContent, setBlockquoteContent] = useState(data.userMemoContent || '點擊輸入');

  // const onInpupu = (event) => {
  //   console.log('當前輸入：', event.target.value);
  //   console.log('data為：',data) 
  //   console.log(id)
  //   updateNodeData(id, { ...data, inpupu: event.target.value });
  //   // 這裡，...data 展開了現有的 data 對象，
  //   // 然後 inpupu: event.target.value 直接在新對象中添加或更新 inpupu 屬性。
  //   // { ...data, inpupu: event.target.value } 這整坨是是newData
  //   //🔥 最後也會變成一個data
  //   //🔥 只不過這個data的inpupu屬性變成event.target.value，
  //   //🔥 或者原先沒有inpupu屬性的話會加上去
  // };

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

  const handleBlockQuoteClick = () => {
    selectNode(id);
  };

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



  return (

 
    <div 
      onClick={handleDoubleClick}
    // className="text-updater-node border border-gray-300 p-2 rounded"
      // 出bug再把text-updater-node ，我現在不知道他是做啥用的
      className=""
      style={{ 
        backgroundColor: data.backgroundColor || '#FF00FF', // 使用data中的背景颜色，如果没有则使用默认颜色
        // backgroundColor: 'red', // 使用data中的背景颜色，如果没有则使用默认颜色
        border: '2px solid gray',
        overflow:'hidden',
        padding:'10px',
              // width:'fit-content',
        height:'100%',
        // width:'100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        borderRadius: '50%', // Make it circular



        // backgroundColor: data.backgroundColor || '#FF00FF',
        // border: '2px solid gray',
        // overflow: 'hidden',
        // padding: '10px',
        // height:'100%',
        // borderRadius: '50%', // Make it circular
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
      }}>  

        <NodeResizer
          handleStyle={{width:'15px',height:'15px',backgroundColor:'red'}}
          lineStyle={{borderWidth: '5px', borderStyle: 'dashed', borderColor: '#FF00FF	',
            animation: 'blink 1s linear infinite', }}
            isVisible={selected}
            minWidth={100}
            minHeight={50}

            />

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
            onChange={onInpupu}
            style={{ 
              resize:'none', 
            height:'40px', 
            width:'240px',}} 
          className="nodrag p-1 rounded" /> */}

         {/* ====✌️💚💚💚💚💚💚💚💚💚💚💚💚💚======= */}
         {/* ====✌️💚💚💚💚💚💚💚💚💚💚💚💚💚======= */}
         <div  className={styles.TetxtoolBar}
            style={{ display: data.isSelected ? 'flex' : 'none'
          }}>
            <div onClick={()=>onChangeTextAlign('left')}
              className={styles.tetxTools}>
                  <FontAwesomeIcon icon={faAlignLeft}
                  className={styles.awesomeNavIconBtnS}/>
            </div>

            <div onClick={()=>onChangeTextAlign('center')}
                  className={styles.tetxTools}>
                  <FontAwesomeIcon icon={faAlignJustify}
                  className={styles.awesomeNavIconBtnS}/>
            </div>

            <div onClick={()=>onChangeTextAlign('right')}
                  className={styles.tetxTools}>
                  <FontAwesomeIcon icon={faAlignRight}
                  className={styles.awesomeNavIconBtnS}/>
            </div>
{/* ============================================================ */}
            <div onClick={increaseFontSizeTen}
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
            </div>

            <div onClick={increaseFontSize} 
                    className={styles.tetxTools}>   
                  <FontAwesomeIcon icon={faFont}
                    className={styles.Aicon} />
                  <FontAwesomeIcon icon={faPlus}
                    className={styles.plusIcon} />
            </div>

            <div onClick={decreaseFontSize} 
              className={styles.tetxTools}>   
                  {/* <FontAwesomeIcon icon={faFont}
                    className={styles.Aicon} />
                  <FontAwesomeIcon icon={faPlus}
                    className={styles.BigminusIcon} /> */}
                  <FontAwesomeIcon icon={faFont} 
                    className={styles.Aicon}/>
                  <FontAwesomeIcon icon={faMinus} 
                    className={styles.minusIcon}/>
            </div>

            <div onClick={decreaseFontSizeTen} className={styles.tetxToolsBig}>  
                  <FontAwesomeIcon icon={faFont}
                    className={
                    `${styles.Aicon} ${styles.ok}`
                    } />
                  <FontAwesomeIcon icon={faMinus}
                    className={styles.BigminusIcon} />
            </div>

            <input value={selectedColor}
                // 這邊value就是input顯示在畫面上的顏色，就是data.backgroundColor
                type="color"
                // defaultValue={data.color}
                  // className="nodrag"
                onChange={onSelectColor}/>
            <input value={selectedFontColor}
                type="color"
                onChange={onSelectFontColor}/>    
        </div>
         {/* ====✌️💚💚💚💚💚💚💚💚💚💚💚💚💚======= */}
         {/* ====✌️💚💚💚💚💚💚💚💚💚💚💚💚💚======= */}
         {/* ====✌️💚💚💚💚💚💚💚💚💚💚💚💚💚======= */}



      {/* </div> */}

        <blockquote 
        contentEditable="true"
        suppressContentEditableWarning// 不用這會報錯
            style={{
            pointerEvents: isPointerEventsActive ? 'auto' : 'none',
            cursor: 'text',

            color: data.fontColor || 'black',
            // fontSize:'33px' ,
            // fontSize: selectFontSize+'px' ,
            fontSize:data.fontSize||'25px',
            textAlign: data.textalign ||'center',

          }}
          onClick={handleBlockQuoteClick} 
          onInput={onEditText}
          spellCheck="false"
          dangerouslySetInnerHTML={{ __html: blockquoteContent }}
          className='nodrag userRestoreInput' >

            {/* <p>Edit this content to add your own quote</p> */}
    
        </blockquote>
        <Handle type="source" position={Position.Bottom} id="b" 
            style={{ backgroundColor: 'blue' ,width: '13px',  // 调整宽度
            height: '13px', }} // 更改背景颜色为蓝色
            isConnectable={isConnectable} 
        />
        <Handle type="target" position={Position.Top} 
          style={{ backgroundColor: 'blue' ,width: '13px',  // 调整宽度
          height: '13px', }} 
          isConnectable={isConnectable} 
        />

    </div>

  );
}

export default TextUpdaterNode;




// {"nodes":[{"width":331,"height":328,"id":"randomnode_1700359526243","type":"circleNode","position":{"x":-1291.5837035902596,"y":1352.8684256449887},"data":{"inpupu":"hello","imgsrc":"./fan.jpeg","placeholder":"請輸入...","backgroundColor":"#f29797","label":"circleNode node","isSelected":false},"selected":false,"dragging":false,"style":{"width":331,"height":328},"resizing":false,"positionAbsolute":{"x":-1291.5837035902596,"y":1352.8684256449887}},{"width":107,"height":100,"id":"randomnode_1700359521759","type":"circleNode","position":{"x":-1342.6267861688327,"y":1391.505286144796},"data":{"inpupu":"hello","imgsrc":"./fan.jpeg","placeholder":"請輸入...","backgroundColor":"#ffffff","label":"circleNode node","isSelected":false},"selected":false,"positionAbsolute":{"x":-1342.6267861688327,"y":1391.505286144796},"dragging":false,"style":{"width":107,"height":100},"resizing":false}],"edges":[],"viewport":{"x":1593.9590620058552,"y":-1134.8209721681478,"zoom":1.042086939519286}}
// {"nodes":[{"width":107,"height":100,"id":"randomnode_1700359521759","type":"circleNode","position":{"x":-1342.6267861688327,"y":1391.505286144796},"data":{"inpupu":"hello","imgsrc":"./fan.jpeg","placeholder":"請輸入...","backgroundColor":"#ffffff","label":"circleNode node","isSelected":false},"selected":false,"positionAbsolute":{"x":-1342.6267861688327,"y":1391.505286144796},"dragging":false,"style":{"width":107,"height":100},"resizing":false},{"width":331,"height":328,"id":"randomnode_1700359526243","type":"circleNode","position":{"x":-1291.5837035902596,"y":1352.8684256449887},"data":{"inpupu":"hello","imgsrc":"./fan.jpeg","placeholder":"請輸入...","backgroundColor":"#f29797","label":"circleNode node","isSelected":false},"selected":false,"dragging":false,"style":{"width":331,"height":328},"resizing":false,"positionAbsolute":{"x":-1291.5837035902596,"y":1352.8684256449887}}],"edges":[],"viewport":{"x":1593.9590620058552,"y":-1134.8209721681478,"zoom":1.042086939519286}}