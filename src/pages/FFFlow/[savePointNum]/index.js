import Link from "next/link"

import { useRouter } from 'next/router';

import { useCallback, useState,useEffect,useRef } from 'react';
import { auth,db } from "../../../config" 
import { getDatabase, ref, set ,get} from "firebase/database"

import ReactFlow, { ReactFlowProvider,useNodesState,useEdgesState,useReactFlow,
  Panel,addEdge, applyEdgeChanges,applyNodeChanges,Controls,
  ControlButton,
  Background ,
  MiniMap,



  Node,
  Edge,
  ConnectionLineType,
  MarkerType,
  ConnectionMode,

} from 'reactflow';
import 'reactflow/dist/style.css';

import styles from "../ffflow.module.css";

// node👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻
import TextUpdaterNode from '../../../nodes/TextUpdaterNode'
import OmgNode from '../../../nodes/OmgNode'
import ImgNode2 from '../../../nodes/ImgNode2.js'
import ColorNote from '../../../nodes/ColorNote'
import proCircleNode from '../../../nodes/circleNode.js'
import example from '../../../nodes/example.js'
import shapeNode from '../../../nodes/shapeNode.js'
// import ResizerNode from '../../nodes/ResizerNode.js'
// node👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻

import AuthCheck from "../AuthCheck.js"

import Sidebar from "../../../components/Sidebar.js"
import Nav from "../../../components/Nav.js"
// import NodesList from './Nodelist.js'; 
import DownloadBtn from '../../../components/DownloadBtn.js'; 
import ImageUpload from '../../../components/ImageUpload.js'; 


// 👗👗👗👗👗👗👗樹狀圖👗👗👗👗👗👗👗👗👗👗👗

// import useAnimatedNodes from './useAnimatedNodes';
// import useExpandCollapse from './useExpandCollapse';
// 👗👗👗👗👗👗👗樹狀圖👗👗👗👗👗👗👗👗👗👗👗


const proOptions = { account: 'paid-pro', hideAttribution: true };

// 🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈
// 🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈
import { shallow } from 'zustand/shallow';
import useStore from '../../../store.js';

const nodeTypes = { textUpdater: TextUpdaterNode,
  gg: OmgNode,
  ImgNode2: ImgNode2,
  circleNode: ColorNote,
  proCircleNode:proCircleNode,
  example:example,
  shapeNode:shapeNode
  // ResizerNode:ResizerNode
};

function Flow({ treeWidth = 230, treeHeight = 120, animationDuration = 200 } = {}) {
  
  const router = useRouter();
  console.log('查詢參數:', router.query); // 獲取 URL 的查詢參數

  
  
  // const initBgColor = '#1A192B';




    // 💞💞💞💞💞💞💞💞💞💞💞💞💞💞重要用法💞💞💞💞💞💞💞💞💞💞💞💞💞💞💞💞💞
  // const onNodeClick = (event, node) => {
  //   console.log('Node clicked:', node);
  // };

  // const onNodeClick =(_, node) => {
  //   setNodes((nds) =>
  //     nds.map((n) => {
  //       if (n.id === node.id) {
  //         return {
  //           ...n,
  //           data: { ...n.data, expanded: !n.data.expanded },
  //         };
  //       }
  //       return n;
  //     })
  //   );
  // }





  // const onEdgeClick = (event, edge) => {
  //   console.log('Node clicked:', edge);
  // };
  // const onEdgeClick = (event, edge) => {
  //   // 根据需要更改样式
  //   updateEdgeStyle(edge.id, { type: 'smoothstep', style: { stroke: 'red' } });

  // 💞💞💞💞💞💞💞💞💞💞💞💞💞💞重要用法💞💞💞💞💞💞💞💞💞💞💞💞💞💞💞💞💞

  const [initBgColor,setInitBgColor]= useState( 'rgb(199, 199, 199)')
  function handleBgColorChange(event) {
    const newBgColor = event.target.value;
    setInitBgColor(newBgColor);
  }
  
  const [saveStation, setSaveStation] = useState(1)

  const [selectedColor, setSelectedColor] = useState('#ffffff'); 

  const [updateTrigger, setUpdateTrigger] = useState(false);

  const getNodeId = () => `randomnode_${+new Date()}`;
  // const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(selector, shallow);
  const { nodes, edges, onNodesChange,onEdgesChange, onConnect,setNodes
     ,setEdges,howManyNodes ,
     updateEdgeStyle} = useStore(state => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
    addNewNode: state.addNewNode,
    setNodes: state.setNodes,
    setEdges: state.setEdges,
    howManyNodes: state.howManyNodes,
    updateEdgeStyle: state.updateEdgeStyle,
  }));

//為了等等使用useeffect偵測node數量變化



// 👗👗👗👗👗👗👗樹狀圖👗👗👗👗👗👗👗👗👗👗👗
// 👗👗👗👗👗👗👗樹狀圖👗👗👗👗👗👗👗👗👗👗👗
// 👗👗👗👗👗👗👗樹狀圖👗👗👗👗👗👗👗👗👗👗👗
// const { nodes: visibleNodes, edges: visibleEdges } = useExpandCollapse(nodes, edges, { treeWidth, treeHeight });
// const { nodes: animatedNodes } = useAnimatedNodes(visibleNodes, { animationDuration });

// const onNodeClick =(_, node) => {
//   if (node.type === 'custom') {
//     console.log(node.type)
//     console.log(node)
//     setNodes((nds) =>
//     nds.map((n) => {
//       if (n.id === node.id) {
//         return {...n,
//           data: { ...n.data, expanded: !n.data.expanded },
//         };}return n;}));}
//     console.log('Node clicked:', node);}
// 👗👗👗👗👗👗👗樹狀圖👗👗👗👗👗👗👗👗👗👗👗
// 👗👗👗👗👗👗👗樹狀圖👗👗👗👗👗👗👗👗👗👗👗
// 👗👗👗👗👗👗👗樹狀圖👗👗👗👗👗👗👗👗👗👗👗















// ~~~~~~~~~~~~dnd的部分
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  }
  // －－－－－
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  // －－－－－
  // let id = 0;
  // －－－－－
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
    // －－－－

    const onDrop = (event) => {
        event.preventDefault();
  
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData('application/reactflow');
  
        // check if the dropped element is valid
        if (typeof type === 'undefined' || !type) {
          return;
        }
  
        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });
        const newNode = {
          id: getNodeId(),
          type,
          position,
          data: {
            
            inpupu: 'hello',
            imgsrc: './fan.jpeg',
            placeholder: '請輸入...',
            backgroundColor: selectedColor, // 使用所选颜色
      
            label: `${type} node` },
        };
        console.log(1)
        // const currentNodes = useStore.getState().nodes;

        setNodes([...nodes, newNode]);
        setUpdateTrigger(trigger => !trigger);  // 觸發 useEffect

      }
// ~~~~~~~~~~~~dnd的部分

  // useEffect(() => { // 刪除reactflow字樣
  //   const linkElement = document.querySelector('a[aria-label="React Flow attribution"]');
  //   if (linkElement) {
  //     linkElement.innerHTML = ''; 
  //   }
  // }, []); // 刪除reactflow字樣





  useEffect(() => { 
    console.log(selectedColor)
  }, [selectedColor]); 

  // ✨  ✨  ✨  ✨  ✨  ✨  ✨  ✨  ✨  ✨
  // const [rfInstance, setRfInstance] = useState(null);
  const [variant, setVariant] = useState('cross');
  const { setViewport } = useReactFlow();
  // 等等解開

  // ✨  ✨  ✨  ✨  ✨  ✨  ✨  ✨  ✨  ✨
  const onSave =() => {
    if (reactFlowInstance) {
          console.log(reactFlowInstance.toObject())
          const flow = reactFlowInstance.toObject();
          // localStorage.setItem(flowKey, JSON.stringify(flow));
          const localUUID = localStorage.getItem("userUUID")
        if (localUUID) {
              const databaseRef = ref(db, `users/${localUUID}/reactflow/FFFlow/${saveStation}`);
              set(databaseRef, JSON.stringify(flow))
              .then(() => {
                console.log("成功存到資料庫");
              })
              .catch((error) => {
                console.error("儲存發生錯誤：", error);
              });
        }else{
          console.log('沒抓到localstorage的會員id')
        }
    }else{
      console.log('')
    }
}

const onRestore = () => {
  const restoreFlow = async () => {
    const localUUID = localStorage.getItem("userUUID");
    if (localUUID) {
      const databaseRef = ref(db, `users/${localUUID}/reactflow/FFFlow/${saveStation}`);
      try {
        const snapshot = await get(databaseRef);
        if (snapshot.exists()) {
        // if (false) {
          const data = snapshot.val();
          console.log('成功從資料庫抓到的：');
          console.log(JSON.parse(data));

          const parsedData = JSON.parse(data);
          if (parsedData) {
            // console.log(parsedData.viewport)
            const { x = 0, y = 0, zoom = 1 } = parsedData.viewport;

            setNodes(parsedData.nodes || []);
            setEdges(parsedData.edges || []);
            setViewport({ x, y, zoom });
           // setNodes(flow.nodes || []) 用於更新節點狀態，flow.nodes
            // 如果沒有從儲存中找到節點數據，保持為空數組[]
          }
        }else{
          console.log('無存檔')
          setNodes([]);
          setEdges([]);
          setViewport({ x: 0, y: 0, zoom: 1 });
          // setViewport({ x, y, zoom });
        }
      } catch (error) {
        setNodes([]);
        setEdges([]);
        setViewport({ x: 0, y: 0, zoom: 1 });
        alert('獲取資料發生錯誤')
        console.error("獲取資料發生錯誤", error);
      }
    } else {
      console.log("未找到用户 ID");
      setNodes([]);
      setEdges([]);
      setViewport({ x: 0, y: 0, zoom: 1 });
    }
  };
  restoreFlow();
// eslint-disable-next-line react-hooks/exhaustive-deps
}

useEffect(()=>{
  onRestore();
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])


// const [addCount, setAddCount] = useState(0);
const sayhi = () => {
  console.log('hi')
}
// const addNewNode = useStore((state) => state.addNewNode);
const onAdd = (imageUrl) => {
  const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();

  // 計算瀏覽器視窗中心點的座標
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  // 將視窗座標轉換為 React Flow 的畫布座標
  const canvasPosition = reactFlowInstance.project({
    x: centerX - reactFlowBounds.left,
    y: centerY - reactFlowBounds.top,
  });
  // const { x, y, zoom } = reactFlowInstance.getViewport();
  
  const newNode = {
    id: getNodeId(),
    type: 'ImgNode2',
    data:{
      pokemonpng:imageUrl
      // pokemonpng:'/gg.jpg'
    },position: canvasPosition,
  };
  // const newNode =  {
  //   id: '9',
  //   type: 'shapeNode',
  //   position: { x: 200, y: 390 },
  //   data: { shape: 'parallelogram', width: 150, height: 70, label: 'Parallelogram', color: '#668de3' },
  // }
  // addNewNode(newNode);

  setNodes([...nodes, newNode]);

  //🥴🥴🥴🥴🥴 這邊好像可以用看看async await
  // setAddCount(count => count + 1);  // 增加计数
  setUpdateTrigger(trigger => !trigger);  // 触发 useEffect
};
useEffect(() => {
    console.log(nodes);
    console.log('數量：',howManyNodes);

// eslint-disable-next-line react-hooks/exhaustive-deps
}, [howManyNodes]);



  return (
    <div className='bg-teal-100'
      style={{ 
        border:" 5px red solid",
        height: "100vh",
        width: "100%",

      }}>
        
    <AuthCheck/>
    {/* <Sidebar 
      onRestore={onRestore}
      saveStation ={saveStation} 
      setSaveStation={setSaveStation}/> */}

    <Nav/>
    {/* <NodesList />  */}
        
    <ReactFlow
      proOptions={proOptions}

      style={{ background: initBgColor }}
      zoomOnDoubleClick={false}

      ref={reactFlowWrapper}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView={false}// 沒有設定的話會重新載入就fitView導致變很大
      // onEdgeClick={onEdgeClick}
      // onNodeClick={onNodeClick}
      minZoom={0.1}
      maxZoom={7}
      // style={{ background: bgColor }}
      onDrop={onDrop}// 拖曳新增用的
      onDragOver={onDragOver}// 拖曳新增用的

      onInit={setReactFlowInstance}
    >
      
    <Background variant={variant} />
    <Controls 
      className="custom-controls"
      fitViewOptions={{
        duration: 500,padding: 0.3
      }} // 传递自定义的 FitViewOptions
      position={'bottom-right'}
    
    />

    <MiniMap 
      className="custom-minimap"
      pannable={true}
      style={{ cursor: 'move',}}
      // nodeColor={'#FF5733'}
      position={'bottom-left'}

    />




    <Panel>

        {/* <div>背景樣式:</div> */}
      
        <button className="bg-yellow-400 text-white font-semibold py-2 px-4 rounded hover:bg-yellow-500 ml-1 mr-1"
         onClick={() => setVariant('lines')}>格紋</button>
        <button className="bg-yellow-400 text-white font-semibold py-2 px-4 rounded hover:bg-yellow-500 ml-1 mr-1"
        onClick={() => setVariant('cross')}>十字</button>
          <button className="bg-yellow-400 text-white font-semibold py-2 px-4 rounded hover:bg-yellow-500 ml-1 mr-1"
        onClick={() => setVariant('dots')}>點狀</button>
        <input className="nodrag" type="color"
        onChange={handleBgColorChange}
      //  defaultValue=
       />

      </Panel>



    <Panel position="top-right">    
        <button className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600  ml-1 mr-1">
          <Link href="/">回到首頁</Link>
        </button>

        <button 
        onClick={onSave}
          className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600  ml-1 mr-1"
        >保存</button>

        <button 
        onClick={onRestore}
          className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600  ml-1 mr-1"
        >回到紀錄狀態</button>
          <button onClick={onAdd}
          className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600"
        >add node</button>


  
        
      <DownloadBtn initBgColor={initBgColor}/>

      </Panel>

          {/* 這邊是dnd🔥 */}
      <Panel  className="bg-red-100 text-white font-semibold py-2 px-4 rounded  ml-1 mr-1"
          style={{ width: '100px', height: '100％'
          , position: 'absolute', bottom: '40px',right:'0px'}}>
                <input
          type="color"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="color-picker"
        />
          <div className="dndnode input
            justify-center	
            flex
          bg-blue-300 text-white  font-semibold py-2 px-4 rounded hover:bg-blue-400  ml-1 mr-1
          " onDragStart={(event) => onDragStart(event, 'circleNode')} draggable>
              ⚪️ 
          </div>
          <div className="dndnode
            bg-purple-300 text-white font-semibold
            flex
            justify-center	
            py-2 px-4 rounded hover:bg-purple-400  ml-1 mr-1

          " onDragStart={(event) => onDragStart(event, 'textUpdater')} draggable>
              ⬜️
          </div>
          <div className="dndnode
            bg-purple-300 text-white font-semibold
            flex
            justify-center	
            py-2 px-4 rounded hover:bg-purple-400  ml-1 mr-1

          " onDragStart={(event) => onDragStart(event, 'example')} draggable>
              🟡
          </div>
          {/* <div className="dndnode output
            bg-pink-300 text-white font-semibold py-2 px-4 rounded hover:bg-pink-400  ml-1 mr-1
          " onDragStart={(event) => onDragStart(event, 'proCircleNode')} draggable>
          上傳圖檔
     
          </div> */}
          <ImageUpload onAdd={onAdd}
          sayhi={sayhi}
          />
        </Panel>
      </ReactFlow>

    </div>

  );
}

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default () => (
  <ReactFlowProvider>
    <Flow />
  </ReactFlowProvider>
);


