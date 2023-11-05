import React, { useCallback,useState, useEffect } from 'react';


import ReactFlow, { addEdge, useNodesState, useEdgesState, MarkerType } from 'reactflow';

import CustomNode from '../nodes/CustomNode.js';
import FloatingEdge from '../nodes/FloatingEdge.js';
import CustomConnectionLine from '../nodes/CustomConnectionLine.js';

import 'reactflow/dist/style.css';
// import './style.css';



const initialNodes = [
  { id: '1', type: 'custom',position: { x: 0, y: 0 }, },
  {  id: '2',  type: 'custom',position: { x: 250, y: 320 },  },
  {  id: '3',  type: 'custom', position: { x: 40, y: 300 },},
  { id: '4',  type: 'custom',position: { x: 300, y: 0 },},
];

const initialEdges = [];

const connectionLineStyle = {strokeWidth: 3,stroke: 'blue',
};

const nodeTypes = {custom: CustomNode,};

const edgeTypes = {floating: FloatingEdge,};

const defaultEdgeOptions = {
  style: { strokeWidth: 3, stroke: 'black' },
  type: 'floating',
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: 'black',
  },
};

const EasyConnectExample = () => {


  const [removeLink, setRemoveLink] = useState(false);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);



  // 💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎
// 💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎
// 💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎
// 💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎
// 💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎
  useEffect(() => {
    // 在组件加载后执行的代码
    // 这里可以添加逻辑来删除元素内的内容
    const linkElement = document.querySelector('a[aria-label="React Flow attribution"]');
    if (linkElement) {
      // 如果找到具有指定属性的链接元素
      linkElement.innerHTML = ''; // 删除元素内的内容
    }
  }, []); // 使用空的依赖数组以确保只在组件加载时执行一次
// 💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎
// 💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎
// 💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎
// 💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎
// 💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎


  return (

    <div className='hello'>

 
    <div className='flow-wrapper bg-yellow-100' style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineComponent={CustomConnectionLine}
        connectionLineStyle={connectionLineStyle}
      />
    </div>
    </div>

  );
};

export default EasyConnectExample;
