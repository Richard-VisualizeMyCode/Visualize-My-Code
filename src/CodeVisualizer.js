import React, { useEffect, useState } from "react";
import axios from "axios";
import ListVisualizer from "./ListVisualizer";
import SetVisualizer from "./SetVisualizer";
import DictVisualizer from "./DictVisualizer";
import "./CodeVisualizer.css"; // Import the CSS file for layout and styling

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
    setError(null); // Clear previous error message
    setTrace(null); // Clear previous trace

    try {
      const response = await axios.post("http://localhost:5000/run_code", {
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

  const handleStep = () => {
    setCurrentStep((prevStep) =>
      prevStep < trace.length - 1 ? prevStep + 1 : prevStep
    );
  };



  const extractHeapObjects = (heap) => {
    const listObjects = [];
    const setObjects = [];
    const dictObjects = [];

    Object.values(heap).forEach((obj) => {
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
      }
    });

    return { listObjects, setObjects, dictObjects };
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
         
            <button
              onClick={handleStep}
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
            const { listObjects, setObjects, dictObjects } = extractHeapObjects(
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
              </div>
            );
          })()
        )}
      </div>
    </div>
  );
}

export default CodeVisualizer;
