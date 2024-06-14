import axios from 'axios';
import React, { useState, useEffect } from "react";
import { TbDoorExit } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

const Right = ({ onChangePassword }) => {
    const userId = localStorage.getItem('user');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Frontend - userId:", userId);
        
        if (userId) {
            axios.post(`http://localhost:5001/api/calendar/get-profile`, { id: userId })
                .then(response => {
                    console.log('User data:', response.data);
                    setUsername(response.data.username);
                    setEmail(response.data.email);
                })
                .catch(error => {
                    console.error('Error fetching user:', error);
                });
        } else {
            console.log('No userId found in localStorage');
        }
    }, [userId]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login'); 
        window.location.reload(); 
      };

    return (
        <div className="flex flex-col bg-white w-full h-full rounded-[15px]">
            <div className="flex flex-col m-[5%] gap-y-10 flex-grow">
                <div className="flex">
                    {/* Profile */}
                    <span className="font-bold text-[40px]">Profile</span>
                </div>
                {/* Name Place Holder */}
                <div className="flex flex-col gap-y-10">
                    <div className="flex flex-col gap-y-1">
                        <div>
                            <span className="font-bold text-lg">Username</span>
                        </div>
                        <div className="w-full">
                            <input className="border border-[2px] border-grey-900 w-full p-1 rounded-lg" type="text" value={username} readOnly />
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-1">
                        <div>
                            <span className="font-bold text-lg">Email</span>
                        </div>
                        <div className="w-full">
                            <input className="border border-[2px] border-grey-900 w-full p-1 rounded-lg" type="text" value={email} readOnly />
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-between mt-auto">
                    {/* Change Email/Password */}
                    <div className="flex flex-col cursor-pointer">
                        <button onClick={onChangePassword}>Change Password</button>
                    </div>
                    <div className="flex items-center cursor-pointer">
                        <button className="flex items-center gap-2" onClick={handleLogout}>
                            <span className="font-bold">Logout</span>
                            <TbDoorExit />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Right;
