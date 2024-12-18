"use client";
import Header from "./components/Header/Header";
import Card from "./components/Card/Card";
import Link from 'next/link';
import { useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  useEffect(() => {
    axios.get('https://backend-visualize-my-code.onrender.com');
  }, []);
  return (

    <div >

      <Header />
      <div
        className="text-container"
      >
        Visualize Your Code Like Never Before
        <div className="subtext">
          Transform your code into powerful visualizations for better understanding and debugging.
        </div>
      </div>
      <div className="card-container__title">
        Practice Data Structures
      </div>
      <div className="card-container">
        {/* <Card label="Arrays" /> */}
        {/* <Card label="LinkedList" /> */}
        <Link href="/pages/Stacks">
          <Card label="Stacks" />
        </Link>
        {/* <Card label="Queues" />
        <Card label="Binary Search Trees" /> */}
        <Link href="/pages/Dictionaries">
          <Card label="Dictionaries" />
        </Link>
      </div>
    </div>
  );
}
