import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Navbar from './components/Navbar';
import logoo from './assets/logoo.png';
import Footer from './components/Footer';
import ShadowBlue from './components/ShadowBlue';
import Button from './components/Button';
import Home from './components/Home';
import Searchbar from './components/Searchbar';

export default function App() {


  return (
    <div className="flex flex-col min-h-screen">  
      <Home/> 
      
    </div>
  );
}