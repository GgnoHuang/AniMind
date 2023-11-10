import styles from "./ffflow.module.css";
import { auth,db } from "../../config" 
// import { onAuthStateChanged ,ref,set,get} from "firebase/auth"
import { onAuthStateChanged } from "firebase/auth"
import { getDatabase, ref, set ,get} from "firebase/database"


import { useCallback, useState,useEffect,useRef } from 'react';
import ReactFlow, { ReactFlowProvider,useNodesState,useEdgesState,useReactFlow,
  Panel,addEdge, applyEdgeChanges,applyNodeChanges,Controls,Background ,
  MiniMap} from 'reactflow';
import 'reactflow/dist/style.css';
// import 'reactflow/dist/base.css';

// node👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻
import TextUpdaterNode from '../../nodes/TextUpdaterNode'
import OmgNode from '../../nodes/OmgNode'
import OmgNode2 from '../../nodes/OmgNode2'
import ColorNote from '../../nodes/ColorNote'
// node👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻

import AuthCheck from "./AuthCheck.js"


import Sidebar from "./Sidebar.js"


// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { textUpdater: TextUpdaterNode,
    gg: OmgNode,
    gg2: OmgNode2,
    selectorNode: ColorNote,
};

const initialEdges = [
  { id: 'edge-1', source: 'node-1', target: 'node-2', sourceHandle: 'a' },
  { id: 'edge-2', source: 'node-1', target: 'node-3', sourceHandle: 'b' },
  { id: 'edge-3', source: 'node-1', target: 'node-3', sourceHandle: 'a' },
];

// 🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈
// 🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈
// 🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈

function Flow() {
  // const [bgColor, setBgColor] = useState('rgb(169, 196, 199)');
  // const [memoColor, setMemoColor] = useState('');

// ~~~~~~~~~~~~dnd的部分
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  }
    // －－－－－
    const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

    // －－－－－
    let id = 0;
    const getIdd = () => `dndnode_${id++}`;

    // －－－－－
    const onDragOver = useCallback((event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    }, []);
    // －－－－
    const onDrop = useCallback(
      (event) => {
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
          id: getIdd(),
          type,
          position,
          data: { label: `${type} node` },
        };
  
        setNodes((nds) => nds.concat(newNode));
      },

      // eslint-disable-next-line react-hooks/exhaustive-deps
      [reactFlowInstance]
    );
// ~~~~~~~~~~~~dnd的部分




  // 刪除reactflow字樣
  useEffect(() => {
    // 在组件加载后执行的代码
    // 这里可以添加逻辑来删除元素内的内容
    const linkElement = document.querySelector('a[aria-label="React Flow attribution"]');
    if (linkElement) {
      // 如果找到具有指定属性的链接元素
      linkElement.innerHTML = ''; // 删除元素内的内容
    }
  }, []); 
  // 刪除reactflow字樣

  const [inpupu, setInpupu] = useState('');
  // const onInpupu = (event) => {
  //   console.log('當前輸入：', event.target.value);
  //   console.log(555555);
  //   setInpupu(event.target.value);
  //   console.log('更新後的 inpupu 值：', inpupu);
  // };

  const initialNodes = [
    {
      id: 'node-1',
      type: 'textUpdater',
      position: { x: 150, y: 0 },
      data: { placeholder: '是怎樣啊', hello:666,setInpupu, inpupu },
    },
    {
      id: 'node-2',
      type: 'textUpdater',
      position: { x: 0, y: 100 },
      data: { placeholder:'傻眼', hello:666,setInpupu,inpupu },
    },
    {
      id: 'node-55',
      type: 'textUpdater',
      position: { x: 222, y: 100 },
      data: { placeholder: '喔', hello:666,setInpupu,inpupu },
    },

    {
      id: 'node-3',
      type: 'output',
      targetPosition: 'left',
      position: { x: 200, y: 200 },
      data: { label: 'node 3' },
    },
  
  ];
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  // ✨  ✨  ✨  ✨  ✨  ✨  ✨  ✨  ✨  ✨
  // const [rfInstance, setRfInstance] = useState(null);
  const [variant, setVariant] = useState('cross');


  const { setViewport } = useReactFlow();
  // 等等解開
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );
  // ✨  ✨  ✨  ✨  ✨  ✨  ✨  ✨  ✨  ✨






  const onSave = useCallback(() => {
    if (reactFlowInstance) {
          const flow = reactFlowInstance.toObject();
          // localStorage.setItem(flowKey, JSON.stringify(flow));
          const localUUID = localStorage.getItem("userUUID")
        if (localUUID) {
              const databaseRef = ref(db, `users/${localUUID}/reactflow/FFFlow`);
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
      console.log(22222)
    }
}, [reactFlowInstance]);




const onRestore = useCallback(() => {
  const restoreFlow = async () => {
  // 關鍵就是存這個💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥
    // const flow = JSON.parse(localStorage.getItem(flowKey));
    // console.log('本地抓到的：')
    // console.log( flow)
    // if (flow) {        }
  // 關鍵就是存這個💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥

    const localUUID = localStorage.getItem("userUUID");
    if (localUUID) {
      const databaseRef = ref(db, `users/${localUUID}/reactflow/FFFlow`);
      try {
        const snapshot = await get(databaseRef);
        if (snapshot.exists()) {
        // if (false) {
          const data = snapshot.val();
          console.log('成功從資料庫抓到的：');
          console.log(JSON.parse(data));
          const parsedData = JSON.parse(data);
          if (parsedData) {
            const { x = 0, y = 0, zoom = 1 } = parsedData.viewport;
            setNodes(parsedData.nodes || []);
            setEdges(parsedData.edges || []);
            setViewport({ x, y, zoom });
           // setNodes(flow.nodes || []) 用于更新节点状态，flow.nodes
            //  包含了从本地存储中还原的节点数据。
            // 如果没有从存储中找到节点数据，它将保持为空数组 []。
          }
        }else{
          console.log(1111)
        }
      } catch (error) {
        console.error("獲取資料發生錯誤", error);
      }
    } else {
      console.log("未找到用户 ID");
    }
  };
  restoreFlow();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [setNodes, setViewport]);

useEffect(()=>{
  onRestore();
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])

const getNodeId = () => `randomnode_${+new Date()}`;

const onAdd = useCallback(() => {
  console.log(nodes)
  const newNode = {
    id: getNodeId(),
    // type: 'gg',
    type: 'textUpdater',
     data: {name: '我彭粉🔥🔥🔥', job: '測試', emoji: '🔥🔥🔥',
     inpupu:'喔是喔',
     imgsrc:'./fan.jpeg',
     placeholder:'預設'} ,




    position: {
      x: Math.random() * window.innerWidth - 100,
      y: Math.random() * window.innerHeight,
    },
  };


  // setNodes((prevNodes) => [...prevNodes, newNode]);
  setNodes((nds) => nds.concat(newNode));
  // onNodesChange((prevNodes) => [...prevNodes, newNode]);





// 
  // const onNodesChange = useCallback(
  //   (changes) => 
  //   setNodes((nodes) => {  
  //       console.log(changes)
  //       // changes就是你拖動的那一個node
  //       console.log(nodes)
  //       // nodes是所有的nodes
  //       return  applyNodeChanges(changes, nodes)
  //     }
  //   ),[setNodes]
  // );

  
  // 当您拖拽或选择一个节点时，
  // onNodesChange 处理程序会被调用。
  // 借助 applyNodeChanges 函数，
  // 您可以将这些变更应用到当前的节点状态。
  // 将所有内容放在一起，应该如下所示：
  // const onEdgesChange = useCallback(
  //   (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
  //   [setEdges]
  // );

}, [setNodes]);



  return (
    <div className='bg-teal-100'
      style={{ 
        border:" 3px red solid",
        height: "100vh",
        width: "100%",
        display: "flex"
      }}>
        
    <AuthCheck/>
    <Sidebar/>
    
    <ReactFlow
      ref={reactFlowWrapper}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
      // style={{ background: bgColor }}
      onDrop={onDrop}// 拖曳新增用的
      onDragOver={onDragOver}// 拖曳新增用的

      onInit={setReactFlowInstance}

    
    >
      
      <Background color="#ccc" variant={variant} />
    <Controls 
    
    fitViewOptions={{
      duration: 800,
    }} // 传递自定义的 FitViewOptions
    position={'bottom-left'}
    />
    {/* <MiniMap /> */}
    <MiniMap 
    //  style={{ background: memoColor }}
    // nodeColor={'#FF5733'}
     />

    <Panel>
        {/* <div>背景樣式:</div> */}
        <button 
                  className="bg-yellow-400 text-white font-semibold py-2 px-4 rounded hover:bg-yellow-500 ml-1 mr-1"

        onClick={() => setVariant('dots')}>點狀</button>
        <button
                          className="bg-yellow-400 text-white font-semibold py-2 px-4 rounded hover:bg-yellow-500 ml-1 mr-1"

         onClick={() => setVariant('lines')}>格紋</button>
        <button
                          className="bg-yellow-400 text-white font-semibold py-2 px-4 rounded hover:bg-yellow-500 ml-1 mr-1"

        onClick={() => setVariant('cross')}>十字</button>

      </Panel>

    <Panel position="top-right">
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

        {/* <button onClick={onAdd}
          className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600"
        >add node</button> */}
      </Panel>
          {/* 這邊是dnd🔥 */}
          <Panel  className="bg-red-100 text-white font-semibold py-2 px-4 rounded  ml-1 mr-1"
          style={{ width: '200px', height: '100％'
          , position: 'absolute', bottom: '0px',left:'50px'}}>
          <div className="dndnode input
          bg-blue-300 text-white font-semibold py-2 px-4 rounded hover:bg-blue-400  ml-1 mr-1
          " onDragStart={(event) => onDragStart(event, 'selectorNode')} draggable>
            1
          </div>
          <div className="dndnode
            bg-purple-300 text-white font-semibold py-2 px-4 rounded hover:bg-purple-400  ml-1 mr-1

          " onDragStart={(event) => onDragStart(event, 'default')} draggable>
          2
          </div>
          <div className="dndnode output
            bg-pink-300 text-white font-semibold py-2 px-4 rounded hover:bg-pink-400  ml-1 mr-1
          " onDragStart={(event) => onDragStart(event, 'gg2')} draggable>
            3
          </div>

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


