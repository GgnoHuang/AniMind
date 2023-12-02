import React, { useCallback } from 'react';
import ReactFlow, {
  addEdge,
  ConnectionLineType,
  Panel,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import dagre from 'dagre';

import { initialNodes, initialEdges } from './nodes-edges.js';

import 'reactflow/dist/style.css';

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

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges
);

const LayoutFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, type: ConnectionLineType.SmoothStep, animated: true }, eds)
      ),
    []
  );
  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        nodes,
        edges,
        direction
      );

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
  );

  return (
    <div  style={{ 
      height: "100vh",
      width: "100%",

    }}>
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      connectionLineType={ConnectionLineType.SmoothStep}
      fitView
 
    >
      <Panel position="top-right">
        <button onClick={() => onLayout('TB')}>vertical layout</button>
        <button onClick={() => onLayout('LR')}>horizontal layout</button>
      </Panel>
    </ReactFlow>
    </div>
  );
};

export default LayoutFlow;





// import React, { useCallback, useRef } from 'react';
// import ReactFlow, { ReactFlowProvider, Controls, useReactFlow } from 'reactflow';

// import Sidebar from './Sidebar';
// import useNodesStateSynced , { nodesMap } from '../../hooks/useNodesStateSynced';
// import useEdgesStateSynced from '../../hooks/useEdgesStateSynced';



// import 'reactflow/dist/style.css';
// import styles from './style.module.css';

// const proOptions = {
//   account: 'paid-pro',
//   hideAttribution: true,
// };

// const getId = () => `dndnode_${Math.random() * 10000}`;

// const onDragOver = (event) => {
//   event.preventDefault();
//   event.dataTransfer.dropEffect = 'move';
// };

// function ReactFlowPro() {
//   const wrapperRef = useRef(null);
//   const [nodes, onNodesChange] = useNodesStateSynced();
//   const [edges, onEdgesChange, onConnect] = useEdgesStateSynced();
//   const { project } = useReactFlow();

//   const onDrop = (event) => {
//     event.preventDefault();

//     if (wrapperRef.current) {
//       const wrapperBounds = wrapperRef.current.getBoundingClientRect();
//       const type = event.dataTransfer.getData('application/reactflow');
//       const position = project({ x: event.clientX - wrapperBounds.x - 80, y: event.clientY - wrapperBounds.top - 20 });
//       const newNode = {
//         id: getId(),
//         type,
//         position,
//         data: { label: `${type}` },
//       };

//       nodesMap.set(newNode.id, newNode);
//     }
//   };

//   const onNodeClick = useCallback((_, node) => {
//     const currentNode = nodesMap.get(node.id);
//     if (currentNode) {
//       nodesMap.set(node.id, {
//         ...currentNode,
//         className: styles.blink,
//       });
//     }

//     window.setTimeout(() => {
//       const currentNode = nodesMap.get(node.id);
//       if (currentNode) {
//         nodesMap.set(node.id, {
//           ...currentNode,
//           className: undefined,
//         });
//       }
//     }, 3000);
//   }, []);

//   return (

//     <div    style={{ 
//       border:" 5px red solid",
//       height: "100vh",
//       width: "100%",

//     }}>

//     <div className={styles.wrapper}>
//       <Sidebar />
//       <div className={styles.rfWrapper} ref={wrapperRef}>
//         <ReactFlow
//           nodes={nodes}
//           edges={edges}
//           onEdgesChange={onEdgesChange}
//           onNodesChange={onNodesChange}
//           onNodeClick={onNodeClick}
//           onConnect={onConnect}
//           onDrop={onDrop}
//           onDragOver={onDragOver}
//           proOptions={proOptions}
//         >
//           <Controls />
//         </ReactFlow>
//       </div>
//     </div>
//     </div>
  
//   );
// }

// export default function Flow() {
//   return (
//     <ReactFlowProvider>
//       <ReactFlowPro />
//     </ReactFlowProvider>
//   );
// }
