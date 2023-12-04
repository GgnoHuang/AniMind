import { Handle, NodeProps,Position, NodeResizer} from 'reactflow';
import { useCallback, useState,useEffect ,useRef} from 'react';
import useStore from '../store';

// TriangleNode.js
import React from 'react';


function TriangleNode({ id, data,isConnectable,selected  }) {
  const triangleStyle = {
    width: 0,
    height: 0,
    borderLeft: `${data.width / 2 || 50}px solid transparent`,
    borderRight: `${data.width / 2 || 50}px solid transparent`,
    borderBottom: `${data.height || 100}px solid ${data.color || '#FFDDDD'}`,
  };

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
            // minWidth={100}
            // minHeight={50}

            />
                <div>
      <div style={triangleStyle}></div>
      <Handle type="target" position={Position.Top} style={{ top: '-5px', left: '50%', marginLeft: '-5px' }} />
      <Handle type="source" position={Position.Bottom} style={{ bottom: '-5px', left: '50%', marginLeft: '-5px' }} />
    </div>
    </>

  );
}

export default TriangleNode;
