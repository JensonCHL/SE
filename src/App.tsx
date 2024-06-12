import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import SignUp from './signup';
import Login from './login';
import Home from './pages/home/Home';
import Header from './components/Header';
import CalenderPage from './pages/Calender/CalenderPage';
import Activity from './pages/Activity/Activity';
import Settings from './pages/settings/Settings';
// import Home from './app2'; // Assuming Home is renamed to app2.js or app2.tsx

export default function App() {

  return (
    <div className="max-h-screen flex flex-col">
      {location.pathname !== '/login' && <Header />}
      <BrowserRouter>
        <Routes>
<<<<<<< HEAD
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
=======
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Calender" element={<CalenderPage />} />
          <Route path="/Activity" element={<Activity />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
<<<<<<< HEAD
          
>>>>>>> d877f26a132ba9271a00f47aa11292f9fd4d7403
=======

>>>>>>> 354738cf3094220853a36ef6be347f5d063222a1
        </Routes>
      </BrowserRouter>
    </div>
  );
}