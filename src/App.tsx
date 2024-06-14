import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './signup';
import Login from './login';
import Home from './pages/home/Home';
import Header from './components/Header';
import CalenderPage from './pages/Calender/CalenderPage';
import Activity from './pages/Activity/Activity';
import Settings from './pages/settings/Settings';
import axios from 'axios';


interface Event {
  types: string;
  title: string;
  start: string; // Use string here to match the ISO date string from the API
  end: string;   // Use string here to match the ISO date string from the API
  description: string;
  location: string;
  priority: string;
  color: string;
  __v: number;
  _id: string;
}

interface User {
  id: string;
  // Add other user properties as needed
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('user'));
  const [events, setEvents] = useState<Event[]>([]);


  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('user'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      if (!isLoggedIn) return;

      const userString = localStorage.getItem('user');
      const userId = userString; // Assuming userString is directly the ID string

      if (!userId) return;

      try {
        const response = await axios.get('http://localhost:5001/api/calendar/closest-event', {
          params: {
            userId, // Ensure 'userId' is passed correctly
          },
        });

        console.log('API Response:', response.data);
        if (!response.data) {
          console.warn('Empty response received');
          return;
        }
        setEvents([response.data]); // Assuming response.data is the closest event object
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();

    const intervalId = setInterval(fetchEvents, 1 * 60 * 1000); // Refresh events every 5 minutes
    return () => clearInterval(intervalId);
  }, [isLoggedIn]);

  useEffect(() => {
    const checkForUpcomingEvents = () => {
      const now = new Date().getTime();
      const tenMinutesFromNow = now + 10 * 60 * 1000;

      events.forEach(event => {
        const eventStartTime = new Date(event.start).getTime();

        if (eventStartTime > now && eventStartTime <= tenMinutesFromNow) {
          alert(`Event "${event.title}" is starting in less than 10 minutes!`);
        }
      });
    };

    const intervalId = setInterval(checkForUpcomingEvents, 60 * 1000); // Check every minute
    return () => clearInterval(intervalId);
  }, [events]);

  useEffect(() => {
    const checkForCurrentEvents = () => {
      const now = new Date().getTime();
      console.log(now)
      events.forEach(event => {
        const eventStartTime = new Date(event.start).getTime();
        const eventEndTime = new Date(event.end).getTime();
        
        if (eventStartTime <= now && now <= eventEndTime) {
          alert(`Event "${event.title}" is starting now!`);
        }
      });
    };

    checkForCurrentEvents(); // Check for current events immediately after fetching events
  }, [events]);

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
