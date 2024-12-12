// @refresh reset
"use client";

import Header from "../../components/Header/Header";
import CodeVisualizer from "../../CodeVisualizer/CodeVisualizer";
export default function Playground() {

    return (
        <div>
            <Header />
            <CodeVisualizer
                height="500px"
                onTraceComplete={(trace) => console.log('Trace completed', trace)}
            />
        </div>
    );
}