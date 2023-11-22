// useAnimatedNodes.js:

// 這是一個自定義的鉤子，用於實現節點的動畫效果。
// 使用d3-timer庫來創建動畫效果，並在指定的時間內將節點從一個位置過渡到另一個位置。
// 這個鉤子用於在節點變化時添加動畫效果，以平滑地過渡到新的節點位置。


import { useEffect, useState } from 'react';
import { useReactFlow } from 'reactflow';
import { timer } from 'd3-timer';

function useAnimatedNodes(nodes, { animationDuration = 300 } = {}) {
  const [tmpNodes, setTmpNodes] = useState(nodes);
  const { getNode } = useReactFlow();

  useEffect(() => {
    const transitions = nodes.map((node) => ({
      id: node.id,
      from: getNode(node.id)?.position ?? node.position,
      to: node.position,
      node,
    }));

    const t = timer((elapsed) => {
      const s = elapsed / animationDuration;

      const currNodes = transitions.map(({ node, from, to }) => {
        return {
          ...node,
          position: { x: from.x + (to.x - from.x) * s, y: from.y + (to.y - from.y) * s },
        };
      });

      setTmpNodes(currNodes);

      if (elapsed > animationDuration) {
        // it's important to set the final nodes here to avoid glitches
        setTmpNodes(nodes);
        t.stop();
      }
    });

    return () => t.stop();
  }, [nodes, getNode, animationDuration]);

  return { nodes: tmpNodes };
}

export default useAnimatedNodes;
