import React from 'react';
import { MarkerType, Position } from 'reactflow';

export const nodes = [
  {
    id: 'node-1',
    type: 'textUpdater',
    position: { x: 150, y: 0 },
    data: {
      inpupu: '',
      imgsrc: './fan.jpeg',
      placeholder: '預設',
      backgroundColor: '#f0f0f0' // 默认背景颜色
    },
  },
  {
    id: 'node-2',
    type: 'textUpdater',
    position: { x: 0, y: 100 },
    data: {
      inpupu: '',
      imgsrc: './fan.jpeg',
      placeholder: '預設',
      backgroundColor: '#f0f0f0' // 默认背景颜色
    },
  },
  {
    id: 'node-55',
    type: 'textUpdater',
    position: { x: 222, y: 100 },
    data: {
      inpupu: '',
      imgsrc: './fan.jpeg',
      placeholder: '預設',
      backgroundColor: '#f0f0f0' // 默认背景颜色
    },
  },
  {
    id: 'node-3',
    type: 'output',
    targetPosition: 'left',
    position: { x: 200, y: 200 },
    data: { label: 'node 3' },
  },
];
// 🔮🥶🦋👗🧤🐸😐🎃😡💞🔮🥶🦋👗🧤🐸😐🎃😡💞🔮🥶🦋👗🧤🐸😐🎃😡💞🔮🥶🦋👗🧤🐸😐🎃😡💞🔮🥶🦋👗🧤🐸😐🎃😡💞
export const edges = [
  { id: 'edge-1', source: 'node-1', target: 'node-2', sourceHandle: 'a' },
  { id: 'edge-2', source: 'node-1', target: 'node-3', sourceHandle: 'b' },
  { id: 'edge-3', source: 'node-1', target: 'node-3', sourceHandle: 'a' },
];
