import './App.css'
import Home from './pages/home/Home'
import Header from './components/Header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Settings from './pages/settings/Settings';
import CalenderPage from './pages/Calender/CalenderPage';
import Calendar from './components/Calendar';


export default function App() {
  return <div className="max-h-screen flex flex-col" >
    <Header />
    <div></div>

    {/* Router dom */}
    {/* <Home></Home> */}
    {/* <AddEvent /> */}
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/Calender' element={<CalenderPage />} />
        <Route path='/Settings' element={<Settings />} />
      </Routes>
    </Router>
    <div></div>
    {/* <Calendar /> */}
  </div>

  // <Home/>

}