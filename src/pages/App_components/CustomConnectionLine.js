import React from 'react';
import { getStraightPath } from 'reactflow';

function CustomConnectionLine({ fromX, fromY, toX, toY, connectionLineStyle }) {
  const [edgePath] = getStraightPath({
    sourceX: fromX,
    sourceY: fromY,
    targetX: toX,
    targetY: toY,
  });

  // CustomConnectionLine 组件接收一些属性作为参数：
// fromX 和 fromY 是连接线的起点坐标。
// toX 和 toY 是连接线的终点坐标。
// connectionLineStyle 是用于定义连接线样式的对象。

// 在组件内部，它使用 getStraightPath 函数来计算连接线的路径，
// 以便从起点到终点形成一条直线。getStraightPath 函数根据给定的起点和终点坐标返回连接线的SVG路径。
// 组件返回一个 <g> 元素，内部包含两个子元素：
// <path> 元素用于绘制连接线。它具有样式从 connectionLineStyle 属性中获取，
// 用于定义连接线的线条样式。d 属性包含了连接线的路径。
// <circle> 元素用于在连接线的终点处绘制一个小黑色圆点，以标识连接线的终点。
  return (
    <g>
      <path style={connectionLineStyle} fill="none" d={edgePath} />
      <circle cx={toX} cy={toY} fill="black" r={3} stroke="black" strokeWidth={1.5} />
    </g>
  );
}

export default CustomConnectionLine;
