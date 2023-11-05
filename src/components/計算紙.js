
// import { auth,db } from "../config" 
// import { onAuthStateChanged } from "firebase/auth"
// import { getDatabase, ref, set ,get} from "firebase/database"


// import { useCallback, useState,useEffect } from 'react';
// import ReactFlow, { 
//   ReactFlowProvider,
//   useNodesState,
//   useEdgesState,
//   useReactFlow,
//   Panel,
//   addEdge, 
//   applyEdgeChanges,
//    applyNodeChanges,
//    Controls, 
//    Background ,
//    MiniMap
//    } from 'reactflow';
// import 'reactflow/dist/style.css';
// // import 'reactflow/dist/base.css';
// import TextUpdaterNode from './FFFlow_components/TextUpdaterNode'
// import OmgNode from './FFFlow_components/OmgNode'
// import Slidebar from './FFFlow_components/Slidebar.js'


// const initialNodes = [
//   { id: 'node-1', type: 'textUpdater', position: { x: 150, y: 0 },  data: {
//     value: '預設值',
//     setInpupu: setInpupu, // 将父组件的状态更新函数传递给子组件
//   }, },
//   { id: 'node-2', type: 'textUpdater', position: { x: 0, y: 100 }, data: { value: 123 } },
//   {
//     id: 'node-3',
//     type: 'output',
//     targetPosition: 'left',
//     position: { x: 200, y: 200 },
//     data: { label: 'node 3' },
//   },
//   { id: 'node-4', type: 'gg', position: { x: 222, y: 100 }, data: {name: '你好測試', job: '哈囉', emoji: '🔥'} },

// ];
// const nodeTypes = { textUpdater: TextUpdaterNode,
//     gg: OmgNode, // 假设你有一个名为 GoodNode 的节点组件
// };

// const initialEdges = [
//   { id: 'edge-1', source: 'node-1', target: 'node-2', sourceHandle: 'a' },
//   { id: 'edge-2', source: 'node-1', target: 'node-3', sourceHandle: 'b' },
//   { id: 'edge-3', source: 'node-1', target: 'node-3', sourceHandle: 'a' },
// ];

// function Flow() {

//   useEffect(() => {
//     const linkElement = document.querySelector('a[aria-label="React Flow attribution"]');
//     if (linkElement) {
//       linkElement.innerHTML = ''; 
//     }
//   }, []); 
  

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (authUser) => {
//       if (authUser) {
//         // setUserAuth(authUser)
//         console.log("有登入")
//         const localUUID = localStorage.getItem("userUUID")
//         if (localUUID) {
//           console.log('這是UUID:')
//           console.log(localUUID)
//         }
//       } else {
//         console.log("沒登入")
//       }
//     })
//     return () => unsubscribe()
//   }, [])

//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
//   const [rfInstance, setRfInstance] = useState(null);



//   const { setViewport } = useReactFlow();
//   // 等等解開
//   const onConnect = useCallback(
//     (connection) => setEdges((eds) => addEdge(connection, eds)),
//     [setEdges]
//   );
//   // ✨  ✨  ✨  ✨  ✨  ✨  ✨  ✨  ✨  ✨
//   const onSave = useCallback(() => {
//     if (rfInstance) {
//           const flow = rfInstance.toObject();
//           // localStorage.setItem(flowKey, JSON.stringify(flow));
//           const localUUID = localStorage.getItem("userUUID")
//         if (localUUID) {
//               const databaseRef = ref(db, `users/${localUUID}/reactflow`);
//               set(databaseRef, JSON.stringify(flow))
//               .then(() => {
//                 console.log("成功存到資料庫");
//               })
//               .catch((error) => {
//                 console.error("儲存發生錯誤：", error);
//               });
//         }else{
//           console.log('沒抓到localstorage的會員id')
//         }
//     }else{
//       console.log(22222)
//     }
// }, [rfInstance]);


// const onRestore = useCallback(() => {
//   const restoreFlow = async () => {
//     const localUUID = localStorage.getItem("userUUID");
    
//     let parsedData;
//     if (localUUID) {

//       const databaseRef = ref(db, `users/${localUUID}/reactflow`);

//       try {
//         const snapshot = await get(databaseRef);
//         if (snapshot.exists()) {
//           console.log(22222)
//           const data = snapshot.val();
//           console.log('成功從資料庫抓到的：');
//           console.log(JSON.parse(data));
//           const parsedData = JSON.parse(data);
//           if (parsedData) {
//             const { x = 0, y = 0, zoom = 1 } = parsedData.viewport;
//             setNodes(parsedData.nodes || []);
//             setEdges(parsedData.edges || []);
//             setViewport({ x, y, zoom });
//           }
//         }else{
//           console.log(1111)
//         }
//       } catch (error) {
//         console.error("獲取資料發生錯誤", error);
//       }
//     } else {
//       console.log("未找到用户 ID");
//     }
//   };
//   restoreFlow();
// }, [setNodes, setViewport]);


//   return (


//     <div className='flow-wrapper bg-teal-100' style={{ width: '100%', height: '100vh' }}>
 
//     <ReactFlow
//       nodes={nodes}
//       edges={edges}
//       onNodesChange={onNodesChange}
//       onEdgesChange={onEdgesChange}
//       onConnect={onConnect}
//       nodeTypes={nodeTypes}
//       fitView
//       style={rfStyle}
//       onInit={setRfInstance}

//     >
//     <Background/>
//     <Controls />
//     <MiniMap />


//     <Panel position="top-right">
//         <button 
//         onClick={onSave}
//           className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600"
//         >保存</button>

//         <button 
//         onClick={onRestore}
//           className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600"
//         >回到紀錄狀態</button>
//       </Panel>
//   </ReactFlow>


//     </div>

//   );
// }

// export default () => (
//   <ReactFlowProvider>
//     <Flow />
//   </ReactFlowProvider>
// );


