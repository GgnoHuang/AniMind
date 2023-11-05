// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
// import { useCallback, useState } from 'react';
// import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges } from 'reactflow';
// import 'reactflow/dist/style.css';

// import TextUpdaterNode from './FFFlow_components/TextUpdaterNode';

// // import './text-updater-node.css';

// const rfStyle = {
//   backgroundColor: '#B8CEFF',
// };

// const initialNodes = [
//   { id: 'node-1', type: 'textUpdater', position: { x: 0, y: 0 }, data: { value: 123 } },
//   {
//     id: 'node-2',
//     type: 'output',
//     targetPosition: 'top',
//     position: { x: 0, y: 200 },
//     data: { label: 'node 2' },
//   },
//   {
//     id: 'node-3',
//     type: 'output',
//     targetPosition: 'top',
//     position: { x: 200, y: 200 },
//     data: { label: 'node 3' },
//   },
// ];

// const initialEdges = [
//   { id: 'edge-1', source: 'node-1', target: 'node-2', sourceHandle: 'a' },
//   { id: 'edge-2', source: 'node-1', target: 'node-3', sourceHandle: 'b' },
// ];
// // sourceHandle就是用哪一個點衝出去，這邊a點跟b點都有衝出去
// // source: 'node-1都是從node-1衝出去

// // we define the nodeTypes outside of the component to prevent re-renderings
// // you could also use useMemo inside the component
// const nodeTypes = { textUpdater: TextUpdaterNode };

// function Flow() {
//   const [nodes, setNodes] = useState(initialNodes);
//   const [edges, setEdges] = useState(initialEdges);

//   const onNodesChange = useCallback(
//     (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
//     [setNodes]
//   );
//   const onEdgesChange = useCallback(
//     (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
//     [setEdges]
//   );
//   const onConnect = useCallback(
//     (connection) => setEdges((eds) => addEdge(connection, eds)),
//     [setEdges]
//   );

//   return (
//    <div style={{ width: '100%', height: '100vh' }}>



//     <ReactFlow
//       nodes={nodes}
//       edges={edges}
//       onNodesChange={onNodesChange}
//       onEdgesChange={onEdgesChange}
//       onConnect={onConnect}
//       nodeTypes={nodeTypes}
//       fitView
//       style={rfStyle}
//     />
//     </div>
//   );
// }

// export default Flow;






// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

// //     <div style={{ width: '100%', height: '100vh' }}>

// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

import { auth,db } from "../config" 
// import { onAuthStateChanged ,ref,set,get} from "firebase/auth"
import { onAuthStateChanged } from "firebase/auth"
import { getDatabase, ref, set ,get} from "firebase/database"


import { useCallback, useState,useEffect } from 'react';
import ReactFlow, { 
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Panel,
  addEdge, 
  applyEdgeChanges,
   applyNodeChanges,
   Controls, 
   Background ,
   MiniMap
   } from 'reactflow';
import 'reactflow/dist/style.css';
// import 'reactflow/dist/base.css';
import TextUpdaterNode from './FFFlow_components/TextUpdaterNode'
import OmgNode from './FFFlow_components/OmgNode'
import Slidebar from './FFFlow_components/Slidebar.js'



const rfStyle = {
  // backgroundColor: '#B8CEFF',
};

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { textUpdater: TextUpdaterNode,
    gg: OmgNode, // 假设你有一个名为 GoodNode 的节点组件
};

const initialEdges = [
  { id: 'edge-1', source: 'node-1', target: 'node-2', sourceHandle: 'a' },
  { id: 'edge-2', source: 'node-1', target: 'node-3', sourceHandle: 'b' },
  { id: 'edge-3', source: 'node-1', target: 'node-3', sourceHandle: 'a' },
];

function Flow() {



  const [inpupu, setInpupu] = useState('');


  const onInpupu = (event) => {
    console.log('當前輸入：', event.target.value);
    setInpupu(event.target.value);
    console.log('更新後的 inpupu 值：', inpupu);
  };


  useEffect(() => {
    // 在组件加载后执行的代码
    // 这里可以添加逻辑来删除元素内的内容
    const linkElement = document.querySelector('a[aria-label="React Flow attribution"]');
    if (linkElement) {
      // 如果找到具有指定属性的链接元素
      linkElement.innerHTML = ''; // 删除元素内的内容
    }
  }, []); 
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // setUserAuth(authUser)
        console.log("有登入")
        const localUUID = localStorage.getItem("userUUID")
        if (localUUID) {
          // const parsedData = JSON.parse(localUUID)
          // setLocalUuid(localUUID)
          console.log('這是UUID:')
          console.log(localUUID)
        }
      } else {
        // setUserAuth(null)
        console.log("沒登入")
      }
    })
    return () => unsubscribe()
  }, [])

  const initialNodes = [
    { id: 'node-1', type: 'textUpdater', position: { x: 150, y: 0 }, data: { value: '預設值',onInpupu:onInpupu } },
    { id: 'node-2', type: 'textUpdater', position: { x: 0, y: 100 }, data: { value: 123 ,onInpupu:onInpupu } },
    // { id: 'node-2', type: 'textUpdater', position: { x: 50, y: 100 }, data: { value: 123 } },
    {
      id: 'node-3',
      type: 'output',
      targetPosition: 'left',
      position: { x: 200, y: 200 },
      data: { label: 'node 3' },
    },
    { id: 'node-4', type: 'gg', position: { x: 222, y: 100 }, data: {name: '你好測試', job: '哈囉', emoji: '🔥'} },
  
  ];
  // const [nodes, setNodes] = useState(initialNodes);
  // const [edges, setEdges] = useState(initialEdges);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  // ✨  ✨  ✨  ✨  ✨  ✨  ✨  ✨  ✨  ✨
  const [rfInstance, setRfInstance] = useState(null);
  const [variant, setVariant] = useState('cross');


  const { setViewport } = useReactFlow();
  // 等等解開
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );
  // ✨  ✨  ✨  ✨  ✨  ✨  ✨  ✨  ✨  ✨

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





  // onNodesChange 和 onEdgesChange 是由 React Flow 提供的回调函数，
  // 用于处理节点和边缘的变化事件。
  // 这些回调函数使用了 React 中的 useCallback 钩子，
  // 但它们是针对 React Flow 的特定用法而设计的，
  // 用于与 React Flow 组件一起使用。


  const onSave = useCallback(() => {
    if (rfInstance) {
          const flow = rfInstance.toObject();
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
}, [rfInstance]);




const onRestore = useCallback(() => {
  const restoreFlow = async () => {
  // 關鍵就是存這個💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥
    // const flow = JSON.parse(localStorage.getItem(flowKey));
    // console.log('本地抓到的：')
    // console.log( flow)
    // if (flow) {        }
  // 關鍵就是存這個💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥

    const localUUID = localStorage.getItem("userUUID");
    
    let parsedData;
    if (localUUID) {

      const databaseRef = ref(db, `users/${localUUID}/reactflow/FFFlow`);

      try {
        const snapshot = await get(databaseRef);
        if (snapshot.exists()) {
          console.log(22222)
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
}, [setNodes, setViewport]);

useEffect(()=>{
  onRestore();
},[])

const getNodeId = () => `randomnode_${+new Date()}`;

const onAdd = useCallback(() => {
  const newNode = {
    id: getNodeId(),
    data: { label: 'Added node' },
    position: {
      x: Math.random() * window.innerWidth - 100,
      y: Math.random() * window.innerHeight,
    },
  };
  setNodes((nds) => nds.concat(newNode));
}, [setNodes]);



  return (


    <div className='flow-wrapper bg-teal-100' style={{ width: '100%', height: '100vh' }}>
 
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
      style={rfStyle}
      onInit={setRfInstance}

    >
      
      <Background color="#ccc" variant={variant} />
    <Controls 
    
    fitViewOptions={{
      duration: 800,
    }} // 传递自定义的 FitViewOptions
    position={'bottom-left'}
    />
    {/* <MiniMap /> */}
    <MiniMap nodeColor={'#FF5733'} />

    <Panel>
        <div>背景樣式:</div>
        <button 
                  className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 ml-1 mr-1"

        onClick={() => setVariant('dots')}>點狀</button>
        <button
                          className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 ml-1 mr-1"

         onClick={() => setVariant('lines')}>格紋</button>
        <button
                          className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 ml-1 mr-1"

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
  </ReactFlow>


    </div>

  );
}

// export default Flow;

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default () => (
  <ReactFlowProvider>
    <Flow />
  </ReactFlowProvider>
);


