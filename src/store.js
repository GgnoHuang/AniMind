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
  // addNewNode: (newNode) => {
  //   set((state) => ({
  //     nodes: [...state.nodes, newNode],
  //   }));
  // },
  setNodes: (newNodes) => {
    set({ nodes: newNodes });
  },
// 調用這個函數之後，nodes將會變成newNodes
  setEdges: (newEdges) => {
    set({ edges: newEdges });
  },

// 🧪
// 在您的 updateNodeData 函数中，
// set 是 Zustand（一种狀態管理庫）提供的函數，
// 用於更新 store 中的狀態。
  updateNodeData: (nodeId, newData) => {
    set((state) => ({
      nodes: state.nodes.map((node) => 
        node.id === nodeId ? { ...node, data: { ...node.data, ...newData } } : node
      ),
// ====
  // data: { ...node.data, ...newData } 的意思就是
  // 把...node的data換成 data:data
  // 就是用newData作為新的node.data的值
  // 然後{ ...node, data: { ...node.data, ...newData } } 
  // 是將node加入或者替換掉此node的data值

// { ...node, data: { ...node.data, ...newData } } 
// 使用了 JavaScript 的對象展開語法（Spread Syntax）。這裡發生了以下幾件事：
// { ...node }：這部分創建了 node 對象的一個淺拷貝，這意味著它複製了 node 的所有屬性，
// 但不會深層複製任何引用值（如對象或數組）。
// data: { ...node.data }：這裡同樣創建了 node.data 的一個淺拷貝。
// { ...newData }：這裡將 newData 對象中的所有屬性加入到 node.data 的拷貝中。
// 如果 newData 中的屬性與 node.data 中的屬性同名，則 newData 的屬性值將覆蓋 node.data 中的對應值。

    // map的用意是，把所有節點遍歷一次，如果有id跟nodeId(也就是我們放入的參數)
    // 相同的情況，就返回
  }));
  // state 參數代表了當前 store 的狀態。
  // 在 Zustand 中，state 是一個對象，
  // 包含了您在 store 中定義的所有狀態變量。
  // 在這個例子中，state 包含了 nodes，這是一個節點數據的數組。
},
// 🧪

updateNodeColor: (nodeId, newColor) => {
  set((state) => ({
    nodes: state.nodes.map((node) =>
      node.id === nodeId ? { ...node, data: { ...node.data,  ...newColor } } : node
    ),
  }));
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
