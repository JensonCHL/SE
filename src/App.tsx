import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import SignUp from './signup';
import Login from './login';
import Home from './pages/home/Home';
import Header from './components/Header';
import CalenderPage from './pages/Calender/CalenderPage';
import Activity from './pages/Activity/Activity';
import Settings from './pages/settings/Settings';
import axios from 'axios';
// import Home from './app2'; // Assuming Home is renamed to app2.js or app2.tsx

export default function App() {

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/calendar/create-event'); // Replace with your actual API endpoint
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 60000); // Check every minute

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (data) {
      const currentTime = new Date().getTime(); // Get current time in milliseconds
      const databaseTime = new Date(data.time).getTime(); // Assuming 'time' is the property in your database

      if (currentTime >= databaseTime) {
        // Trigger the pop-up alert
        alert('Alert: Time matched!');
      }
    }
  }, [data]);

  return (
    <div className="max-h-screen flex flex-col">
      {location.pathname !== '/login' && <Header />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Calender" element={<CalenderPage />} />
          <Route path="/Activity" element={<Activity />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}