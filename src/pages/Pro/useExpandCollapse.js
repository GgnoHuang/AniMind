import { useMemo } from 'react';
import { stratify, tree } from 'd3-hierarchy';

function isHierarchyPointNode(pointNode) {
  return (
    typeof pointNode.x === 'number' &&
    typeof pointNode.y === 'number'
  );
}

function useExpandCollapse(
  nodes, edges,
  { layoutNodes = true, treeWidth = 220, treeHeight = 100 } = {}
) {
  return useMemo(() => {
    const hierarchy = stratify()
      .id((d) => d.id)
      .parentId((d) => edges.find((e) => e.target === d.id)?.source)(nodes);

    hierarchy.descendants().forEach((d) => {
      d.data.data.expandable = !!d.children?.length;
      d.children = d.data.data.expanded ? d.children : undefined;
    });

    const layout = tree()
      .nodeSize([treeWidth, treeHeight])
      .separation(() => 1);

    const root = layoutNodes ? layout(hierarchy) : hierarchy;

    return {
      nodes: root.descendants().map((d) => ({
        ...d.data,
        data: { ...d.data.data },
        type: 'custom',
        position: isHierarchyPointNode(d) ? { x: d.x, y: d.y } : d.data.position,
      })),
      edges: edges.filter((edge) => root.find((h) => h.id === edge.source) && root.find((h) => h.id === edge.target)),
    };
  }, [nodes, edges, layoutNodes, treeWidth, treeHeight]);
}

export default useExpandCollapse;
