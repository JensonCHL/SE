import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/home/Home'
import Navbar from './components/Navbar'
import Header from './components/Header'

export default function App() {
  return <div className="max-h-screen flex flex-col" >
    <Header />
    <div></div>

    {/* Router dom */}
    <Home></Home>
  </div>

  // <Home/>

}