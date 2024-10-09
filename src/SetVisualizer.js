import React from 'react';

// Component to visualize a set (array of arrays)
function SetVisualizer({ set }) {
    console.log("Array of arrays (set) is here ", set);
    return (
      <div>
        <h3>Set of Arrays</h3>
        <ul>
          {set.map((subset, subsetIndex) => (
            <li key={subsetIndex}>
              <ul>
                {subset.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    );
}

export default SetVisualizer;
