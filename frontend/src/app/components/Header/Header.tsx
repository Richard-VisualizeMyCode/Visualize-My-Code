import React from "react";
import './Header.css';
import logo from './logo.png';
import Image from 'next/image';

export default function Navbar() {
    return (
        <header className="navbar">
            <div className="flex-container">
                <ul className="flex flex-row">
                    <li>
                        <Image
                            src={logo}
                            alt="Description of the image"
                            width={25}  // Specify the desired width
                            height={10} // Specify the desired height
                        />
                    </li>
                    <li style={{ fontFamily: 'sans-serif', fontWeight: 'bold' }}> Home</li>
                    <li style={{ fontFamily: 'sans-serif', fontWeight: 'bold' }}>Playground</li>
                    <li style={{ fontFamily: 'sans-serif', fontWeight: 'bold' }}>Problems</li>
                </ul>
                <div className="button-container">
                    <button className="button">Sign in</button>
                </div>
            </div>
        </header >
    );
}
