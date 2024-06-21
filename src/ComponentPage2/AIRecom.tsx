import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AIRecom = () => {
    const [healthData, setHealthData] = useState();
    const user_id = localStorage.getItem('user');

    useEffect(() => {
        const fetchHealthData = async () => {
            console.log(user_id)
            try {
                if (!user_id) {
                    console.error('User ID not found in localStorage');
                    return;
                }
                const response = await axios.get(`http://localhost:5001/api/calendar/get-health?user_id=${user_id}`);
                console.log('Health Data:', response.data);
                setHealthData(response.data); 
            } catch (error) {
                console.error('Error fetching health data:', error);
            }
        };

        fetchHealthData();
    }, [user_id]); 

    return (
        <div className="flex flex-col w-full h-full bg-white rounded-[40px] p-6 gap-y-4">
            {}
            {healthData && (
                <div className="border border-[1px] border-red-500 rounded-[10px] p-2">
                    <span className="text-red-500">
                        Reminder: You have too many activities today. Take a break and rest!
                    </span>
                </div>
            )}
            <div className="flex flex-col rounded-[10px] bg-[#D9D9D9] bg-opacity-40 w-full h-auto p-5 gap-y-2">
                <div className="flex flex-row justify-between">
                    <span className="font-bold">Steps</span>
                    <span>{healthData ? healthData.steps_taken : 'Loading...'}</span>
                </div>
                <div className="flex flex-row justify-between">
                    <span className="font-bold">Distance</span>
                    <span>{healthData ? healthData.distance_traveled_km : 'Loading...'}</span>
                </div>
                <div className="flex flex-row justify-between">
                    <span className="font-bold">Heart Rate</span>
                    <span>{healthData ? healthData.heart_rate : 'Loading...'}</span>
                </div>
                <div className="flex flex-row justify-between">
                    <span className="font-bold">Calories Burned</span>
                    <span>{healthData ? healthData.calories_burned : 'Loading...'}</span>
                </div>
                <div className="flex flex-row justify-between">
                    <span className="font-bold">Sleep Pattern</span>
                    <span>{healthData ? healthData.sleep_duration : 'Loading...'}</span>
                </div>
                <div className="flex flex-row justify-between">
                    <span className="font-bold">Stress Level</span>
                    <span>{healthData ? healthData.stress_level : 'Loading...'}</span>
                </div>
            </div>
            <div>
                Recommendation AI
            </div>
        </div>
    );
};

export default AIRecom;
