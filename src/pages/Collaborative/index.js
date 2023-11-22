import React, { useCallback, useRef } from 'react';
import ReactFlow, { ReactFlowProvider, Controls, useReactFlow } from 'reactflow';

import Sidebar from './Sidebar';
import useNodesStateSynced , { nodesMap } from '../../hooks/useNodesStateSynced';
import useEdgesStateSynced from '../../hooks/useEdgesStateSynced';



import 'reactflow/dist/style.css';
import styles from './style.module.css';

const proOptions = {
  account: 'paid-pro',
  hideAttribution: true,
};

const getId = () => `dndnode_${Math.random() * 10000}`;

const onDragOver = (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
};

function ReactFlowPro() {
  const wrapperRef = useRef(null);
  const [nodes, onNodesChange] = useNodesStateSynced();
  const [edges, onEdgesChange, onConnect] = useEdgesStateSynced();
  const { project } = useReactFlow();

  const onDrop = (event) => {
    event.preventDefault();

    if (wrapperRef.current) {
      const wrapperBounds = wrapperRef.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      const position = project({ x: event.clientX - wrapperBounds.x - 80, y: event.clientY - wrapperBounds.top - 20 });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type}` },
      };

      nodesMap.set(newNode.id, newNode);
    }
  };

  const onNodeClick = useCallback((_, node) => {
    const currentNode = nodesMap.get(node.id);
    if (currentNode) {
      nodesMap.set(node.id, {
        ...currentNode,
        className: styles.blink,
      });
    }

    window.setTimeout(() => {
      const currentNode = nodesMap.get(node.id);
      if (currentNode) {
        nodesMap.set(node.id, {
          ...currentNode,
          className: undefined,
        });
      }
    }, 3000);
  }, []);

  return (

    <div    style={{ 
      border:" 5px red solid",
      height: "100vh",
      width: "100%",

    }}>

    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.rfWrapper} ref={wrapperRef}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onNodesChange={onNodesChange}
          onNodeClick={onNodeClick}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          proOptions={proOptions}
        >
          <Controls />
        </ReactFlow>
      </div>
    </div>
    </div>
  
  );
}

export default function Flow() {
  return (
    <ReactFlowProvider>
      <ReactFlowPro />
    </ReactFlowProvider>
  );
}
