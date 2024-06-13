import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './signup';
import Login from './login';
import Home from './pages/home/Home';
import Header from './components/Header';
import CalenderPage from './pages/Calender/CalenderPage';
import Activity from './pages/Activity/Activity';
import Settings from './pages/settings/Settings';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('user'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('user'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className="max-h-screen flex flex-col">
      {isLoggedIn && <Header />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Calender" element={<CalenderPage />} />
          <Route path="/Activity" element={<Activity />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
