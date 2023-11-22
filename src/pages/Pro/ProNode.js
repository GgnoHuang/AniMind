// CustomNode.js:

// 這是自定義節點（CustomNode）的組件，用於在樹狀圖中表示節點。
// 該組件根據節點的狀態（擴展或折疊）顯示不同的標籤。
// 包括一個“新增”按鈕，當用戶單擊時，它會在節點下方添加一個新的子節點。
// 使用React Flow的useReactFlow鉤子來添加節點和邊緣。


import React, { MouseEventHandler } from 'react';
import { Handle, NodeProps, Position, useReactFlow } from 'reactflow';

import styles from './styles.module.css';

// 此函数根据当前状态返回节点的标签
function getLabel({ expanded, expandable }) {
  if (!expandable) {
    return 'nothing to expand';
  }

  return expanded ? 'Click to collapse ▲' : 'Click to expand ▼';
}

export default function CustomNode({ data, id, xPos, yPos }) {
  const { addNodes, addEdges } = useReactFlow();

  const addChildNode = (evt) => {
    // 防止在节点展开时添加新节点时发生展开/折叠行为
    if (data.expanded) {
      evt.preventDefault();
      evt.stopPropagation();
    }

    const newNodeId = `${id}__${new Date().getTime()}`;

    // 创建点击节点和子节点之间的边
    addNodes({ id: newNodeId, position: { x: xPos, y: yPos + 100 }, data: { label: 'X' } });
    addEdges({ id: `${id}->${newNodeId}`, source: id, target: newNodeId });
  };

  // 根据节点的状态显示标签
  const label = getLabel(data);

  return (
    <div className={styles.node}>
        {/* <blockquote 
        contentEditable="true"
        suppressContentEditableWarning
            style={{
              // pointerEvents: isPointerEventsActive ? 'auto' : 'none',
            cursor: 'text',
            color: data.fontColor || 'black',

            fontSize:data.fontSize||'25px',
            textAlign: data.textalign ||'center',}}

          // onInput={onEditText} 
          spellCheck="false"
          // dangerouslySetInnerHTML={{ __html: blockquoteContent }}
          className='nodrag userRestoreInput' >
        </blockquote> */}



      <div className={styles.label}>{label}</div>
      <Handle position={Position.Top} type="target" />
      <Handle position={Position.Bottom} type="source" />
      <div className={styles.button} onClick={addChildNode}>
        + 新增
      </div>
    </div>
  );
}
