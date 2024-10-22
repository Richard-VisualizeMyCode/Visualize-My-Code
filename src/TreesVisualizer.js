import React from 'react';
import { useTrackChanges } from './usedTrackedState';
import TreeNode from './TreeNode'; // Import the new TreeNode component
import './TreeVisualizer.css';

function TreeVisualizer({ trees }) {
  const { trackedItems } = useTrackChanges(trees, 'TREE');
  console.log("TREE TrackedItem", trackedItems)

  return (
    <div className="tree-visualizer">

        <div className="tree-container">
          <TreeNode node={trackedItems[0]?.TreeNode} allNodes= {trackedItems} />
        </div>
  
    </div>
  );
}

export default TreeVisualizer;
