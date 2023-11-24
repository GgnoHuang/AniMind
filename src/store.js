import { create } from 'zustand';
import { addEdge, applyNodeChanges, applyEdgeChanges } from 'reactflow';

// import initialNodes from './pages/FFFlow/initialNodes';
// import initialEdges from './pages/FFFlow/initialEdges';

import { nodes as initialNodes, edges as initialEdges } from './components/initialEls';

export const useStore = create((set, get) => ({

  showRegisterForm: true, // 初始状态为 true，表示显示登录表单
  toggleForm: () => set((state) => ({ showRegisterForm: !state.showRegisterForm })),





  nodes: initialNodes,// 是一個陣列
  edges: initialEdges,

  isAnyNodeSelected: false,
  setIsAnyNodeSelected: (isSelected) => set({ isAnyNodeSelected: isSelected }),


// 🔵🔵🔵🔵🔵🔵🔵搭配主程式的onEdgeClick🔵🔵🔵🔵🔵🔵🔵🔵
  // updateEdgeStyle: (edgeId, newStyle) => {
  //   set((state) => ({
  //     edges: state.edges.map((edge) =>
  //       edge.id === edgeId ? { ...edge, ...newStyle } : edge
  //     ),
  //   }));
  // },
// 🔵🔵🔵🔵🔵🔵🔵搭配主程式的onEdgeClick🔵🔵🔵🔵🔵🔵🔵🔵

  howManyNodes:0,
  // onNodesChange: (changes) => {
  //   set({
  //     nodes: applyNodeChanges(changes, get().nodes),
  //   });
  //   // const isAnySelected = changes.some(change => change.type === 'select' && change.selected);
  //   const isAnySelected = changes.some(change =>  change.type === 'select' );
  //   if(isAnySelected){
  //     console.log(changes[0].id,',是否有選取？',changes[0].selected)

  //     get().setIsAnyNodeSelected(changes[0].selected);
  //     // get()就是store本身，
  //     // 然後setIsAnyNodeSelected就是使用store裡的setIsAnyNodeSelected函式
      
  //     // set((state) => ({
  //     //   nodes: state.nodes.map((node) =>
  //     //     node.id === changes[0].id ? { ...node, data: { ...node.data,  ...newColor } } : node
  //     //   ),
  //     // }));
  //     if(changes.length>1){
  //       console.log(changes[1].id,',是否有選取？',changes[1].selected)
  //     }
  //   }
  // },
// 上面是失敗的，但有成功抓到changes的select的布林，可以參考

// 選取後出現功能 🔮🥶🦋👗🧤🐸😐🎃😡💞🔮🥶🦋👗🧤🐸😐🎃😡💞🔮🥶🦋👗🧤🐸😐🎃😡💞🔮🥶🦋👗🧤🐸😐🎃😡💞🔮🥶🦋👗🧤🐸😐🎃😡💞
  // onNodesChange: (changes) => {
  //   set((state) => {
  //     // console.log(changes)
  //     const newNodes = state.nodes.map((node) => {
  //       const change = changes.find((c) => c.id === node.id && c.type === 'select');
  //       if (change) {
  //         // 更新节点数据，例如添加 isSelected 属性
  //         return {
  //           ...node,
  //           data: { ...node.data, isSelected: change.selected },
  //         };
  //       }
  //       return node;
  //     });
  
  //     return { nodes: applyNodeChanges(changes, newNodes) };
  //   });
  // },
  // 選取後出現功能 🔮🥶🦋👗🧤🐸😐🎃😡💞🔮🥶🦋👗🧤🐸😐🎃😡💞🔮🥶🦋👗🧤🐸😐🎃😡💞🔮🥶🦋👗🧤🐸😐🎃😡💞🔮🥶🦋👗🧤🐸😐🎃😡💞


  // store.js

    // 🔮🥶🦋👗🧤🐸😐🎃😡💞🔮🥶🦋👗🧤🐸😐🎃😡💞🔮🥶🦋👗🧤🐸😐🎃😡💞🔮🥶🦋👗🧤🐸😐🎃😡💞🔮🥶🦋👗🧤🐸😐🎃😡💞
onNodesChange: (changes) => {
  // console.log(changes)
  set((state) => {
    const newNodes = state.nodes.map((node) => {
      const change = changes.find((c) => c.id === node.id);
      if (change && change.type === 'select') {
        return {
          ...node,
          selected: change.selected,
          data: { ...node.data, isSelected: change.selected },
        };
      }
      return node;
    });
    return { nodes: applyNodeChanges(changes, newNodes) };
  });
},

selectNode: (nodeId) => {
  set((state) => ({
    nodes: state.nodes.map((node) => {
      return node.id === nodeId
        ? { ...node, selected: true, data: { ...node.data, isSelected: true } }
        : { ...node, selected: false, data: { ...node.data, isSelected: false } };
    }),
  }));
},
  // 🔮🥶🦋👗🧤🐸😐🎃😡💞🔮🥶🦋👗🧤🐸😐🎃😡💞🔮🥶🦋👗🧤🐸😐🎃😡💞🔮🥶🦋👗🧤🐸😐🎃😡💞🔮🥶🦋👗🧤🐸😐🎃😡💞


  setNodes: (newNodes) => set((state) => ({
    nodes: newNodes,
    howManyNodes: newNodes.length,
  })),

// 調用這個函數之後，nodes將會變成newNodes
  setEdges: (newEdges) => {
    set({ edges: newEdges });
  },

  updateNodeColor: (nodeId, newColor) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data,  ...newColor } } : node
      ),
    }));
  },

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


  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  // onConnect: (connection) => {
  //   set({
  //     edges: addEdge(connection, get().edges),
  //   });
  // },

  // onNodeClick: (nodeId) => {
  //   set((state) => ({
  //     nodes: state.nodes.map((node) =>
  //       node.id === nodeId
  //         ? {
  //             ...node,
  //             style: { ...node.style, background: 'red' }, // 设置节点背景色为红色
  //           }
  //         : node
  //     ),
  //   }));
  // },


  onConnect: (connection) => {
    const newEdge = {
      ...connection,
      type:'default',
      animated: true, // 動畫
      selectable: true, // ？
      // 可以設定更多 Edge 屬性
      style: { strokeWidth: 5,stroke: 'yellowgreen' }, 

    };
    set((state) => ({
      edges: addEdge(newEdge, state.edges),
    }));
  },

// 收合功能
  // toggleNodeExpansion: (nodeId) => {
  //   console.log(1)
  //   set((state) => ({
  //     nodes: state.nodes.map((node) =>
  //       node.id === nodeId
  //         ? { ...node, data: { ...node.data, expanded: !node.data.expanded } }
  //         : node
  //     ),
  //   }));
  // },
  
  toggleNodeExpansion: (nodeId) => {
    set((state) => {
    console.log(1)
    console.log(nodeId)

      const node = state.nodes.find((n) => n.id === nodeId);
  
      // 如果找到節點，打印它的詳細資訊
      if (node) {
        console.log('Toggling expansion for node:', node);
      }
  
      // 更新節點的狀態
      return {
        nodes: state.nodes.map((n) =>
          n.id === nodeId
            ? { ...n, data: { ...n.data, expanded: !n.data.expanded } }
            : n
        ),
      };
    });
  }
  
}));

export default useStore;

