/**
 * `ListVisualizer`: component for displaying and tracking changes in a list objects.
 * It highlights new and removed items to show changes in the list over time.
 * 
 * **/

import React from 'react';
import { useTrackChanges } from './usedTrackedState';
import './ListVisualizer.css';

function ListVisualizer({ list }) {
  const { trackedItems: trackedLists, newItems, removedItems } = useTrackChanges(list, 'ARRAY');

  return (
    <div className="list-visualizer">
      <h3>List Visualizer</h3>
      {trackedLists.map((sublist, sublistIndex) => (
        <div key={sublistIndex} className="list-container">
          <h4>List {sublistIndex + 1}</h4>
          <div className="list-grid stack-container">
            {sublist.slice().reverse().map((item, index) => {
              // Calculate the original index before reversal
              const originalIndex = sublist.length - 1 - index;
              return (
                <div
                  key={index}
                  className={`list-item ${
                    newItems.some(
                      (newItem) =>
                        newItem.item === item && newItem.position === originalIndex
                    )
                      ? 'animate-new'
                      : removedItems.some(
                          (removedItem) =>
                            removedItem.item === item && removedItem.position === originalIndex
                        )
                      ? 'animate-remove'
                      : ''
                  }`}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListVisualizer;
