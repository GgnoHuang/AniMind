import { Handle, NodeProps,Position, NodeResizer} from 'reactflow';
import { useCallback, useState,useEffect ,useRef} from 'react';
import useStore from '../store';


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
    <>
        <NodeResizer
          handleStyle={{width:'15px',height:'15px',backgroundColor:'red'}}
          lineStyle={{borderWidth: '5px', borderStyle: 'dashed', borderColor: '#FF00FF	',
            animation: 'blink 1s linear infinite', }}
            isVisible={selected}
            minWidth={100}
            minHeight={50}

            />
 
    <div 
      onClick={handleDoubleClick}
    // className="text-updater-node border border-gray-300 p-2 rounded"
      // 出bug再把text-updater-node ，我現在不知道他是做啥用的
      className=""
      style={{ 
        backgroundColor: data.backgroundColor || '#FF00FF', // 使用data中的背景颜色，如果没有则使用默认颜色
        border: '2px solid gray',
        overflow:'hidden',
        padding:'10px',
              // height:'fit-content',
        height:'100%',
        // width:'100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:'8px',
        // borderRadius: '50%', // Make it circular



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
         
        
        <button    
            className="adjustButton"
          style={{ 
          fontSize:'24px',
          width: '500px',
          position:'absolute',
          top:'-60px',
          left: '50%', // 將元素左邊緣對齊父元素的中心
          transform: 'translateX(-50%)', // 然後向左移動自身寬度的50%，以實現完全居中
          display: data.isSelected ? 'block' : 'none'
          // display: isAnyNodeSelected ? 'block' : 'none'
        }}>

          <span  style={{fontSize:' 35px',borderWidth:'1px'}}>⠿</span>
          <button onClick={()=>onChangeTextAlign('left')}
          style={{borderColor:' red',borderWidth:'1px'}}>靠左</button>
          <button onClick={()=>onChangeTextAlign('center')}
          style={{borderColor:' red',borderWidth:'1px'}}>靠中</button>
          <button onClick={()=>onChangeTextAlign('right')}
          style={{borderColor:' red',borderWidth:'1px'}}>靠右</button>

          {/* <input
            type="range"
            className='nodrag'
            min="10" // 最小字体大小
            max="100" // 最大字体大小
            // value='25'
            onChange={onFontSizeChange}
          /> */}
          {/* <span>{selectFontSize}</span> */}
          <button onClick={increaseFontSizeTen} style={{ padding:'0px 5px',borderColor:' red',borderWidth:'1px' ,fontSize:'40px'}}>＋</button>
          <button onClick={increaseFontSize} style={{ padding:'0px 5px',borderColor:' red',borderWidth:'1px' }}>+</button>
          <button onClick={decreaseFontSize} style={{  padding:'0px 5px',borderColor:' red',borderWidth:'1px' }}>-</button>
          <button onClick={decreaseFontSizeTen} style={{  padding:'0px 5px',borderColor:' red',borderWidth:'1px'  ,fontSize:'40px'}}>-</button>

      <input
          value={selectedColor}
          // 這邊value就是input顯示在畫面上的顏色，就是data.backgroundColor
          type="color"
          // defaultValue={data.color}
          onChange={onSelectColor}
          // className="nodrag"
        />
          <input
          value={selectedFontColor}
          type="color"
          onChange={onSelectFontColor}
        />
      

        </button>
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
        <Handle type="target" position={Position.Left} id="b" 
            style={{ backgroundColor: 'blue' ,width: '13px',  // 调整宽度
            height: '13px', }} // 更改背景颜色为蓝色
            isConnectable={isConnectable} 
        />
        <Handle type="source" position={Position.Right} 
          style={{ backgroundColor: 'blue' ,width: '13px',  // 调整宽度
          height: '13px', }} 
          isConnectable={isConnectable} 
        />
        

    </div>
    </>
  );
}

export default TextUpdaterNode;
