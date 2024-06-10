import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './signup';
import Login from './login';
import Home from './pages/home/Home';
// import Home from './app2'; // Assuming Home is renamed to app2.js or app2.tsx

export default function App() {
  return (
    <div className="max-h-screen flex flex-col">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}