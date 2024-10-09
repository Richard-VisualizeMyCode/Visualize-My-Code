import React from 'react';
import { useTrackChanges } from './usedTrackedState';
import './DictVisualizer.css';
function DictVisualizer({ dictObjects }) {
  const { trackedItems, newItems, removedItems } = useTrackChanges(dictObjects, 'DICT');
  console.log("OOO", trackedItems)

  return (
    <div>
      <h3>Dictionary Visualizer</h3>
      {trackedItems.map((dict, index) => (
        <div key={index} className="dictionary-container">
          <h4>Dictionary {index + 1}</h4>
          <table className="compact-table">
            <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(dict).map(([key, value], i) => (
                <tr
                  key={i}
                  className={newItems.some((newItem) => newItem.key === key) ? 'animate-row' : removedItems.some((removedItem) => removedItem.key === key) ? 'animate-remove' : ''}
                >
                  <td>{key}</td>
                  <td>{JSON.stringify(value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default DictVisualizer;
