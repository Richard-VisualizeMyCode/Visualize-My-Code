
/**
 * `TreeNode` component that recursively renders a tree node and its children. It visualizes a binary tree
 * structure
 * 
 * **/

import React, { useEffect, useState } from 'react';

const findNodeByRef = (ref, nodes) => {
  const foundNode = nodes.find(node => {
    const nodeRef = node.TreeNode.ref;
    return Number(nodeRef) === Number(ref); // Ensure consistent number comparison
  });
  return foundNode ? foundNode.TreeNode : null;
};

const TreeNode = ({ node, allNodes }) => {
  const [animationClass, setAnimationClass] = useState('animate-new');

  // Remove animation class after the node has been fully animated
  useEffect(() => {
    const timeout = setTimeout(() => setAnimationClass(''), 2000); // Duration of the animation
    return () => clearTimeout(timeout);
  }, [node]);

  if (!node) return null;

  const leftNode = node.left && node.left[0] === "REF" ? findNodeByRef(node.left[1], allNodes) : null;
  const rightNode = node.right && node.right[0] === "REF" ? findNodeByRef(node.right[1], allNodes) : null;

  return (
    <div className={`tree-node ${animationClass}`}>
      <div>
        <strong>Ref:</strong> {node.ref}
      </div>
      <div>
        <strong>Value:</strong> {node.value ?? 'null'}
      </div>
      <div className="children">
        {leftNode && (
          <div className="left-child">
            <TreeNode node={leftNode} allNodes={allNodes} />
          </div>
        )}
        {rightNode && (
          <div className="right-child">
            <TreeNode node={rightNode} allNodes={allNodes} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TreeNode;
