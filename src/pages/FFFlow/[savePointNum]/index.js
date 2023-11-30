import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faWindowMinimize } from '@fortawesome/free-solid-svg-icons';
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faSquareFull } from '@fortawesome/free-solid-svg-icons';






import Link from "next/link"

import { useRouter } from 'next/router';

import { useCallback, useState,useEffect,useRef } from 'react';
import { db } from "../../../config" 
import { ref, set ,get} from "firebase/database"

import ReactFlow, { ReactFlowProvider,useReactFlow,
  Panel,Controls,Background ,MiniMap,
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
// node👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻

import AuthCheck from "../AuthCheck.js"

// import Nav from "../../../components/Nav可刪.js"
import DownloadBtn from '../../../components/DownloadBtn/DownloadBtn.js'; 
import ImageUpload from '../../../components/ImageUpload/ImageUpload.js'; 

const proOptions = { account: 'paid-pro', hideAttribution: true };

import { shallow } from 'zustand/shallow';
import useStore from '../../../store.js';

const nodeTypes = { textUpdater: TextUpdaterNode,
  gg: OmgNode,
  ImgNode2: ImgNode2,
  circleNode: ColorNote,
  proCircleNode:proCircleNode,
  example:example,
  shapeNode:shapeNode

};

function Flow({ treeWidth = 230, treeHeight = 120, animationDuration = 200 } = {}) {
  // console.log('組件炫染')
  const router = useRouter();
  const queryNum =router.query['savePointNum']
  // console.log('查詢參數～～:', queryNum); 
  useEffect(() => {
    if (router.isReady) {
      const queryNum = router.query['savePointNum'];
      onRestore(queryNum);
    }
  }, [router.isReady, router.query]);
  


  const [initBgColor,setInitBgColor]= useState( '#373737')
  function handleBgColorChange(event) {
    const newBgColor = event.target.value;
    setInitBgColor(newBgColor);
  }
  
  // const [saveStation, setSaveStation] = useState(1)

  const [selectedColor, setSelectedColor] = useState('#ffffff'); 

  const [updateTrigger, setUpdateTrigger] = useState(false);

  const getNodeId = () => `randomnode_${+new Date()}`;
  // const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(selector, shallow);
  const { nodes, edges, onNodesChange,onEdgesChange, onConnect,setNodes
    ,setEdges,howManyNodes ,
    updateEdgeStyle,
    hideToolbar,toggleToolbar
  } = useStore(state => ({
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
    toggleToolbar: state.toggleToolbar,
    hideToolbar: state.hideToolbar,
  }));
//為了等等使用useeffect偵測node數量變化


// ~~~~~~~~~~~~dnd的部分
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  }
  // －－－－－
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

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



  useEffect(() => { 
    console.log(selectedColor)
  }, [selectedColor]); 

  // ✨  ✨  ✨  ✨  ✨  ✨  ✨  ✨  ✨  ✨
  // const [rfInstance, setRfInstance] = useState(null);
  const [variant, setVariant] = useState('dots');
  const { setViewport } = useReactFlow();
  // 等等解開

  // ✨  ✨  ✨  ✨  ✨  ✨  ✨  ✨  ✨  ✨
  const onSave =(query) => {
    if (reactFlowInstance) {
          console.log(reactFlowInstance.toObject())
          const flow = reactFlowInstance.toObject();
          // localStorage.setItem(flowKey, JSON.stringify(flow));
          const localUUID = localStorage.getItem("userUUID")
        if (localUUID) {
              const databaseRef = ref(db, `users/${localUUID}/reactflow/FFFlow/${query}`);
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

const onRestore = (query) => {
  const restoreFlow = async () => {
    const localUUID = localStorage.getItem("userUUID");
    if (localUUID) {
      const databaseRef = ref(db, `users/${localUUID}/reactflow/FFFlow/${query}`);
      try {
        const snapshot = await get(databaseRef);
        console.log(1111)
        if (snapshot.exists()){
        // if (false) {
          console.log(2222)
  
          const data = snapshot.val();
          console.log(3333)
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
          console.log(query)
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
        console.log('獲取資料發生錯誤!')
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



// const [addCount, setAddCount] = useState(0);
const sayhi = () => {
  // console.log('hi')
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
        height: "100vh",
        width: "100%",

      }}>

      <div className={styles.navbody}>
          <Link href="/">
              <div className={styles.logo}   style={{zIndex:'1999'}}>
                  <img src="/oklogo.png" className={styles.logopng}/>
                  <span className={styles.logospan}>Organic</span>
              </div>
          </Link>

        <div className={styles.nav}>

  
        {/* <FontAwesomeIcon icon={faCircleRight} style={{ color: 'red',height:'200px',width:'200px' }} /> */}


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

          <button 
            onClick={()=>{onSave(queryNum)}}
            className={styles.dwBtn}>
            <FontAwesomeIcon icon={faFloppyDisk} className={styles.awesomeNavIconBtnS}/>

          </button>

          <button onClick={onRestore} 
          className={styles.dwBtn}> 
            <FontAwesomeIcon icon={faClockRotateLeft} className={styles.awesomeNavIconBtnS}/>
              </button>
            {/* <button onClick={onAdd}
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600"
          >add node</button> */}
            <button 
            className={styles.dwBtn}>
            <Link href="/">
            <FontAwesomeIcon icon={faFolderOpen} className={styles.awesomeNavIconBtnS}/>
              </Link>
          </button>
          <DownloadBtn initBgColor={initBgColor}/>
        </div>
      </div>
        
    <AuthCheck/>
    {/* <Sidebar 
      onRestore={onRestore}
      saveStation ={saveStation} 
      setSaveStation={setSaveStation}/> */}

    {/* <Nav/> */}
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
      position={'bottom-left'}
    
    />

    <MiniMap 
      className="custom-minimap"
      pannable={true}
      style={{ cursor: 'move',}}
      // nodeColor={'#FF5733'}
      position={'bottom-right'}
    />






          {/* 這邊是dnd🔥 */}

        <div className={`${styles.toolbarBody}  ${hideToolbar ? styles.toolbarBodyHidden : ''}`}>
            {/* <div className={styles.toolbarBody}> */}
              <div className={styles.toggleBtn} onClick={toggleToolbar}>
                <FontAwesomeIcon icon={faCircleChevronLeft} className={styles.iconToggle} />
                <FontAwesomeIcon icon={faWindowMinimize} className={styles.iconLine}/>
                <FontAwesomeIcon icon={faCircleChevronRight} className={styles.iconShowToggle}/>



              </div>


              <div className={styles.toolBtns}>
                  <div className="dndnode
                  "onDragStart={(event) => onDragStart(event, 'textUpdater')} draggable>
                      <FontAwesomeIcon icon={faSquareFull} className={styles.SidebarIconBtnS} />
                  </div>
              </div>

              <div className={styles.toolBtns}>
                <div className="dndnode input
                " onDragStart={(event) => onDragStart(event, 'circleNode')} draggable>
                    <FontAwesomeIcon icon={faCircle} className={styles.SidebarIconBtnS} />
                </div>
              </div>
              {/* <div className={styles.toolBtns}>喔喔</div> */}
              <div className={styles.toolBtns}> <ImageUpload onAdd={onAdd}

          /></div>

        </div>

        <Panel 
        className=
        "bg-red-100  font-semibold py-2 px-4 rounded "
          style={{ width: '80px', height: '100％'
          , position: 'absolute', bottom: '40px',right:'0px'}}>
                <input type="color"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="color-picker"/>
              {/* <div className="dndnode input justify-center	 flex
              bg-blue-300 text-white  font-semibold py-2 px-4 rounded hover:bg-blue-400  ml-1 mr-1
              " onDragStart={(event) => onDragStart(event, 'circleNode')} draggable>
                  ⚪️ </div>
              <div className="dndnode bg-purple-300 text-white font-semibold flex
                justify-center	 py-2 px-4 rounded hover:bg-purple-400  ml-1 mr-1
                "onDragStart={(event) => onDragStart(event, 'textUpdater')} draggable>
                  ⬜️</div>
                <div className="dndnode bg-purple-300 text-white font-semibold
                  flex justify-center	
                  py-2 px-4 rounded hover:bg-purple-400  ml-1 mr-1
                  " onDragStart={(event) => onDragStart(event, 'example')} draggable>
                    🟡</div> */}
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


