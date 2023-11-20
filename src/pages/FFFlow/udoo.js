// import { useCallback, useEffect, useState } from 'react';
// import { useReactFlow } from 'reactflow';

// const defaultOptions = {
//   maxHistorySize: 100,
//   enableShortcuts: true,
// };

// export const useUndoRedo = ({
//   maxHistorySize = defaultOptions.maxHistorySize,
//   enableShortcuts = defaultOptions.enableShortcuts,
// } = defaultOptions) => {
//   const [past, setPast] = useState([]);
//   const [future, setFuture] = useState([]);

//   const { setNodes, setEdges, getNodes, getEdges } = useReactFlow();

//   const takeSnapshot = useCallback(() => {
//     setPast((past) => [
//       ...past.slice(past.length - maxHistorySize + 1, past.length),
//       { nodes: getNodes(), edges: getEdges() },
//     ]);
//     setFuture([]);
//   }, [getNodes, getEdges, maxHistorySize]);

//   const undo = useCallback(() => {
//     const pastState = past[past.length - 1];
//     if (pastState) {
//       setPast((past) => past.slice(0, past.length - 1));
//       setFuture((future) => [...future, { nodes: getNodes(), edges: getEdges() }]);
//       setNodes(pastState.nodes);
//       setEdges(pastState.edges);
//     }
//   }, [setNodes, setEdges, getNodes, getEdges, past]);

//   const redo = useCallback(() => {
//     const futureState = future[future.length - 1];
//     if (futureState) {
//       setFuture((future) => future.slice(0, future.length - 1));
//       setPast((past) => [...past, { nodes: getNodes(), edges: getEdges() }]);
//       setNodes(futureState.nodes);
//       setEdges(futureState.edges);
//     }
//   }, [setNodes, setEdges, getNodes, getEdges, future]);

//   useEffect(() => {
//     if (!enableShortcuts) {
//       return;
//     }

//     const keyDownHandler = (event) => {
//       if (event.key === 'z' && (event.ctrlKey || event.metaKey) && event.shiftKey) {
//         redo();
//       } else if (event.key === 'z' && (event.ctrlKey || event.metaKey)) {
//         undo();
//       }
//     };

//     document.addEventListener('keydown', keyDownHandler);

//     return () => {
//       document.removeEventListener('keydown', keyDownHandler);
//     };
//   }, [undo, redo, enableShortcuts]);

//   return {
//     undo,
//     redo,
//     takeSnapshot,
//     canUndo: past.length > 0,
//     canRedo: future.length > 0,
//   };
// };

// export default useUndoRedo;
