import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { TbDoorExit } from "react-icons/tb";

const System: React.FC = () => {
  const navigate = useNavigate()
  const options = [
    { label: 'Reminders only', value: 1 },
    { label: 'Reminders and Events', value: 2 },
    { label: 'Reminders, Event, To-do', value: 3 },
    { label: 'None', value: 0 },
  ];
  const [value, setValue] = useState<number>(options[0].value);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login'); 
    window.location.reload(); 
  };

  return (
    <div className="flex flex-col bg-white w-full h-full rounded-[15px]">
      <div className="flex flex-col m-[5%] gap-y-10 flex-grow">
        <div className="flex">
          <span className="font-bold text-[40px]">System</span>
        </div>
        <div className="flex flex-col gap-y-10">
          <div className="flex flex-col gap-y-1">
            <div>
              <span className="font-bold text-lg">Push Notification</span>
            </div>
            <div>
              <span className="font-bold text-lg opacity-20">
                Allow Time Possible to send push notifications on set conditions
              </span>
            </div>
            <div className="w-2/6">
              <select
                className='form-select w-full font-bold bg-[#A8A8A8] bg-opacity-15 px-2 py-1 rounded-md items-center'
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
              >
                {options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

        </div>

      </div>
      <div className="flex justify-end m-6" >
      <button className="flex items-center gap-2">
            <span className="font-bold" onClick={handleLogout}>Logout</span>
            <TbDoorExit />
            </button>
      </div>

    </div>
  );
};

export default System;
