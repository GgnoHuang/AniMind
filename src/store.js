import { create } from 'zustand';
import { addEdge, applyNodeChanges, applyEdgeChanges } from 'reactflow';

// import initialNodes from './pages/FFFlow/initialNodes';
// import initialEdges from './pages/FFFlow/initialEdges';

import { nodes as initialNodes, edges as initialEdges } from './pages/FFFlow/initialEls';

export const useStore = create((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  addNewNode: (newNode) => {
    set((state) => ({
      nodes: [...state.nodes, newNode],
    }));
  },
  setNodes: (newNodes) => {
    set({ nodes: newNodes });
  },
  setEdges: (newEdges) => {
    set({ edges: newEdges });
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },

  // updateNodeColor: (nodeId, color) => {
  //   set({
  //     nodes: get().nodes.map((node) => {
  //       if (node.id === nodeId) {
  //         node.data = { ...node.data, color };
  //       }
  //       return node;
  //     }),
  //   });
  // },

}));

export default useStore;
