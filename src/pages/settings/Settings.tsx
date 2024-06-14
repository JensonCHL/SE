import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdOutlinePhotoCamera } from "react-icons/md";
import Right from "../../componentSettings/Right";
import System from "../../componentSettings/System";
import ChangePassword from "../../componentSettings/changePassowrd"; // Import the ChangePassword component

const Settings = () => {
    const userId = localStorage.getItem('user');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [activeComponent, setActiveComponent] = useState('Profile'); // State to manage displayed component

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

    const handleButtonClick = (component) => {
        setActiveComponent(component);
    };

    return (
        <div className="flex flex-row gap-8 m-10 w-auto h-[900px]" >
            <div className="w-1/4" >
                <div className="flex flex-col bg-white w-full rounded-[15px] h-full gap-y-10" >
                    <div className="flex flex-col items-center justify-center pt-6" >
                        <div className="p-5 bg-[#D9D9D9] rounded-full" >
                            <MdOutlinePhotoCamera size="5em" color="white" />
                        </div>

                        <div><span className="text-bold text-[30px]" >{username}</span></div>
                        <div><span className="text-bold" >{email}</span></div>
                    </div>

                    <div>
                        <button
                            className={`flex w-5/6 rounded m-4 px-2 py-2 focus:outline-none ${activeComponent === 'Profile' ? 'bg-[#8E8E8E] bg-opacity-15' : 'text-[#A8A8A8]'}`}
                            onClick={() => handleButtonClick('Profile')}
                        >
                            Profile
                        </button>
                        <button
                            className={`flex w-5/6 rounded m-4 px-2 py-2 focus:outline-none ${activeComponent === 'System' ? 'bg-[#8E8E8E] bg-opacity-15' : 'text-[#A8A8A8]'}`}
                            onClick={() => handleButtonClick('System')}
                        >
                            System
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-3/4">
                {activeComponent === 'Profile' && <Right onChangePassword={() => handleButtonClick('ChangePassword')} />}
                {activeComponent === 'System' && <System />}
                {activeComponent === 'ChangePassword' && <ChangePassword />}
            </div>
        </div>
    );
};

export default Settings;
