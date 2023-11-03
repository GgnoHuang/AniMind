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

const initialNodes = [
  { id: 'node-1', type: 'textUpdater', position: { x: 150, y: 0 }, data: { value: 123 } },
  { id: 'node-2', type: 'textUpdater', position: { x: 0, y: 100 }, data: { value: 123 } },
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

  useEffect(() => {
    // 在组件加载后执行的代码
    // 这里可以添加逻辑来删除元素内的内容
    const linkElement = document.querySelector('a[aria-label="React Flow attribution"]');
    if (linkElement) {
      // 如果找到具有指定属性的链接元素
      linkElement.innerHTML = ''; // 删除元素内的内容
    }
  }, []); 
  

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => 
    setNodes((nodes) => {  
        console.log(changes)
        // changes就是你拖動的那一個node
        console.log(nodes)
        // nodes是所有的nodes
        return  applyNodeChanges(changes, nodes)
      }
    ),[setNodes]
  );

  
  // 当您拖拽或选择一个节点时，
  // onNodesChange 处理程序会被调用。
  // 借助 applyNodeChanges 函数，
  // 您可以将这些变更应用到当前的节点状态。
  // 将所有内容放在一起，应该如下所示：
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );




  // onNodesChange 和 onEdgesChange 是由 React Flow 提供的回调函数，
  // 用于处理节点和边缘的变化事件。
  // 这些回调函数使用了 React 中的 useCallback 钩子，
  // 但它们是针对 React Flow 的特定用法而设计的，
  // 用于与 React Flow 组件一起使用。

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
    >
    <Background/>
    <Controls />
    <MiniMap />

  </ReactFlow>
    </div>
  );
}

export default Flow;
