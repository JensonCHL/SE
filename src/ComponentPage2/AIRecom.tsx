import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';


const AIRecom = () => {
    const [healthData, setHealthData] = useState();
    const [reminder, setReminder] = useState('');
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
                setReminderBasedOnHealthData(response.data);
            } catch (error) {
                console.error('Error fetching health data:', error);
            }
        };

        fetchHealthData();
    }, [user_id]);

    const setReminderBasedOnHealthData = (data) => {

        if (data.heart_rate > 100) {
            setReminder('Your heart rate is elevated. Make sure to take regular breaks, stay hydrated, and avoid strenuous activities until your heart rate normalizes.');
        } else if (data.sleep_duration < 5) {
            setReminder('You need more rest today. Try to get at least 7-8 hours of sleep to ensure your body recovers and stays healthy.');
        } else if (data.steps_taken < 5000) {
            setReminder('You have taken fewer steps today. Aim for at least 10,000 steps daily to maintain good physical activity levels.');
        } else if (data.distance_traveled_km < 5) {
            setReminder('You have traveled a short distance today. Aim to walk or run at least 5 kilometers to stay active and healthy.');
        } else if (data.calories_burned < 2000) {
            setReminder('Consider increasing your physical activity to burn more calories and maintain a healthy weight.');
        } else if (data.stress_level > 7) {
            setReminder('Your stress level is high. Engage in relaxation activities like meditation, deep breathing, or a hobby you enjoy to lower your stress.');
        } else {
            setReminder('Keep up the good work! You are maintaining a healthy lifestyle. Continue your balanced routine to stay healthy and happy.');
        }
    };
    const getDailyGoalText = (label, value, target, unit) => {
        const remaining = target - value;
        if (remaining > 0) {
            const unitText = unit ? ` ${unit}${remaining === 1 ? '' : 's'}` : '';
            return `${value}/${target} ${unit} ${label}. You need ${remaining} more${unitText}.`;
        } else {
            return `${value}/${target} ${unit} ${label}.`;
        }
    };

    return (
        <div className='flex flex-col gap-4 h-full ' >
            <div className="flex flex-col w-full h-auto bg-white rounded-[40px] p-6 gap-y-4">
                { }
                {healthData && (
                    <div className="border border-[1px] border-red-500 rounded-[10px] p-2">
                        {/* Reminder section */}
                        
                        <span className="text-red-500">
                            Reminder: {reminder}
                        </span>
                    </div>
                )}
                <div className="flex flex-col rounded-[10px] bg-[#D9D9D9] bg-opacity-40 w-full h-auto p-5 gap-y-2">
                    <div className="flex flex-col justify-center items-center pt-[-3]" style={{ marginTop: '-1 rem' }} >
                        <span className='font-bold text-lg' >Health Integration</span>
                        <span className='font-bold text-md' >{healthData ? healthData.date : 'Loading...'}</span>
                    </div>
                    <div className="flex flex-row justify-between">
                        <span className="font-bold">Steps</span>
                        <span>{healthData ? `${healthData.steps_taken} steps` : 'Loading...'}</span>
                    </div>
                    <div className="flex flex-row justify-between">
                        <span className="font-bold">Distance</span>
                        <span>{healthData ? `${healthData.distance_traveled_km} km` : 'Loading...'}</span>
                    </div>
                    <div className="flex flex-row justify-between">
                        <span className="font-bold">Heart Rate</span>
                        <span>{healthData ? `${healthData.heart_rate} bpm` : 'Loading...'}</span>
                    </div>
                    <div className="flex flex-row justify-between">
                        <span className="font-bold">Calories Burned</span>
                        <span>{healthData ? `${healthData.calories_burned} calories` : 'Loading...'}</span>
                    </div>
                    <div className="flex flex-row justify-between">
                        <span className="font-bold">Sleep Pattern</span>
                        <span>{healthData ? `${healthData.sleep_duration} hours` : 'Loading...'}</span>
                    </div>
                    <div className="flex flex-row justify-between">
                        <span className="font-bold">Stress Level</span>
                        <span>{healthData ? healthData.stress_level : 'Loading...'}</span>
                    </div>

                </div>

            </div>
            {/* Daily Goals */}
            <div className='flex flex-col w-full h-full bg-white rounded-[30px] p-4 gap-y-2'  >
                <div className='Poppins flex font-bold rounded-[10px] p-1 justify-center items-center' >
                    Daily Goals
                </div>
                <div className="grid grid-cols-2 gap-2 h-full" >
                    {healthData && (
                        <>
                            {/* Sleep Pattern */}
                            <div className='flex flex-col rounded-[10px] bg-[#D9D9D9] bg-opacity-40 w-full h-full px-3 py-1 justify-between'>
                                <div className='flex flex-row justify-between'>
                                    <span>{healthData.sleep_duration}/7</span>
                                    <span className='font-bold text-sm'>Sleep Pattern</span>
                                </div>
                                <span className='font-bold text-[12px]'>{getDailyGoalText('of sleep', healthData.sleep_duration, 7, 'hours')}</span>
                            </div>
                            {/* Stress Level */}
                            <div className='flex flex-col rounded-[10px] bg-[#D9D9D9] bg-opacity-40 w-full h-full px-3 py-1 justify-between'>
                                <div className='flex flex-row justify-between'>
                                    <span>{healthData.distance_traveled_km}/5</span>
                                    <span className='font-bold text-sm'>Distance Traveled</span>
                                </div>
                                <span className='font-bold text-[12px]'>{getDailyGoalText('kilometers', healthData.distance_traveled_km, 5, 'kilometers')}</span>
                            </div>
                            {/* Calories Burned */}
                            <div className='flex flex-col rounded-[10px] bg-[#D9D9D9] bg-opacity-40 w-full h-full px-3 py-1 justify-between'>
                                <div className='flex flex-row justify-between'>
                                    <span>{healthData.calories_burned}/2000</span>
                                    <span className='font-bold text-sm'>Calories Burned</span>
                                </div>
                                <span className='font-bold text-[12px]'>{getDailyGoalText('burned', healthData.calories_burned, 2000, 'calories')}</span>
                            </div>
                            {/* Hydration Levels */}
                            <div className='flex flex-col rounded-[10px] bg-[#D9D9D9] bg-opacity-40 w-full h-full px-3 py-1 justify-between'>
                                <div className='flex flex-row justify-between'>
                                    <span>{healthData.steps_taken}/10000</span>
                                    <span className='font-bold text-sm'>Steps Taken</span>
                                </div>
                                <span className='font-bold text-[12px]'>{getDailyGoalText('steps', healthData.steps_taken, 10000, '')}</span>
                            </div>
                        </>
                    )}

                </div>

            </div>
        </div>

    );
};

export default AIRecom;
