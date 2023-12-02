// ⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️
// ⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️
// ⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️
import dagre from 'dagre';
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));
const nodeWidth = 232;
const nodeHeight = 66;
const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? 'left' : 'top';
    node.sourcePosition = isHorizontal ? 'right' : 'bottom';
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};
// ⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️

import { useRouter } from 'next/router';
import { useCallback, useState,useEffect,useRef } from 'react';

import ReactFlow, { ReactFlowProvider
} from 'reactflow';
import 'reactflow/dist/style.css';
import styles from "../ffflow.module.css";

// node👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻
import TextUpdaterNode from '../../../nodes/TextUpdaterNode'
import OmgNode from '../../../nodes/OmgNode'
import ImgNode2 from '../../../nodes/ImgNode2.js'
import ColorNote from '../../../nodes/ColorNote'
import proCircleNode from '../../../nodes/circleNode.js'
import StarNode from '../../../nodes/StarNode/StarNode.js'
import shapeNode from '../../../nodes/shapeNode.js'
// node👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻

const proOptions = { account: 'paid-pro', hideAttribution: true };
import useStore from '../../../store.js';

const nodeTypes = { textUpdater: TextUpdaterNode,
  gg: OmgNode,
  ImgNode2: ImgNode2,
  circleNode: ColorNote,
  proCircleNode:proCircleNode,
  StarNode:StarNode,
  shapeNode:shapeNode
};

function Flow({ treeWidth = 230, treeHeight = 120, animationDuration = 200 } = {}) {

  const [updateTrigger, setUpdateTrigger] = useState(false);

  const getNodeId = () => `randomnode_${+new Date()}`;
  const { nodes, edges, onNodesChange,onEdgesChange, onConnect,setNodes
  } = useStore(state => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
    addNewNode: state.addNewNode,
    setNodes: state.setNodes,
    setEdges: state.setEdges,
  }));

// ~~~~~~~~~~~~dnd的部分
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  }
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

    const onDrop = (event) => {
        event.preventDefault();

        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData('application/reactflow');
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
            label: `${type} node` },
        };
        setNodes([...nodes, newNode]);
        setUpdateTrigger(trigger => !trigger);  // 觸發 useEffect
      }
  return (
    <div>
    <ReactFlow
      ref={reactFlowWrapper}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      onDrop={onDrop}// 拖曳新增用的
      onDragOver={onDragOver}// 拖曳新增用的
      onInit={setReactFlowInstance}
    >
      </ReactFlow>
    </div>
  );
}
export default () => (
  <ReactFlowProvider>
    <Flow />
  </ReactFlowProvider>
);


以上是我的react flow主要程式碼
以下是我的zustand的store.js程式碼，
我已經在其中定義了setNodes setEdges onNodesChange等等的使用而不是使用react flow內建的
而這也是我遇到的困難，因為我使用的我已經在其中定義了setNodes setEdges 和onNodesChange等等的方式與範例不同
我該如何融入先前提到的layout功能？
請你確保你的回答的知識來源有包含react flow文檔，以及開發者們之間的discuss

import { create } from 'zustand';
import { addEdge, applyNodeChanges, applyEdgeChanges } from 'reactflow';
import { nodes as initialNodes, edges as initialEdges } from './components/initialEls';
export const useStore = create((set, get) => ({
  nodes: initialNodes,// 是一個陣列
  edges: initialEdges,
onNodesChange: (changes) => {
  // console.log(changes)
  set((state) => {
    const newNodes = state.nodes.map((node) => {
      const change = changes.find((c) => c.id === node.id);
      if (change && change.type === 'select') {
        return {
          ...node,
          selected: change.selected,
          data: { ...node.data, isSelected: change.selected },
        };
      }
      return node;
    });
    return { nodes: applyNodeChanges(changes, newNodes) };
  });
},
  setNodes: (newNodes) => set((state) => ({
    nodes: newNodes,
    howManyNodes: newNodes.length,
  })),
  setEdges: (newEdges) => {
    set({ edges: newEdges });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
}));
export default useStore;












































































// ⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️
// ⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️
// ⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️


import dagre from 'dagre';
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));
const nodeWidth = 132;
const nodeHeight = 36;
const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? 'left' : 'top';
    node.sourcePosition = isHorizontal ? 'right' : 'bottom';
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMinimize,
        faCircleChevronRight,
        faCircleChevronLeft,
        faClockRotateLeft,
        faFloppyDisk,
        faFolderOpen,
        faCircle,
        faSquare,
        faStar,
        faDiamond,
        faCertificate 
  } from '@fortawesome/free-solid-svg-icons';

import Link from "next/link"
import { useRouter } from 'next/router';
import { useCallback, useState,useEffect,useRef } from 'react';
import ReactFlow, { ReactFlowProvider,useReactFlow,
  Panel,Controls,Background ,MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';
import styles from "../ffflow.module.css";

// node👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻
import TextUpdaterNode from '../../../nodes/TextUpdaterNode'
import ImgNode2 from '../../../nodes/ImgNode2.js'
import StarNode from '../../../nodes/StarNode/StarNode.js'
// node👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻

import DownloadBtn from '../../../components/DownloadBtn/DownloadBtn.js'; 
import useStore from '../../../store.js';

const nodeTypes = { 
  textUpdater: TextUpdaterNode,
  gg: OmgNode,
  ImgNode2: ImgNode2,
  circleNode: ColorNote,
  StarNode:StarNode,
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

const handleLayoutChange = (direction) => {
  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    nodes, edges, direction
  );
  setNodes(layoutedNodes);
  setEdges(layoutedEdges);
};

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
  return (
    <div className='bg-teal-100'>

      <div className={styles.navbody}>
          <Link href="/">
              <div className={styles.logo}   style={{zIndex:'1999'}}>
                  <img src="/oklogo.png" className={styles.logopng}/>
                  <span className={styles.logospan}>Organic</span>
              </div>
          </Link>

        <div className={styles.nav}>

          <button 
            onClick={()=>{onSave(queryNum)}}
            className={styles.dwBtn}>
            <FontAwesomeIcon icon={faFloppyDisk} className={styles.awesomeNavIconBtnS}/>

          </button>

          <button onClick={onRestore} 
          className={styles.dwBtn}> 
            <FontAwesomeIcon icon={faClockRotateLeft} className={styles.awesomeNavIconBtnS}/>
              </button>
            <button 
            className={styles.dwBtn}>
            <Link href="/">
            <FontAwesomeIcon icon={faFolderOpen} className={styles.awesomeNavIconBtnS}/>
              </Link>
          </button>
          <DownloadBtn initBgColor={initBgColor}/>
          <button onClick={() => handleLayoutChange('TB')}>Vertical Layout</button>
          <button onClick={() => handleLayoutChange('LR')}>Horizontal Layout</button>
        </div>
      </div>
        
        
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
      onDrop={onDrop}// 拖曳新增用的
      onDragOver={onDragOver}// 拖曳新增用的

      onInit={setReactFlowInstance}
    >


        <div className={`${styles.toolbarBody}  ${hideToolbar ? styles.toolbarBodyHidden : ''}`}>
            {/* <div className={styles.toolbarBody}> */}
              <div className={styles.toggleBtn} onClick={toggleToolbar}>
                <FontAwesomeIcon icon={faCircleChevronLeft} className={styles.iconToggle} />
                <FontAwesomeIcon icon={faWindowMinimize} className={styles.iconLine}/>
                <FontAwesomeIcon icon={faCircleChevronRight} className={styles.iconShowToggle}/>
              </div>
                  <div className={styles.toolBtns}
                     // className="dndnode" 
                  onDragStart={(event) => onDragStart(event, 'textUpdater')} draggable>
                      <FontAwesomeIcon icon={faSquare} className={styles.SidebarIconBtnS} />
                  </div>

                <div className={styles.toolBtns}
                // className="dndnode input" 
                onDragStart={(event) => onDragStart(event, 'circleNode')} draggable>
                    <FontAwesomeIcon icon={faCircle} className={styles.SidebarIconBtnS} />
                </div>
              <div className={styles.toolBtns}
                onDragStart={(event) => onDragStart(event, 'StarNode')} draggable>
                    <FontAwesomeIcon icon={faCertificate} className={styles.SidebarIconBtnS} />
              </div>
              <div className={styles.toolBtns}
                onDragStart={(event) => onDragStart(event, 'StarNode')} draggable>
                    <FontAwesomeIcon icon={faDiamond} className={styles.SidebarIconBtnS} />
              </div>
              <div className={styles.toolBtns}
                onDragStart={(event) => onDragStart(event, 'StarNode')} draggable>
                    <FontAwesomeIcon icon={faStar} className={styles.SidebarIconBtnS} />
              </div>
        </div>

      </ReactFlow>
    </div>
  );
}
export default () => (
  <ReactFlowProvider>
    <Flow />
  </ReactFlowProvider>
);


