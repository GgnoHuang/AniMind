// import React, { useState, useEffect, useCallback } from 'react';
// import ReactFlow, { useNodesState, useEdgesState, addEdge, MiniMap, Controls } from 'reactflow';
// import 'reactflow/dist/style.css';

// import ColorSelectorNode from './ColorSelectorNode';
// // import reportWebVitals from "./reportWebVitals";
// // import './index.css';

// const initBgColor = '#1A192B';

// const connectionLineStyle = { stroke: '#fff' };
// const snapGrid = [20, 20];
// const nodeTypes = {
//   selectorNode: ColorSelectorNode,
// };

// const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

// const CustomNodeFlow = () => {
//   const [nodes, setNodes, onNodesChange] = useNodesState([]);
//   const [edges, setEdges, onEdgesChange] = useEdgesState([]);
//   const [bgColor, setBgColor] = useState(initBgColor);

//   useEffect(() => {
//     const onChange = (event) => {
//       setNodes((nds) =>
//         nds.map((node) => {
//           if (node.id !== '2') {
//             return node;}

//           const color = event.target.value;

//           setBgColor(color);
//           return {
//             ...node,
//             data: {
//               ...node.data,
//               color,
//             },
//           };
//         })
//       );
//     };

//     setNodes([
//       {
//         id: '1',
//         type: 'input',
//         data: { label: '輸入' },
//         position: { x: 0, y: 50 },
//         sourcePosition: 'right',
//       },
//       {
//         id: '2',
//         type: 'selectorNode',
//         data: { onChange: onChange, color: initBgColor },
//         style: { border: '1px solid #777', padding: 10 },
//         position: { x: 300, y: 50 },
//       },
//       {
//         id: '3',
//         type: 'output',
//         data: { label: 'hello world' },
//         position: { x: 650, y: 25 },
//         targetPosition: 'left',
//       },
//       {
//         id: '4',
//         type: 'output',
//         data: { label: '哈囉' },
//         position: { x: 650, y: 100 },
//         targetPosition: 'left',
//       },
//     ]);

//     setEdges([
//       {
//         id: 'e1-2',
//         source: '1',
//         target: '2',
//         animated: true,
//         style: { stroke: '#fff' },
//       },
//       {
//         id: 'e2a-3',
//         source: '2',
//         target: '3',
//         sourceHandle: 'a',
//         animated: true,
//         style: { stroke: '#fff' },
//       },
//       {
//         id: 'e2b-4',
//         source: '2',
//         target: '4',
//         sourceHandle: 'b',
//         animated: true,
//         style: { stroke: '#fff' },
//       },
//     ]);
//   }, []);

//   const onConnect = useCallback(
//     (params) =>
//       setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#fff' } }, eds)),
//     []
//   );
//   return (
//     <div style={{ width: '100%', height: '100vh' }}> {/* 設置寬高 */}

//     <ReactFlow
//       nodes={nodes}
//       edges={edges}
//       onNodesChange={onNodesChange}
//       onEdgesChange={onEdgesChange}
//       onConnect={onConnect}
//       style={{ background: bgColor }}
//       nodeTypes={nodeTypes}
//       connectionLineStyle={connectionLineStyle}
//       snapToGrid={true}
//       snapGrid={snapGrid}
//       defaultViewport={defaultViewport}
//       fitView
//       attributionPosition="bottom-left"
//     >
//       <MiniMap
//         nodeStrokeColor={(n) => {
//           if (n.type === 'input') return '#0041d0';
//           if (n.type === 'selectorNode') return bgColor;
//           if (n.type === 'output') return '#ff0072';
//         }}
//         nodeColor={(n) => {
//           if (n.type === 'selectorNode') return bgColor;
//           return '#fff';
//         }}
//       />
//       <Controls />
//     </ReactFlow>
//     </div>
//   );
// };

// export default CustomNodeFlow;



// // ✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨
// // import React, { useCallback } from 'react';
// // import ReactFlow, { useNodesState, useEdgesState, addEdge } from 'reactflow';

// // import 'reactflow/dist/style.css';

// // const initialNodes = [
// //   { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
// //   { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
// //   { id: '3', position: { x: 100, y: 50 }, data: { label: '3' } },

// //   { id: '4', position: { x: 150, y: 0 }, data: { label: '4', className: 'animated-border' },}, // 应用 "animated-border" 类

  
// // ];
// // const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

// // export default function App() {
// //   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
// //   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

// //   const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

// //   return (
// //     <div style={{ width: '100vw', height: '100vh' }}>
// //       <ReactFlow
// //         nodes={nodes}
// //         edges={edges}
// //         onNodesChange={onNodesChange}
// //         onEdgesChange={onEdgesChange}
// //         onConnect={onConnect}
// //       />
// //     </div>
// //   );
// // }