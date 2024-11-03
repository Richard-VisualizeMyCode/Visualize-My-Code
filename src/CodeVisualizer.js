
/**
 * `CodeVisualizer`: Component allows users to input Python code, submit it for execution, 
 * and visualize the execution trace step-by-step, including different data structures like lists, sets, 
 * dictionaries, and trees.

 * Key Components:
 * - `textarea`: Input field for Python code.
 * - `button` (Submit): Executes the code via a backend API and retrieves the execution trace.
 * - `Execution Trace`: Displays the current step and a slider for navigating through steps.
 * - `Visualizers`: Renders different data structures (lists, sets, dictionaries, trees) from the current 
 *   trace step using components like `ListVisualizer`, `SetVisualizer`, `DictVisualizer`, and `TreeVisualizer`.

 * State:
 * - `code`: User input code.
 * - `trace`: Execution trace data.
 * - `currentStep`: Tracks the step of the trace being viewed.
 * - `loading` & `error`: Manages submission state and displays errors.

 * Functionality:
 * - `handleSubmit`: Sends the code to the backend, stores the trace, or displays errors.
 * - `extractHeapObjects`: Extracts data structures from the trace for visualization.
 */

import React, {  useState } from "react";
import axios from "axios";
import ListVisualizer from "./ListVisualizer";
import SetVisualizer from "./SetVisualizer";
import DictVisualizer from "./DictVisualizer";

import "./CodeVisualizer.css"; // Import the CSS file for layout and styling
import TreeVisualizer from "./TreesVisualizer";

function CodeVisualizer() {
  const [code, setCode] = useState("");
  const [trace, setTrace] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setCurrentStep(0);
    setError(null); 
    setTrace(null); 

    try {
      const response = await axios.post("http://127.0.0.1:8000/run_code", {  // Update this URL to your desired endpoint
        code,
      });
      setTrace(response.data.trace); // Store the execution trace from the backend
    } catch (err) {
      setError("An error occurred during code execution.");
      console.error("Error submitting code:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) =>
      prevStep < trace.length - 1 ? prevStep + 1 : prevStep
    );
  };

  const handleStepChange = (event) => {
    setCurrentStep(Number(event.target.value));
  };
  
  const extractHeapObjects = (heap) => {
    const listObjects = [];
    const setObjects = [];
    const dictObjects = [];
    const treeObjects = [];

    console.log("HEAPIFY", heap);

    Object.entries(heap).forEach(([objId, obj]) => {
      console.log("OBJ", objId, obj);
        if (obj[0] === "LIST") {
            const elements = obj.slice(1).flat();
            listObjects.push(elements);
        } else if (obj[0] === "SET") {
            const elements = obj.slice(1).flat();
            setObjects.push(elements);
        } else if (obj[0] === "DICT") {
            const dictEntries = {};
            obj.slice(1).forEach(([key, value]) => {
                dictEntries[key] = value;
            });
            dictObjects.push(dictEntries);
        } else if (obj[0] === "INSTANCE" && obj[1] === "Node") {
            console.log("This is the obj ", obj);
            
            // Extract attributes
            const attributes = obj.slice(2);
            console.log("att", attributes); 

            const node = { ref: objId }; // 
            
            // Loop over the attributes and assign them to the node object
            attributes.forEach(([key, value]) => {
                node[key] = value;
            });

            console.log("att", attributes);
            console.log("TreeNode here", node);

            const treeNodeDict = { TreeNode: node };

            // Add node to treeObjects array
            treeObjects.push(treeNodeDict);
        }
    });

    return { listObjects, setObjects, dictObjects, treeObjects };
};

  

  return (
    <div className="container">
      <div className="code-editor">
        <h1>Python Code Visualizer</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            value={code}
            onChange={handleCodeChange}
            placeholder="Type your Python code here..."
            rows="10"
            cols="50"
            disabled={loading}
          />
          <br />
          <button type="submit" disabled={loading}>
            {loading ? "Executing..." : "Visualize Execution"}
          </button>
        </form>

        {error && <div style={{ color: "red" }}>{error}</div>}

        {trace && (
          <div>
            <h2>
              Execution Trace (Step {currentStep + 1} of {trace.length}):
            </h2>
            {/* <p>{JSON.stringify(trace[currentStep])}</p> Display the current trace step */}
            
            {/* Slider for navigating the steps */}
            <input
              type="range"
              min="0"
              max={trace.length - 1}
              value={currentStep}
              onChange={handleStepChange}
            />
            <p>Current Step: {currentStep + 1}</p>

            {/* Next step button */}
            <button
              onClick={handleNextStep}
              disabled={currentStep >= trace.length - 1}
            >
              {currentStep < trace.length - 1 ? "Next Step" : "No More Steps"}
            </button>
          </div>
        )}
      </div>

      <div className="visualizers">
        <h2>Data Structures</h2>
        {trace && trace[currentStep]?.heap && (
          (() => {
            console.log("TRACE", trace);
            const { listObjects, setObjects, dictObjects, treeObjects } = extractHeapObjects(
              trace[currentStep].heap
            );
            return (
              <div>
                {listObjects.length > 0 && (
                  <ListVisualizer list={listObjects} />
                )}
                {setObjects.length > 0 && (
                  <SetVisualizer set={setObjects} />
                )}
                {dictObjects.length > 0 && (
                  <DictVisualizer dictObjects={dictObjects} />
                )}
                {treeObjects.length > 0 && (
                  <TreeVisualizer trees={treeObjects} />
                )}
              </div>
            );
          })()
        )}
      </div>
    </div>
  );
}

export default CodeVisualizer;
