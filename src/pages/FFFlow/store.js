// import create from 'zustand';
// import {
//   applyNodeChanges,
//   applyEdgeChanges,
//   addEdge,
// } from 'reactflow';

// import initialNodes from './nodes';
// import initialEdges from './edges';

// const useStore = create((set, get) => ({
//   nodes: initialNodes,
//   edges: initialEdges,
//   onNodesChange: (changes) => {
//     set({
//       nodes: applyNodeChanges(changes, get().nodes),
//     });
//   },
//   onEdgesChange: (changes) => {
//     set({
//       edges: applyEdgeChanges(changes, get().edges),
//     });
//   },
//   onConnect: (connection) => {
//     set({
//       edges: addEdge(connection, get().edges),
//     });
//   },
//   updateNodeColor: (nodeId, color) => {
//     set({
//       nodes: get().nodes.map((node) => {
//         if (node.id === nodeId) {
//           // it's important to create a new object here, to inform React Flow about the changes
//           node.data = { ...node.data, color };
//         }

//         return node;
//       }),
//     });
//   },
// }));

// export default useStore;
