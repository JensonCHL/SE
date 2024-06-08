import './App.css'
import Home from './pages/home/Home'
import Header from './components/Header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Settings from './pages/settings/Settings';
import CalenderPage from './pages/Calender/CalenderPage';
import Activity from './pages/Activity/Activity';


export default function App2() {
  return <div className="max-h-screen flex flex-col" >
    <Header />
    <div></div>
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path='/Calender' element={<CalenderPage />} />
        <Route path='/Activity' element={<Activity />} />
        <Route path='/Settings' element={<Settings />} />
      </Routes>
    </Router>
    <div></div>
    {/* <Calendar /> */}
  </div>
}