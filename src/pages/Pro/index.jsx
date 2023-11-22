// 引入React Flow和相關的組件、函數庫以及自定義的CustomNode組件。
// 定義了React Flow中的不同選項，如初始節點（nodes）和邊緣（edges）、節點類型、事件處理函數等。
// 使用useState來維護節點和邊緣的狀態。
// 使用useExpandCollapse和useAnimatedNodes自定義的鉤子來處理節點和邊緣的擴展/折疊和動畫效果。
// 定義了onNodesChange和onEdgesChange事件處理函數，用於處理節點和邊緣的變化。
// 最後，渲染React Flow組件，並設置一些屬性，如fitView、nodes、edges、事件處理函數等。



import React, { useCallback, useState } from 'react';
import ReactFlow, {
  applyEdgeChanges,
  applyNodeChanges,
  ReactFlowProvider,
  MiniMap,
  Background,
} from 'reactflow';

import CustomNode from './ProNode';
import { nodes as initialNodes, edges as initialEdges } from './initialElements';
import useAnimatedNodes from './useAnimatedNodes';
import useExpandCollapse from './useExpandCollapse';

import 'reactflow/dist/style.css';
import styles from './styles.module.css';

const proOptions = { account: 'paid-pro', hideAttribution: true };

const nodeTypes = {
  custom: CustomNode,
};

function ReactFlowPro({ treeWidth = 230, treeHeight = 120, animationDuration = 200 } = {}) {

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const { nodes: visibleNodes, edges: visibleEdges } = useExpandCollapse(nodes, edges, { treeWidth, treeHeight });
  const { nodes: animatedNodes } = useAnimatedNodes(visibleNodes, { animationDuration });

  const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
  const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);

  const onNodeClick =(_, node) => {
      setNodes((nds) =>
        nds.map((n) => {
          if (n.id === node.id) {
            return {
              ...n,
              data: { ...n.data, expanded: !n.data.expanded },
            };
          }
          return n;
        })
      );
    }


  return (
    <div    style={{ 
      border:" 5px red solid",
      height: "100vh",
      width: "100%",

    }}>
    

    <ReactFlow


 
      fitView
      nodes={animatedNodes}
      edges={visibleEdges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={onNodeClick}
      proOptions={proOptions}
      nodeTypes={nodeTypes}
      nodesDraggable={false}
      nodesConnectable={false}
      className={styles.viewport}
      zoomOnDoubleClick={false}
      elementsSelectable={false}
    >
      <Background />
      <MiniMap />
    </ReactFlow>
    </div>
  );
}

function ReactFlowWrapper(props) {
  return (
    <ReactFlowProvider>
      <ReactFlowPro {...props} />
    </ReactFlowProvider>
  );
}

export default ReactFlowWrapper;
