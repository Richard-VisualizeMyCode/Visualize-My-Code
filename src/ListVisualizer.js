import React from 'react';
import { useTrackChanges } from './usedTrackedState';
import './SetVisualizer.css';

function SetVisualizer({ set }) {
  const { trackedItems: trackedSets, newItems, removedItems } = useTrackChanges(set, 'SET');

  return (
    <div className="set-visualizer">
      <h3>Set Visualizer</h3>
      {trackedSets.map((subset, subsetIndex) => (
        <div key={subsetIndex} className="set-container">
          <h4>Set {subsetIndex + 1}</h4>
          <div className="set-grid stack-container">
            {Array.from(subset).map((item, index) => (
              <div
                key={index}
                className={`set-item ${
                  newItems.some(
                    (newItem) =>
                      newItem.item === item
                  )
                    ? 'animate-new'
                    : removedItems.some(
                        (removedItem) =>
                          removedItem.item === item
                      )
                    ? 'animate-remove'
                    : ''
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SetVisualizer;
